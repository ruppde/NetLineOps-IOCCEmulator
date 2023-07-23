Ext.define('messaging.ActiveMQ', {
    extend: 'Ext.app.Controller',
    url: null,
    destination: null,
    normalTimeout: 5000,
    consumeNextTimeout: 30 * 1000,
    waitOnError: 5000,
    waitBetween: 1000,
    autoStart: !1,
    run: !1,
    connection: null,
    subscriptionId: 1,
    oldSubscriptionId: 0,
    clientId: null,
    selector: null,
    subsUrl: '',
    nextUrl: '',
    init: function() {
        var a = this;
        a.connection = Ext.create('Ext.data.Connection')
    },
    restart: function(b, a, c) {
        this.start(b, a, c)
    },
    start: function(c, d, e) {
        var a = this,
            f = Ext.create('Ext.data.identifier.Uuid'),
            b;
        a.subscriptionId += 1;
        b = a.subscriptionId;
        if (d) {
            a.stop(e)
        }
        if (!a.clientId) {
            a.clientId = f.generate()
        }
        a.run = !0;
        if (c !== undefined) {
            a.selector = c || null
        }
        setTimeout(function() {
            if (b !== a.subscriptionId || !a.run) {
                return
            }
            a.startListening()
        })
    },
    stop: function(c) {
        var a = this,
            b = a.clientId;
        if (a.connection) {
            a.oldSubscriptionId = 0;
            a.connection.abortAll();
            Ext.log.info('[ActiveMQ] All connections are aborted by stop request.')
        }
        if (a.run) {
            a.oldSubscriptionId = 0;
            a.run = !1;
            if (c) {
                Ext.log.info('[ActiveMQ] Unsubscribing from listening queue (clientId: ' + b + ')...');
                Ext.defer(function() {
                    a.connection.request({
                        url: a.url,
                        method: 'POST',
                        params: {
                            type: 'unlisten',
                            clientId: b
                        },
                        success: function() {
                            Ext.log.info('[ActiveMQ] Successfully unsubscribed from listening queue (clientId: ' + b + ').')
                        }
                    })
                }, 1)
            }
        }
    },
    startListening: function() {
        var a = this,
            b = a.subscriptionId;
        if (!a.run) {
            return
        }
        Ext.log.info('[ActiveMQ] Subscribing to listening queue (clientId: ' + a.clientId + ')...');
        a.connection.request({
            url: a.url,
            method: 'POST',
            headers: {
                'selector': a.selector
            },
            params: {
                type: 'listen',
                destination: a.destination,
                clientId: a.clientId,
                message: a.clientId
            },
            timeout: a.normalTimeout,
            success: function(c) {
                if (b !== a.subscriptionId || !a.run) {
                    return
                }
                a.currentServerId = c.getResponseHeader('x-server-id');
                Ext.log.info('[ActiveMQ] Subscribed to listening queue (serverId: ' + a.currentServerId + ', clientId: ' + a.clientId + ')...');
                a.consumeNext()
            },
            failure: function(c) {
                if (b !== a.subscriptionId || !a.run) {
                    return
                }
                if (!c || !c.aborted) {
                    Ext.log.error('[ActiveMQ] Could not subscribe to listening queue (' + a.clientId + '), restarting with timeout!')
                } else {
                    Ext.log.info('[ActiveMQ] Subscribing to listening queue transaction is aborted normally, restarting with timeout.')
                }
                a.restartWithTimeout()
            }
        })
    },
    consumeNext: function() {
        var a = this,
            b = a.subscriptionId;
        if (!a.run || !a.url) {
            return
        }
        if (!a.oldSubscriptionId) {
            a.oldSubscriptionId = b
        }
        a.connection.request({
            url: a.url,
            headers: {
                'Accept': 'application/json'
            },
            params: {
                clientId: a.clientId,
                timeout: a.consumeNextTimeout
            },
            method: 'GET',
            timeout: a.consumeNextTimeout + 11000,
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
    processResponseXML: function(c, g) {
        var a = this,
            h = a.clientId,
            f, e, b, d;
        if (c && c.firstChild) {
            f = c.firstChild;
            e = c.firstChild.childNodes;
            if (f.nodeName !== 'parseerror') {
                for (d = 0; d < e.length; d += 1) {
                    b = e[d];
                    if (!b.getAttribute) {
                        continue
                    }
                    if (b.getAttribute('id') === h) {
                        a.updateStores(messaging.Base64.decode(b.textContent))
                    } else {
                        Ext.log.error('Message id is not valid: ' + b.getAttribute('id'))
                    }
                }
                if (g !== a.subscriptionId || !a.run) {
                    return !0
                }
                Ext.defer(a.consumeNext, a.waitBetween, a);
                return !0
            }
        }
        return !1
    },
    restartWithTimeout: function() {
        var a = this,
            b = a.subscriptionId;
        setTimeout(function() {
            if (b !== a.subscriptionId || !a.run) {
                return
            }
            a.start(a.selector, !0)
        }, a.waitOnError)
    },
    updateStores: function() {}
});