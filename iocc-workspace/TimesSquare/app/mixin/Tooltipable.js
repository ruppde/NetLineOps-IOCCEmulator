Ext.define('TimesSquare.mixin.Tooltipable', {
    tooltipRecordResolvers: {},
    additionalRenderers: [],
    defaultRecordResolver: 'resolveEventRecord',
    tooltipableCls: 'x-event-tooltipable',
    tooltipableSelector: '.x-event-tooltipable',
    resolveTooltipRecord: function(b) {
        var a = this.getRecordResolver(b.getAttribute('data-tooltip-type'));
        return a && a.call(this, b)
    },
    renderAdditionalElements: function(b) {
        var a = b[2];
        a.topWidthLeft = a.botWidthLeft = a.width;
        Ext.Array.each(this.additionalRenderers, function(a) {
            a.fn.apply(a.scope, b)
        })
    },
    getRecordResolver: function(b) {
        var a = this.tooltipRecordResolvers[b] || this[this.defaultRecordResolver];
        return Ext.isFunction(a) ? a : this[a]
    },
    registerTooltipRecordResolver: function(b, a) {
        this.tooltipRecordResolvers[b] = a
    },
    registerAdditionalRenderer: function(a, b) {
        this.additionalRenderers.push({
            fn: a,
            scope: b || this
        })
    }
});
