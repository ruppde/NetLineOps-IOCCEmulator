Ext.define('Alf.meta.Field', {
    singleton: !0,
    decorate: function(d, e, f) {
        var h = d.fields,
            g = d.defaults,
            i = e.length,
            c, a, b;
        for (c = 0; c < i; c += 1) {
            a = e[c];
            if (a.items) {
                if (a.meta !== !1 && f !== !1 && Ext.isArray(a.items)) {
                    this.decorate(d, a.items)
                }
            } else {
                b = a.mtype || a.name;
                if (b && a.meta !== !1) {
                    Ext.applyIf(a, h[b]);
                    Ext.applyIf(a, g);
                    this.applyExtraConfig(a);
                    if (a.name === undefined) {
                        a.name = b
                    }
                }
            }
        }
        return e
    },
    generate: function(e) {
        var d = e.fields,
            f = e.defaults,
            c = [],
            a, b;
        for (b in d) {
            if (d.hasOwnProperty(b)) {
                a = {
                    name: b
                };
                Ext.apply(a, d[b], f);
                this.applyExtraConfig(a);
                c[c.length] = a
            }
        }
        return c
    },
    applyExtraConfig: function(a) {
        if (a.inputWidth !== undefined && a.labelWidth !== undefined && a.width === undefined) {
            a.width = a.inputWidth + a.labelWidth + (a.labelPad === undefined ? 5 : a.labelPad)
        }
    }
});
