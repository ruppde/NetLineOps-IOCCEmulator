Ext.define('TimesSquare.overrides.SchPluginLines', {
    override: 'Sch.plugin.Lines',
    init: function(b) {
        var c = '#FF0000',
            d = '#EEEEEE',
            a;
        if (Ext.isString(this.innerTpl)) {
            this.innerTpl = new Ext.XTemplate(this.innerTpl)
        }
        this.side = b.rtl ? 'right' : 'left';
        a = this.innerTpl;
        if (!this.template) {
            this.template = new Ext.XTemplate('<tpl for=".">', '<div id="{id}" ' + (this.showTip ? 'title="{[this.getTipText(values)]}" ' : '') + 'class="{$cls}" style="' + this.side + ':{left}px;top:{top}px;height:{height}px;width:{[this.getTimelineWidth(values)]}px;border-color:{[this.getTimelineColor(values)]};background-color:{[this.getTimelineColor(values)]};">' + (a ? '{[this.renderInner(values)]}' : '') + '</div>', '</tpl>', {
                getTipText: function(a) {
                    return b.getSchedulingView().getFormattedDate(a.Date) + ' ' + (a.Text || '')
                },
                renderInner: function(c) {
                    return a.apply(c)
                },
                getTimelineColor: function(a) {
                    if (/sch-column-line-db/.test(a.$cls)) {
                        return 'inherit'
                    }
                    if (!/sch\-timeline/g.test(a.$cls)) {
                        return d
                    }
                    return a.Color || c
                },
                getTimelineWidth: function(a) {
                    return a.Width || 1
                }
            })
        }(arguments.callee.$previous || Sch.feature.AbstractTimeSpan.prototype.init).apply(this, arguments)
    }
});
