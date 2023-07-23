Ext.define('TimesSquare.controller.gantt.LogicalAircraft', {
    extend: 'Ext.app.Controller',
    logicalAcMap: null,
    labelNoMap: null,
    logicalAircraftTemplates: null,
    logicalNameTpl: new Ext.XTemplate('{0}/{1}'),
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
        a.logicalAcMap = {};
        a.labelNoMap = {};
        a.logicalAircraftTemplates = {}
    },
    getLogicalName: function(b, a) {
        return this.logicalNameTpl.apply([b, a])
    },
    getNextLabelNo: function(e, d) {
        var b = this,
            c = b.getLogicalName(e, d),
            a = b.labelNoMap[c];
        if (a) {
            a = a + 1
        } else {
            a = 1
        }
        b.labelNoMap[c] = a;
        return a
    },
    getLogicalAircraftLabels: function(b) {
        var d = this,
            c = Ext.String.format('{0}/{1}/{2}', b.getAircraftOwner(), b.getAircraftSubtype(), b.getLogicalNo()),
            a = d.logicalAcMap[c];
        if (!a) {
            a = d.getNextLabelNo(b.getAircraftOwner(), b.getAircraftSubtype());
            d.logicalAcMap[c] = a
        }
        a = Ext.String.leftPad(a, 2, '0');
        return {
            id: c,
            ac: Ext.String.format('{0} {1}', b.getAircraftSubtype(), a)
        }
    },
    handleLogicalAircrafts: function(g) {
        var d = this,
            i = g.length,
            f = d.getGanttResourcesStore(),
            e = 0,
            a, b, c, h;
        for (; e < i; e += 1) {
            b = g[e];
            if (b.isLogical()) {
                c = d.getLogicalAircraftLabels(b);
                b.setResourceId(c.id);
                if (!f.isExists(c.id)) {
                    h = d.getLogicalName(b.getAircraftOwner(), b.getAircraftSubtype());
                    a = d.logicalAircraftTemplates[h];
                    a = Ext.clone(a);
                    if (!a) {
                        continue
                    }
                    Ext.Object.merge(a, c);
                    f.addRawLogicalAircrafts([a])
                }
            }
        }
    },
    setLogicalAircraftTemplates: function(b) {
        var d = this,
            e = b.length,
            a, c;
        for (a = 0; a < e; a += 1) {
            c = d.getLogicalName(b[a].aircraft.owner, b[a].aircraft.subtype);
            d.logicalAircraftTemplates[c] = b[a]
        }
    }
});