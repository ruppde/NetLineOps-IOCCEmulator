Ext.define('TimesSquare.view.details.leg.RemarksTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    widget: 'details_leg_remarkstab',
    xtype: 'details_leg_remarkstab',
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    layout: {
        type: 'fit'
    },
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function(e, c, d, a) {
        var b = this;
        b.items = {
            xtype: 'fieldset',
            cls: 'dwFieldset',
            title: 'Remarks',
            margin: '10px 5px',
            layout: {
                type: 'table',
                columns: 6,
                tableAttrs: {
                    width: '99%'
                }
            },
            defaults: {
                margin: a,
                readOnly: !0
            },
            items: [{
                xtype: 'label',
                text: 'Internal',
                forId: 'id-legdetail-remarks-internal',
                cellCls: 'details-ceiling-label-cell'
            }, {
                xtype: 'textarea-optional',
                colspan: 5,
                width: '100%',
                fieldLabel: '',
                name: 'internalRemark',
                cls: 'test-id-legdetail-remarks-internal',
                id: 'id-legdetail-remarks-internal'
            }, {
                xtype: 'label',
                text: 'Ops',
                cellCls: 'details-ceiling-label-cell'
            }, {
                xtype: 'textarea',
                colspan: 5,
                width: '100%',
                fieldLabel: '',
                name: 'opsRemark',
                cls: 'test-id-checkdetail-remarks-remarks'
            }, {
                xtype: 'label',
                text: 'Marker',
                cellCls: 'details-ceiling-label-cell'
            }, {
                xtype: 'leg-details-user-markers',
                name: 'userMarkers',
                cls: 'test-id-checkdetail-remarks-markers',
                columns: 1
            }]
        }
    }
});
