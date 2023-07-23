Ext.define('TimesSquare.util.Logger', {
    extend:  'Wuis.util.Logger',
    singleton: !0,
    sizeLimit: 40,
    enableFineLog: !1,
    checkLogSize: function() {
        var a = this;
        if (a.enableFineLog && a.logs.length >= a.sizeLimit) {
            a.postLogs();
            a.logs = [];
            return
        }
        if (a.logs.length > a.sizeLimit) {
            a.logs.shift()
        }
    },
    addLog: function(c, b) {
        var a = this;
        if (c === 'error') {
            a.postError(b)
        } else {
            a.callParent(arguments)
        }
    },
    trackJsError: function() {
        var a = this;
        a.jsErrorArgs = arguments;
        a.callParent(arguments)
    },
    restartTimeout: Ext.emptyFn,
    saveLog: Ext.emptyFn,
    postLogs: function() {
        var a = this;
        a.jsErrorArgs = null;
        a.postError(null)
    },
    postError: function(c) {
        var f = this,
            h = f.logs,
            i = h.length,
            g = Ext.ComponentQuery.query('gantt')[0],
            b = WuisLogin && WuisLogin.Security,
            e, d, a;
        if (c !== null) {
            c += '\nTime: ' + Ext.Date.format(new Date(), 'Y-m-d H:i:s.u')
        }
        d = {
            browser: window.navigator && window.navigator.userAgent,
            user: b && b.data && b.data.name || '',
            selection: g && g.title || '',
            lastActions: [],
            error: c
        };
        for (a = 0; a < i; a += 1) {
            e = h[a];
            d.lastActions.push(Ext.Date.format(new Date(e.timestamp), 'Y-m-d H:i:s.u') + ' ' + e.message + '\n')
        }
        Ext.Ajax.request({
            url: 'http://127.0.0.1:8080/NetLine-1.0/oss/sendGuiLog',
            method: 'POST',
            jsonData: d
        });
        if (window.errorReporter && f.jsErrorArgs) {
            window.errorReporter.apply(window, f.jsErrorArgs)
        }
    },
    init: function() {
        var a = this;
        a.callParent(arguments);
        if (a.trackExtErrors) {
            Ext.Error.handle = function(b) {
                if (Ext.Error.ignore) {
                    return !0
                }
                a.trackError(b)
            }
        }
    }
//}, 0, 0, 0, 0, 0, 0, [TimesSquare.util, 'Logger'], function() {
   // this.init()
}, function() {
    this.init()
});
