Ext.define('TimesSquare.controller.details.Leg', {
    extend: 'Ext.app.Controller',
    mixins: {
        logger: 'TimesSquare.mixin.ExecutionTimeLogger'
    },
    stores: ['details.Crews'],
    models: ['details.Leg', 'details.Crew'],
    views: ['details.leg.Leg', 'details.leg.Tabs', 'details.leg.ScheduleTab', 'details.leg.ActualTab', 'details.leg.AcarsTab', 'details.leg.CrewTab'],
    refs: [{
        ref: 'viewport',
        selector: 'viewport'
    }, {
        ref: 'paxAndLoadTab',
        selector: 'details_leg_tabs details_leg_paxloadtab'
    }],
    paxAndLoadInterval: 60000,
    init: function() {
        var a = this;
        a.track(['reloadPaxAndLoad', 'getPaxAndLoadCallback', 'onCrewTabActivate']);
        a.control({
            'details_leg_tabs panel[itemId=legDetailCrewTab]': {
                activate: a.onCrewTabActivate
            },
            'details_leg_tabs details_leg_flightlogtab': {
                activate: a.onFlightLogTabActive
            },
            'details_leg_tabs details_leg_paxloadtab': {
                show: a.reloadPaxAndLoad,
                hide: a.clearPaxAndLoadTimeout,
                destroy: a.clearPaxAndLoadTimeout
            }
        })
    },
    onCrewTabActivate: function(b) {
        var a = b.down('details_leg_crewtab');
        if (!a) {
            a = Ext.create('TimesSquare.view.details.leg.CrewTab');
            b.add(a)
        }
        a.displayCrewList()
    },
    onFlightLogTabActive: function(a) {
        var c = a.up('form'),
            d = c && c.getRecord(),
            b = d && d.getFlightLogUrl();
        if (!b) {
            Ext.log.warn('Unable to retrieve leg info to display flightlog data!');
            return
        }
        a.setLoading('Loading...');
        Ext.Ajax.request({
            method: 'GET',
            url: b,
            success: function(f) {
                var c = f && Ext.decode(f.responseText, !0) || null,
                    e = c && c.success && Ext.isObject(c.result) && Ext.create('TimesSquare.model.details.FlightLog', c.result),
                    d;
                a.setLoading(!1);
                if (!e) {
                    d = 'Errorneous or missing Flightlog service response!';
                    Ext.log.warn('Unable to retrieve Flightlog data (' + b + '): ' + d);
                    Ext.Msg.show({
                        icon: Ext.Msg.WARNING,
                        buttons: Ext.Msg.OK,
                        title: 'Flighlog Load Service',
                        msg: d
                    });
                    return
                }
                a.loadRecord(e)
            },
            failure: function() {
                a.setLoading(!1)
            }
        })
    },
    clearPaxAndLoadTimeout: function() {
        window.clearTimeout(this._paxAndLoadTimeout);
        this._paxAndLoadTimeout = null
    },
    reloadPaxAndLoad: function(f) {
        var e = this,
            a = e.getPaxAndLoadTab(),
            c, b, d;
        if (!a || a.isHidden()) {
            return
        }
        c = a.up('form').getRecord();
        if (!c) {
            return
        }
        b = c.data.hyperMedia;
        d = b && b.urlPaxAndLoad;
        if (f !== !1) {
            a.getForm().reset()
        }
        if (!d) {
            Ext.log.warn('getPaxLoad service URl not found!');
            return
        }
        if (f !== !1) {
            a.setLoading('Loading...')
        }
        Ext.Ajax.request({
            url: d,
            callback: e.getPaxAndLoadCallback,
            scope: e
        })
    },
    getPaxAndLoadCallback: function(e, d, a) {
        var b = this,
            c = b.getPaxAndLoadTab();
        if (!c || c.isHidden()) {
            return
        }
        b._paxAndLoadTimeout = Ext.defer(b.reloadPaxAndLoad, b.paxAndLoadInterval, b, [!1]);
        c.setLoading(!1);
        a = d && a && Ext.decode(a.responseText);
        if (!a || !a.success || !a.result) {
            Ext.Msg.show({
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK,
                title: 'Pax + Load service',
                msg: 'Error on loading Pax and Load data!'
            })
        }
        c.loadDataToForm(a && a.result)
    }
});