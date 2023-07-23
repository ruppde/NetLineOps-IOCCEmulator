Ext.define('TimesSquare.model.gantt.Timeline', {
    extend: 'Ext.data.Model',
    fields: ['Date', 'Color', 'Width'],
    setDate: function(a) {
        this.set('Date', a)
    },
    getDate: function() {
        return this.get('Date')
    }
});