Ext.define('TimesSquare.plugin.tooltipable.Remark', {
    extend: 'TimesSquare.plugin.tooltipable.BaseTooltipable',
    type: 'remark',
    elementWidth: 10,
    elementHeight: 10,
    elementProperty: 'remarks',
    elementCls: 'x-event-remark',
    wrapperCls: 'x-event-remark-wrapper',
    wrapper: 'bot',
    alias: 'tooltipable.remark',
    xtype: 'tooltipable.remarke',
    recordResolver: function(a) {
        var b = '[id^=' + this.eventWrapperPrefix + ']',
            c = this.resolveEventRecord(a.up(b).down(this.eventSelector));
        return c.getNestedBy('remarks', 'internalId', a.getAttribute('data-identifier'))
    }
});
