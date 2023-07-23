Ext.define('TimesSquare.view.details.check.Tabs', {
    extend: 'Ext.tab.Panel',
    plain: !0,
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tabpanel: !0,
    details_checks_tabs: !0,
    xtype: 'details_checks_tabs',
    items: [{
        title: 'Equipment',
        xtype: 'details_check_equipmenttab'
    }, {
        title: 'Remarks',
        xtype: 'details_check_remarkstab'
    }, {
        title: 'Included checks',
        xtype: 'details_check_includedtab'
    }]
});
