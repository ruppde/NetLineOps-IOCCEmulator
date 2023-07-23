Ext.define('TimesSquare.view.details.leg.PaxLoadTab', {
    extend: 'Ext.form.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    details_leg_paxloadtab: !0,
    xtype: 'details_leg_paxloadtab',
    layout: {
        type: 'hbox'
    },
    items: [{
        xtype: 'details_leg_paxfieldset'
    }, {
        xtype: 'details_leg_loadfieldset'
    }],
    loadDataToForm: function(h) {
        var d = this,
            b = d.convertToFlat(h),
            e = d.query('[name=massUnit]'),
            f = b && b.compartments && b.compartments.length || 0,
            i = e.length,
            c, g, a;
        d.getForm().setValues(b);
        for (a = 0; a < i; a++) {
            if (e[a] && e[a].getEl) {
                g = e[a].getEl();
                if (g && g.setHtml) {
                    g.setHtml(b.massUnit)
                }
            }
        }
        for (a = 1; a <= 6; a++) {
            c = d.down('#comp_column_' + a);
            if (a <= f && c.isHidden() || a > f && !c.isHidden()) {
                c[a <= f ? 'show' : 'hide']()
            }
            if (a <= f) {
                d.updateCompartmentLabels(c, b.compartments[a - 1])
            }
        }
    },
    updateCompartmentLabels: function(e, d) {
        var c = e.query('[compartmentLabel]'),
            f = c.length,
            b = 0,
            a;
        for (; b < f; b++) {
            a = c[b] && c[b].inputEl;
            if (a && a.setHtml) {
                a.setHtml(d)
            }
        }
    },
    convertToFlat: function(e) {
        var d = this,
            a = {},
            g, c, b, f;
        if (!e) {
            a.compartments = ' ';
            a.massUnit = ' ';
            return a
        }
        for (b in e) {
            if (e.hasOwnProperty(b)) {
                c = e[b];
                if (b !== 'legId' && Ext.isObject(c)) {
                    for (f in c) {
                        if (c.hasOwnProperty(f)) {
                            a[f] = c[f]
                        }
                    }
                } else {
                    a[b] = c
                }
            }
        }
        d.convertToFlatHelper1(a, 'deadloadBooked');
        d.convertToFlatHelper1(a, 'deadloadFlown');
        g = d.calculateCompartmentIndexes(a.compartments);
        for (b in a) {
            if (Ext.isArray(a[b])) {
                d.convertToFlatHelper2(a, b, g)
            }
        }
        a.forecastDate = a.forecastDate ? Ext.Date.parse(a.forecastDate, 'Y-m-d\\TH:i:s') : null;
        if (Ext.isEmpty(a.deadheadCrew) && Ext.isEmpty(a.extraCrew)) {
            a.crew_total = ''
        } else {
            a.crew_total = (a.deadheadCrew || 0) + (a.extraCrew || 0)
        }
        Ext.applyIf(a, d.EMPTY_DATA);
        return a
    },
    convertToFlatHelper1: function(b, a) {
        Ext.Object.each(b[a], function(d, c) {
            b[a + '_' + d] = c
        })
    },
    convertToFlatHelper2: function(b, a, d) {
        var c = 0;
        Ext.Array.each(b[a], function(e) {
            var f = d[e.comp];
            if (f) {
                b[a + '_' + f] = e.value;
                c += e.value
            }
        });
        b[a + '_total'] = c
    },
    EMPTY_DATA: {
        paxForecast_1: 0,
        paxBooked_1: 0,
        paxTransitBooked_1: 0,
        padBooked_1: 0,
        padTransitBooked_1: 0,
        paxCheckedIn_1: 0,
        padCheckedIn_1: 0,
        paxFlown_1: 0,
        paxTransitFlown_1: 0,
        padFlown_1: 0,
        padTransitFlown_1: 0,
        paxForecast_2: 0,
        paxBooked_2: 0,
        paxTransitBooked_2: 0,
        padBooked_2: 0,
        padTransitBooked_2: 0,
        paxCheckedIn_2: 0,
        padCheckedIn_2: 0,
        paxFlown_2: 0,
        paxTransitFlown_2: 0,
        padFlown_2: 0,
        padTransitFlown_2: 0,
        paxForecast_3: 0,
        paxBooked_3: 0,
        paxTransitBooked_3: 0,
        padBooked_3: 0,
        padTransitBooked_3: 0,
        paxCheckedIn_3: 0,
        padCheckedIn_3: 0,
        paxFlown_3: 0,
        paxTransitFlown_3: 0,
        padFlown_3: 0,
        padTransitFlown_3: 0,
        paxForecast_4: 0,
        paxBooked_4: 0,
        paxTransitBooked_4: 0,
        padBooked_4: 0,
        padTransitBooked_4: 0,
        paxCheckedIn_4: 0,
        padCheckedIn_4: 0,
        paxFlown_4: 0,
        paxTransitFlown_4: 0,
        padFlown_4: 0,
        padTransitFlown_4: 0,
        paxForecast_5: 0,
        paxBooked_5: 0,
        paxTransitBooked_5: 0,
        padBooked_5: 0,
        padTransitBooked_5: 0,
        paxCheckedIn_5: 0,
        padCheckedIn_5: 0,
        paxFlown_5: 0,
        paxTransitFlown_5: 0,
        padFlown_5: 0,
        padTransitFlown_5: 0,
        paxForecast_6: 0,
        paxBooked_6: 0,
        paxTransitBooked_6: 0,
        padBooked_6: 0,
        padTransitBooked_6: 0,
        paxCheckedIn_6: 0,
        padCheckedIn_6: 0,
        paxFlown_6: 0,
        paxTransitFlown_6: 0,
        padFlown_6: 0,
        padTransitFlown_6: 0
    },
    calculateCompartmentIndexes: function(a) {
        var c = {},
            d, b;
        if (!a) {
            return c
        }
        a = a.split('');
        d = a.length;
        for (b = 0; b < d; b++) {
            c[a[b]] = b + 1
        }
        return c
    }
});
