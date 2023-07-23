Ext.define('Alf.form.field.Grid', {
    extend: 'Ext.grid.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tablepanel: !0,
    gridpanel: !0,
    grid: !0,
    gridfield: !0,
    xtype: 'gridfield',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    enableColumnHide: !1,
    useGetWriteData: !1,
    getValue: function() {
        var c = this.store,
            b = this.filterFn,
            e = this.useGetWriteData,
            d = c.snapshot || c.data,
            a = [];
        if (!d) {
            return null
        }
        d.each(function(c) {
            if (!b || b(c) !== !1) {
                a[a.length] = e ? c.getWriteData() : c.data
            }
        });
        return a
    },
    setValue: function(b) {
        var a = this;
        if (b) {
            a.store.loadData(b)
        } else {
            a.store.removeAll()
        }
        a.fireEvent('change', a, b);
        return a
    },
    checkChange: function() {},
    isDirty: function() {},
    initComponent: function() {
        var a = this;
        if (!a.store && a.model) {
            a.store = Ext.create('Ext.data.Store', {
                proxy: 'memory',
                model: a.model
            })
        }
        if (!a.store && a.fields) {
            a.store = Ext.create('Ext.data.Store', {
                proxy: 'memory',
                fields: a.fields
            })
        }
        Ext.grid.Panel.prototype.initComponent.call(this);
        a.initField()
    }
});
/** }, 0, ['gridfield'], ['component', 'box', 'container', 'panel', 'tablepanel', 'gridpanel', 'grid', 'gridfield'], {
    'component': !0,
    'box': !0,
    'container': !0,
    'panel': !0,
    'tablepanel': !0,
    'gridpanel': !0,
    'grid': !0,
    'gridfield': !0
}, ['widget.gridfield'], [
    ['field', Ext.form.field.Field]
], [Alf.form.field, 'Grid'], 0);*/
