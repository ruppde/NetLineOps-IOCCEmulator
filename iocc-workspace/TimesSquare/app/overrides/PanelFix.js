Ext.define('TimesSquare.overrides.PanelFix', {
    override: 'Ext.panel.Panel',
    placeholderExpand: function(d) {
        var a = this,
            g = a.collapsed,
            c = 'x-border-region-slide-in',
            f, b, e = a.ownerLayout ? a.ownerLayout.centerRegion : null;
        if (Ext.AbstractComponent.layoutSuspendCount) {
            d = !1
        }
        if (a.floatedFromCollapse) {
            b = a.getPosition(!0);
            a.slideOutFloatedPanelBegin();
            a.slideOutFloatedPanelEnd();
            a.floated = !1
        }
        if (d) {
            Ext.suspendLayouts();
            a.placeholder.hide();
            a.el.show();
            a.collapsed = !1;
            a.setHiddenState(!1);
            if (e && !b) {
                e.hidden = !0
            }
            Ext.resumeLayouts(!0);
            if (e) {
                e.hidden = !1
            }
            a.el.addCls(c);
            a.isCollapsingOrExpanding = 2;
            if (b) {
                f = a.getXY();
                a.setLocalXY(b[0], b[1]);
                a.setXY([f[0], f[1]], {
                    duration: Ext.Number.from(d, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        afteranimate: function() {
                            a.el.removeCls(c);
                            a.isCollapsingOrExpanding = 0;
                            a.fireEvent('expand', a)
                        }
                    }
                })
            } else {
                a.el.hide();
                a.placeholder.el.show();
                a.placeholder.hidden = !1;
                a.setHiddenState(!1);
                a.el.slideIn(a.convertCollapseDir(g), {
                    preserveScroll: !0,
                    duration: Ext.Number.from(d, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        afteranimate: function() {
                            a.el.removeCls(c);
                            a.placeholder.hide();
                            a.updateLayout();
                            a.isCollapsingOrExpanding = 0;
                            a.fireEvent('expand', a)
                        }
                    }
                })
            }
        } else {
            a.floated = a.collapsed = !1;
            a.el.removeCls(c);
            Ext.suspendLayouts();
            a.placeholder.hide();
            a.show();
            Ext.resumeLayouts(!0);
            a.fireEvent('expand', a)
        }
        return a
    }
});
