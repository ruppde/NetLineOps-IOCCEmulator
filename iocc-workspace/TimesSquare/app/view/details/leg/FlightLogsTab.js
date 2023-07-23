Ext.define('TimesSquare.view.details.leg.FlightLogsTab', {
    extend: 'Ext.form.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    xtype: 'details_leg_flightlogtab',
    alias: 'details_leg_flightlogtab',
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    layout: {
        type: 'vbox'
    },
    cls: 'flight-log-tab',
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.form.Panel.prototype.initComponent.apply(this, arguments)
    },
    createItems: function(e, c, d, a) {
        var b = this;
        b.items = [{
            xtype: 'fieldset',
            flex: 1,
            cls: 'dwFieldset',
            title: 'General',
            margin: '10px 2px',
            width: '100%',
            layout: 'hbox',
            defaults: {
                margin: a,
                readOnly: !0
            },
            items: [{
                xtype: 'textfield',
                name: 'flRefNo',
                fieldLabel: 'Ref No',
                labelWidth: 50,
                width: 100
            }, {
                xtype: 'checkbox',
                name: 'checkedByLog',
                margin: '0 0 0 50',
                boxLabel: 'checked By Log',
                boxLabelAlign: 'after'
            }]
        }, {
            xtype: 'container',
            width: '100%',
            border: !1,
            layout: 'hbox',
            items: [b.createDelayTable(!0, a), b.createDelayTable(!1, a)]
        }, {
            xtype: 'fieldset',
            cls: 'dwFieldset',
            title: 'Miscellaneous',
            margin: '10px 2px',
            width: '100%',
            layout: 'hbox',
            defaults: {
                readOnly: !0,
                margin: '10px 2px'
            },
            items: Ext.Array.merge({
                xtype: 'box',
                flex: 1
            }, b.createMiscellaneousTable(a))
        }]
    },
    createMiscellaneousTable: function(a) {
        return {
            xtype: 'container',
            flex: 1,
            cls: 'miscellaneous-table',
            border: !1,
            layout: {
                type: 'table',
                columns: 6,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                xtype: 'box',
                margin: a,
                readOnly: !0,
                cellCls: 'normal-cell'
            },
            items: [{
                html: '',
                cellCls: 'left-label'
            }, {
                html: 'Flight Times',
                colspan: 2
            }, {
                html: 'Instr. Flight time',
                colspan: 3
            }, {
                html: '',
                cellCls: 'left-label'
            }, {
                html: '(min)'
            }, {
                html: '(dec)'
            }, {
                colspan: 3
            }, {
                html: 'Block',
                cellCls: 'left-label'
            }, {
                xtype: 'textfield',
                name: 'blockFlightTimeMin'
            }, {
                xtype: 'textfield',
                name: 'blockFlightTimeDec'
            }, {
                xtype: 'textfield',
                name: 'instrFlightTime'
            }, {
                colspan: 2
            }, {
                html: 'Air',
                cellCls: 'left-label'
            }, {
                xtype: 'textfield',
                name: 'airFlightTimeMin'
            }, {
                xtype: 'textfield',
                name: 'airFlightTimeDec'
            }, {
                colspan: 3
            }, {
                html: '',
                cellCls: 'left-label'
            }, {
                html: 'Cycles'
            }, {
                html: 'Touch And Go',
                colspan: 4
            }, {
                html: '',
                cellCls: 'left-label'
            }, {
                xtype: 'textfield',
                name: 'cycles'
            }, {
                xtype: 'textfield',
                name: 'touchAndGo'
            }, {
                colspan: 2
            }]
        }
    },
    createDelayTable: function(a, d) {
        var b = this,
            c = a ? {
                xtype: 'box',
                height: 24,
                colspan: 5
            } : [{
                xtype: 'box',
                html: 'To',
                cellCls: 'x-form-item-label-right'
            }, {
                xtype: 'textfield',
                name: 'arrivalAirport',
                width: 60,
                colspan: 4
            }];
        return {
            xtype: 'fieldset',
            flex: 1,
            margin: '10px 5px',
            padding: '0 0 0 10',
            title: a ? 'Departure' : 'Arrival',
            cls: (a ? 'departure-ad' : 'arrival-aa') + ' dwFieldset',
            layout: {
                type: 'table',
                columns: 5,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                margin: d,
                readOnly: !0
            },
            items: Ext.Array.merge(c, {
                xtype: 'box',
                cellCls: 'left-label'
            }, {
                xtype: 'box',
                html: a ? 'Off Block' : 'Touch Down',
                colspan: 2
            }, {
                xtype: 'box',
                html: a ? 'Take Off' : 'On Block',
                colspan: 2
            }, {
                xtype: 'box',
                cellCls: 'left-label',
                html: a ? 'AD' : 'AA'
            }, {
                xtype: 'datefield',
                cellCls: a ? 'offblock-date' : 'touchdown-date',
                name: a ? 'offblockDate' : 'touchdownDate',
                format: 'dMy',
                width: 70
            }, {
                xtype: 'timefield',
                cellCls: a ? 'offblock-time' : 'touchdown-time',
                name: a ? 'offblockTime' : 'touchdownTime',
                format: 'H:i',
                width: 45
            }, {
                xtype: 'datefield',
                cellCls: a ? 'takeoff-date' : 'onblock-date',
                name: a ? 'takeoffDate' : 'onblockDate',
                format: 'dMy',
                width: 70
            }, {
                xtype: 'timefield',
                cellCls: a ? 'takeoff-time' : 'onblock-time',
                name: a ? 'takeoffTime' : 'onblockTime',
                format: 'H:i',
                width: 45
            }, {
                xtype: 'fieldset',
                colspan: 5,
                title: a ? 'Departure Delays' : 'Arrival Delays',
                layout: 'vbox',
                name: a ? 'departureDelayCodeTale' : 'arrivalDelayCodeTable',
                margin: 0,
                cls: 'dwFieldset',
                items: Ext.Array.merge(b.createDelayCodeTableGrid(a), b.createDelayCodeTableSumRow(a))
            })
        }
    },
    createDelayCodeTableGrid: function(b) {
        var a = TimesSquare.app.getController('gantt.Gantt'),
            d = 'com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.EFF_DATE_RANGE_DELAY_CODE',
            c = a && a.parameterList && a.parameterList[d] === 'true' || !1;
        return {
            xtype: 'details_leg_delaysgrid',
            colspan: 4,
            width: '100%',
            name: b ? 'mergedDepartureDelays' : 'mergedArrivalDelays',
            fields: Ext.Array.merge(b ? ['delayCode', 'subDelayCode', 'delayTime', 'delayImputation', 'delayReason', 'irregularities.delayCode', 'irregularities.delayReason'] : ['delayCode', 'delayTime', 'delayImputation', 'delayReason', 'irregularities.delayCode', 'irregularities.delayReason'], c ? ['delayResponsibilityCode', 'delayResponsibilityDescription'] : []),
            height: 130
        }
    },
    createDelayCodeTableSumRow: function(a) {
        return {
            xtype: 'textfield',
            name: a ? 'departureTotal' : 'arrivalTotal',
            readOnly: !0,
            margin: '5 0 0 0',
            width: a ? 145 : 95,
            labelWidth: a ? 98 : 48,
            labelAlign: 'right',
            labelSeparator: '',
            fieldLabel: 'Total'
        }
    },
    loadRecord: function(d) {
        var a = this,
            c = a.getForm(),
            b = d.getCalculatedFieldValues();
        a.down('[name=arrivalDelayCodeTable]')[b.hasArrivalDelays ? 'show' : 'hide']();
        c.reset(!0);
        c.setValues(b);
        Ext.form.Panel.prototype.loadRecord.apply(this, arguments);
        a.items.each(function(a) {
            a.show()
        })
    }
});
