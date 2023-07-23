Ext.define('TimesSquare.model.details.FlightLog', {
    extend: 'Ext.data.Model',
    idProperty: 'crewMemberID',
    proxy: {
        type: 'rest',
        appendId: !1,
        reader: {
            type: 'json',
            rootProperty: 'result'
        }
    },
    fields: [{
        name: 'flRefNo',
        type: 'int'
    }, {
        name: 'checkedByLog',
        type: 'boolean'
    }, {
        name: 'arrivalAirport',
        type: 'string'
    }, {
        name: 'offblockDate',
        persist: !1,
        convert: function(a, b) {
            a = b.data.offblockTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'offblockTime',
        convert: function(a, b) {
            a = b.data.offblockTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'takeoffDate',
        persist: !1,
        convert: function(a, b) {
            a = b.data.takeoffTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'takeoffTime',
        convert: function(a, b) {
            a = b.data.takeoffTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'touchdownDate',
        persist: !1,
        convert: function(a, b) {
            a = b.data.touchdownTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'touchdownTime',
        convert: function(a, b) {
            a = b.data.touchdownTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'onblockDate',
        persist: !1,
        convert: function(a, b) {
            a = b.data.onblockTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'onblockTime',
        convert: function(a, b) {
            a = b.data.onblockTime;
            return a && (a instanceof Date ? a : Ext.Date.parse(a.value, 'c')) || null
        }
    }, {
        name: 'departureDelay',
        type: 'auto'
    }, {
        name: 'departureIrregularities',
        type: 'auto'
    }, {
        name: 'arrivalDelays',
        type: 'auto'
    }, {
        name: 'instrFlightTime',
        type: 'string'
    }, {
        name: 'cycles',
        type: 'int'
    }, {
        name: 'touchAndGo',
        type: 'int'
    }],
    getCalculatedFieldValues: function() {
        var b = this,
            c = b.get('arrivalDelays') || null,
            i = b.get('onblockTime'),
            h = b.get('offblockTime'),
            e = i && h ? (+i - +h) / 60000 : null,
            g = b.get('touchdownTime'),
            j = b.get('takeoffTime'),
            f = g && j ? (+g - +j) / 60000 : null,
            a = {
                mergedArrivalDelays: [],
                mergedDepartureDelays: []
            },
            d;
        Ext.each(b.get('departureDelay') || [], function(c, b) {
            Ext.iterate(c, function(e, d) {
                if (e === 'delayTime' && Ext.isNumeric(d)) {
                    d = Ext.util.Format.delayDurationRenderer(d)
                }
                if (!a.mergedDepartureDelays[b]) {
                    a.mergedDepartureDelays[b] = {}
                }
                a.mergedDepartureDelays[b][e] = d
            });
            a.departureTotal = (a.departureTotal || 0) + c.delayTime
        });
        Ext.each(b.get('departureIrregularities') || [], function(c, b) {
            Ext.iterate(c, function(e, d) {
                if (!a.mergedDepartureDelays[b]) {
                    a.mergedDepartureDelays[b] = {}
                }
                a.mergedDepartureDelays[b]['irregularities.' + e] = d
            })
        });
        a.hasArrivalDelays = !!c;
        if (c) {
            if (c.calcDelayAtArrival) {
                d = c.inflightDelay;
                if (d) {
                    d.delayTime += a.departureTotal || 0
                }
            } else {
                d = c.arrivalDelay
            }
            Ext.each(d || [], function(c, b) {
                Ext.iterate(c, function(e, d) {
                    if (e === 'delayTime' && Ext.isNumeric(d)) {
                        d = Ext.util.Format.delayDurationRenderer(d)
                    }
                    if (!a.mergedArrivalDelays[b]) {
                        a.mergedArrivalDelays[b] = {}
                    }
                    a.mergedArrivalDelays[b][e] = d
                });
                a.arrivalTotal = (a.arrivalTotal || 0) + c.delayTime
            });
            Ext.each(c.arrivalIrregularities || [], function(c, b) {
                Ext.iterate(c, function(e, d) {
                    if (!a.mergedArrivalDelays[b]) {
                        a.mergedArrivalDelays[b] = {}
                    }
                    a.mergedArrivalDelays[b]['irregularities.' + e] = d
                })
            });
            a.arrivalTotal = Ext.util.Format.delayDurationRenderer(a.arrivalTotal)
        }
        a.blockFlightTimeMin = Ext.util.Format.delayDurationRenderer(e);
        a.blockFlightTimeDec = e === null ? '' : Ext.Number.toFixed(e / 60, 2);
        a.airFlightTimeMin = Ext.util.Format.delayDurationRenderer(f);
        a.airFlightTimeDec = f === null ? '' : Ext.Number.toFixed(f / 60, 2);
        a.departureTotal = Ext.util.Format.delayDurationRenderer(a.departureTotal);
        return a
    }
});
