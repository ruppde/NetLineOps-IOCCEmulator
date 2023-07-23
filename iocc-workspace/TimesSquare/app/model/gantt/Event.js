Ext.define('TimesSquare.model.gantt.Event', {
    extend: 'Sch.model.Event', // non ex ????
    statics: {
        convertCommon: function(a) {
            var b = {
                ResourceId: a.legDetail.schedule.rotationIdentifier.registration,
                departureAirport: a.legDetail.schedule.departureAirport,
                arrivalAirport: a.legDetail.schedule.arrivalAirport,
                aircraftOwner: a.legDetail.schedule.aircraftOwner,
                aircraftSubtype: a.legDetail.schedule.aircraftSubtype,
                diversionAirport: a.legDetail.actuals && a.legDetail.actuals.diversionAirport,
                urlStatusLine: a.hyperMedia && a.hyperMedia.urlStatusLine,
                urlStatusLineLocal: a.hyperMedia && a.hyperMedia.urlStatusLineLocalAtAirport,
                dayOfOrigin: a.identifier.natKey.dayOfOrigin,
                state: a.legDetail.state,
                userMarkers: Ext.Array.map(a.userMarkers || [], function(b) {
                    return TimesSquare.model.gantt.UserMarker.create(b)
                }),
                systemMarkers: Ext.Array.map(a.systemMarkers || [], function(b) {
                    return TimesSquare.model.gantt.SystemMarker.create(b)
                }),
                remarks: Ext.Array.map(a.legDetail.remarks || [], function(b) {
                    return TimesSquare.model.gantt.Remark.create(b)
                })
            };
            return b
        }
    },
    fields: [{
        name: 'StartDate',
        type: 'tsdate' //Tsdate
    }, {
        name: 'EndDate',
        type: 'tsdate' //Tsdate
    }, {
        name: 'StartDateLocal',
        type: 'tsdate' //Tsdate
    }, {
        name: 'EndDateLocal',
        type: 'tsdate' //Tsdate
    }, {
        name: 'bgColor',
        type: 'string'
    }, {
        name: 'fgColor',
        type: 'string'
    }, {
        name: 'departureAirport',
        type: 'string'
    }, {
        name: 'arrivalAirport',
        type: 'string'
    }, {
        name: 'diversionAirport',
        type: 'string',
        defaultValue: null,
        allowNull: !0
    }, {
        name: 'aircraftOwner',
        type: 'string'
    }, {
        name: 'aircraftSubtype',
        type: 'string'
    }, {
        name: 'eventType',
        type: 'string'
    }, {
        name: 'state',
        type: 'string'
    }, {
        name: 'naturalId',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }, {
        name: 'tooltip',
        type: 'auto',
        defaultValue: null,
        allowNull: !0
    }, {
        name: 'urlTooltip',
        type: 'string'
    }, {
        name: 'tooltipLocal',
        type: 'auto',
        defaultValue: null,
        allowNull: !0
    }, {
        name: 'urlTooltipLocal',
        type: 'string'
    }, {
        name: 'urlStatusLine',
        type: 'string'
    }, {
        name: 'urlStatusLineLocal',
        type: 'string'
    }, {
        name: 'logicalNo',
        defaultValue: null,
        allowNull: !0,
        type: 'int'
    }, {
        name: 'dayOfOrigin',
        type: 'tsdate' //Tsdate
    }, {
        name: 'ActualStartDate',
        type: 'tsdate' //Tsdate
    }, {
        name: 'ActualEndDate',
        type: 'tsdate' //Tsdate
    }, {
        name: 'overlapCount',
        type: 'int',
        defaultValue: 0,
        persist: !1
    }, {
        name: 'userMarkers',
        type: 'auto'
    }, {
        name: 'systemMarkers',
        type: 'auto'
    }, {
        name: 'remarks',
        type: 'auto'
    }, {
        name: 'updateKey',
        type: 'int',
        useNull: !1
    }],
    getNestedBy: function(d, a, c) {
        var b = this.get(d);
        if (!Ext.isArray(b)) {
            return
        }
        return Ext.Array.findBy(b, function(b) {
            return b.get(a) === c || b[a] === c
        })
    },
    isLogical: function() {
        return !Ext.isEmpty(this.getLogicalNo())
    },
    getLogicalNo: function() {
        return this.get('logicalNo')
    },
    getDepartureAirport: function() {
        return this.get('departureAirport')
    },
    getArrivalAirport: function() {
        return this.get('arrivalAirport')
    },
    getAircraftOwner: function() {
        return this.get('aircraftOwner')
    },
    getAircraftSubtype: function() {
        return this.get('aircraftSubtype')
    },
    getBgColor: function() {
        return this.get('bgColor')
    },
    getFgColor: function() {
        return this.get('fgColor')
    },
    getNaturalId: function() {
        return this.get('naturalId')
    },
    getUrl: function() {
        return this.get('url')
    },
    getTooltip: function() {
        return this.get('tooltip')
    },
    compare: function(g) {
    //    console.log(g);
        var a = this.data,
            b = g.data,
            c = a.StartDate.utc,
            d = b.StartDate.utc,
            e = a.EndDate.utc,
            f = b.EndDate.utc;
        if (c === d) {
            if (e === f && a.counter !== null && b.counter !== null) {
                return a.counter - b.counter
            }
            return e > f ? -1 : 1
        }
        return c < d ? -1 : 1
    }
});
