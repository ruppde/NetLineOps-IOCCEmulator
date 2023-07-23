Ext.define('TimesSquare.model.gantt.Leg', {
    extend: 'TimesSquare.model.gantt.Event',
    statics: {
        transformActualLeg: function(a) {
            var c = a.identifier,
                b = TimesSquare.model.gantt.Event.convertCommon(a);
            Ext.Object.merge(b, {
                StartDate: a.legDetail.actuals.offblockTime, //.value,
                EndDate: a.legDetail.actuals.onblockTime, //.value,
                StartDateLocal: a.localTimes && a.localTimes.departureActual,
                EndDateLocal: a.localTimes && a.localTimes.arrivalActual,
                bgColor: a.layoutActual.bgColor,
                fgColor: a.layoutActual.fgColor,
                url: a.hyperMedia.urlLegDetail,
                urlTooltip: a.hyperMedia.urlTooltip,
                urlTooltipLocal: a.hyperMedia.urlTooltipLocalAtAirport,
                urlStatusLine: a.hyperMedia && a.hyperMedia.urlStatusLine,
                urlStatusLineLocal: a.hyperMedia && a.hyperMedia.urlStatusLineLocalAtAirport,
                eventType: 'A',
                Cls: 'event-leg-actual',
                logicalNo: a.legDetail.schedule.rotationIdentifier.logicalNo,
                Name: a.name
            });
            b.naturalId = TimesSquare.model.IdFactory.getEventNaturalIdString(c);
            b.counter = c.natKey.counter;
            b.updateKey = a.updateKey;
            b.Id = TimesSquare.model.IdFactory.getEventId(b.naturalId, b);
            return new this(b)
        },
        transformScheduledLeg: function(a) {
            var c = a.identifier,
                b = TimesSquare.model.gantt.Event.convertCommon(a);
            Ext.apply(b, {
                StartDate: a.legDetail.schedule.departure,
                EndDate: a.legDetail.schedule.arrival,
                StartDateLocal: a.localTimes && a.localTimes.departureSched,
                EndDateLocal: a.localTimes && a.localTimes.arrivalSched,
                bgColor: a.layoutSchedule.bgColor,
                fgColor: a.layoutSchedule.fgColor,
                url: a.hyperMedia.urlLegDetail,
                urlTooltip: a.hyperMedia.urlTooltip,
                urlTooltipLocal: a.hyperMedia.urlTooltipLocalAtAirport,
                urlStatusLine: a.hyperMedia && a.hyperMedia.urlStatusLine,
                urlStatusLineLocal: a.hyperMedia && a.hyperMedia.urlStatusLineLocalAtAirport,
                eventType: 'S',
                Cls: 'event-leg-scheduled',
                logicalNo: a.legDetail.schedule.rotationIdentifier.logicalNo,
                ActualStartDate: a.eventType === 'ACTUAL' ? a.legDetail.actuals.offblockTime : null,//.value : null, //.value
                ActualEndDate: a.eventType === 'ACTUAL' ? a.legDetail.actuals.onblockTime : null,//.value : null,  //.value
                Name: a.name
            });
            b.naturalId = TimesSquare.model.IdFactory.getEventNaturalIdString(c);
            b.counter = c.natKey.counter;
            b.updateKey = a.updateKey;
            b.Id = TimesSquare.model.IdFactory.getEventId(b.naturalId, b);
            return new this(b)
        }
    }
});
