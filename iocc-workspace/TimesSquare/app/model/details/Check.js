Ext.define('TimesSquare.model.details.Check', {
    extend: 'Ext.data.Model',
    idProperty: 'naturalId',
    proxy: {
        type: 'rest',
        appendId: !1,
        reader: {
            type: 'json',
            rootProperty: 'result'
        }
    },
    fields: [{
        name: 'naturalId',
        type: 'auto',
        mapping: 'identifier',
        convert: function(a) {
            return TimesSquare.model.IdFactory.getEventNaturalIdString(a)
        }
    }, {
        name: 'code',
        type: 'string',
        mapping: 'groundEvent.check.name'
    }, {
        name: 'begin',
        type: 'date',
        dateFormat: 'c',
        mapping: 'groundEvent.start'
    }, {
        name: 'end',
        type: 'date',
        dateFormat: 'c',
        mapping: 'groundEvent.end'
    }, {
        name: 'sequentialCode',
        type: 'string',
        mapping: 'groundEvent.check.seq',
        convert: function(a) {
            if (a === -1) {
                return null
            }
            return a
        }
    }, {
        name: 'airport',
        type: 'string',
        mapping: 'groundEvent.airport'
    }, {
        name: 'duration',
        type: 'auto',
        convert: function(a) {
            return Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'carriedOut',
        type: 'boolean',
        mapping: 'groundEvent.carriedOut'
    }, {
        name: 'minAssembleTime',
        type: 'auto',
        convert: function(a) {
            return Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'defaultDuration',
        type: 'auto',
        convert: function(a) {
            return Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'owner',
        type: 'string',
        mapping: 'groundEvent.logicalAircraft.owner'
    }, {
        name: 'subtype',
        type: 'string',
        mapping: 'groundEvent.logicalAircraft.subtype'
    }, {
        name: 'logicalNo',
        type: 'string',
        mapping: 'groundEvent.logicalAircraft.number'
    }, {
        name: 'registration',
        type: 'string',
        mapping: 'groundEvent.aircraft'
    }, {
        name: 'origRegistration',
        type: 'string',
        mapping: 'origRegistration'
    }, {
        name: 'deicing',
        type: 'boolean',
        mapping: 'deicing'
    }, {
        name: 'engineRun',
        type: 'boolean',
        mapping: 'engineRun'
    }, {
        name: 'etopsProhibit',
        type: 'boolean',
        mapping: 'etopsProhibit'
    }, {
        name: 'state',
        type: 'string',
        mapping: 'state'
    }, {
        name: 'workpackage',
        type: 'auto',
        mapping: 'groundEvent.workPackage',
        convert: function(a) {
            return Ext.util.Format.objToString(a, 'packageName')
        }
    }, {
        name: 'hangar',
        type: 'string',
        mapping: 'groundEvent.hangar'
    }, {
        name: 'remarks',
        type: 'string',
        mapping: 'groundEvent.checkComment'
    }, {
        name: 'priority',
        type: 'string',
        mapping: 'groundEvent.priority'
    }, {
        name: 'checkIncluded',
        type: 'auto',
        convert: function(a) {
            a = a || [];
            return a.join('\n')
        }
    }]
});