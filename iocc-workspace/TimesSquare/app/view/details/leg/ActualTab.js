Ext.define('TimesSquare.view.details.leg.ActualTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    details_leg_actualtab: !0,
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    xtype: 'details_leg_actualtab',
    layout: {
        type: 'hbox'
    },
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function(a, h, i, d, c) {
        var g = this,
            b = TimesSquare.app.getController('gantt.Gantt'),
            f = 'com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.EFF_DATE_RANGE_DELAY_CODE',
            e = b && b.parameterList && b.parameterList[f] === 'true' || !1;
        g.items = [{
            xtype: 'fieldset',
            width: '55%',
            cls: 'dwFieldset',
            title: 'Departure',
            margin: '10 5',
            layout: {
                type: 'table',
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                },
                columns: 9
            },
            defaults: {
                margin: d,
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
                colspan: 8,
                fieldLabel: '',
                width: a,
                name: 'actualFrom',
                cls: 'test-id-legdetail-actualtab-actualFrom'
            }, {
                xtype: 'label',
                text: 'NI',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'adviseTime',
                timeFieldName: 'adviseTimeTF',
                cls: 'test-id-legdetail-actualtab-adviseTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'adviseTimeTF',
                cls: 'test-id-legdetail-actualtab-adviseTimeTF'
            }, {
                xtype: 'box',
                colspan: 1
            }, {
                xtype: 'label',
                text: 'Taxi Out',
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
                name: 'taxiOut',
                width: a,
                cls: 'test-id-legdetail-actualtab-taxiOut'
            }, {
                xtype: 'label',
                text: 'ED',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: Ext.apply({
                    display: 'inline-block'
                }, c)
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: 'Off Block',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'estimatedTimeDeparture',
                timeFieldName: 'estimatedTimeDepartureTF',
                cls: 'test-id-legdetail-actualtab-estimatedTimeDeparture'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'estimatedTimeDepartureTF',
                cls: 'test-id-legdetail-actualtab-estimatedTimeDepartureTF'
            }, {
                xtype: 'box',
                colspan: 1
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: 'Take Off',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'mvtEstimatedTakeOffTime',
                timeFieldName: 'mvtEstimatedTakeOffTimeTF',
                cls: 'test-id-legdetail-actualtab-mvtEstimatedTakeOffTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'mvtEstimatedTakeOffTimeTF',
                cls: 'test-id-legdetail-actualtab-mvtEstimatedTakeOffTimeTF'
            }, {
                xtype: 'checkboxfield',
                fieldLabel: '',
                boxLabel: 'ISK',
                name: 'isk',
                cls: 'test-id-legdetail-actualtab-isk',
                margin: '22 25 6 0'
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
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'offblockTime',
                timeFieldName: 'offblockTimeTF',
                cls: 'test-id-legdetail-actualtab-offblockTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'offblockTimeTF',
                cls: 'test-id-legdetail-actualtab-offblockTimeTF'
            }, {
                xtype: 'box',
                colspan: 1
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'airborneTime',
                timeFieldName: 'airborneTimeTF',
                cls: 'test-id-legdetail-actualtab-airborneTime'
            }, {
                xtype: 'timefield',
                colspan: 2,
                fieldLabel: '',
                name: 'airborneTimeTF',
                cls: 'test-id-legdetail-actualtab-airborneTimeTF'
            }, {
                xtype: 'label',
                text: 'MAP',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'mvtAfterPushbackTime',
                timeFieldName: 'mvtAfterPushbackTimeTF',
                cls: 'test-id-legdetail-actualtab-mvtAfterPushbackTime'
            }, {
                xtype: 'timefield',
                colspan: 6,
                fieldLabel: '',
                name: 'mvtAfterPushbackTimeTF',
                cls: 'test-id-legdetail-actualtab-mvtAfterPushbackTimeTF'
            }, {
                xtype: 'fieldset',
                colspan: 9,
                cls: 'dwFieldset',
                title: 'Departure Delays',
                margin: '0px 0px 5px 0px',
                items: [{
                    xtype: 'details_leg_delaysgrid',
                    name: 'delay',
                    fields: Ext.Array.merge(['delayCode', 'subDelayCode', 'delayTime'], e ? ['delayResponsibilityCode', 'delayResponsibilityDescription'] : []),
                    height: 130
                }]
            }, {
                xtype: 'label',
                text: 'TO Delay',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                labelAlign: 'top',
                width: a,
                name: 'toDelayCode',
                cls: 'test-id-legdetail-actualtab-toDelayCode'
            }, {
                xtype: 'textfield',
                colspan: 1,
                fieldLabel: '',
                labelAlign: 'top',
                width: a,
                name: 'toDelayTime',
                cls: 'test-id-legdetail-actualtab-toDelayTime'
            }, {
                xtype: 'box',
                colspan: 6
            }, {
                xtype: 'box',
                colspan: 9,
                height: 26
            }, {
                xtype: 'label',
                text: 'Position/Gate',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                name: 'depStand',
                cls: 'test-id-legdetail-actualtab-depStand'
            }, {
                xtype: 'textfield',
                colspan: 7,
                fieldLabel: '',
                width: a,
                name: 'depGate',
                cls: 'test-id-legdetail-actualtab-depGate'
            }]
        }, {
            xtype: 'fieldset',
            width: '45%',
            cls: 'dwFieldset',
            title: 'Arrival',
            margin: '10 5',
            layout: {
                type: 'table',
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                },
                columns: 6
            },
            defaults: {
                margin: d,
                readOnly: !0
            },
            items: [{
                xtype: 'label',
                text: 'To',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                colspan: 5,
                name: 'actualTo',
                width: a,
                cls: 'test-id-legdetail-actualtab-actualTo'
            }, {
                xtype: 'label',
                text: 'EET',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                name: 'eet',
                width: a,
                cls: 'test-id-legdetail-actualtab-eet'
            }, {
                xtype: 'label',
                text: 'Taxi In',
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                colspan: 3,
                fieldLabel: '',
                width: a,
                name: 'taxiIn',
                cls: 'test-id-legdetail-actualtab-taxiIn'
            }, {
                xtype: 'label',
                text: 'EA',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: Ext.apply({
                    display: 'inline-block'
                }, c)
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: 'Touch Down',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'mvtEstimatedTouchdownTime',
                timeFieldName: 'mvtEstimatedTouchdownTimeTF',
                cls: 'test-id-legdetail-actualtab-mvtEstimatedTouchdownTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'mvtEstimatedTouchdownTimeTF',
                cls: 'test-id-legdetail-actualtab-mvtEstimatedTouchdownTimeTF'
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: 'On Block',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'estimatedTimeArrival',
                timeFieldName: 'estimatedTimeArrivalTF',
                cls: 'test-id-legdetail-actualtab-estimatedTimeArrival'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'estimatedTimeArrivalTF',
                cls: 'test-id-legdetail-actualtab-estimatedTimeArrivalTF'
            }, {
                xtype: 'label',
                text: 'AA',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'landingTime',
                timeFieldName: 'landingTimeTF',
                cls: 'test-id-legdetail-actualtab-landingTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'landingTimeTF',
                cls: 'test-id-legdetail-actualtab-landingTimeTF'
            }, {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                name: 'onblockTime',
                timeFieldName: 'onblockTimeTF',
                cls: 'test-id-legdetail-actualtab-onblockTime'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'onblockTimeTF',
                cls: 'test-id-legdetail-actualtab-onblockTimeTF'
            }, {
                xtype: 'box',
                colspan: 6,
                height: 189
            }, {
                xtype: 'label',
                text: 'DIV/RR/FR Reason',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                colspan: 5,
                fieldLabel: '',
                name: 'diversionReason',
                width: a,
                cls: 'test-id-legdetail-actualtab-diversionReason'
            }, {
                xtype: 'label',
                text: 'Fh/Cycles',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                name: 'flightHours',
                width: a,
                cls: 'test-id-legdetail-actualtab-flightHours'
            }, {
                xtype: 'textfield',
                colspan: 4,
                fieldLabel: '',
                width: a,
                name: 'cycles',
                cls: 'test-id-legdetail-actualtab-cycles'
            }, {
                xtype: 'label',
                text: 'Position/Gate',
                tdAttrs: {
                    style: 'text-align: right'
                },
                style: {
                    display: 'inline-block'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                name: 'arrStand',
                width: a,
                cls: 'test-id-legdetail-actualtab-arrStand'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                colspan: 4,
                name: 'arrGate',
                width: a,
                cls: 'test-id-legdetail-actualtab-arrGate'
            }]
        }]
    }
});
