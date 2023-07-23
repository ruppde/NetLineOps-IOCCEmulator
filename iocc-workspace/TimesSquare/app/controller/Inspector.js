Ext.define('TimesSquare.controller.Inspector', {
    extend: 'Inspector.Controller',
    enabled: !1,
    wnd: null,
    wndOptions: {
        height: 300,
        width: 900,
        menubar: 0,
        toolbar: 0,
        location: 0,
        personalbar: 0,
        chrome: 1,
        dialog: 1,
        resizable: 0,
        dependent: 1
    },
    init: function() {},
    onKeyDown: function(a) {
        if (a.getKeyName() === 'I' && a.ctrlKey) {
            this[this.enabled ? 'disable' : 'enable']()
        }
    },
    enable: function() {
        Inspector.Controller.prototype.enable.apply(this, arguments);
        this.enabled = !0;
        if (!this.wnd) {
            this.wnd = new TimesSquare.util.Window({
                path: 'resources/inspector.html',
                title: 'Inspector Tool',
                options: this.wndOptions
            })
        }
        this.wnd.open()
    },
    disable: function() {
        Inspector.Controller.prototype.disable.apply(this, arguments);
        this.enabled = !1
    },
    publishTarget: function() {
        var b = this.target,
            c = b && b.getInspectionChain(),
            a = c && c.map(function(a) {
                return a.getInspectionSelector()
            }).join(' -> ');
        if (a) {
            this.wnd.send({
                type: 'selected',
                payload: a
            });
            this.disable()
        }
    },
    setTarget: function(a) {
        this.target = a;
        this.highlight(a)
    },
    onWindowClick: function() {
        if (this.enabled) {
            this.publishTarget()
        }
    }
});
