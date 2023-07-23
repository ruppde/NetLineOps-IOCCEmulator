Ext.define('TimesSquare.model.details.Crew', {
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
        name: 'crewMemberID',
        type: 'string',
        mapping: 'crew.crewMemberID'
    }, {
        name: 'rank',
        type: 'string'
    }, {
        name: 'crewMemberFirstName',
        mapping: 'crew.crewMemberFirstName'
    }, {
        name: 'crewMemberName',
        mapping: 'crew.crewMemberName'
    }, {
        name: 'crewMemberFullName',
        type: 'string',
        presist: !1,
        mapping: 'crew',
        convert: function(a) {
            var b = a.crewMemberFirstName || '',
                c = a.crewMemberName || '';
            return b + ' ' + c
        }
    }, {
        name: 'crewMemberAddress',
        type: 'string',
        mapping: 'crew.crewMemberAddress',
        convert: function(a) {
            return Ext.util.Format.crewAddressRenderer(a)
        }
    }, {
        name: 'crewMemberPhone',
        type: 'string',
        mapping: 'crew.crewMemberContact',
        convert: function(a) {
            return Ext.util.Format.crewPhoneRenderer(a)
        }
    }, {
        name: 'qualifications',
        type: 'string'
    }, {
        name: 'acChange',
        type: 'boolean'
    }, {
        name: 'prevLeg',
        type: 'string',
        mapping: 'legPrevious'
    }, {
        name: 'nextLeg',
        type: 'string',
        mapping: 'legNext'
    }, {
        name: 'crewGroup',
        type: 'string',
        sortType: function(b) {
            var a = {
                'F': 1,
                'C': 2,
                'D': 3
            };
            return a[b] || 4
        }
    }, {
        name: 'priorityInGroup',
        type: 'int'
    }]
});