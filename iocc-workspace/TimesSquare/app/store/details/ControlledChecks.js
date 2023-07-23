Ext.define('TimesSquare.store.details.ControlledChecks', {
    extend: 'Ext.data.Store',
    autoLoad: !1,
    remoteStore: !1,
    fields: ['code', 'checkCode', 'flightHours', 'cycles', 'time', 'begin', 'end', 'airport'],
    sorters: [{
        property: 'code',
        direction: 'ASC'
    }],
    loadControlledChecksData: function(b) {
        var a = [];
        Ext.Array.each(b, function(d) {
            var c = d.last || {};
            c.code = d.checkCode.name;
            a.push(c)
        });
        this.loadData(a)
    }
});
