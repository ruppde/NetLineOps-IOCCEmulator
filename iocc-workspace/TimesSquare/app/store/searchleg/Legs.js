Ext.define('TimesSquare.store.searchleg.Legs', {
    extend: 'Ext.data.Store',
    model: 'TimesSquare.model.searchleg.Leg',
    pageSize: 100,
    autoLoad: !1,
    remoteStore: !0,
    remoteSort: !1,
    abortRequest: function() {
        var d = this,
            c = !1,
            b = Ext.Ajax.requests,
            a;
        if (!Ext.isObject(b)) {
            return !1
        }
        Ext.Object.each(b, function(e, b) {
            a = b && b.options && b.options.proxy && b.options.proxy.opsId;
            if (!a) {
                return !0
            }
            if (a === d.proxy.opsId) {
                Ext.Ajax.abort(b);
                c = !0;
                return !1
            }
        });
        return c
    }
});