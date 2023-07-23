Ext.define('Alf.data.ModelOverride', {
    override: 'Ext.data.Model',
    statics: {
        dataWriter: null
    },
    getWriteData: function(d) {
        var c = Ext.data.Model,
            a = c.dataWriter,
            b;
        if (!a) {
            a = c.dataWriter = Ext.create('Ext.data.writer.Json')
        }
        b = a.getRecordData(this);
        if (d !== !1) {
            a.getExpandedData([b])
        }
        return b
    }
});
