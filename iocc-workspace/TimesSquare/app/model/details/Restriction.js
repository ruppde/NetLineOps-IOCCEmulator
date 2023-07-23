Ext.define('TimesSquare.model.details.Restriction', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'memory'
    },
    fields: [{
        name: 'type',
        type: 'string'
    }, {
        name: 'validFrom',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'validUntil',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'acknowledgeState',
        type: 'string'
    }, {
        name: 'acknowledgeUser',
        type: 'string'
    }, {
        name: 'acknowledgeDate',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'remarks',
        type: 'string'
    }, {
        name: 'missingRequirements',
        type: 'string'
    }, {
        name: 'expireDate',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'totalFlightHours',
        type: 'auto',
        convert: function(a) {
            return Ext.util.Format.durationRenderer(a)
        }
    }, {
        name: 'totalCycles',
        type: 'number'
    }, {
        name: 'ataCode',
        type: 'string',
        mapping: 'ataChapter',
        convert: function(c, b) {
            var a = ['ataChapter', 'ataSubChapter', 'ataSection', 'ataItem'];
            return Ext.util.Format.concatRecordFields(b, a, ' / ')
        }
    }, {
        name: 'ataChapter',
        type: 'string'
    }, {
        name: 'ataSubChapter',
        type: 'string'
    }, {
        name: 'ataSection',
        type: 'string'
    }, {
        name: 'ataItem',
        type: 'string'
    }, {
        name: 'ataDescription',
        type: 'string'
    }, {
        name: 'description',
        type: 'string'
    }, {
        name: 'limitations',
        type: 'string'
    }, {
        name: 'technicalReason',
        type: 'string'
    }, {
        name: 'aircraftFeature',
        type: 'string'
    }]
});
