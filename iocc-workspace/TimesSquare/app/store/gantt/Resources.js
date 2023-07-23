Ext.define('TimesSquare.store.gantt.Resources', {
    extend: 'Sch.data.ResourceStore', //non ex???!!!
    model: 'TimesSquare.model.gantt.Resource',
    storeId: 'gantt.Resources',
    sorters: [{
        property: 'isOwn',
        direction: 'DESC'
    }, {
        property: 'owner',
        direction: 'ASC'
    }, {
        property: 'subtype',
        direction: 'ASC'
    }, {
        property: 'state',
        direction: 'ASC'
    }, {
        property: 'ac',
        direction: 'ASC'
    }],
    addRawAircrafts: function(e) {
        var c = [],
            d = [],
            g = e.length,
            b = 0,
            f = TimesSquare.getApplication(),
            a;
        for (b; b < g; b += 1) {
            a = e[b];
            if (a.aircraft.state === TimesSquare.model.gantt.Resource.TYPE.LOGICAL) {
                d.push(a)
            } else {
                c.push(TimesSquare.model.gantt.Resource.transformResource(a))
            }
        }
        f.getController('gantt.LogicalAircraft').setLogicalAircraftTemplates(d);
        f.getController('gantt.NonRotationalAircraft').setNonRotationalAircrafts(c);
        this.loadData(c)
    },
    addRawLogicalAircrafts: function(b) {
        var c = [],
            d = b.length,
            a;
        for (a = 0; a < d; a += 1) {
            c.push(TimesSquare.model.gantt.Resource.transformLogicalResource(b[a]))
        }
        this.loadData(c, !0)
    },
    addNonExisitingNonRotationalAircraft: function(a, c) {
        var d = this,
            b = [];
        b.push(TimesSquare.model.gantt.Resource.transformResource({
            aircraft: {
                owner: a.getOwner(),
                subtype: a.getSubtype(),
                isRotational: !1,
                registration: c,
                ac: c,
                state: TimesSquare.model.gantt.Resource.TYPE.PHYSICAL
            },
            layout: {
                bgColor: d.increase_brightness(a.getBgColor(), 50),
                fgColor: a.getFgColor()
            },
            hyperMedia: {}
        }));
        this.loadData(b, !0)
    },
    isExists: function(d) {
        var b = this.data.items,
            c = b.length,
            a = 0;
        for (; a < c; a += 1) {
            if (b[a].data.Id === d) {
                return !0
            }
        }
        return !1
    },
    increase_brightness: function(a, b) {
        a = a.replace(/^\s*#|\s*$/g, '');
        if (a.length === 3) {
            a = a.replace(/(.)/g, '$1$1')
        }
        var e = parseInt(a.substr(0, 2), 16),
            d = parseInt(a.substr(2, 2), 16),
            c = parseInt(a.substr(4, 2), 16);
        return '#' + (0 | (1 << 8) + e + (256 - e) * b / 100).toString(16).substr(1) + (0 | (1 << 8) + d + (256 - d) * b / 100).toString(16).substr(1) + (0 | (1 << 8) + c + (256 - c) * b / 100).toString(16).substr(1)
    },
    loadDataBuffer: !1,
    _buffer: null,
    enableLoadDataBuffer: function() {
        this.loadDataBuffer = !0;
        this._buffer = []
    },
    flushLoadDataBuffer: function() {
        this.loadDataBuffer = !1;
        this.loadData(this._buffer);
        this._buffer = null
    },
    loadData: function(b, a) {
        if (!this.loadDataBuffer) {
            return Sch.data.ResourceStore.prototype.loadData.apply(this, arguments)
        }
        if (!a) {
            this._buffer = []
        }
        Array.prototype.push.apply(this._buffer, b)
    },
    findRecord: function(d, e) {
        if (!this.loadDataBuffer) {
            return Sch.data.ResourceStore.prototype.findRecord.apply(this, arguments)
        }
        var c = this._buffer,
            f = c.length,
            a, b;
        for (b = 0; b < f; b++) {
            a = c[b];
            if (a.data && a.data[d] === e) {
                return a
            }
        }
        return null
    },
    debugListeners: function() {
        Ext.iterate(this.events, function(b, a) {
            Ext.log.info(b + ': ' + (a.listeners && a.listeners.length || 0))
        })
    }
});