Ext.define('TimesSquare.controller.gantt.AtcSlot', {
    extend: 'Ext.app.Controller',
    loadedAtcSlots: undefined,
    atcSlotTemplates: undefined,
    started: !1,
    init: function() {
        var a = this;
        a.clearCache();
        a.listen({
            controller: {
                '#Clock': {
                    opsclockchanged: a.clockChanged
                }
            },
            store: {
                '#gantt.Events': {
                    clear: a.clearCache
                }
            }
        })
    },
    clearCache: function() {
        var a = this;
        a.loadedAtcSlots = {};
        a.atcSlotTemplates = {}
    },
    start: function() {
        this.started = !0
    },
    stop: function() {
        this.started = !1
    },
    handleAtcSlots: function(b) {
        var d = this,
            c, a;
        for (a = 0; a < b.length; a += 1) {
            if (b[a].$className === 'TimesSquare.model.gantt.AtcSlot') {
                c = b[a].getLegId();
                if (!d.loadedAtcSlots[c]) {
                    d.loadedAtcSlots[c] = []
                }
                d.loadedAtcSlots[c].push(b[a])
            }
        }
    },
    handleAtcSlotUpdates: function(d, e) {
        var f = this,
            a, c = {},
            b;
        for (b = 0; b < d.length; b += 1) {
            if (d[b].$className === 'TimesSquare.model.gantt.Leg' || d[b].$className === 'TimesSquare.model.gantt.Check') {
                a = d[b].getId();
                c[a] = []
            }
            if (d[b].$className === 'TimesSquare.model.gantt.AtcSlot') {
                a = d[b].getLegId();
                if (!c[a]) {
                    c[a] = []
                }
                c[a].push(d[b])
            }
        }
        for (b = 0; b < e.length; b += 1) {
            if (e[b].$className === 'TimesSquare.model.gantt.Leg' || e[b].$className === 'TimesSquare.model.gantt.Check') {
                a = e[b].getId();
                c[a] = []
            }
        }
        for (a in c) {
            if (c.hasOwnProperty(a)) {
                if (f.loadedAtcSlots[a]) {
                    Ext.Array.push(e, f.loadedAtcSlots[a])
                }
                if (c[a].length) {
                    f.loadedAtcSlots[a] = c[a]
                } else {
                    delete f.loadedAtcSlots[a]
                }
            }
        }
    },
    setAtcSlotTemplates: function(b) {
        var c = this,
            a;
        for (a = 0; a < b.length; a += 1) {
            c.atcSlotTemplates[b[a].templateType] = b[a].layout
        }
    },
    clockChanged: function(k) {
        var b = this,
            l = Date.now(),
            h = !1,
            j, e, i, a, c, d, g, f;
        if (b.started) {
            j = b.getController('gantt.Gantt');
            i = j.parameterList;
            for (e in b.loadedAtcSlots) {
                if (b.loadedAtcSlots.hasOwnProperty(e)) {
                    for (f = 0; f < b.loadedAtcSlots[e].length; f += 1) {
                        a = b.loadedAtcSlots[e][f];
                        d = a.getTemplateType();
                        if (d && d !== 'PROPOSED') {
                            c = b.getTiming(a, i, k);
                            if (c && c !== d) {
                                g = b.atcSlotTemplates[c];
                                if (!h) {
                                    Ext.suspendLayouts();
                                    h = !0
                                }
                                a.beginEdit();
                                a.setTemplateType(c);
                                a.setBgColor(g.bgColor);
                                a.setFgColor(g.fgColor);
                                a.endEdit()
                            }
                        }
                    }
                }
            }
        }
        if (h) {
            Ext.resumeLayouts(!0);
            Ext.log.info('[AtcSlot#clockChanged] Update atc slots: ' + (Date.now() - l) + ' ms')
        }
    },
    getTiming: function(a, c, o) {
        if (!a.getCtot()) {
            return
        }
        var h = c['com.lhsystems.ops.profile.server.dataimpl.defaultsapplconfiguration.ATC_DLY_TOLERANCE'],
            k = c['com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.ATC_TIMING_WITH_CTOT'],
            l = c['com.lhsystems.ops.profile.server.dataimpl.defaultsapplconfiguration.ATC_BUFFER_MINUS'],
            m = c['com.lhsystems.ops.profile.server.dataimpl.defaultsapplconfiguration.ATC_BUFFER_PLUS'],
            b, n = a.getBestDepTime(),
            g = a.getTaxiTime(),
            e = a.getCtot(),
            f, d, j, i;
        if (k === 'true') {
            f = e;
            d = e
        } else {
            f = Ext.Date.subtract(e, Ext.Date.MINUTE, l);
            d = Ext.Date.add(e, Ext.Date.MINUTE, m)
        }
        if (g && g !== 0) {
            b = Ext.Date.add(n, Ext.Date.MINUTE, g)
        } else {
            if (!b) {
                b = a.getBestTakeoffTime()
            }
        }
        if (!a.isDeparted() || a.isCancelled() || a.isReturnToRamp()) {
            j = Ext.Date.subtract(o, Ext.Date.MINUTE, h);
            if (d < j) {
                return 'MISSED'
            }
        }
        i = Ext.Date.subtract(f, Ext.Date.MINUTE, h);
        if (i > b) {
            return 'LATE'
        }
        if (d < b) {
            return 'CRITICAL'
        }
        return 'OK'
    }
});