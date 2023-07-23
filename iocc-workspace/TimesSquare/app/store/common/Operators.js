Ext.define('TimesSquare.store.common.Operators', {
    extend: 'Ext.data.Store',
    fields: [{
        name: 'key'
    }, {
        name: 'value'
    }],
    remoteFilter: !1,
    key: 'value',
    excludeOptions: [],
    constructor: function() {
        var a = this;
        Ext.data.Store.prototype.constructor.apply(this, arguments);
        if (a.excludeOptions.length) {
            a.addLovFilter()
        }
        a.on('beforeload', function(a) {
            return !a.getCount()
        })
    },
    addLovFilter: function() {
        var a = this;
        a.filterOnLoad = !0;
        a.addFilter([function(b) {
            return Ext.Array.indexOf(a.excludeOptions, b.data[a.key]) === -1
        }], !1)
    }
});
