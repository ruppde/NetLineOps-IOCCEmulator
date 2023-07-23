Ext.define('TimesSquare.store.SelectableAircrafts', {
    extend: 'Ext.data.Store',
    model: 'TimesSquare.model.SelectableAircraft',
    getUnfilteredData: function() {
        var a = this;
        return a.snapshot || a.data
    }
});