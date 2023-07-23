Ext.define('TimesSquare.store.gantt.Events', {
    extend: 'Sch.data.EventStore', //ExSch
    model: 'Sch.model.Event',
    storeId: 'gantt.Events',
    sorters: [{
        sorterFn: function(a, b) {
            return a.compare(b)
        }
    }],
    statics: {
        transformEvent: function(a) {
            var c = [],
                g = TimesSquare.getApplication(),
                b = TimesSquare.model,
                d, f, e;
            if (a.legType === b.IdFactory.TYPE.LEG) {
                d = a.eventType;
                if (d === 'SCHEDULED' || d === 'ACTUAL') {
                    f = b.gantt.Leg.transformScheduledLeg(a);
                    c.push(f);
                    if (a.atcSlotList && a.atcSlotList.length) {
                        for (e = 0; e < a.atcSlotList.length; e += 1) {
                            c.push(b.gantt.AtcSlot.transformAtcSlot(a.atcSlotList[e], f, a))
                        }
                    }
                    if (d === 'ACTUAL') {
                        c.push(b.gantt.Leg.transformActualLeg(a))
                    }
                }
            } else {
                if (a.legType === b.IdFactory.TYPE.CHECK) {
                    c.push(b.gantt.Check.transformCheck(a))
                }
            }
            g.getController('gantt.LogicalAircraft').handleLogicalAircrafts(c);
            g.getController('gantt.NonRotationalAircraft').handleNonRotationalAircrafts(a);
            return c
        },
        transformEvents: function(d) {
            var e = [],
                f = d.length,
                c = 0,
                b, a;
            for (; c < f; c += 1) {
                b = this.transformEvent(d[c]);
                for (a = 0; a < b.length; a += 1) {
                    e.push(b[a])
                }
            }
            return e
        },
        mergeAmqUpdates: function(a, b) {
            this.applyEventsChanges(a, b.getUpdatedObjects(), function(d, e, c) {
                if (e.get('updateKey') < c.get('updateKey')) {
                    Ext.Array.splice(a, d, 1, c)
                }
            });
            this.applyEventsChanges(a, b.getDeletedObjects(), function(c) {
                Ext.Array.splice(a, c, 1)
            });
            b.clearChanges();
            return a
        },
        applyEventsChanges: function(c, a, b) {
            if (Ext.isEmpty(a)) {
                return
            }
            Ext.Array.forEach(a, function(d) {
                Ext.Array.some(c, function(e, f) {
                    if (e.get('Id') === d.get('Id')) {
                        b(f, e, d);
                        return !0
                    }
                })
            }, this)
        }
    },
    addRawEvents: function(e, d) {
        var b = this.self.transformEvents(e),
            c = TimesSquare.getApplication(),
            a = c.getController('gantt.AtcSlot');
        a.handleAtcSlots(b);
        a.setAtcSlotTemplates(d);
        this.loadData(this.self.mergeAmqUpdates(b, c.getController('Messaging').collectedMessageEvents))
    }
});