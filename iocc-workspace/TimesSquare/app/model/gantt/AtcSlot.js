Ext.define('TimesSquare.model.gantt.AtcSlot', {
    extend: 'TimesSquare.model.gantt.Event',
    statics: {
        transformAtcSlot: function(a, d, b) {
            var c = {
                displayState: a.displayState,
                displayTime: a.displayTime,
                ResourceId: a.registration,
                StartDate: a.startDate,
                EndDate: a.endDate,
                bgColor: a.layout.bgColor,
                fgColor: a.layout.fgColor,
                state: a.state,
                urlTooltip: a.hyperMedia && a.hyperMedia.urlTooltip,
                urlTooltipLocal: a.hyperMedia && a.hyperMedia.urlTooltipLocalAtAirport,
                urlStatusLine: a.hyperMedia && a.hyperMedia.urlStatusLine,
                urlStatusLineLocal: a.hyperMedia && a.hyperMedia.urlStatusLineLocalAtAirport,
                templateType: a.templateType,
                ctot: a.ctot,
                taxiTime: a.taxiTime,
                eventType: 'AS',
                Cls: 'event-atc-slot'
            };
            Ext.Object.merge(c, {
                bestDepTime: b.bestDepTime,
                bestTakeoffTime: b.bestTakeoffTime,
                isDeparted: b.isDeparted,
                isCancelled: b.isCancelled,
                isReturnToRamp: b.isReturnToRamp,
                departureAirport: b.legDetail.schedule.departureAirport,
                arrivalAirport: b.legDetail.schedule.arrivalAirport,
                dayOfOrigin: b.identifier.natKey.dayOfOrigin
            });
            if (c.state === 'SLC') {
                c.Cls = 'event-atc-slot-slc'
            }
            c.legId = d.getId();
            c.naturalId = d.getNaturalId();
            return new this(c)
        }
    },
    fields: [{
        name: 'legId',
        type: 'string'
    }, {
        name: 'state',
        type: 'string'
    }, {
        name: 'displayState',
        type: 'string'
    }, {
        name: 'displayTime',
        type: 'string'
    }, {
        name: 'templateType',
        type: 'string'
    }, {
        name: 'ctot',
        type: 'tsdate'
    }, {
        name: 'bestDepTime',
        type: 'tsdate'
    }, {
        name: 'bestTakeoffTime',
        type: 'tsdate'
    }, {
        name: 'isDeparted',
        type: 'boolean'
    }, {
        name: 'isCancelled',
        type: 'boolean'
    }, {
        name: 'isReturnToRamp',
        type: 'boolean'
    }, {
        name: 'taxiTime',
        type: 'int',
        convert: function(a) {
            var b = 0;
            if (a) {
                b = a.hours * 60 + a.minutes
            }
            return b
        }
    }],
    getLegId: function() {
        return this.get('legId')
    },
    getTemplateType: function() {
        return this.get('templateType')
    },
    setTemplateType: function(a) {
        this.set('templateType', a)
    },
    getCtot: function() {
        return this.get('ctot')
    },
    getBestDepTime: function() {
        return this.get('bestDepTime')
    },
    getBestTakeoffTime: function() {
        return this.get('bestTakeoffTime')
    },
    getTaxiTime: function() {
        return this.get('taxiTime')
    },
    setBgColor: function(a) {
        this.set('bgColor', a)
    },
    setFgColor: function(a) {
        this.set('fgColor', a)
    },
    isDeparted: function() {
        return this.get('isDeparted')
    },
    isCancelled: function() {
        return this.get('isCancelled')
    },
    isReturnToRamp: function() {
        return this.get('isReturnToRamp')
    }
});