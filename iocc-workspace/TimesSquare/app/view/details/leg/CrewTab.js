Ext.define('TimesSquare.view.details.leg.CrewTab', {
    extend: 'Ext.grid.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tablepanel: !0,
    gridpanel: !0,
    grid: !0,
    details_leg_crewtab: !0,
    xtype: 'details_leg_crewtab',
    store: 'details.Crews',
    border: 0,
    initComponent: function() {
        var a = this;
        a.columns = a.getGridColumns();
        Ext.grid.Panel.prototype.initComponent.apply(this, arguments)
    },
    afterRender: function() {
        var c = this,
            b, a;
        Ext.grid.Panel.prototype.afterRender.apply(this, arguments);
        b = c.getView();
        a = b.headerCt.getMenu();
        a.add('-', {
            text: 'Default sorting',
            handler: function() {
                c.getStore().resetSorters()
            }
        })
    },
    displayCrewList: function() {
        var c = this,
            e = c.up('form'),
            a = c.getStore(),
            b, d;
        a.removeAll();
        b = e.getRecord();
        if (!b) {
            return
        }
        d = b.getCrewDetailUrl();
        a.getProxy().url = d;
        a.load()
    },
    tooltipRenderer: function(a, b) {
        if (a) {
            a = Ext.htmlEncode(a);
            b.tdAttr = ' data-qtip="' + a + '" '
        }
        return a
    },
    getGridColumns: function() {
        return {
            defaults: {
                type: 'string',
                flex: 1,
                menuDisabled: !1,
                sortable: !0,
                draggable: !1,
                hideable: !1,
                lockable: !1
            },
            items: [{
                header: 'Prev Leg',
                dataIndex: 'prevLeg',
                renderer: this.tooltipRenderer
            }, {
                header: 'Id',
                dataIndex: 'crewMemberID'
            }, {
                header: 'Rank',
                dataIndex: 'rank'
            }, {
                header: 'Full Name',
                dataIndex: 'crewMemberFullName'
            }, {
                header: 'First Name',
                dataIndex: 'crewMemberFirstName'
            }, {
                header: 'Last Name',
                dataIndex: 'crewMemberName'
            }, {
                header: 'Address',
                dataIndex: 'crewMemberAddress'
            }, {
                header: 'Phone',
                dataIndex: 'crewMemberPhone',
                renderer: this.tooltipRenderer
            }, {
                header: 'Qualifications',
                dataIndex: 'qualifications'
            }, {
                xtype: 'checkcolumn',
                disabled: !0,
                maskOnDisable: !1,
                disabledCls: 'x-item-enabled',
                header: 'AC Change',
                dataIndex: 'acChange'
            }, {
                header: 'Next Leg',
                dataIndex: 'nextLeg',
                renderer: this.tooltipRenderer
            }]
        }
    }
});
