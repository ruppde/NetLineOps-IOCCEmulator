Ext.define('TimesSquare.view.details.leg.PaxFieldSet', {
    extend: 'Ext.form.FieldSet',
    component: !0,
    box: !0,
    //container: !0,
    fieldset: !0,
    xtype: 'details_leg_paxfieldset',
    flex: 3,
    minWidth: 485,
    cls: 'dwFieldset',
    title: 'Passenger',
    margin: '10 5',
    layout: 'anchor',
    defaults: {
        readOnly: !0
    },
    initComponent: function() {
        var a = this;
        a.items = [{
            xtype: 'container',
            layout: 'hbox',
            anchor: '100%',
            items: a.createItemsBlock1()
        }, {
            xtype: 'container',
            layout: 'hbox',
            anchor: '100%',
            margin: '10 0 0 0',
            items: a.createItemsBlock2()
        }];
        Ext.form.FieldSet.prototype.initComponent.apply(this, arguments)
    },
    createItemsBlock1: function() {
        var b = this,
            c = TimesSquare.CONFIG.paxDetailShowCheckedIn,
            a = [];
        a.push({
            xtype: 'container',
            layout: 'anchor',
            width: 85,
            defaultType: 'box',
            defaults: {
                anchor: '100%',
                height: 22
            },
            items: [{
                html: 'Forecast',
                margin: '7 6 0 0'
            }, {
                html: 'PAX',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'Booked',
                margin: '9 6 0 0'
            }, {
                html: 'PAX',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'PAX in Transit',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'PAD',
                style: 'text-align:right',
                margin: '10 6 0 0'
            }, {
                html: 'PAD in Transit',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, c && {
                html: 'Checked',
                margin: '14 6 0 0'
            }, {
                html: 'PAX',
                style: 'text-align:right',
                margin: '4 6 0 0'
            }, {
                html: 'PAD',
                style: 'text-align:right',
                margin: '8 6 0 0'
            }, {
                html: 'Flown',
                margin: '13 6 0 0'
            }, {
                html: 'PAX',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'PAX in Transit',
                style: 'text-align:right',
                margin: '6 6 0 0'
            }, {
                html: 'PAD',
                style: 'text-align:right',
                margin: '9 6 0 0'
            }, {
                html: 'PAD in Transit',
                style: 'text-align:right',
                margin: '8 6 0 0'
            }].filter(function(a) {
                return !!a
            })
        });
        a.push(b.createColumn('1', '&nbsp;'));
        a.push(b.createColumn('2', '&nbsp;'));
        a.push(b.createColumn('3', '&nbsp;'));
        a.push(b.createColumn('4', '&nbsp;'));
        a.push(b.createColumn('5', '&nbsp;'));
        a.push(b.createColumn('6', '&nbsp;'));
        a.push(b.createColumn('total', 'Total'));
        a.push({
            xtype: 'container',
            layout: 'anchor',
            width: 85,
            margin: '5 0 0 0',
            defaults: {
                anchor: '100%',
                readOnly: !0
            },
            items: [{
                xtype: 'box',
                html: 'Date',
                height: 22,
                margin: '2 6 0 4'
            }, {
                xtype: 'datefield',
                name: 'forecastDate',
                margin: '1 0 0 4'
            }]
        });
        return a
    },
    createColumn: function(a, b) {
        var c = TimesSquare.CONFIG.paxDetailShowCheckedIn;
        return {
            xtype: 'container',
            itemId: 'comp_column_' + a,
            layout: 'anchor',
            width: 40,
            margin: '0 2 0 0',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                fieldStyle: 'text-align:right',
                margin: '0 0 6 0',
                readOnly: !0
            },
            items: [{
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '4 0 0 0',
                compartmentLabel: !0,
                value: b
            }, {
                xtype: 'textfield',
                name: 'paxForecast_' + a
            }, {
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '10 0 0 0',
                compartmentLabel: !0,
                value: b
            }, {
                xtype: 'textfield',
                name: 'paxBooked_' + a
            }, {
                xtype: 'textfield',
                name: 'paxTransitBooked_' + a
            }, {
                xtype: 'textfield',
                name: 'padBooked_' + a
            }, {
                xtype: 'textfield',
                name: 'padTransitBooked_' + a
            }, c && {
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '10 0 0 0',
                compartmentLabel: !0,
                value: b
            }, {
                xtype: 'textfield',
                name: 'paxCheckedIn_' + a
            }, {
                xtype: 'textfield',
                name: 'padCheckedIn_' + a
            }, {
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '10 0 0 0',
                compartmentLabel: !0,
                value: b
            }, {
                xtype: 'textfield',
                name: 'paxFlown_' + a
            }, {
                xtype: 'textfield',
                name: 'paxTransitFlown_' + a
            }, {
                xtype: 'textfield',
                name: 'padFlown_' + a
            }, {
                xtype: 'textfield',
                name: 'padTransitFlown_' + a
            }].filter(function(c) {
                return !!c
            })
        }
    },
    createItemsBlock2: function() {
        return [{
            xtype: 'box',
            html: 'Crew',
            width: 79,
            style: 'text-align:right',
            margin: '87 6 0 0'
        }, {
            xtype: 'container',
            layout: 'anchor',
            width: 40,
            margin: '0 2 0 0',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                fieldStyle: 'text-align:right',
                readOnly: !0
            },
            items: [{
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '4 0 0 0',
                value: 'Male'
            }, {
                xtype: 'textfield',
                name: 'male'
            }, {
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '2 0 0 0',
                value: 'DHC'
            }, {
                xtype: 'textfield',
                name: 'deadheadCrew'
            }]
        }, {
            xtype: 'container',
            layout: 'anchor',
            width: 40,
            margin: '0 2 0 42',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                fieldStyle: 'text-align:right',
                readOnly: !0
            },
            items: [{
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '4 0 0 0',
                value: 'Female'
            }, {
                xtype: 'textfield',
                name: 'female'
            }, {
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '2 0 0 0',
                value: 'XCR'
            }, {
                xtype: 'textfield',
                name: 'extraCrew'
            }]
        }, {
            xtype: 'container',
            layout: 'vbox',
            margin: '0 6 0 42',
            defaultType: 'textfield',
            defaults: {
                fieldStyle: 'text-align:right',
                readOnly: !0
            },
            items: [{
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '4 0 0 0',
                value: 'Children'
            }, {
                xtype: 'textfield',
                name: 'children',
                margin: '0 0 0 4',
                width: 40
            }]
        }, {
            xtype: 'container',
            layout: 'anchor',
            width: 40,
            margin: '0 2 0 0',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                fieldStyle: 'text-align:right',
                readOnly: !0
            },
            items: [{
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '4 0 0 0',
                value: 'Infants'
            }, {
                xtype: 'textfield',
                name: 'infants'
            }, {
                xtype: 'displayfield',
                fieldStyle: null,
                margin: '2 0 0 0',
                value: 'Total'
            }, {
                xtype: 'textfield',
                name: 'crew_total'
            }]
        }]
    }
});
