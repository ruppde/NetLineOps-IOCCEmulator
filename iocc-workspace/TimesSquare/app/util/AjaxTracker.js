Ext.define('TimesSquare.util.AjaxTracker', {
    singleton: !0,
    mixins: {
        observable: 'Ext.util.Observable'
    },
    loggingLvl: 'info',
    excludedUrls: ['http://127.0.0.1:8080/NetLine-1.0/oss/sendGuiLog'],
    trackingRequests: {},
    tpl: 'AJAX {0} {1} | {2}ms',
    constructor: function() {
        this.mixins.observable.constructor.call(this)
    },
    init: function() {
        this.mon(Ext.Ajax, {
            beforerequest: 'onBeforeRequest',
            requestcomplete: 'onRequestComplete',
            requestexception: 'onRequestException'
        })
    },
    registerRequest: function(b) {
        var a = Ext.data.Connection.requestId + 1;
        this.trackingRequests[a] = {
            options: b,
            start: Date.now()
        }
    },
    unregisterRequest: function(a) {
        delete this.trackingRequests[a.id]
    },
    logRequest: function(b, e) {
        var a = this.trackingRequests[b.id],
            c, d;
        if (a) {
            c = Date.now() - a.start;
            d = Ext.String.format(this.tpl, a.options.url, e, c);
            Ext.log[this.loggingLvl](d);
            this.unregisterRequest(b)
        }
    },
    onBeforeRequest: function(c, a) {
        var b = Ext.Array.some(this.excludedUrls, function(b) {
            return b.match(a.url)
        });
        if (!b) {
            this.registerRequest(a)
        }
    },
    onRequestComplete: function(b, a) {
        this.logRequest(a.request, 'COMPLETE')
    },
    onRequestException: function(b, a) {
        this.logRequest(a.request, 'EXCEPTION')
    }
}, function() {
    TimesSquare.util.AjaxTracker.init()
});
