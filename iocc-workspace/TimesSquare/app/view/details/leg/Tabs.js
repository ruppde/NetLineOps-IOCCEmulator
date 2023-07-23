Ext.define('TimesSquare.view.details.leg.Tabs', {
    extend: 'Ext.tab.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tabpanel: !0,
    details_leg_tabs: !0,
    xtype: 'details_leg_tabs',
    plain: !0,
    activeTab: 1,
    items: [{
        title: 'Schedule',
        xtype: 'details_leg_scheduletab'
    }, {
        title: 'Actual',
        xtype: 'details_leg_actualtab'
    }, {
        title: 'ACARS',
        xtype: 'details_leg_acarstab',
        itemId: 'legDetailsAcarsTab'
    }, {
        title: 'Flightlog',
        xtype: 'details_leg_flightlogtab',
        itemId: 'legDetailFlightLogTab'
    }, {
        title: 'Remarks',
        xtype: 'details_leg_remarkstab'
    }, {
        title: 'Crew',
        itemId: 'legDetailCrewTab'
    }, {
        title: 'Pax + Load',
        xtype: 'details_leg_paxloadtab'
    }]
});
