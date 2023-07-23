Ext.define('TimesSquare.view.searchleg.Legs', {
    extend: 'Ext.grid.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tablepanel: !0,
    gridpanel: !0,
    grid: !0,
    searchleg_legs: !0,
    xtype: 'searchleg_legs',
    loadLegs: function() {
        var b = this,
            a = b.getStore();
        a.loadPage(1)
    },
    initComponent: function() {
        var a = this,
            b = 'searchleg.Legs';
        a.columns = a.getGridColumns();
        a.store = b;
        a.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: b,
            dock: 'bottom',
            displayInfo: !0
        }];
        a.viewConfig = {
            loadMask: !1
        };
        Ext.grid.Panel.prototype.initComponent.apply(this, arguments)
    },
    getGridColumns: function() {
        var b = 'dMy',
            a = 'dMy Hi';
        return {
            defaults: {
                type: 'string',
                flex: 1,
                menuDisabled: !0,
                sortable: !0,
                draggable: !0,
                hideable: !1,
                lockable: !1
            },
            items: [{
                header: 'Flight',
                dataIndex: 'flight'
            }, {
                xtype: 'datecolumn',
                header: 'DOO',
                format: b,
                dataIndex: 'flightDoo'
            }, {
                xtype: 'datecolumn',
                header: 'LDO',
                format: b,
                dataIndex: 'flightLdo',
                hidden: !TimesSquare.CONFIG.localDoo
            }, {
                header: 'Dep',
                dataIndex: 'departureAirport'
            }, {
                xtype: 'datecolumn',
                format: a,
                header: 'STD',
                dataIndex: 'departure'
            }, {
                header: 'Arr',
                dataIndex: 'arrivalAirport'
            }, {
                xtype: 'datecolumn',
                format: a,
                header: 'STA',
                dataIndex: 'arrival'
            }, {
                header: 'Act Arr',
                dataIndex: 'actualTo'
            }, {
                xtype: 'datecolumn',
                format: a,
                header: 'Act Arr Dt',
                dataIndex: 'landingTime'
            }, {
                header: 'Registration',
                dataIndex: 'registration'
            }]
        }
    }
});
