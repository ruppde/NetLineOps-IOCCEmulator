Ext.define('TimesSquare.model.gantt.Resource', {
    extend: 'Sch.model.Resource', // non ex???!!!
    statics: {
        TYPE: {
            PHYSICAL: 'PHYSICAL',
            OVERFLOW: 'OVERFLOW',
            LOGICAL: 'LOGICAL'
        },
        transformResource: function(a) {
            var b = this.transformCommon(a);
            return Ext.create('TimesSquare.model.gantt.Resource', b)
        },
        transformLogicalResource: function(a) {
            var b = this.transformCommon(a);
            b.ac = a.ac;
            b.Id = a.id;
            return Ext.create('TimesSquare.model.gantt.Resource', b)
        },
        transformCommon: function(a) {
            var b = {
                owner: a.aircraft.owner,
                state: a.aircraft.state,
                subtype: a.aircraft.subtype,
                bgColor: a.layout.bgColor,
                fgColor: a.layout.fgColor,
                url: a.hyperMedia.urlAircraftDetail,
                registration: a.aircraft.registration,
                alternativeRegistration: a.aircraft.alternativeRegistration,
                isRotational: a.aircraft.isRotational,
                isOwn: a.aircraft.isOwn,
                ac: a.aircraft.ac,
                Id: a.aircraft.registration
            };
            if (a.customSort && a.customSort.length) {
                Ext.each(a.customSort, function(c) {
                    b['custom_sorter_' + c.id] = c.hashValue
                })
            }
            return b
        }
    },
    fields: [{
        name: 'ac',
        type: 'string'
    }, {
        name: 'owner',
        type: 'string'
    }, {
        name: 'registration',
        type: 'string'
    }, {
        name: 'alternativeRegistration',
        type: 'string'
    }, {
        name: 'state',
        type: 'string'
    }, {
        name: 'subtype',
        type: 'string'
    }, {
        name: 'isRotational',
        type: 'boolean'
    }, {
        name: 'isOwn',
        type: 'boolean'
    }, {
        name: 'bgColor',
        type: 'string'
    }, {
        name: 'fgColor',
        type: 'string'
    }, {
        name: 'url',
        type: 'string'
    }, {
        name: 'custom_sorter_1',
        type: 'string'
    }, {
        name: 'custom_sorter_2',
        type: 'string'
    }, {
        name: 'custom_sorter_3',
        type: 'string'
    }, {
        name: 'custom_sorter_4',
        type: 'string'
    }, {
        name: 'custom_sorter_5',
        type: 'string'
    }],
    getOwner: function() {
        return this.get('owner')
    },
    getSubtype: function() {
        return this.get('subtype')
    },
    getRegistration: function() {
        return this.get('registration')
    },
    getBgColor: function() {
        return this.get('bgColor')
    },
    getFgColor: function() {
        return this.get('fgColor')
    },
    getUrl: function() {
        return this.get('url')
    },
    isRotational: function() {
        return this.get('isRotational')
    },
    isOwn: function() {
        return this.get('isOwn')
    }
});