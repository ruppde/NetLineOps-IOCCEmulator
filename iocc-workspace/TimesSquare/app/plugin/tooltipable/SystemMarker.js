Ext.define('TimesSquare.plugin.tooltipable.SystemMarker', {
    extend: 'TimesSquare.plugin.tooltipable.BaseTooltipable',
    type: 'systemMarker',
    elementWidth: 10,
    elementHeight: 10,
    elementProperty: 'systemMarkers',
    elementCls: 'x-event-systemmarker',
    wrapperCls: 'x-event-systemmarker-wrapper',
    alias: 'tooltipable.systemmarker',
    xtype: 'tooltipable.systemmarker',
    recordResolver: function(a) {
        var b = '[id^=' + this.eventWrapperPrefix + ']',
            c = this.resolveEventRecord(a.up(b).down(this.eventSelector));
        return c.getNestedBy('systemMarkers', 'internalId', a.getAttribute('data-identifier'))
    },
    getWrapperSpec: function() {
        if (!this.wrapperSpec) {
            TimesSquare.plugin.tooltipable.BaseTooltipable.prototype.getWrapperSpec.call(this);
            this.wrapperSpec.style.height = '0px';
            this.wrapperSpec.style.lineHeight = '0px';
            this.wrapperSpec.style.top = -(this.elementHeight - (Ext.isIE ? 1 : 0.5)) + 'px'
        }
        return this.wrapperSpec
    }
});
