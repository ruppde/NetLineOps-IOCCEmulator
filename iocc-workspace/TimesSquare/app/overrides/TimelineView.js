Ext.define('TimesSquare.overrides.TimelineView', {
    override: 'Sch.mixin.TimelineView',
    mixins: {
        tooltipable: 'TimesSquare.mixin.Tooltipable'
    },
    plugins: ['tooltipable.systemmarker', 'tooltipable.usermarker', 'tooltipable.remark'],
    eventWrapperPrefix: 'event-wrapper-',
    eventWrapperCls: 'x-event-wrapper',
    initiallySelectedEventCls: 'sch-event-init-selected',
    getEventNodesByRecord: function(a) {
        return this.el.select('[id=' + this.eventWrapperPrefix + a.internalId + ']')
    },
    setupTooltip: function() {
        var a = this,
            b = Ext.apply({
                renderTo: Ext.getBody(),
                delegate: a.tooltipableSelector,
                target: a.el,
                anchor: 'b',
                rtl: a.rtl,
                isMouseOver: !1,
                autoScroll: !0,
                maxHeight: Math.max(Ext.getBody().getHeight() - 40, 0),
                autoHide: !1,
                shadow: !1,
                height: 'auto',
                constrain: !0,
                fixAlignment: a.getMode() === 'horizontal'
            }, a.tipCfg);
        a.tip = new Ext.tip.ToolTip(b);
        a.tip.on({
            beforeshow: function(a) {
                var e = function() {
                        a.isMouseOver = !1;
                        a._hideTimeout = Ext.defer(function() {
                            if (!a.isMouseOver) {
                                if (!a.isDestroyed) {
                                    if (a._loadDefer) {
                                        window.clearTimeout(a._loadDefer);
                                        a._loadDefer = null
                                    }
                                    a.hide()
                                }
                                a._hideTimeout = null
                            }
                        }, 5000)
                    },
                    d = function() {
                        a.isMouseOver = !0;
                        window.clearTimeout(a._hideTimeout);
                        a._hideTimeout = null
                    },
                    b, g, f, c;
                if (!a.triggerElement || !a.triggerElement.id) {
                    return !1
                }
                a.isMouseOver = !0;
                g = Ext.Element.get(a.triggerElement);
                f = this.resolveTooltipRecord(g);
                a._cachedTarget = b = Ext.get(a.currentTarget);
                if (!f || this.fireEvent('beforetooltipshow', this, f) === !1) {
                    return !1
                }
                a.update(this.tooltipTpl.apply(this.getDataForTooltipTpl(f)));
                c = a.getEl();
                if (c && c.dom) {
                    c.on({
                        mouseleave: e,
                        mouseenter: d
                    })
                }
                if (b && b.dom) {
                    b.on({
                        mouseleave: e,
                        mouseenter: d
                    })
                }
                a.on({
                    hide: function() {
                        if (a._loadDefer) {
                            window.clearTimeout(a._loadDefer);
                            a._loadDefer = null
                        }
                        if (c && c.dom) {
                            c.un({
                                mouseleave: e,
                                mouseenter: d
                            })
                        }
                        if (b && b.dom) {
                            b.un({
                                mouseleave: e,
                                mouseenter: d
                            })
                        }
                    },
                    single: !0
                })
            },
            beforehide: function(a) {
                a.removeCls('tooltip-under-loading')
            },
            scope: a
        })
    },
    onEventBarSelect: function(c) {
        var a = this,
            b = a.getElementsFromEventRecord(c);
        if (b) {
            Ext.Array.each(b, function(b) {
                Ext.fly(b).up('.' + a.eventWrapperCls).addCls(a.selectedEventCls)
            })
        }
    },
    onEventBarDeselect: function(c) {
        var a = this,
            b = a.getElementsFromEventRecord(c);
        if (b) {
            Ext.Array.each(b, function(b) {
                Ext.fly(b).up('.' + a.eventWrapperCls).removeCls(a.selectedEventCls).removeCls(a.initiallySelectedEventCls)
            })
        }
    },
    onInitialEventSelect: function(c) {
        var a = this,
            b = a.getElementsFromEventRecord(c);
        if (b) {
            Ext.Array.each(b, function(b) {
                Ext.fly(b).up('.' + a.eventWrapperCls).addCls(a.initiallySelectedEventCls)
            })
        }
    },
    getElementsFromEventRecord: function() {
        var a = arguments[0],
            b, c;
        if (arguments.length !== 1) {
            return (arguments.callee.$previous || Sch.mixin.AbstractTimelineView.prototype.getElementsFromEventRecord).apply(this, arguments)
        }
        if (a && a.isAssignmentModel) {
            b = a.getEvent();
            c = a.getResource()
        } else {
            b = a;
            c = null
        }
        return b && (arguments.callee.$previous || Sch.mixin.AbstractTimelineView.prototype.getElementsFromEventRecord).call(this, b, c, null, !0)
    }
});
