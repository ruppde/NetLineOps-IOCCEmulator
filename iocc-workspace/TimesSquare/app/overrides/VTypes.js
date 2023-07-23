Ext.define('TimesSquare.overrides.VTypes', {
    override: 'Ext.form.field.VTypes',
    searchLegDate: function(c, b) {
        var a;
        if (!b.sisterFieldName || !b.getSisterField) {
            return !0
        }
        a = b.getSisterField();
        if (!a || !a.getValue()) {
            return !0
        }
        return b.getValue() - a.getValue() <= 0
    },
    searchLegDateText: 'The date has to be equal or smaller than the second date!'
});
