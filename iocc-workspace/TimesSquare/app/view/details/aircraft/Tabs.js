Ext.define('TimesSquare.view.details.aircraft.Tabs', {
    extend: 'Ext.tab.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tabpanel: !0,
    details_aircraft_tabs: !0,
    xtype: 'details_aircraft_tabs',
    plain: !0,
    items: [{
        title: 'Basic',
        xtype: 'details_aircraft_basictab'
    }, {
        title: 'Performance',
        xtype: 'details_aircraft_performancetab'
    }, {
        title: 'Restrictions & Features',
        xtype: 'details_aircraft_restrictionstab'
    }]
});
