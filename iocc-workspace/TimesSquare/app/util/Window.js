Ext.define('TimesSquare.util.Window', {
    wnd: null,
    cachedMessage: null,
    constructor: function(a) {
        a = a || {};
        this.config = a;
        this.open();
        this.addWindowListeners()
    },
    open: function() {
        if (!this.wnd) {
            this.createWindow(this.config)
        }
    },
    close: function() {
        this.wnd.close()
    },
    send: function(a) {
        if (this.wnd) {
            this.wnd.postMessage(a, window.location.origin)
        } else {
            this.cachedMessage = a;
            this.createWindow(this.config)
        }
    },
    createWindow: function(a) {
        var d = a.path,
            c = a.title,
            b = a.options,
            e = window.open(d, c, this.parseOptions(b));
        this.wnd = e
    },
    addWindowListeners: function() {
        var a = this;
        window.addEventListener('message', function(b) {
            a.onMessage(b)
        });
        window.addEventListener('beforeunload', function() {
            a.onUnload()
        })
    },
    parseOptions: function(a) {
        a = a || {};
        return Ext.Array.map(Object.keys(a), function(b) {
            return b + '=' + a[b]
        }).join(',')
    },
    onMessage: function(b) {
        var a = b.data;
        if (!a) {
            return
        }
        switch (a.type) {
            case 'closed':
                this.onWindowClosed();
                break;
            case 'opened':
                this.onWindowOpened();
                break;
            default:
                break;
        }
    },
    onWindowClosed: function() {
        this.wnd = null
    },
    onWindowOpened: function() {
        if (this.cachedMessage) {
            this.send(this.cachedMessage);
            this.cachedMessage = null
        }
    },
    onUnload: function() {
        if (this.wnd) {
            this.wnd.close()
        }
    }
});
