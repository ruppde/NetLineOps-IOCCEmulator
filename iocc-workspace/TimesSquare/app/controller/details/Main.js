Ext.define('TimesSquare.controller.details.Main', {
    extend: 'Ext.app.Controller',
    mixins: {
        logger: 'TimesSquare.mixin.ExecutionTimeLogger'
    },
    stores: [],
    models: ['details.Check'],
    views: ['common.MappingFieldContainer', 'details.TabPanel', 'details.DetailPanel', 'details.check.Check', 'details.check.Tabs', 'details.check.EquipmentTab', 'details.check.RemarksTab', 'details.check.IncludedTab'],
    refs: [{
        ref: 'viewport',
        selector: 'viewport'
    }, {
        ref: 'detailsTabpanel',
        selector: 'details_tabpanel'
    }],
    statics: {
        view: {
            LEG: 'details_leg_leg',
            CHECK: 'details_check_check',
            AIRCRAFT: 'details_aircraft_aircraft',
            SEARCHLEG: 'searchleg_searchleg'
        }
    },
    init: function() {
        var a = this;
        a.track(['open', 'onServerPush']);
        a.getController('details.Leg');
        a.getController('details.Aircraft');
        a.getController('SearchLeg');
        a.listen({
            controller: {
                '#Messaging': {
                    opsdatachanged: a.onServerPush
                }
            },
            component: {
                'details_detailpanel': {
                    removed: a.onDetailPanelRemoved
                },
                'searchleg_searchleg': {
                    removed: a.onDetailPanelRemoved
                }
            }
        })
    },
    open: function(f, g) {
        var a = this,
            d = a.getViewport(),
            b, c, e;
        Ext.log.info('[Details] Open details (panel = "' + f + '", id = "' + g + '")');
        d.setLoading('Please wait...');
        b = a.hasDetailContainer();
        a.open.stepIn();
        a.open.options(function(b) {
            b.tpl = a.trackingTpl + Ext.String.format(' | ID: {0}', g)
        });
        Ext.defer(function() {
            if (!b) {
                b = a.createDetailContainer()
            }
            e = b.down('details_tabpanel');
            c = a.hasDetailView(b, f);
            if (!c) {
                c = a.createDetailView(f);
                e.add(c)
            }
            if (!a.hasDetailContainer()) {
                d.add(b)
            }
            e.setActiveTab(c);
            if (b.collapsed) {
                b.expand()
            }
            if (c.updateView) {
                c.updateView(d, g)
            } else {
                d.setLoading(!1)
            }
            a.open.stepOut()
        }, 100)
    },
    createDetailContainer: function() {
        return Ext.create('Ext.panel.Panel', {
            region: 'east',
            width: 870,
            autoScroll: !0,
            collapsible: !0,
            animCollapse: !1,
            split: !0,
            layout: 'fit',
            items: {
                xtype: 'details_tabpanel'
            }
        })
    },
    hasDetailContainer: function() {
        var b = this,
            a = b.getViewport();
        return a.down('panel[region=east]')
    },
    createDetailView: function(a) {
        return Ext.createByAlias('widget.' + a)
    },
    hasDetailView: function(a, b) {
        if (!a || !b) {
            return
        }
        return a.down(b)
    },
    onDetailPanelRemoved: function() {
        var c = this,
            d = c.getViewport(),
            a = c.hasDetailContainer(),
            b = a && a.down('details_tabpanel');
        if (b && !b.items.getCount()) {
            d.remove(a)
        }
    },
    onServerPush: function(a) {
        var c = this,
            b;
        if (!c.hasOpenDetailPanel()) {
            return
        }
        for (b in a) {
            if (a.hasOwnProperty(b)) {
                c.updateDataInOpenedDetailPanels(a[b])
            }
        }
    },
    hasOpenDetailPanel: function() {
        var a = this,
            b = a.hasDetailContainer(),
            c = a.getDetailsTabpanel();
        return b && c.items.getCount()
    },
    updateDataInOpenedDetailPanels: function(f) {
        var e = this,
            d = e.getDetailsTabpanel(),
            g = d.getActiveTab(),
            c, b, a;
        d.items.each(function(d) {
            c = d.getRecord && d.getRecord();
            if (!d.detailType || !c) {
                return !0
            }
            b = c.get('naturalId');
            a = f.getStateContainer(b, d.detailType);
            if (a) {
                if (g.detailType === d.detailType) {
                    d.setLoading('Updating...')
                }
                e.takeActionByState(d, b, a)
            }
        })
    },
    takeActionByState: function(b, e, a) {
        var d = this,
            c = d.getViewport();
        switch (a.state) {
            case TimesSquare.classes.MessageEvent.TYPE.UPDATE:
                b.updateView(c, a.o.getUrl());
                break;
            case TimesSquare.classes.MessageEvent.TYPE.DELETE:
                Ext.defer(function() {
                    b.clearView()
                }, 100);
                break;
            default:
        }
    }
});
