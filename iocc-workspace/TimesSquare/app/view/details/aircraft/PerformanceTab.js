Ext.define('TimesSquare.view.details.aircraft.PerformanceTab', {
    extend: 'Ext.form.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    details_aircraft_performancetab: !0,
    xtype: 'details_aircraft_performancetab',
    padding: 10,
    layout: 'anchor',
    initComponent: function() {
        var a = this;
        a.createItems();
        Ext.form.Panel.prototype.initComponent.apply(this, arguments)
    },
    createItems: function() {
        var a = this;
        a.defaults = {
            xtype: 'textfield',
            width: 220,
            labelSeparator: '',
            readOnly: !0
        };
        a.items = [{
            fieldLabel: 'Total Flight Hours',
            name: 'totalFlightHours'
        }, {
            fieldLabel: 'Total Cycles',
            name: 'totalCycles'
        }, {
            fieldLabel: 'Last Arrived Leg',
            name: 'lastArrivedLeg',
            width: 340
        }, {
            xtype: 'fieldset',
            margin: '20 0 5 0',
            title: 'Controlled Checks',
            anchor: '100%',
            cls: 'dwFieldset',
            items: []
        }, {
            xtype: 'grid',
            anchor: '100%',
            store: Ext.create('TimesSquare.store.details.ControlledChecks'),
            columns: a.getControlledChecksGridColumns()
        }]
    },
    getControlledChecksGridColumns: function() {
        return [{
            text: 'Code',
            menuDisabled: !0,
            dataIndex: 'code',
            width: 80
        }, {
            text: 'Last',
            menuDisabled: !0,
            columns: [{
                text: 'Chk Code',
                menuDisabled: !0,
                dataIndex: 'checkCode',
                width: 100,
                renderer: function(a) {
                    return a && a.name
                }
            }, {
                text: 'FH',
                menuDisabled: !0,
                dataIndex: 'flightHours',
                align: 'right',
                width: 100,
                renderer: function(a) {
                    return Ext.util.Format.durationRenderer(a)
                }
            }, {
                text: 'Cycles',
                menuDisabled: !0,
                dataIndex: 'cycles',
                align: 'right',
                width: 100
            }, {
                text: 'Begin',
                menuDisabled: !0,
                dataIndex: 'begin',
                width: 100,
                renderer: function(a) {
                    if (a) {
                        return Ext.Date.format(Ext.Date.parse(a, 'c'), 'dMy H:i')
                    }
                }
            }, {
                text: 'End',
                menuDisabled: !0,
                dataIndex: 'end',
                width: 100,
                renderer: function(a) {
                    if (a) {
                        return Ext.Date.format(Ext.Date.parse(a, 'c'), 'dMy H:i')
                    }
                }
            }, {
                text: 'Airport',
                menuDisabled: !0,
                dataIndex: 'airport',
                width: 100
            }]
        }]
    },
    loadDataToForm: function(a) {
        var b = this;
        a.totalFlightHours = a.totalFlightHours && Ext.isObject(a.totalFlightHours) ? Ext.util.Format.durationRenderer(a.totalFlightHours) : a.totalFlightHours;
        b.getForm().setValues(a);
        b.down('grid').store.loadControlledChecksData(a.controlledChecks)
    },
    reset: function() {
        var a = this;
        a.getForm().reset();
        a.down('grid').store.removeAll()
    }

});
