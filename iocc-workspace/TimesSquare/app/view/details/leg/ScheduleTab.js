Ext.define('TimesSquare.view.details.leg.ScheduleTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    details_leg_scheduletab: !0,
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    xtype: 'details_leg_scheduletab',
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function(a, e, c, b) {
        var d = this;
        d.items = [{
            xtype: 'fieldset',
            margin: '10px 5px',
            cls: 'dwFieldset',
            title: 'Carriers',
            layout: {
                type: 'table',
                columns: 10
            },
            defaults: {
                margin: b,
                readOnly: !0
            },
            items: [{
                xtype: 'label',
                text: 'Empl. Cockpit',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                colspan: 2,
                name: 'employerCockpit',
                width: a,
                cls: 'test-id-legdetail-scheduletab-employerCockpit'
            }, {
                xtype: 'label',
                text: 'Empl. Cabin',
                width: a * 2 + 6,
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                colspan: 6,
                name: 'employerCabin',
                width: a,
                cls: 'test-id-legdetail-scheduletab-employerCabin'
            }, {
                xtype: 'label',
                text: 'Operating',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                colspan: 2,
                name: 'operatingCarrier',
                width: a,
                cls: 'test-id-legdetail-scheduletab-operatingCarrier'
            }, {
                xtype: 'label',
                text: 'Commercial',
                width: a * 2 + 6,
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                colspan: 1,
                name: 'commercialCarrier',
                width: a,
                cls: 'test-id-legdetail-scheduletab-commercialCarrier'
            }, {
                xtype: 'label',
                text: 'Dispatch Office',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                colspan: 4,
                name: 'dispatchOffice',
                width: c
            }, {
                xtype: 'label',
                text: 'Joint Ops',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'mappingfieldcontainer',
                name: 'jointOperator',
                colspan: 9,
                layout: {
                    type: 'table',
                    columns: 3
                },
                margin: 0,
                defaults: {
                    margin: b,
                    readOnly: !0
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '',
                    name: '',
                    width: a,
                    dataIndex: 0
                }, {
                    xtype: 'textfield',
                    fieldLabel: '',
                    name: '',
                    width: a,
                    dataIndex: 1
                }, {
                    xtype: 'textfield',
                    fieldLabel: '',
                    colspan: 2,
                    name: '',
                    width: a,
                    dataIndex: 2
                }]
            }, {
                xtype: 'component',
                colspan: 10,
                margin: 0,
                height: 7
            }, {
                xtype: 'label',
                text: 'Change Reason',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                colspan: 9,
                name: 'changeReason',
                width: a * 4 + 6.4 * 3,
                cls: 'test-id-legdetail-scheduletab-changeReason'
            }, {
                xtype: 'label',
                text: 'Initial Subtype',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                name: 'initialSubtype',
                tdAttrs: {
                    style: 'text-align: right'
                },
                width: a,
                cls: 'test-id-legdetail-scheduletab-initialSubtype'
            }]
        }]
    }
});
