Ext.define('TimesSquare.view.details.check.EquipmentTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    details_check_equipmenttab: !0,
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    xtype: 'details_check_equipmenttab',
    
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function(e, b, d, a) {
        var c = this;
        c.items = [{
            xtype: 'container',
            margin: '10px 5px',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    margin: a,
                    readOnly: !0
                },
                items: [{
                    xtype: 'label',
                    text: 'Orig. Registration'
                }, {
                    xtype: 'textfield',
                    fieldLabel: '',
                    width: b,
                    name: 'origRegistration',
                    cls: 'test-id-checkdetail-equipment-origRegistration'
                }]
            }, {
                xtype: 'container',
                layout: 'vbox',
                defaults: {
                    margin: a,
                    readOnly: !0
                },
                items: [{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Deicing',
                    boxLabel: '',
                    name: 'deicing',
                    cls: 'test-id-checkdetail-equipment-deicing'
                }, {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Engine Run',
                    boxLabel: '',
                    name: 'engineRun',
                    cls: 'test-id-checkdetail-equipment-engineRun'
                }, {
                    xtype: 'checkboxfield',
                    fieldLabel: 'ETOPS Prohibit',
                    boxLabel: '',
                    name: 'etopsProhibit',
                    cls: 'test-id-checkdetail-equipment-etopsProhibit'
                }]
            }]
        }]
    }
});
