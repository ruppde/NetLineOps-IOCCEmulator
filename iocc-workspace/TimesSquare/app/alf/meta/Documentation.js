Ext.define('Alf.meta.Documentation', {
    singleton: !0,
    tpl: ['<h1>{reourceName}</h1>', '<tpl for="fields">', '<h1>{fieldLabel}<h1>', '<p>Details of the field...</tpl>', '</tpl>'],
    generate: function(a) {}
});
