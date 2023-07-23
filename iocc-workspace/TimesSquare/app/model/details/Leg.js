Ext.define('TimesSquare.model.details.Leg', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'rest',
        appendId: !1,
        reader: {
            type: 'json',
            rootProperty: 'result'
        }
    },
    getCrewDetailUrl: function() {
        var a = this.get('hyperMedia'),
            b = a && a.urlCrewDetail;
        return b
    },
    getFlightLogUrl: function() {
        var a = this.get('hyperMedia'),
            b = a && a.urlFlightlog || null;
        return b
    },
    fields: [{
        name: 'hyperMedia',
        type: 'auto'
    }, {
        name: 'naturalId',
        type: 'auto',
        mapping: 'identifier',
        convert: function(a) {
            return a && TimesSquare.model.IdFactory.getEventNaturalIdString(a)
        }
    }, {
        name: 'flight',
        type: 'auto',
        mapping: 'identifier.natKey.flight',
        convert: function(a) {
            if (!a) {
                return a
            }
            var b = '';
            if (a.fnSuffix) {
                b = a.fnSuffix
            }
            return a.fnCarrier + a.fnNumber + b
        }
    }, {
        name: 'flightDoo',
        type: 'date',
        dateFormat: 'c',
        mapping: 'identifier.natKey.dayOfOrigin'
    }, {
        name: 'ldoOffset',
        type: 'auto',
        mapping: 'legDetail.schedule.ldoOffset'
    }, {
        name: 'flightLdo',
        type: 'date',
        mapping: 'identifier.natKey.dayOfOrigin',
        convert: function(a, b) {
            a = Ext.Date.parse(a, 'c');
            if (a && b.data.ldoOffset) {
                a = Ext.Date.add(a, Ext.Date.DAY, b.data.ldoOffset)
            }
            return a
        }
    }, {
        name: 'callSign',
        type: 'string',
        mapping: 'callsign'
    }, {
        name: 'serviceType',
        type: 'string',
        mapping: 'legDetail.schedule.serviceType'
    }, {
        name: 'problem',
        type: 'string'
    }, {
        name: 'departureAirport',
        type: 'string',
        mapping: 'legDetail.schedule.departureAirport'
    }, {
        name: 'departure',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.schedule.departure'
    }, {
        name: 'arrivalAirport',
        type: 'string',
        mapping: 'legDetail.schedule.arrivalAirport'
    }, {
        name: 'arrival',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.schedule.arrival'
    }, {
        name: 'localDeparture',
        type: 'date',
        dateFormat: 'c',
        mapping: 'depTimeLocalAtAirport'
    }, {
        name: 'bestDepartureTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'bestDepTime'
    }, {
        name: 'localArrival',
        type: 'date',
        dateFormat: 'c',
        mapping: 'arrTimeLocalAtAirport'
    }, {
        name: 'bestArrivalTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'bestArrTime'
    }, {
        name: 'aircraftOwner',
        type: 'string',
        mapping: 'legDetail.schedule.aircraftOwner'
    }, {
        name: 'aircraftSubtype',
        type: 'string',
        mapping: 'legDetail.schedule.aircraftSubtype'
    }, {
        name: 'rotation',
        type: 'string',
        mapping: 'rotation'
    }, {
        name: 'registration',
        type: 'string',
        mapping: 'legDetail.schedule.rotationIdentifier.registration'
    }, {
        name: 'aircraftConfiguration',
        type: 'string',
        mapping: 'legDetail.schedule.aircraftConfiguration'
    }, {
        name: 'prbd',
        type: 'string'
    }, {
        name: 'employerCockpit',
        type: 'string',
        mapping: 'legDetail.schedule.employerCockpit'
    }, {
        name: 'employerCabin',
        type: 'string',
        mapping: 'legDetail.schedule.employerCabin'
    }, {
        name: 'operatingCarrier',
        type: 'string'
    }, {
        name: 'commercialCarrier',
        type: 'string'
    }, {
        name: 'dispatchOffice',
        type: 'string'
    }, {
        name: 'jointOperator',
        type: 'auto'
    }, {
        name: 'changeReason',
        type: 'auto',
        mapping: 'legDetail.changeInfo.changeReason',
        convert: function(a) {
            if (Ext.isArray(a)) {
                return a.join(',')
            }
            return a
        }
    }, {
        name: 'initialSubtype',
        type: 'string'
    }, {
        name: 'actualFrom',
        type: 'string',
        mapping: 'actualDepartureAirport'
    }, {
        name: 'adviseTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.adviseTime'
    }, {
        name: 'taxiOut',
        type: 'string',
        mapping: 'taxiOutTime',
        convert: function(a) {
            return a && Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'estimatedTimeDeparture',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.estimatedTimeDeparture.value'
    }, {
        name: 'mvtEstimatedTakeOffTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'mvtEstimatedTakeOffTime'
    }, {
        name: 'airborneTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.airborneTime.value'
    }, {
        name: 'offblockTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.offblockTime.value'
    }, {
        name: 'mvtAfterPushbackTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.mvtAfterPushbackTime'
    }, {
        name: 'delay',
        type: 'auto',
        mapping: 'legDetail.actuals.delay',
        convert: function(a) {
            var b;
            if (a && a.length) {
                for (b = 0; b < a.length; b += 1) {
                    a[b].delayTime = Ext.util.Format.delayDurationRenderer(a[b].delayTime)
                }
            }
            return a
        }
    }, {
        name: 'toDelayCode',
        type: 'string',
        mapping: 'toDelayCode'
    }, {
        name: 'toDelayTime',
        type: 'string',
        mapping: 'toDelayTime',
        convert: function(a) {
            return a && Ext.util.Format.delayDurationRenderer(a)
        }
    }, {
        name: 'depStand',
        type: 'string',
        mapping: 'legDetail.misc.depStand'
    }, {
        name: 'depGate',
        type: 'string',
        mapping: 'legDetail.misc.depGate'
    }, {
        name: 'isk',
        type: 'boolean',
        mapping: 'isk'
    }, {
        name: 'actualTo',
        type: 'string',
        mapping: 'actualArrivalAirport'
    }, {
        name: 'eet',
        type: 'string',
        mapping: 'estimatedEnrouteTime',
        convert: function(a) {
            return a && Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'taxiIn',
        type: 'string',
        mapping: 'taxiInTime',
        convert: function(a) {
            return a && Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'mvtEstimatedTouchdownTime',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'estimatedTimeArrival',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.estimatedTimeArrival'
    }, {
        name: 'landingTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.landingTime.value'
    }, {
        name: 'onblockTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'legDetail.actuals.onblockTime.value'
    }, {
        name: 'arrStand',
        type: 'string',
        mapping: 'legDetail.misc.arrStand'
    }, {
        name: 'arrGate',
        type: 'string',
        mapping: 'legDetail.misc.arrGate'
    }, {
        name: 'diversionReason',
        type: 'string',
        mapping: 'legDetail.changeInfo.diversionReason'
    }, {
        name: 'cycles',
        type: 'string',
        mapping: 'legDetail.performance.cycles'
    }, {
        name: 'flightHours',
        type: 'auto',
        mapping: 'legDetail.performance.flightHours',
        convert: function(a) {
            return a && Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'internalRemark',
        type: 'auto',
        mapping: 'internalRemark',
        defaultValue: null,
        allowNull: !0
    }, {
        name: 'opsRemark',
        type: 'string',
        mapping: 'opsRemark'
    }, {
        name: 'userMarkers',
        type: 'auto',
        mapping: 'userMarkers',
        convert: function(a) {
            return Ext.Array.map(a || [], function(b) {
                return TimesSquare.model.gantt.UserMarker.create(b)
            })
        }
    }, {
        name: 'acarsFrom',
        type: 'string',
        mapping: 'actualDepartureAirport'
    }, {
        name: 'acarsState',
        type: 'string',
        mapping: 'acarsState'
    }, {
        name: 'acarsInit',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'acarsDoorsClosed',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'acarsEstimatedTimeDeparture',
        type: 'date',
        dateFormat: 'c',
        mapping: 'acars.estimatedTimeDeparture'
    }, {
        name: 'acarsEstimatedTakeOffTime',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'acarsOffblockTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'acars.offblockTime.value'
    }, {
        name: 'acarsAirborneTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'acars.airborneTime.value'
    }, {
        name: 'acarsTo',
        type: 'string',
        mapping: 'actualArrivalAirport'
    }, {
        name: 'acarsEstimatedTouchdownTime',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'acarsEstimatedTimeArrival',
        type: 'date',
        dateFormat: 'c',
        mapping: 'acars.estimatedTimeArrival'
    }, {
        name: 'acarsLandingTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'acars.landingTime.value'
    }, {
        name: 'acarsOnblockTime',
        type: 'date',
        dateFormat: 'c',
        mapping: 'acars.onblockTime.value'
    }, {
        name: 'state',
        type: 'string',
        mapping: 'legDetail.state',
        convert: function(b, a) {
            if (a.get('isk')) {
                return 'ISK'
            }
            return b
        }
    }]
});
