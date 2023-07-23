Ext.define('TimesSquare.data.field.TSDate', {
    alias: 'data.field.tsdate',
    extend: 'Ext.data.field.Field',
    sortType: Ext.data.SortTypes.asDate,
    convert: function(a) {
        if (!a) {
            return null
        }
        if (a instanceof Date) {
            return a
        }
        return new Date(+a.substr(0, 4), a.substr(5, 2) - 1, +a.substr(8, 2), +a.substr(11, 2), +a.substr(14, 2), +a.substr(17, 2))
    }
});
