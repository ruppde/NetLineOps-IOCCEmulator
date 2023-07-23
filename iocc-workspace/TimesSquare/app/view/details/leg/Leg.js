Ext.define('TimesSquare.view.details.leg.Leg', {
    extend: 'TimesSquare.view.details.DetailPanel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    details_detailpanel: !0,
    details_leg_leg: !0,
    xtype: 'details_leg_leg',
    title: 'Leg Details',
    modelName: 'Leg',
    constructor: function() {
        this.detailType = TimesSquare.model.IdFactory.TYPE.LEG;
        return TimesSquare.view.details.DetailPanel.prototype.constructor.apply(this, arguments)
    },
    afterModelLoadedIntoForm: function(a, e) {
        var c = a.down('#legDetailCrewTab'),
            f = a.down('#legDetailsAcarsTab'),
            d = a.down('#legDetailFlightLogTab'),
            b = a.down('details_leg_tabs');
        a.resetToDefaultState();
        if (!e.getCrewDetailUrl()) {
            if (!c.disabled) {
                c.setDisabled(!0)
            }
        } else {
            if (c.disabled) {
                c.setDisabled(!1)
            }
        }
        if (b) {
            if (d) {
                b.remove(d)
            }
            if (e.getFlightLogUrl()) {
                b.insert(b.items.indexOf(f) + 1, {
                    title: 'Flightlog',
                    xtype: 'details_leg_flightlogtab',
                    itemId: 'legDetailFlightLogTab'
                })
            }
        }
    },
    resetToDefaultState: function() {
        var a = this;
        a.down('details_leg_tabs').setActiveTab(1)
    },
    createItems: function(d, a, c, e, b) {
        var f = this;
        f.items = [{
            xtype: 'container',
            defaults: {
                margin: e,
                readOnly: !0
            },
            layout: {
                type: 'table',
                columns: 12
            },
            items: [{
                xtype: 'label',
                text: 'Flight',
                style: b
            }, {
                xtype: 'textfield',
                colspan: 1,
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                width: a,
                name: 'flight',
                cls: 'test-id-legdetail-flight'
            }, {
                xtype: 'datefield',
                fieldLabel: '&nbsp;',
                colspan: 3,
                labelSeparator: '',
                labelAlign: 'top',
                hideTrigger: !0,
                name: 'flightDoo',
                cls: 'test-id-legdetail-flightDoo'
            }, {
                xtype: 'textfield',
                colspan: 3,
                fieldLabel: 'Call Sign',
                labelAlign: 'top',
                width: a,
                name: 'callSign',
                cls: 'test-id-legdetail-callSign'
            }, {
                xtype: 'textfield',
                colspan: 2,
                fieldLabel: 'Service',
                labelAlign: 'top',
                name: 'serviceType',
                width: d,
                cls: 'test-id-legdetail-serviceType'
            }, {
                xtype: 'textfield',
                fieldLabel: 'State',
                labelAlign: 'top',
                name: 'state',
                width: d,
                cls: 'test-id-legdetail-state'
            }, {
                xtype: 'textfield',
                colspan: 1,
                fieldLabel: 'Problem',
                labelAlign: 'top',
                name: 'problem',
                width: c,
                cls: 'test-id-legdetail-problem'
            }, {
                xtype: 'label',
                text: 'Departure',
                style: b
            }, {
                xtype: 'textfield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'departureAirport',
                width: a,
                cls: 'test-id-legdetail-departureAirport'
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: 'UTC',
                labelAlign: 'top',
                name: 'departure',
                timeFieldName: 'departureTime',
                cls: 'test-id-legdetail-departure'
            }, {
                xtype: 'timefield',
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'departureTime',
                cls: 'test-id-legdetail-departureTime'
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: 'Local Airport',
                labelAlign: 'top',
                name: 'localDeparture',
                timeFieldName: 'localDepartureTime',
                cls: 'test-id-legdetail-localDeparture'
            }, {
                xtype: 'timefield',
                colspan: 1,
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'localDepartureTime',
                cls: 'test-id-legdetail-localDepartureTime'
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: 'Best Time',
                labelAlign: 'top',
                name: 'bestDepartureTime',
                timeFieldName: 'bestDepartureTimeFT',
                cls: 'test-id-legdetail-bestDepartureTime'
            }, {
                xtype: 'timefield',
                colspan: 1,
                fieldLabel: '&nbsp;',
                labelSeparator: '',
                labelAlign: 'top',
                name: 'bestDepartureTimeFT',
                cls: 'test-id-legdetail-bestDepartureTimeFT'
            }, {
                xtype: 'box',
                colspan: 1
            }, {
                xtype: 'label',
                text: 'Arrival'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                name: 'arrivalAirport',
                width: a,
                cls: 'test-id-legdetail-arrivalAirport'
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'arrival',
                timeFieldName: 'arrivalTime',
                cls: 'test-id-legdetail-arrival'
            }, {
                xtype: 'timefield',
                fieldLabel: '',
                name: 'arrivalTime',
                cls: 'test-id-legdetail-arrivalTime'
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'localArrival',
                timeFieldName: 'localArrivalTime',
                cls: 'test-id-legdetail-localArrival'
            }, {
                xtype: 'timefield',
                colspan: 1,
                fieldLabel: '',
                name: 'localArrivalTime',
                cls: 'test-id-legdetail-localArrivalTime'
            }, {
                xtype: 'datefield',
                colspan: 2,
                hideTrigger: !0,
                fieldLabel: '',
                name: 'bestArrivalTime',
                timeFieldName: 'bestArrivalTimeTF',
                cls: 'test-id-legdetail-bestArrivalTime'
            }, {
                xtype: 'timefield',
                colspan: 1,
                fieldLabel: '',
                name: 'bestArrivalTimeTF',
                cls: 'test-id-legdetail-bestArrivalTimeTF'
            }, {
                xtype: 'box',
                colspan: 1
            }, {
                xtype: 'label',
                text: 'Aircraft',
                style: b
            }, {
                xtype: 'textfield',
                fieldLabel: 'Owner',
                labelAlign: 'top',
                name: 'aircraftOwner',
                width: a,
                cls: 'test-id-legdetail-aircraftOwner'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Subtype',
                labelAlign: 'top',
                name: 'aircraftSubtype',
                width: a,
                cls: 'test-id-legdetail-aircraftSubtype'
            }, {
                xtype: 'textfield',
                colspan: 2,
                fieldLabel: 'Registration',
                labelAlign: 'top',
                name: 'registration',
                width: a,
                cls: 'test-id-legdetail-registration'
            }, {
                xtype: 'textfield',
                colspan: 3,
                fieldLabel: 'Version',
                labelAlign: 'top',
                name: 'aircraftConfiguration',
                width: a,
                cls: 'test-id-legdetail-aircraftConfiguration'
            }, {
                xtype: 'textfield',
                colspan: 3,
                fieldLabel: 'PRBD',
                labelAlign: 'top',
                name: 'prbd',
                width: c,
                cls: 'test-id-legdetail-prbd'
            }, {
                xtype: 'textfield',
                colspan: 1,
                fieldLabel: 'Rotation',
                labelAlign: 'top',
                name: 'rotation',
                width: a,
                cls: 'test-id-legdetail-rotation'
            }]
        }, {
            xtype: 'details_leg_tabs',
            margin: '15px 0 0 0'
        }]
    }
});
