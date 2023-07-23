Ext.define('TimesSquare.plugin.tooltipable.BaseTooltipable', {
    extend: 'TimesSquare.plugin.tooltipable.AbstractTooltipablePlugin',
    filters: [function(a) {
        return a.get('eventType') !== 'A'
    }]
});
