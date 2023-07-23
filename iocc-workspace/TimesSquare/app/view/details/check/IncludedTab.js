Ext.define('TimesSquare.view.details.check.IncludedTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    details_check_includedtab: !0,
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    xtype: 'details_check_includedtab',
    padding: '10px 5px',
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function() {
        var a = this;
        a.defaults = {
            readOnly: !0
        };
        a.items = [{
            xtype: 'textarea',
            fieldLabel: 'Included',
            labelAlign: 'top',
            width: '100%',
            name: 'checkIncluded',
            cls: 'test-id-checkdetail-included-includedChecks'
        }]
    }
});
