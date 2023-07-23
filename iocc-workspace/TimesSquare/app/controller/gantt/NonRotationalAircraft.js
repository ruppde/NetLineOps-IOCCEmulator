Ext.define('TimesSquare.controller.gantt.NonRotationalAircraft', {
    extend: 'Ext.app.Controller',
    nonRotationalAircrafts: [],
    stores: ['gantt.Resources'],
    init: function() {
        var a = this;
        a.clearCache();
        a.listen({
            store: {
                '#gantt.Resources': {
                    clear: a.clearCache
                }
            }
        })
    },
    clearCache: function() {
        var a = this;
        a.nonRotationalAircrafts = []
    },
    handleNonRotationalAircrafts: function(a) {
        var c = this,
            i = c.getGanttResourcesStore(),
            h, g, e, d, f, b;
        if (a && a.legDetail && a.legDetail.schedule && a.legDetail.schedule.rotationIdentifier && a.legDetail.schedule.rotationIdentifier.registration) {
            h = a.legDetail.schedule.aircraftOwner;
            g = a.legDetail.schedule.aircraftSubtype;
            e = a.legDetail.schedule.rotationIdentifier.registration;
            for (b = 0; b < c.nonRotationalAircrafts.length; b += 1) {
                if (c.nonRotationalAircrafts[b].getSubtype() === g && c.nonRotationalAircrafts[b].getOwner() === h) {
                    d = c.nonRotationalAircrafts[b];
                    break
                }
            }
            if (d) {
                if (d.getRegistration() !== e) {
                    f = i.findRecord('registration', e);
                    if (!f) {
                        i.addNonExisitingNonRotationalAircraft(d, e)
                    }
                }
            }
        }
    },
    setNonRotationalAircrafts: function(b) {
        var c = this,
            a;
        for (a = 0; a < b.length; a += 1) {
            if (!b[a].isRotational()) {
                c.nonRotationalAircrafts.push(b[a])
            }
        }
    }
});