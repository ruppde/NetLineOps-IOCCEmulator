Ext.define('TimesSquare.overrides.Rest', {
    override: 'Ext.data.proxy.Rest',
    buildRequest: function() {
        var a = (arguments.callee.$previous || Ext.data.proxy.Ajax.prototype.buildRequest).apply(this, arguments),
            b = a.getParams();
        if (a.getAction() === 'read' && !this.getAppendId()) {
            delete b[this.getIdParam()];
            a.setParams(b)
        }
        return a
    }
});
