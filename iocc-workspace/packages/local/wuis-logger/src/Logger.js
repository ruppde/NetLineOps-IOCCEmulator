Ext.define('Wuis.util.Logger', {
    trackExtLogs: !0,
    trackExtErrors: !0,
    trackJsErrors: !0,
    sizeLimit: 100,
    timeLimit: 30000,
    timeoutOnError: 1000,
    serviceUrl: '/rest/Log/log',
    logs: null,
    constructor: function() {
        var a = this;
        a.logs = [];
        a.callParent(arguments);
        a.restartTimeout()
    },
    trackLog: function() {
        var a = this,
            b = a.normalizeArgs.apply(a, arguments);
        a.addLog(b.level, b.message)
    },
    trackError: function(a) {
        this.addLog('error', a.msg)
    },
    trackJsError: function(d, e, a, c, b) {
        this.addLog('error', d + '\nFile: ' + e + ', line ' + a + ', column: ' + (c || '') + '\nStackTrace: ' + (b || ''))
    },
    addLog: function(a, d, c) {
        var b = this;
        b.logs.push({
            level: a,
            message: d,
            timestamp: c || Date.now()
        });
        b.checkLogSize(a)
    },
    restartTimeout: function(b) {
        var a = this;
        window.clearTimeout(a.timeout);
        if (b === 0) {
            a.saveLog()
        } else {
            if (b || a.timeLimit) {
                a.timeout = Ext.defer(a.saveLog, b || a.timeLimit, a)
            }
        }
    },
    checkLogSize: function(b) {
        var a = this;
        if (a.logs.length >= a.sizeLimit) {
            a.saveLog()
        } else {
            if (b === 'error') {
                a.restartTimeout(a.timeoutOnError)
            }
        }
    },
    saveLog: function() {
        var a = this;
        a.restartTimeout();
        if (!a.logs.length) {
            return
        }
        a.saveLogToServer(a.logs);
        a.logs = []
    },
    saveLogToServer: function(a) {
        Ext.Ajax.request({
            url: this.serviceUrl,
            method: 'POST',
            jsonData: a
        })
    },
    normalizeArgs: function(a) {
        var b = 'log',
            c;
        if (typeof a !== 'string') {
            c = a;
            a = c.msg || '';
            b = c.level || b
        }
        if (arguments.length > 1) {
            a += Array.prototype.slice.call(arguments, 1).join('')
        }
        if (b !== 'log') {
            a = '[' + b.charAt(0).toUpperCase() + '] ' + a
        }
        return {
            level: b,
            message: a
        }
    },
    init: function() {
        var a = this,
            b = Ext.log;

        function trackedLog() {
            a.trackLog.apply(a, arguments);
            b.apply(this, arguments)
        }

        function logx(e, a) {
            var b = arguments && arguments.callee && arguments.callee.caller,
                c, d;
            for (d = 0; b && d < 5; d += 1) {
                c = b.displayName || b.$owner && b.$owner.$className;
                if (c) {
                    break
                }
                b = b.caller
            }
            if (typeof a[0] === 'string') {
                a.unshift({})
            }
            a[0].level = e;
            if (typeof a[1] === 'string') {
                a[1] = '[' + (c || '???') + '] ' + a[1]
            }
            trackedLog.apply(this, a)
        }
        trackedLog.error = function() {
            logx('error', Array.prototype.slice.call(arguments))
        };
        trackedLog.info = function() {
            logx('info', Array.prototype.slice.call(arguments))
        };
        trackedLog.warn = function() {
            logx('warn', Array.prototype.slice.call(arguments))
        };
        if (a.trackExtLogs) {
            Ext.log = trackedLog
        }
        if (a.trackExtErrors) {
            Ext.Error.handle = function(b) {
                a.trackError(b)
            }
        }
        if (a.trackJsErrors) {
            window.onerror = function() {
                a.trackJsError.apply(a, arguments)
            }
        }
    }
});