Ext.define('TimesSquare.view.details.check.Check', {
    extend: 'TimesSquare.view.details.DetailPanel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    details_detailpanel: !0,
    details_check_check: !0,
    title: 'Check Details',
    modelName: 'Check',
    xtype: 'details_check_check',
    constructor: function() {
        this.detailType = TimesSquare.model.IdFactory.TYPE.CHECK;
        return TimesSquare.view.details.DetailPanel.prototype.constructor.apply(this, arguments)
    },
    createItems: function(c, b, a, d) {
        var e = this;
        e.items = [{
            xtype: 'container',
            defaults: {
                margin: d,
                readOnly: !0
            },
            layout: {
                type: 'table',
                columns: 7
            },
            items: [{
                xtype: 'label',
                text: 'Code'
            }, {
                xtype: 'textfield',
                colspan: 2,
                fieldLabel: '',
                width: a,
                name: 'code',
                cls: 'test-id-checkdetail-code'
            }, {
                xtype: 'label',
                text: 'Sequential'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: c,
                name: 'sequentialCode',
                cls: 'test-id-checkdetail-sequentialCode'
            }, {
                xtype: 'label',
                text: 'Carried Out'
            }, {
                xtype: 'checkboxfield',
                fieldLabel: '',
                boxLabel: '',
                name: 'carriedOut',
                cls: 'test-id-checkdetail-carriedOut'
            }, {
                xtype: 'label',
                text: 'Begin'
            }, {
                xtype: 'datefield',
                fieldLabel: '',
                hideTrigger: !0,
                name: 'begin',
                timeFieldName: 'beginTF',
                cls: 'test-id-checkdetail-begin'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'beginTF',
                cls: 'test-id-checkdetail-beginTF'
            }, {
                xtype: 'label',
                text: 'Airport'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                name: 'airport',
                cls: 'test-id-checkdetail-airport'
            }, {
                xtype: 'label',
                text: 'Min. Assemble Time'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                name: 'minAssembleTime',
                cls: 'test-id-checkdetail-minAssembleTime'
            }, {
                xtype: 'label',
                text: 'End'
            }, {
                xtype: 'datefield',
                fieldLabel: '',
                hideTrigger: !0,
                name: 'end',
                timeFieldName: 'endTF',
                cls: 'test-id-checkdetail-end'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'endTF',
                cls: 'test-id-checkdetail-endTF'
            }, {
                xtype: 'label',
                text: 'Duration'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                name: 'duration',
                cls: 'test-id-checkdetail-duration'
            }, {
                xtype: 'label',
                text: 'Default Duration'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                name: 'defaultDuration',
                cls: 'test-id-checkdetail-defaultDuration'
            }, {
                xtype: 'label',
                text: 'Aircraft'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Owner',
                labelAlign: 'top',
                width: b,
                name: 'owner',
                cls: 'test-id-checkdetail-equipment-owner'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Subtype',
                labelAlign: 'top',
                width: b,
                name: 'subtype',
                cls: 'test-id-checkdetail-equipment-subtype'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Registration',
                labelAlign: 'top',
                width: b,
                name: 'registration',
                cls: 'test-id-checkdetail-equipment-registration'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Logical No.',
                labelAlign: 'top',
                width: b,
                name: 'logicalNo',
                cls: 'test-id-checkdetail-equipment-logicalNo'
            }]
        }, {
            xtype: 'details_checks_tabs',
            margin: '15px 0 0 0'
        }]
    }
});
