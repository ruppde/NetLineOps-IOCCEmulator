Ext.define('TimesSquare.view.details.aircraft.BasicTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    details_aircraft_basictab: !0,
    xtype: 'details_aircraft_basictab',
    padding: '10px 5px',
    layout: {
        type: 'table',
        columns: 7
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
            text: 'Operator'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'operator',
            cls: 'test-id-aircraftdetail-basic-operator'
        }, {
            xtype: 'label',
            text: 'Restriction'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'apRestriction',
            cls: 'test-id-aircraftdetail-basic-apRestriction'
        }, {
            xtype: 'label',
            text: 'Weight'
        }, {
            xtype: 'numberfield',
            fieldLabel: '',
            width: a,
            name: 'weight',
            cls: 'test-id-aircraftdetail-basic-weight'
        }, {
            xtype: 'label',
            text: 'Kg'
        }, {
            xtype: 'label',
            text: 'Index'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'acIndex',
            cls: 'test-id-aircraftdetail-basic-acIndex'
        }, {
            xtype: 'label',
            text: 'Call Sign'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'callSign',
            cls: 'test-id-aircraftdetail-basic-callSign'
        }, {
            xtype: 'label',
            text: 'MTOW'
        }, {
            xtype: 'numberfield',
            fieldLabel: '',
            width: a,
            name: 'mtow',
            cls: 'test-id-aircraftdetail-basic-mtow'
        }, {
            xtype: 'label',
            text: 'Kg'
        }, {
            xtype: 'label',
            text: 'Logical No.'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'logicalNo',
            cls: 'test-id-aircraftdetail-basic-logicalNo'
        }, {
            xtype: 'label',
            text: 'Radio'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'radio',
            cls: 'test-id-aircraftdetail-basic-radio'
        }, {
            xtype: 'label',
            text: 'Cargo Cap.'
        }, {
            xtype: 'numberfield',
            fieldLabel: '',
            width: a,
            name: 'cargoCapacity',
            cls: 'test-id-aircraftdetail-basic-cargoCapacity'
        }, {
            xtype: 'label',
            text: 'Kg'
        }, {
            xtype: 'label',
            text: 'State'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'state',
            cls: 'test-id-aircraftdetail-basic-state'
        }, {
            xtype: 'label',
            text: 'ACARS'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'acars',
            cls: 'test-id-aircraftdetail-basic-acars'
        }, {
            xtype: 'label',
            text: 'Fuel Cap.'
        }, {
            xtype: 'numberfield',
            fieldLabel: '',
            width: a,
            name: 'fuelCapacity',
            cls: 'test-id-aircraftdetail-basic-fuelCapacity'
        }, {
            xtype: 'label',
            text: 'Kg'
        }, {
            xtype: 'label',
            text: 'Noise Factor'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'noiseFactor',
            cls: 'test-id-aircraftdetail-basic-noiseFactor'
        }, {
            xtype: 'label',
            text: 'Phone'
        }, {
            xtype: 'textfield',
            fieldLabel: '',
            width: a,
            name: 'phone',
            cls: 'test-id-aircraftdetail-basic-phone'
        }, {
            xtype: 'label',
            text: 'Avg. Fuel Cons.'
        }, {
            xtype: 'numberfield',
            fieldLabel: '',
            width: a,
            name: 'averageFuelConsumption',
            cls: 'test-id-aircraftdetail-basic-averageFuelConsumption'
        }, {
            xtype: 'label',
            text: 'Kg'
        }, {
            xtype: 'label',
            text: 'Standard Version'
        }, {
            xtype: 'textfield',
            colspan: 3,
            fieldLabel: '',
            width: 324,
            name: 'standardVersion',
            cls: 'test-id-aircraftdetail-basic-standardVersion'
        }, {
            xtype: 'label',
            text: 'Compartments'
        }, {
            xtype: 'textfield',
            colspan: 2,
            fieldLabel: '',
            name: 'compartments',
            cls: 'test-id-aircraftdetail-basic-compartments'
        }, {
            xtype: 'label',
            text: ''
        }, {
            xtype: 'textfield',
            colspan: 3,
            fieldLabel: '',
            width: 324,
            name: 'versionName',
            cls: 'test-id-aircraftdetail-basic-versionName'
        }, {
            xtype: 'box',
            colspan: 3
        }, {
            xtype: 'label',
            text: 'Cockpit Crew'
        }, {
            xtype: 'numberfield',
            fieldLabel: '',
            width: a,
            name: 'cockpitCrewSize',
            cls: 'test-id-aircraftdetail-basic-cockpitCrewSize'
        }, {
            xtype: 'label',
            text: 'Cabin Crew'
        }, {
            xtype: 'numberfield',
            colspan: 4,
            fieldLabel: '',
            width: a,
            name: 'cabinCrewSize',
            cls: 'test-id-aircraftdetail-basic-cabinCrewSize'
        }, {
            xtype: 'label',
            text: 'Special Equipment'
        }, {
            xtype: 'textfield',
            colspan: 6,
            fieldLabel: '',
            width: 550,
            name: 'specialEquipment',
            cls: 'test-id-aircraftdetail-basic-specialEquipment'
        }, {
            xtype: 'label',
            text: 'Remarks'
        }, {
            xtype: 'textarea',
            colspan: 6,
            fieldLabel: '',
            width: 550,
            name: 'remark',
            cls: 'test-id-aircraftdetail-basic-remark'
        }]
    }
});
