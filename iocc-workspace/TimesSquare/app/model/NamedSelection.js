Ext.define('TimesSquare.model.NamedSelection', {
    extend: 'Ext.data.Model',
    idProperty: 'selectionID',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    fields: [{
        name: 'selectionID',
        type: 'string'
    }, {
        name: 'beginDate',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'numberOfDays',
        type: 'int',
        convert: function(a) {
            var b = a;
            if (!a || a < 1) {
                b = 1
            }
            return b
        }
    }],
    getBeginDate: function() {
        return this.get('beginDate')
    },
    getNumberOfDays: function() {
        return this.get('numberOfDays')
    },
    associations: [{
        name: 'getAircraftSelections',
        type: 'hasMany',
        model: 'TimesSquare.model.SelectableAircraft',
        associationKey: 'aircraftSelections'
    }, {
        name: 'getLogicalAircraftSubfleets',
        type: 'hasMany',
        model: 'TimesSquare.model.SelectableAircraft',
        associationKey: 'logicalAircraftSubfleets'
    }]
});