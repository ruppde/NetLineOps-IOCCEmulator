Ext.define('TimesSquare.overrides.ToolTip', {
    override: 'Ext.tip.ToolTip',
    dismissDelay: 0,
    manageHeight: !1,
    minWidth: 140,
    hasTarget: function () {
        var a = this.currentTarget,
            b = this._cachedTarget,
            c = this._altTarget;
        return a && a.dom || b && b.dom || c && c.dom
    },
    getAlignRegion: function () {
        var a = this,
            c = a.anchorEl,
            e = a.getAnchorAlign(),
            g, f, d, b = a.mouseOffset;
        if (!a.anchorSize) {
            c.addCls('x-tip-anchor-top');
            c.show();
            a.anchorSize = new Ext.util.Offset(c.getWidth(!1, !0), c.getHeight(!1, !0));
            c.removeCls('x-tip-anchor-top');
            c.hide()
        }
        if ((a.anchor || a.align) && a.anchorToTarget && !a.trackMouse) {
            if (a.currentTarget.dom) {
                d = a.currentTarget.getRegion()
            } else {
                if (a._cachedTarget) {
                    d = a._cachedTarget.getRegion()
                } else {
                    if (a._altTarget) {
                        d = a._altTarget.getRegion()
                    }
                }
            }
        } else {
            d = a.pointerEvent ? a.pointerEvent.getPoint().adjust(-Math.abs(b[1]), Math.abs(b[0]), Math.abs(b[1]), -Math.abs(b[0])) : new Ext.util.Point();
            if (!a.anchor) {
                g = !0;
                if (b[0] > 0) {
                    if (b[1] > 0) {
                        e = 'tl-br'
                    } else {
                        e = 'bl-tr'
                    }
                } else {
                    if (b[1] > 0) {
                        e = 'tr-bl'
                    } else {
                        e = 'br-tl'
                    }
                }
            }
        }
        f = {
            align: a.convertPositionSpec(e),
            axisLock: a.axisLock,
            target: d,
            overlap: g,
            offset: a.targetOffset,
            inside: a.constrainPosition ? a.constrainTo || Ext.getBody().getRegion().adjust(5, -5, -5, 5) : null
        };
        if (a.anchor) {
            f.anchorSize = a.anchorSize
        }
        return a.getRegion().alignTo(f)
    },
    showData: function (d, e, b) {
        var a = this,
            c = e.apply(d);
        a.update(c, !1, function () {
            a.fireEvent('contentloaded', a)
        });
        a._altTarget = b;
        if (!a.hidden && a.hasTarget()) {
            // TODO
            a.realignToTarget();
            a.removeCls('tip-hidden');
            a.removeCls('tooltip-under-loading')
        } else {
            a.addCls('tip-hidden')
        }
    },
    beforeDataFetch: function () {
        this.addCls('tooltip-under-loading')
    },
    setMaxHeight: function (a) {
        this.callParent(arguments);
        if (this.body) {
            this.body.setMaxHeight(a)
        }
    },
    afterRender: function () {
        (arguments.callee.$previous || Ext.tip.Tip.prototype.afterRender).apply(this, arguments);
        this.body.setMaxHeight(this.getMaxHeight())
    }
});
