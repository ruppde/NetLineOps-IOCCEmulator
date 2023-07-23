Ext.define('TimesSquare.model.gantt.Check', {
    extend: 'TimesSquare.model.gantt.Event',
    statics: {
        transformCheck: function(a) {
            var c = a.identifier,
                b = TimesSquare.model.gantt.Event.convertCommon(a);
            Ext.Object.merge(b, {
                StartDate: a.legDetail.schedule.departure,
                EndDate: a.legDetail.schedule.arrival,
                StartDateLocal: a.localTimes && a.localTimes.departureSched,
                EndDateLocal: a.localTimes && a.localTimes.arrivalSched,
                bgColor: a.layoutSchedule.bgColor,
                fgColor: a.layoutSchedule.fgColor,
                url: a.hyperMedia.urlCheckDetail,
                urlTooltip: a.hyperMedia.urlTooltip,
                urlTooltipLocal: a.hyperMedia.urlTooltipLocalAtAirport,
                urlStatusLine: a.hyperMedia && a.hyperMedia.urlStatusLine,
                urlStatusLineLocal: a.hyperMedia && a.hyperMedia.urlStatusLineLocalAtAirport,
                eventType: 'C',
                Cls: 'event-check-planned',
                naturalId: TimesSquare.model.IdFactory.getEventNaturalIdString(c),
                Name: a.name
            });
            if (a.eventType === 'ACTUAL') {
                b.Cls = 'event-check-unplanned'
            }
            b.Id = TimesSquare.model.IdFactory.getEventId(b.naturalId, b);
            return new this(b)
        }
    }
});
