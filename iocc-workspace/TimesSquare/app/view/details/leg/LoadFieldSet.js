Ext.define('TimesSquare.view.details.leg.LoadFieldSet', {
    extend: 'Ext.form.FieldSet',
    component: !0,
    box: !0,
    //container: !0,
    fieldset: !0,
    xtype: 'details_leg_loadfieldset',
    flex: 2,
    cls: 'dwFieldset',
    title: 'CBM',
    margin: '10 5',
    layout: 'hbox',
    defaults: {
        margin: '0 6 6 0',
        readOnly: !0
    },
    initComponent: function() {
        var a = this;
        a.items = a.createItems();
        Ext.form.FieldSet.prototype.initComponent.apply(this, arguments)
    },
    createItems: function() {
        return [{
            xtype: 'container',
            layout: 'anchor',
            width: 65,
            defaultType: 'box',
            defaults: {
                anchor: '100%',
                height: 22
            },
            items: [{
                html: 'Booked',
                margin: '66 6 0 0'
            }, {
                html: 'Baggages',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'Cargo',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'Mail',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'Flown',
                margin: '38 6 0 0'
            }, {
                html: 'Baggages',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'Cargo',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'Mail',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'TW',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }]
        }, {
            xtype: 'container',
            layout: 'anchor',
            width: 60,
            margin: '0 6 0 0',
            defaultType: 'numberformatedtextfield',
            defaults: {
                anchor: '100%',
                fieldStyle: 'text-align:right',
                margin: '0 0 6 0',
                readOnly: !0
            },
            items: [{
                name: 'deadloadBooked_baggageMass',
                margin: '89 0 6 0'
            }, {
                name: 'deadloadBooked_cargoMass'
            }, {
                name: 'deadloadBooked_mailMass'
            }, {
                name: 'deadloadFlown_baggageMass',
                margin: '65 0 6 0'
            }, {
                name: 'deadloadFlown_cargoMass'
            }, {
                name: 'deadloadFlown_mailMass'
            }, {
                xtype: 'textfield',
                name: 'deadloadFlown_grossWeight'
            }]
        }, {
            xtype: 'container',
            layout: 'anchor',
            width: 32,
            margin: '0 2 0 0',
            defaultType: 'box',
            defaults: {
                anchor: '100%',
                height: 22,
                margin: '0 0 6 0'
            },
            items: [{
                name: 'massUnit',
                margin: '94 0 6 0'
            }, {
                name: 'massUnit'
            }, {
                name: 'massUnit'
            }, {
                name: 'massUnit',
                margin: '66 0 6 0'
            }, {
                name: 'massUnit'
            }, {
                name: 'massUnit'
            }, {
                name: 'massUnit'
            }]
        }, {
            xtype: 'container',
            layout: 'anchor',
            width: 32,
            margin: '0 6 0 0',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                fieldStyle: 'text-align:right',
                margin: '0 0 6 0',
                readOnly: !0
            },
            items: [{
                name: 'deadloadBooked_baggagePieces',
                margin: '89 0 6 0'
            }, {
                name: 'deadloadBooked_cargoVolume'
            }, {
                name: 'deadloadFlown_baggagePieces',
                margin: '93 0 6 0'
            }, {
                name: 'deadloadFlown_cargoVolume'
            }]
        }, {
            xtype: 'container',
            layout: 'anchor',
            width: 32,
            defaultType: 'box',
            defaults: {
                anchor: '100%',
                margin: '0 0 6 0',
                height: 22
            },
            items: [{
                margin: '94 0 4 0',
                html: '(p)'
            }, {
                html: '(m<sup>3</sup>)'
            }, {
                margin: '94 0 4 0',
                html: '(p)'
            }, {
                html: '(m<sup>3</sup>)'
            }]
        }]
    }
});
