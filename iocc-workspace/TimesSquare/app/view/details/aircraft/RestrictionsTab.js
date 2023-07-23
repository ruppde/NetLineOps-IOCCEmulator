Ext.define('TimesSquare.view.details.aircraft.RestrictionsTab', {
    extend: 'Ext.container.Container',
    component: !0,
    box: !0,
    //container: !0,
    details_aircraft_restrictionstab: !0,
    xtype: 'details_aircraft_restrictionstab',
    padding: '10px 5px',
    initComponent: function() {
        var a = this;
        a.createItems();
        Ext.container.Container.prototype.initComponent.apply(this, arguments)
    },
    createItems: function() {
        var a = this;
        a.items = [{
            xtype: 'fieldset',
            title: 'Restrictions',
            cls: 'dwFieldset',
            items: [{
                xtype: 'details_aircraft_allrestrictions'
            }]
        }, {
            xtype: 'fieldset',
            title: 'Restriction Details',
            cls: 'dwFieldset',
            items: [{
                xtype: 'details_aircraft_restrictiondetails'
            }]
        }]
    }
});
