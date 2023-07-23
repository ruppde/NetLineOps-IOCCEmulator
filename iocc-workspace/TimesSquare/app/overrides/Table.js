Ext.define('TimesSquare.overrides.Table', {
    override: 'Ext.view.Table',
    onFocusEnter: function(c) {
        var a = this,
            g = c.fromComponent,
            f = a.getNavigationModel(),
            d, e, b;
        if (a.containsFocus) {
            return Ext.Component.prototype.onFocusEnter.call(a, c)
        }
        if (a.actionableMode) {
            if (a.actionPosition) {
                a.el.dom.setAttribute('tabIndex', '-1');
                a.cellFocused = !0;
                return
            }
            a.ownerGrid.setActionableMode(!1)
        }
        c = c.event;
        if (!a.cellFocused && a.all.getCount() && a.dataSource.getCount()) {
            b = c.getTarget();
            if (b === a.el.dom) {
                if (a.lastFocused === 'scrollbar') {
                    if (c.relatedTarget && !Ext.Object.isEmpty(c.relatedTarget)) {
                        c.relatedTarget.focus()
                    }
                    return
                }
                d = a.getDefaultFocusPosition(g);
                if (!d) {
                    c.stopEvent();
                    a.el.focus();
                    return
                }
                b = null
            } else {
                if (b === a.tabGuardEl) {
                    d = (new Ext.grid.CellContext(a)).setPosition(a.all.endIndex, a.getVisibleColumnManager().getColumns().length - 1);
                    b = null
                } else {
                    if (e = c.getTarget(a.getCellSelector())) {
                        if (b === e) {
                            d = (new Ext.grid.CellContext(a)).setPosition(a.getRecord(b), a.getHeaderByCell(e));
                            b = null
                        } else {
                            if (b && Ext.fly(b).isFocusable() && a.el.contains(b)) {
                                d = (new Ext.grid.CellContext(a)).setPosition(a.getRecord(b), a.getHeaderByCell(e))
                            }
                        }
                    }
                }
            }
        }
        if (d) {
            a.toggleChildrenTabbability(!1);
            if (b) {
                d.target = b;
                if (a.ownerGrid.setActionableMode(!0, d)) {
                    d = null
                }
            }
            if (d) {
                f.setPosition(d, null, c, null, !0)
            }
            a.cellFocused = a.el.contains(Ext.Element.getActiveElement());
            if (a.cellFocused) {
                a.el.dom.setAttribute('tabIndex', '-1')
            }
        }
        Ext.Component.prototype.onFocusEnter.call(a, c)
    }
});
