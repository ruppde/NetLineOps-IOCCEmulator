Ext.define('TimesSquare.plugin.tooltipable.AbstractTooltipablePlugin', {
    extend: 'Ext.AbstractPlugin',
    type: undefined,
    elementWidth: 9,
    elementHeight: 9,
    elementProperty: undefined,
    elementCls: undefined,
    wrapperCls: undefined,
    tooltipableCls: undefined,
    marginOffset: 0,
    wrapper: 'top',
    filters: undefined,
    init: function(a) {
        this.setCmp(a);
        this.tooltipableCls = a.tooltipableCls;
        a.registerTooltipRecordResolver(this.type, this.recordResolver);
        a.registerAdditionalRenderer(this.renderer, this)
    },
    recordResolver: Ext.emptyFn,
    renderer: function(a, e, c) {
        if (!this.recordDataPresent(a) || !this.invokeFilters(arguments)) {
            return
        }
        var d = a.get(this.elementProperty),
            b;
        b = this.assembleElements(this.cutUnfittingElements(d, c));
        this.writeTemplateData(this.getWrapperSpec(), b, c)
    },
    assembleElements: function(b) {
        var c = this,
            a;
        a = Ext.Array.map(b, function(a) {
            return c.assembleElement(a.composeAttributes())
        });
        return Ext.Array.filter(a, function(a) {
            return !!a
        })
    },
    cutUnfittingElements: function(a, f) {
        var b = this,
            c = b.elementWidth + b.marginOffset,
            e = f[b.wrapper + 'WidthLeft'],
            d = Math.floor(e / c);
        if (!d) {
            a = []
        } else {
            a = Ext.Array.slice(a, 0, Math.max(d, 0))
        }
        f[b.wrapper + 'WidthLeft'] = e - a.length * c;
        return a
    },
    recordDataPresent: function(a) {
        return a.data[this.elementProperty] && a.data[this.elementProperty].length
    },
    invokeFilters: function(b) {
        var a = this.filters;
        if (Ext.isArray(a)) {
            return Ext.Array.every(a, function(c) {
                var a = c.apply(this, b);
                return a || a === undefined
            })
        }
    },
    assembleElement: function(a) {
        if (a) {
            return Ext.Object.merge(Ext.clone(this.getElementSpec()), a)
        }
        return null
    },
    writeTemplateData: function(a, b, c) {
        c[Ext.util.Inflector.pluralize(this.type)] = Ext.DomHelper.createHtml(Ext.apply(a, {
            children: b
        }))
    },
    getWrapperSpec: function() {
        if (!this.wrapperSpec) {
            this.wrapperSpec = {
                tag: 'div',
                cls: this.wrapperCls,
                style: {
                    height: this.elementHeight + 'px',
                    top: '-' + (this.elementHeight + 1) + 'px'
                }
            }
        }
        return this.wrapperSpec
    },
    getElementSpec: function() {
        if (!this.elementSpec) {
            this.elementSpec = {
                tag: 'span',
                cls: [this.elementCls, this.tooltipableCls].join(' '),
                'data-tooltip-type': this.type,
                style: {
                    height: this.elementHeight + 'px',
                    width: this.elementWidth + 'px',
                    lineHeight: this.elementHeight - 5 + 'px'
                }
            }
        }
        return this.elementSpec
    }
});
