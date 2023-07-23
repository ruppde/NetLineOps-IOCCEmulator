Ext.define('TimesSquare.view.common.MappingFieldContainer', {
    component: !0,
    box: !0,
    //container: !0,
    fieldcontainer: !0,
    mappingfieldcontainer: !0,
    xtype: 'mappingfieldcontainer',
    alias: 'mappingfieldcontainer',
    extend: 'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    name: '',
    setValue: function(b) {
        var d = this,
            c = d.items,
            a;
        c.each(function(c) {
            a = null;
            if (!b || !c.setValue || !c.hasOwnProperty('dataIndex') && !c.hasOwnProperty('dataProperty')) {
                return !0
            }
            if (c.hasOwnProperty('dataIndex')) {
                a = b[c.dataIndex] || null
            }
            if (c.dataProperty) {
                if (!a) {
                    a = b[c.dataProperty] || null
                } else {
                    a = a[c.dataProperty] || null
                }
            }
            c.setValue(a)
        });
        return this
    }
});
/*}, ['widget.mappingfieldcontainer'], [
    ['field', Ext.form.field.Field]
], [TimesSquare.view.common, 'MappingFieldContainer'], 0);**/
