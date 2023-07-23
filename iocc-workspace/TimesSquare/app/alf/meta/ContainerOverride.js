Ext.define('Alf.meta.ContainerOverride', {
    override: 'Ext.container.Container',
    initItems: function() {
        var a = this;
        if (a.metaItems) {
            Alf.MetaManager.useFieldGenerator(a)
        }
        return arguments.callee.$previous.apply(this, arguments)
    }
});
