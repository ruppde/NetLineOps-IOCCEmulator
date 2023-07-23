Ext.define('TimesSquare.view.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'maintoolbar',
    component: !0,
    box: !0,
    container: !0,
    toolbar: !0,
    maintoolbar: !0,
    region: 'north',
    split: !1,
    border: !1,
    height: 32,
    items: [{
        xtype: 'image',
        alt: 'lsy-logo',
        inspect: 'app-logo',
        src: TimesSquare.CONFIG.appLogo,
        autoRender: !0,
        height: 24
    }, '->', {
        iconCls: 'icon-searchleg',
        action: 'searchleg',
        clickEvent: 'mousedown',
        tooltip: 'Search Leg'
    }, {
        xtype: 'tbspacer',
        width: 7
    }, '-', {
        xtype: 'tbspacer',
        width: 7
    }, {
        text: 'Logout',
        action: 'logout',
        iconCls: 'icon-key'
    }, {
        xtype: 'tbspacer',
        width: 7
    }]
});
