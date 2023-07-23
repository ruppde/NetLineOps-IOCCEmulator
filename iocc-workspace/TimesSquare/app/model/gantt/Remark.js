Ext.define('TimesSquare.model.gantt.Remark', {
    extend: 'Ext.data.Model',
    fields: ['urlTooltip', 'urlTooltipLocal', 'icon'],
    composeAttributes: function() {
        var a = this.internalId;
        return {
            'data-identifier': a,
            'data-url-tooltip': this.get('urlTooltip'),
            'data-url-tooltip-local': this.get('urlTooltipLocal'),
            style: {
                'background-image': 'url(' + this.get('icon') + ')',
                'background-size': 'contain'
            }
        }
    }
});
