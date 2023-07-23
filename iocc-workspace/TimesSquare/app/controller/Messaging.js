Ext.define('TimesSquare.controller.Messaging', {
    extend: 'messaging.ActiveMQ',
    url: TimesSquare.CONFIG.application.urls.AMQUrlPrefix,
    destination: 'topic://netline/ops/jms/topic/REST_NOTIFICATION_OUT',
    //destination: 'topic://jms/queue/DLQ',
    consumeNextTimeout: TimesSquare.CONFIG.application.hornetQueue.consumeNextTimeout,
    normalTimeout: TimesSquare.CONFIG.application.hornetQueue.normalTimeout,
    waitForNextUpdateTimeout: TimesSquare.CONFIG.application.hornetQueue.waitForNextUpdateTimeout,
    maxWaitForUpdatesTimeout: TimesSquare.CONFIG.application.hornetQueue.maxWaitForUpdatesTimeout,
    messageEvents: null,
    collectedMessageEvents: Ext.create('TimesSquare.classes.MessageEvent'),
    updateStores: function(b) {
        var c = this,
            a = Ext.decode(b);
        if (a) {
            c.collectUpdates(a)
        }
    },
    _waitForNextUpdateTimeout: null,
    _maxWaitForUpdatesTimeout: null,
    collectUpdates: function(c) {
        var a = this,
            b;
        b = Ext.create('TimesSquare.classes.MessageEvent', {
            data: c
        });
        if (b.hasMessages()) {
            a.displayMessages(b.getMessages())
        }
        if (!b.hasChanges()) {
            b.destroy();
            return
        }
        if (!a.messageEvents) {
            a.messageEvents = []
        }
        a.messageEvents.push(b);
        a.collectedMessageEvents.consumeMessages(c);
        Ext.log.info('[HQ] Update cames from the server. (Re)start timeouts.');
        window.clearTimeout(a._waitForNextUpdateTimeout);
        a._waitForNextUpdateTimeout = Ext.defer(a.sendUpdates, a.waitForNextUpdateTimeout, a);
        if (!a._maxWaitForUpdatesTimeout) {
            a._maxWaitForUpdatesTimeout = Ext.defer(a.sendUpdates, a.maxWaitForUpdatesTimeout, a)
        }
    },
    sendUpdates: function() {
        var a = this,
            b;
        if (!a.messageEvents) {
            return
        }
        Ext.log.info('[HQ] Apply updates...');
        a.clearUpdateTimeouts();
        a.fireEvent('opsdatachanged', a.messageEvents);
        for (b in a.messageEvents) {
            if (a.messageEvents.hasOwnProperty(b)) {
                a.messageEvents[b].destroy()
            }
        }
        a.messageEvents = null
    },
    clearUpdateTimeouts: function() {
        var a = this;
        window.clearTimeout(a._waitForNextUpdateTimeout);
        window.clearTimeout(a._maxWaitForUpdatesTimeout);
        a._waitForNextUpdateTimeout = null;
        a._maxWaitForUpdatesTimeout = null
    },
    stop: function() {
        var a = this;
        Ext.log.info('[HQ] Stop Messaging');
        a.clearUpdateTimeouts();
        messaging.ActiveMQ.prototype.stop.apply(this, arguments)
    },
    start: function(a) {
        var b = this;
        Ext.log.info('[HQ] Start Messaging. Selector: ' + a);
        b.applySettings(a);
        messaging.ActiveMQ.prototype.start.apply(this, arguments)
    },
    applySettings: function(c) {
        var b = this,
            a = b.getController('gantt.Gantt').parameterList;
        b.selector = c || '';
        if (!a) {
            return
        }
        if (!Ext.isEmpty(a.WAIT_FOR_NEXT_UPDATE_TIMEOUT)) {
            b.waitForNextUpdateTimeout = a.WAIT_FOR_NEXT_UPDATE_TIMEOUT * 1
        }
        if (!Ext.isEmpty(a.MAX_WAIT_FOR_UPDATES_TIMEOUT)) {
            b.maxWaitForUpdatesTimeout = a.MAX_WAIT_FOR_UPDATES_TIMEOUT * 1
        }
    },
    restartWithTimeout: function() {
        var a = this,
            b = a.subscriptionId;
        window.setTimeout(function() {
            if (b !== a.subscriptionId || !a.run) {
                return
            }
            a.showOutOfSyncMessage()
        }, 100)
    },
    showOutOfSyncMessage: function() {
        var a = this;
        a.stop(!0);
        Ext.log.info('Show Out of sync message');
        Ext.Msg.show({
            title: 'Out of sync',
            msg: ['The Gantt chart is out of sync due to network or server error.', '', 'Would you like to reload the Gantt chart?'].join('<br>'),
            buttons: Ext.Msg.OKCANCEL,
            closable: !1,
            buttonText: {
                ok: '<b>Reload gantt chart</b>',
                cancel: 'Close gantt chart'
            },
            icon: Ext.Msg.WARNING,
            fn: a.outOfSyncCallback,
            scope: a
        })
    },
    outOfSyncCallback: function(c) {
        var d = this,
            a = d.getController('gantt.Gantt'),
            b = a.getGantt();
        if (c === 'cancel') {
            if (b) {
               // b.close()
            }
            return
        }
        a.loadGantt()
    },
    consumeNext: function() {
        var a = this,
            b = a.subscriptionId,
            c = a.consumeNextTimeout,
            d = {
                clientId: a.clientId
            };
        if (!a.run || !a.url) {
            return
        }
        if (!a.oldSubscriptionId) {
            a.oldSubscriptionId = b
        }
        if (c) {
            d.timeout = c
        }
        a.connection.request({
            url: a.url,
            headers: {
                'Accept': 'application/json'
            },
            params: d,
            method: 'GET',
            timeout: c ? c + 11000 : a.normalTimeout,
            success: function(c) {
                var d;
                if ((b === a.subscriptionId || b === a.oldSubscriptionId) && a.run) {
                    a.oldSubscriptionId = 0;
                    d = c.getResponseHeader('x-server-id');
                    if (a.currentServerId !== d) {
                        Ext.log.error('[ActiveMQ] Message received with invalid serverId (' + d + ' instead of ' + a.currentServerId + '), restarting with timeout!');
                        a.restartWithTimeout();
                        return
                    }
                    try {
                        if (a.processResponseXML(c.responseXML, b)) {
                            return
                        }
                    } catch (e) {
                        try {
                            if (a.processResponseXML((new DOMParser()).parseFromString(c.responseText, 'text/xml'), b)) {
                                return
                            }
                            Ext.log.error(e.toString());
                            Ext.log.error('[ActiveMQ] Exception occured while parsing queue XML data (responseXML), restarting with timeout!')
                        } catch (f) {
                            Ext.log.error(f.toString());
                            Ext.log.error('[ActiveMQ] Exception occured while parsing queue XML data (DOMParser), restarting with timeout!')
                        }
                    }
                    a.restartWithTimeout()
                }
                a.oldSubscriptionId = 0
            },
            failure: function(c) {
                a.oldSubscriptionId = 0;
                if (b !== a.subscriptionId || !a.run) {
                    return
                }
                if (!c || !c.aborted) {
                    Ext.log.error('[ActiveMQ] Error occured while receiving queue message, restarting with timeout!')
                } else {
                    Ext.log.info('[ActiveMQ] Message receiving transaction is aborted normally, restarting with timeout.')
                }
                a.restartWithTimeout()
            }
        })
    },
    displayMessages: function(b) {
        var a = TimesSquare.view.common.MessageWindow;
        Ext.Array.each(b, function(c) {
            a.show({
                title: 'Message from Server',
                msg: [c.message].join('<br>'),
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: 'Close'
                }
            })
        })
    }
});
