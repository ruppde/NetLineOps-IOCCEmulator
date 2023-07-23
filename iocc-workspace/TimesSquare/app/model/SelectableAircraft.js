Ext.define('TimesSquare.model.SelectableAircraft', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    fields: [{
        name: 'owner',
        type: 'string'
    }, {
        name: 'ownerName',
        type: 'string'
    }, {
        name: 'subtype',
        type: 'string'
    }, {
        name: 'subtypeName',
        type: 'string'
    }, {
        name: 'state',
        type: 'string'
    }, {
        name: 'selected',
        type: 'boolean',
        defaultValue: !1
    }, {
        name: 'registration',
        type: 'string',
        convert: function(b, a) {
            if (a.isLogical()) {
                return Ext.String.format('{0}/{1}', a.getOwner(), a.getSubtype())
            }
            return b
        }
    }],
    equalsAircraft: function(a) {
        var b = this.getRegistration() === a.getRegistration() && this.getOwner() === a.getOwner() && this.getSubtype() === a.getSubtype();
        return b
    },
    equalsLogicalAircraft: function(a) {
        var b = this.isLogical() && this.getOwner() === a.getOwner() && this.getSubtype() === a.getSubtype();
        return b
    },
    isLogical: function() {
        return this.get('state') === TimesSquare.model.gantt.Resource.TYPE.LOGICAL
    },
    isSelected: function() {
        return this.get('selected')
    },
    setSelected: function(a) {
        this.set('selected', a)
    },
    getRegistration: function() {
        return this.get('registration')
    },
    getOwner: function() {
        return this.get('owner')
    },
    getSubtype: function() {
        return this.get('subtype')
    },
    getAircraftSelection: function() {
        return {
            registration: this.getRegistration(),
            owner: this.getOwner(),
            subtype: this.getSubtype()
        }
    },
    getLogicalAircraftSubfleet: function() {
        return {
            owner: this.getOwner(),
            subtype: this.getSubtype()
        }
    }
});