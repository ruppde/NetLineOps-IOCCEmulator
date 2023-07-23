Ext.define('TimesSquare.view.details.check.RemarksTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    details_check_remarkstab: !0,
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    xtype: 'details_check_remarkstab',
    padding: '10px 5px',
    layout: {
        type: 'table',
        columns: 6
    },
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function(e, d, a, c) {
        var b = this;
        b.defaults = {
            margin: c,
            readOnly: !0
        };
        b.items = [{
            xtype: 'label',
            text: 'State'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'state',
            cls: 'test-id-checkdetail-remarks-state'
        }, {
            xtype: 'label',
            text: 'Workpackage'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'workpackage',
            cls: 'test-id-checkdetail-remarks-workpackage'
        }, {
            xtype: 'label',
            text: 'Hangar'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'hangar',
            cls: 'test-id-checkdetail-remarks-hangar'
        }, {
            xtype: 'label',
            text: 'Remarks'
        }, {
            xtype: 'textarea',
            colspan: 5,
            width: '100%',
            fieldLabel: '',
            name: 'remarks',
            cls: 'test-id-checkdetail-remarks-remarks'
        }, {
            xtype: 'label',
            text: 'Priority'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'priority',
            cls: 'test-id-checkdetail-remarks-priority'
        }]
    }
});
