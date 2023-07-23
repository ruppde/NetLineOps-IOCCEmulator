Ext.define('TimesSquare.store.common.Lovs', {
    extend: 'Ext.data.Store',
    fields: [{
        name: 'key'
    }, {
        name: 'value'
    }],
    remoteFilter: !1,
    proxy: 'memory',
    statics: {
        getMemoryStore: function(b) {
            var c, a = TimesSquare.CONFIG && TimesSquare.CONFIG.listOfValues;
            if (!a || !a[b]) {
                Ext.Error.raise('List of values not found: ' + b)
            }
            c = this.create({
                data: a[b]
            });
            return c
        },
        getRestStore: function(d, c, a) {
            var b = this.create();
            c = c || 'result';
            b.setProxy({
                type: 'rest',
                url: d,
                reader: {
                    type: 'json',
                    rootProperty: c
                }
            });
            if (a && a.excludeOptions && a.excludeOptions.length && a.excludeKey) {
                b.addLovFilter(a.excludeKey, a.excludeOptions)
            }
            return b
        }
    },
    setCache: function(b) {
        var a = this;
        if (b) {
            a.loadData(b)
        }
        a.on('beforeload', function(a) {
            return !a.getCount()
        });
        return a
    },
    addLovFilter: function(c, b) {
        var a = this;
        a.filterOnLoad = !0;
        a.addFilter([function(a) {
            return Ext.Array.indexOf(b, a.data[c]) === -1
        }], !1)
    }
});