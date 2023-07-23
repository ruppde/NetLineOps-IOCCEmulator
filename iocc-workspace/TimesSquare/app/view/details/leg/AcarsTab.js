Ext.define('TimesSquare.view.details.leg.AcarsTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    details_leg_acarstab: !0,
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    xtype: 'details_leg_acarstab',
    layout: {
        type: 'hbox'
    },
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function(a, c, e, b) {
        var d = this;
        d.items = [{
            xtype: 'fieldset',
            flex: 1,
            cls: 'dwFieldset',
            title: 'Departure',
            margin: '10px 5px',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                margin: b,
                readOnly: !0
            },
            items: [{
                xtype: 'label',
                text: 'From',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                colspan: 4,
                fieldLabel: '',
                width: a,
                name: 'acarsFrom',
                cls: 'test-id-legdetail-acarstab-acarsFrom'
            }, {
                xtype: 'label',
                text: 'State',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                colspan: 4,
                fieldLabel: '',
                name: 'acarsState',
                width: c,
                cls: 'test-id-legdetail-acarstab-acarsState'
            }, {
                xtype: 'label',
                text: 'ACARS Init',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                name: 'acarsInit',
                timeFieldName: 'acarsInitTF',
                cls: 'test-id-legdetail-acarstab-acarsInit'
            }, {
                xtype: 'timefield',
                colspan: 3,
                fieldLabel: '',
                name: 'acarsInitTF',
                cls: 'test-id-legdetail-acarstab-acarsInitTF'
            }, {
                xtype: 'label',
                text: 'Doors Closed',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                name: 'acarsDoorsClosed',
                timeFieldName: 'acarsDoorsClosedTF',
                cls: 'test-id-legdetail-acarstab-acarsDoorsClosed'
            }, {
                xtype: 'timefield',
                colspan: 3,
                fieldLabel: '',
                name: 'acarsDoorsClosedTF',
                cls: 'test-id-legdetail-acarstab-acarsDoorsClosedTF'
            }, {
                xtype: 'label',
                text: 'ED',
                tdAttrs: {
                    style: 'text-align: right'
                },
                margin: '22 6 6 0',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: 'OUT',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTimeDeparture',
                timeFieldName: 'acarsEstimatedTimeDepartureTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTimeDeparture'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTimeDepartureTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTimeDepartureTF'
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: 'OFF',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTakeOffTime',
                timeFieldName: 'acarsEstimatedTakeOffTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTakeOffTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTakeOffTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTakeOffTimeTF'
            }, {
                xtype: 'label',
                text: 'AD',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                name: 'acarsOffblockTime',
                timeFieldName: 'acarsOffblockTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsOffblockTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'acarsOffblockTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsOffblockTimeTF'
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                name: 'acarsAirborneTime',
                timeFieldName: 'acarsAirborneTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsAirborneTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'acarsAirborneTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsAirborneTimeTF'
            }]
        }, {
            xtype: 'fieldset',
            flex: 1,
            cls: 'dwFieldset',
            title: 'Arrival',
            margin: '10px 5px',
            layout: {
                type: 'table',
                columns: 5
            },
            defaults: {
                margin: b,
                readOnly: !0
            },
            items: [{
                xtype: 'label',
                text: 'To',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                colspan: 4,
                fieldLabel: '',
                width: a,
                name: 'acarsTo',
                cls: 'test-id-legdetail-acarstab-acarsTo'
            }, {
                xtype: 'box',
                colspan: 5,
                height: 80
            }, {
                xtype: 'label',
                text: 'EA',
                margin: '22px 6px 6px 0',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: 'ON',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTouchdownTime',
                timeFieldName: 'acarsEstimatedTouchdownTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTouchdownTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTouchdownTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTouchdownTimeTF'
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: 'IN',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTimeArrival',
                timeFieldName: 'acarsEstimatedTimeArrivalTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTimeArrival'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'acarsEstimatedTimeArrivalTF',
                cls: 'test-id-legdetail-acarstab-acarsEstimatedTimeArrivalTF'
            }, {
                xtype: 'label',
                text: 'AA',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                name: 'acarsLandingTime',
                timeFieldName: 'acarsLandingTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsLandingTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'acarsLandingTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsLandingTimeTF'
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                name: 'acarsOnblockTime',
                timeFieldName: 'acarsOnblockTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsOnblockTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'acarsOnblockTimeTF',
                cls: 'test-id-legdetail-acarstab-acarsOnblockTimeTF'
            }]
        }]
    }
});
