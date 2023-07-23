Ext.define('Alf.data.proxy.AlfRest', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.alfrest',
    actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'PUT',
        destroy: 'DELETE'
    },
    pageParam: undefined,
    applyEncoding: function(a) {
        return a
    },
    getMethod: function(a) {
        var b = this.actionMethods[a.getAction()],
            c = a.getOperation();
        if (c.action === 'read' && c.getId()) {
            b = 'GET'
        }
        return b
    },
    buildRequest: function(a) {
        if (a.action !== 'read' || a.getId()) {
            return Ext.data.proxy.Rest.prototype.buildRequest.apply(this, arguments)
        }
        var d = this,
            c = Ext.applyIf(a.params || {}, d.extraParams || {}),
            b;
        c = Ext.applyIf(c, d.getParams(a));
        if (a.getId() !== undefined && c.id === undefined) {
            c.id = a.id
        }
        b = new Ext.data.Request({
            jsonData: c,
            action: a.action,
            records: a.records,
            operation: a,
            url: a.url,
            disableCaching: !0,
            proxy: d
        });
        b.url = d.buildUrl(b);
        a.request = b;
        return b
    }
});