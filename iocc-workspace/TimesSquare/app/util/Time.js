Ext.define('TimesSquare.util.Time', {
    singleton: !0,
    timeMode: 'utc',
    localAirport: null,
    localAirportTime: null,
    convert: function(b) {
        if (this.timeMode === 'utc' || !this.localAirport || !this.localAirportTime || !b) {
            return b
        }
        var a = new Date(b),
            f = this.localAirportTime,
            g = f.dstList || [],
            h = g.length,
            e = 0,
            d, c;
        a.setMinutes(a.getMinutes() + f.timezone.utcDifference * 1);
        d = Ext.Date.format(b, 'Y-m-d\\TH:i:s');
        for (; e < h; e += 1) {
            c = g[e];
            if (c.startDateTimeLocal <= d && d < c.endDateTimeLocal) {
                a.setMinutes(a.getMinutes() + c.diffLstDst * 1);
                break
            }
        }
        return a
    },
    createRederer: function(a) {
        var b = this;
        return function(c) {
            if (c) {
                return Ext.Date.format(b.convert(c), a)
            }
        }
    },
    getNextLocal: function(c, g, j, f) {
        f = arguments.length < 4 ? 1 : f;
        var h = TimesSquare.util.Time,
            d = h.convert(c),
            l = c - d,
            a, k, e, b, i;
        a = h.getNextOriginal(d, g, j, f);
        e = a - d;
        b = new Date(c + e);
        k = h.convert(b);
        i = b - k;
        if (l === i) {
            return b
        }
        d = new Date(c.getTime() - i);
        a = new Date(d);
        do {
            a = h.getNextOriginal(a, g, j, f);
            e = a - d;
            b = new Date(c + e)
        } while (b.getTime() <= c.getTime());
        if ((g === 'd' || g === 'w') && b.getTime() - c.getTime() < 8 * 3600 * 1000) {
            a = h.getNextOriginal(a, g, j, f);
            e = a - d;
            b = new Date(c + e)
        }
        return b
    },
    getNextOriginal: null,
    airportTimesCache: {},
    setAirport: function(b, d, e) {
        var a = this,
            c;
        if (!b) {
            a.localAirport = null;
            a.localAirportTime = null;
            return !0
        }
        c = a.getAirportTimeServiceKey(b, d, e);
        if (!a.airportTimesCache[c]) {
            return !1
        }
        a.localAirport = b;
        a.localAirportTime = a.airportTimesCache[c];
        return !0
    },
    isCached: function(a, d, e) {
        var c = this,
            b;
        if (!a) {
            return !0
        }
        b = c.getAirportTimeServiceKey(a, d, e);
        return !!c.airportTimesCache[b]
    },
    loadAirportTime: function(c, g, h, e, f) {
        var a = this,
            d = a.getAirportTimeServiceKey(c, g, h),
            b;
        b = {
            me: a,
            airport: c,
            callback: e,
            scope: f,
            key: d
        };
        TimesSquare.service.Oss.getAirportTimes({
            key: d
        }, a.loadAirportTimeCallback, b)
    },
    loadAirportTimeCallback: function(b) {
        var a = this.me,
            e = this.airport,
            d = this.callback,
            f = this.scope,
            c = this.key;
        if (b && b.success && b.result) {
            a.airportTimesCache[c] = b.result;
            a.localAirport = e;
            a.localAirportTime = a.airportTimesCache[c];
            d.apply(f || a, b.result)
        }
    },
    getAirportTimeServiceKey: function(a, b, c) {
        var d = [a, Ext.Date.format(b, 'dMy').toUpperCase(), c];
        return d.join('-')
    }
/*}, 0, 0, 0, 0, 0, 0, [TimesSquare.util, 'Time'], function() {
    var b = this,
        a = Sch.util.Date,
        c = a.getNext;
    b.getNextOriginal = function() {
        return c.apply(a, arguments)
    };
    a.getNext = b.getNextLocal */
}, function() {
    var b = this,
        a = Sch.util.Date,
        c = a.getNext;
    b.getNextOriginal = function() {
        return c.apply(a, arguments)
    }; //TODO
    console.log(a);
    console.log(b);
    a.getNext = b.getNextOriginal
});
