Ext.define('TimesSquare.store.details.Crews', {
    extend: 'Ext.data.Store',
    model: 'TimesSquare.model.details.Crew',
    autoLoad: !1,
    remoteStore: !0,
    constructor: function() {
        var a = this;
        Ext.data.Store.prototype.constructor.apply(this, arguments);
        a.resetSorters()
    },
    resetSorters: function() {
        this.sort(Ext.clone(this.defaultSorters))
    },
    defaultSorters: [{
        property: 'crewGroup'
    }, {
        property: 'priorityInGroup'
    }]
});