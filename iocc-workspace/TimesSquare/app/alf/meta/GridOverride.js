Ext.define('Alf.meta.GridOverride', {
    override: 'Ext.grid.Panel',
    initComponent: function() {
        var a = this;
        if (a.metaColumns) {
            Alf.MetaManager.useColumnGenerator(a)
        }
        return (arguments.callee.$previous || Ext.panel.Table.prototype.initComponent).apply(this, arguments)
    }
});
