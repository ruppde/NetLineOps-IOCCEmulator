Ext.define('TimesSquare.view.searchleg.SearchLeg', {
    extend: 'Ext.panel.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    searchleg_searchleg: !0,
    xtype: 'searchleg_searchleg',
    autoScroll: !0,
    border: !1,
    closable: !0,
    width: 910,
    title: 'Search Leg',
    initComponent: function() {
        var a = this;
        a.createDockedItems();
        a.createItems();
        Ext.panel.Panel.prototype.initComponent.apply(this, arguments)
    },
    createItems: function() {
        var a = this;
        a.items = [{
            xtype: 'container',
            id: 'searchleg_mask',
            padding: 10,
            items: [{
                xtype: 'searchleg_search'
            }, {
                xtype: 'searchleg_legs',
                margin: '20px 0 0 0'
            }]
        }]
    },
    createDockedItems: function() {
        var a = this;
        a.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                text: '',
                clickEvent: 'mousedown',
                iconCls: 'icon-searchLeg',
                action: 'search'
            }, '-', {
                text: '',
                clickEvent: 'mousedown',
                iconCls: 'icon-stop',
                action: 'stopSearch',
                disabled: !0
            }]
        }]
    }
});
