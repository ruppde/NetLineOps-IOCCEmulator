Ext.define('TimesSquare.overrides.FormatRenderer', {
    override: 'Ext.util.Format',
    objToString: function(c, d, a) {
        var b = [];
        a = a || ', ';
        if (!c || !c.length) {
            return ''
        }
        Ext.Array.each(c, function(e) {
            if (e[d]) {
                b.push(e[d])
            }
        });
        if (b.length) {
            return b.join(a)
        }
        return ''
    },
    delayDurationRenderer: function(a) {
        if (!Ext.isNumeric(a)) {
            return ''
        }
        var b = '';
        if (a < 0) {
            b += '-';
            a *= -1
        }
        return b + Ext.String.leftPad(Math.floor(a / 60), 2, '0') + ':' + Ext.String.leftPad(a % 60, 2, '0')
    },
    durationRenderer: function(a) {
        if (a) {
            return Ext.String.leftPad(a.hours, 2, '0') + ':' + Ext.String.leftPad(a.minutes, 2, '0')
        }
        return a
    },
    booleanToString: function(a) {
        if (Ext.isBoolean(a)) {
            return a ? 'Y' : 'N'
        }
        return a
    },
    crewAddressRenderer: function(h) {
        var f, c, g, b, d, a, e = [];
        if (!h.length) {
            return ''
        }
        f = this.sortObjects(h, 'priority');
        Ext.Array.each(f, function(f) {
            g = f.street || '';
            b = f.cityName || '';
            d = f.zipCode || '';
            a = f.postalCountryCode || '';
            c = [g, b, d, a].join(' ');
            e.push(c)
        });
        return e.join(', ')
    },
    crewPhoneRenderer: function(d) {
        var c, a, b = [];
        if (!d.length) {
            return ''
        }
        c = this.sortObjects(d, 'priority');
        Ext.Array.each(c, function(c) {
            a = c.telephoneNumber || '';
            b.push(a)
        });
        return b.join(', ')
    },
    sortObjects: function(b, a) {
        b.sort(function(c, d) {
            if (c[a] === d[a]) {
                return 0
            }
            return c[a] < d[a] ? -1 : 1
        });
        return b
    },
    crewLegRenderer: function(b) {
        if (!b || !b.legId) {
            return ''
        }
        var c = b.legId,
            d = b.connectionTime,
            a = TimesSquare.model.IdFactory.getLegName(c.flight);
        a += '/';
        a += Ext.Date.format(Ext.Date.parse(c.dayOfOrigin, 'c'), 'dMy');
        a += '/';
        a += this.formatTime(d);
        return a
    },
    formatTime: function(a) {
        var c = Math.abs(a.hours),
            b = Math.abs(a.minutes),
            d = a.hours < 0 || a.minutes < 0 ? '-' : '';
        return d + Ext.String.leftPad(c, 2, '0') + ':' + Ext.String.leftPad(b, 2, '0')
    },
    concatRecordFields: function(e, c, d) {
        var b = [],
            a;
        Ext.Array.each(c, function(f) {
            a = e.get(f);
            if (a) {
                b.push(a)
            }
        });
        if (!b.length) {
            return ''
        }
        return b.join(d)
    }
});
