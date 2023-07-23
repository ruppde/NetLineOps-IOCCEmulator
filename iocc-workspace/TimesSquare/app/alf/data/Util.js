Ext.define('Alf.data.Util', {
    singleton: !0,
    transformData: function(g, d, a) {
        var f = {},
            b, c, e;
        a = a || '.';
        for (c in d) {
            if (d.hasOwnProperty(c)) {
                b = d[c];
                e = typeof b === 'string' ? this.extractField(g, b, a) : b;
                this.writeField(f, c, e, a)
            }
        }
        return f
    },
    extractField: function(a, b, d) {
        var c = b.split(d);
        do {
            b = c.shift();
            a = a && typeof a === 'object' ? a[b] : undefined
        } while (c.length);
        return a
    },
    writeField: function(b, a, e, d) {
        var c = a.split(d);
        while (c.length > 1) {
            a = c.shift();
            if (!b[a] || typeof b[a] !== 'object') {
                b[a] = {}
            }
            b = b[a]
        }
        a = c.shift();
        b[a] = e
    },
    createRecordThroughReader: function(b, c) {
        var a;
        a = Ext.create('Ext.data.Store', {
            autoLoad: !0,
            model: b,
            data: [c],
            proxy: {
                type: 'memory'
            }
        });
        return a.first()
    }
});
