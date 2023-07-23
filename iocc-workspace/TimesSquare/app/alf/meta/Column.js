Ext.define('Alf.meta.Column', {
    singleton: !0,
    generate: function(f, d) {
        var c = f.fields,
            e = [],
            b, a;
        for (a in c) {
            if (c.hasOwnProperty(a)) {
                b = {
                    dataIndex: a
                };
                Ext.apply(b, c[a]);
                if (d && d[a]) {
                    Ext.apply(b, d[a])
                }
                e.push(b)
            }
        }
        return e
    }
});
