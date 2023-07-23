Ext.define('TimesSquare.controller.details.Aircraft', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['details.Aircraft', 'details.Restriction'],
    views: ['details.aircraft.Aircraft', 'details.aircraft.Tabs', 'details.aircraft.BasicTab', 'details.aircraft.RestrictionsTab', 'details.aircraft.AllRestrictions', 'details.aircraft.RestrictionDetails', 'details.aircraft.Meta'],
    refs: [{
        ref: 'viewport',
        selector: 'viewport'
    }, {
        ref: 'performanceTab',
        selector: 'details_aircraft_tabs details_aircraft_performancetab'
    }],
    performanceInterval: 60000,
    init: function() {
        var a = this;
        a.control({
            'details_aircraft_allrestrictions': {
                selectionchange: a.onAllrestrictionsSelectionchange
            },
            'details_aircraft_tabs details_aircraft_performancetab': {
                show: a.reloadPerformance,
                hide: a.clearPerformanceTimeout,
                destroy: a.clearPerformanceTimeout
            }
        })
    },
    onAllrestrictionsSelectionchange: function(c, d) {
        var a = d[0],
            e = c.view.ownerCt,
            b = e.up('details_aircraft_restrictionstab').down('details_aircraft_restrictiondetails');
        if (!a) {
            b.displayFields('area');
            return
        }
        b.displayFields(a.get('type'));
        b.loadRecord(a)
    },
    clearPerformanceTimeout: function() {
        window.clearTimeout(this._performanceTimeout);
        this._performanceTimeout = null
    },
    reloadPerformance: function(e) {
        var d = this,
            a = d.getPerformanceTab(),
            b, c;
        if (!a || a.isHidden()) {
            return
        }
        b = a.up('form').getRecord();
        c = b && b.getPerformanceUrl();
        if (e !== !1) {
            a.reset()
        }
        if (!c) {
            Ext.log.warn('getAircraftPerformance service URL not found!');
            return
        }
        if (e !== !1) {
            a.setLoading('Loading...')
        }
        Ext.Ajax.request({
            url: c,
            callback: d.getPerformanceCallback,
            scope: d
        })
    },
    getPerformanceCallback: function(e, d, a) {
        var b = this,
            c = b.getPerformanceTab();
        if (!c || c.isHidden()) {
            return
        }
        b._performanceTimeout = Ext.defer(b.reloadPerformance, b.performanceInterval, b, [!1]);
        c.setLoading(!1);
        a = d && a && Ext.decode(a.responseText);
        if (!a || !a.success || !a.result) {
            Ext.Msg.show({
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK,
                title: 'getAircraftPerformance service',
                msg: 'Error on loading Performance data!'
            })
        }
        c.loadDataToForm(a.result)
    }
});