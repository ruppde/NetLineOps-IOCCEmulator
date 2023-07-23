Ext.define('Alf.MetaManager', { //Alf.meta.manager
    init: function() {
        Alf.MetaManager = new this();
    },
    initComponent: function() {
        Alf.MetaManager = new this();
    },
    getResource: function(c, d) {
        var e = 'meta.' + c.split('.')[0],
            b = c.split('.')[1] || d,
            a = Ext.ClassManager.getByAlias(e);
        if (a && a[b]) {
            this.applyExtends(a[b], a);
            return {
                fields: a[b],
                defaults: Ext.apply({}, a[b + 'Defaults'] || a.defaults)
            }
        }
    },
    applyExtends: function(b, d) {
        var c, a;
        for (c in b) {
            if (b.hasOwnProperty(c)) {
                a = b[c];
                if (a && a.extend) {
                    Ext.applyIf(a, this.getBaseField(a.extend, d));
                    delete a.extend
                }
            }
        }
    },
    getBaseField: function(d, c) {
        var e = d.split('.'),
            b, a;
        if (e.length === 1) {
            if (c && c[d]) {
                b = c;
                a = c[d]
            } else {
                b = Ext.ClassManager.getByAlias('meta.Base');
                a = b[d]
            }
        } else {
            b = Ext.ClassManager.getByAlias('meta.' + e[0]);
            a = b[e[1]]
        }
        if (a.extend) {
            Ext.applyIf(a, this.getBaseField(a.extend, b));
            delete a.extend
        }
        return a
    },
    decorateFields: function(c, d, a) {
        var b = this.getResource(c, 'fields');
        return Alf.meta.Field.decorate(b, d, a)
    },
    generateFields: function(b) {
        var a = this.getResource(b, 'fields');
        return Alf.meta.Field.generate(a)
    },
    useFieldGenerator: function(a) {
        var b = a.metaItems;
        if (Ext.isEmpty(a.items)) {
            a.items = this.generateFields(b)
        } else {
            this.decorateFields(b, a.items)
        }
    },
    generateColumns: function(c, a) {
        var b = this.getResource(c, 'columns');
        return Alf.meta.Column.generate(b, a)
    },
    useColumnGenerator: function(a) {
        var c = a.metaColumns,
            b = Ext.isObject(a.columns) ? a.columns : null;
        if (Ext.isEmpty(a.columns) || b) {
            a.columns = this.generateColumns(c, b)
        } else {}
    }
}, function() {
    Alf.MetaManager = new this();
});
