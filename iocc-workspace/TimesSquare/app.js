/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'TimesSquare',
    autoCreateViewport: !1,
    extend: 'TimesSquare.Application',
    controllers: ['Login', 'Wuis.controller.EventLogger', 'Main', 'Clock', 'Selection', 'Messaging', 'SearchLeg', 'gantt.Gantt', 'gantt.LogicalAircraft', 'gantt.NonRotationalAircraft', 'gantt.AtcSlot'],
    stores: [],

    init: function() {
        Ext.Ajax.setTimeout(TimesSquare.CONFIG.application.ajaxTimeout);
        Ext.override(Ext.data.proxy.Server, {
            timeout: Ext.Ajax.timeout
        });
        Ext.override(Ext.data.Connection, {
            timeout: Ext.Ajax.timeout
        });
        Ext.override(Ext.form.Basic, {
            timeout: Ext.Ajax.timeout / 1000
        });
        TimesSquare.CONFIG.detailViewFieldSize.set(40, [0, 6, 6, 0]);
        Sch.preset.Manager.registerPreset('opsHourAndDay', {
            timeColumnWidth: 60,
            rowHeight: 60,
            resourceColumnWidth: 100,
            displayDateFormat: 'G:i',
            shiftIncrement: 1,
            shiftUnit: 'DAY',
            defaultSpan: 24,
            timeResolution: {
                unit: 'DAY',
                increment: 1
            },
            headerConfig: {
                middle: {
                    unit: 'HOUR',
                    align: 'left',
                    dateFormat: 'G',
                    renderer: TimesSquare.util.Time.createRederer('G')
                },
                top: {
                    unit: 'DAY',
                    align: 'center',
                    dateFormat: 'D dMy',
                    renderer: TimesSquare.util.Time.createRederer('D dMy')
                }
            }
        });
        Sch.preset.Manager.registerPreset('opsMinuteAndHour', {
            timeColumnWidth: 100,
            rowHeight: 60,
            resourceColumnWidth: 100,
            displayDateFormat: 'G:i',
            shiftIncrement: 1,
            shiftUnit: 'HOUR',
            defaultSpan: 48,
            timeResolution: {
                unit: 'MINUTE',
                increment: 15
            },
            headerConfig: {
                top: {
                    unit: 'HOUR',
                    align: 'center',
                    dateFormat: 'D dMy, G',
                    renderer: TimesSquare.util.Time.createRederer('D dMy, G')
                },
                middle: {
                    unit: 'MINUTE',
                    align: 'left',
                    dateFormat: 'i',
                    renderer: TimesSquare.util.Time.createRederer('i')
                }
            }
        });
        Sch.preset.Manager.registerPreset('opsWeekAndDay', {
            timeColumnWidth: 100,
            rowHeight: 60,
            resourceColumnWidth: 100,
            displayDateFormat: 'Y-m-d',
            shiftUnit: 'WEEK',
            shiftIncrement: 1,
            defaultSpan: 7,
            timeResolution: {
                unit: 'DAY',
                increment: 1
            },
            headerConfig: {
                top: {
                    unit: 'WEEK',
                    align: 'center',
                    dateFormat: 'D dMy',
                    renderer: TimesSquare.util.Time.createRederer('D dMy')
                },
                middle: {
                    unit: 'DAY',
                    align: 'center',
                    dateFormat: 'dMy',
                    renderer: TimesSquare.util.Time.createRederer('dMy')
                }
            }
        });
        Wuis.ajax.DirectService.useMsgBoxDialog = !1;
        Wuis.ajax.DirectService.provide(TimesSquare.CONFIG.application.services, 'TimesSquare.service.');
        Ext.Ajax.on('requestexception', this.handleRequestException, this);
        Ext.app.Application.prototype.init.apply(this, arguments)
    },
    handleRequestException: function(g, e, a) {
        var c = this,
            b = e.status,
            f, d;
        if (c.skipExceptionHandling(e, a)) {
            return
        }
        if (b === 401) {
            if (/\/NetLine-1.0\/oss\/sendGuiLog/.test(a.url)) {
                return
            }
            c.showRequestException(a, 'Unauthorized', 'Unauthorized access. Press OK to authenticate.', function() {
                window.location.reload();
                throw new Error('Unauthorized.')
            }, !1, b);
            return
        }
        if (b === 0) {
            if (/\/NetLine-1.0\/oss\/sendGuiLog/.test(a.url)) {
                return
            }
            c.showRequestException(a, !1, 'Connection to the server is lost.', !1, !1, b);
            return
        }
        f = e.timedout;
        if (f) {
            c.showRequestException(a, 'Timeout', 'Communication failure: timeout.', !1, !1, b);
            return
        }
        d = Ext.JSON.decode(e.responseText, !0);
        if (b === 500 && d && d.result) {
            c.showRequestException(a, !1, d.result.cause, !1, d.result.stackTrace, b);
            return
        }
        c.showRequestException(a, !1, 'Status code: ' + b)
    },
    skipExceptionHandling: function(a, f) {
        var h = this,
            g = a.status,
            b = a.request.options.url,
            e = h.getController('Login').restPrefix,
            d, c;
        if (a.aborted) {
            return !0
        }
        if (g === 503 && b.indexOf(TimesSquare.CONFIG.application.urls.notificationTopicUrl) > -1) {
            return !0
        }
        d = e + 'authorization';
        c = e + 'authentication';
        if (g === 401 && b.indexOf(d) > -1 || b.indexOf(c) > -1) {
            return !0
        }
        if (/\/NetLine-1.0\/(hornetq|amq)\//.test(f && f.url)) {
            return !0
        }
    },
    showRequestException: function(c, h, g, f, d, e) {
        var j = h || 'Communication failure',
            b = g || 'Communication failure',
            i = f || Ext.emptyFn,
            a = {
                title: j,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR,
                fn: i
            };
        if (e !== undefined) {
            b += '<br />Status code: ' + e
        }
        if (c && c.url) {
            b += '<br />Request URL: ';
            b += c.url
        }
        a.msg = b;
        if (d) {
            a.multiline = !0;
            a.value = d;
            a.width = 600;
            a.defaultTextHeight = 200
        }
        TimesSquare.Msg.show(a)
    },
    launch: function() {},

    //requires: [
    //    'TimesSquare.view.main.Main'
    //],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    //mainView: 'TimesSquare.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to TimesSquare.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
