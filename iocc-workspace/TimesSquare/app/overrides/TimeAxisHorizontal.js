Ext.define('Sch.column.timeAxis.Horizontal', {
    extend: 'Ext.grid.column.Column',
    component: !0,
    box: !0,
    //container: !0,
    headercontainer: !0,
    gridcolumn: !0,
    timeaxiscolumn: !0,
    xtype: 'timeaxiscolumn',
    alias: 'timeaxiscolumn',
    draggable: !1,
    groupable: !1,
    hideable: !1,
    sortable: !1,
    resizable: !1,
    menuDisabled: !0,
    cls: 'sch-simple-timeaxis',
    tdCls: 'sch-timetd',
    enableLocking: !1,
    locked: !1,
    lockable: !1,
    enableTickResizing: !1,
    cellFocusable: !1,
    timeAxisViewModel: null,
    headerView: null,
    hoverCls: '',
    ownHoverCls: 'sch-column-header-over',
    trackHeaderOver: !0,
    compactCellWidthThreshold: Ext.theme && Ext.theme.name.toLowerCase() === 'classic' ? 15 : 35,
    initComponent: function() {
        if (this.enableTickResizing) {
            this.addPlugin(new Sch.feature.HeaderResize({
                selector: '.sch-header-cell-resizehandle',
                timeAxisViewModel: this.timeAxisViewModel
            }))
        }
        Ext.grid.column.Column.prototype.initComponent.apply(this, arguments)
    },
    afterRender: function() {
        var a = this;
        var b = a.titleEl.createChild({
            cls: 'sch-horizontaltimeaxis-ct'
        });
        if (!(a.headerView instanceof Sch.view.HorizontalTimeAxis)) {
            a.headerView = Ext.create(Ext.applyIf(a.headerView || {}, {
                xclass: 'Sch.view.HorizontalTimeAxis',
                model: a.timeAxisViewModel,
                containerEl: b,
                hoverCls: a.ownHoverCls,
                trackHeaderOver: a.trackHeaderOver,
                enableTickResizing: this.enableTickResizing,
                compactCellWidthThreshold: a.compactCellWidthThreshold
            }))
        }
        a.headerView.on('refresh', a.onTimeAxisViewRefresh, a);
        a.headerView.render();
        a.ownerCt.on('afterlayout', function() {
            if (!a.ownerCt) {
                return
            }
            a.mon(a.ownerCt, 'resize', a.onHeaderContainerResize, a);
            if (this.getWidth() > 0) {
                if (a.getAvailableWidthForSchedule() !== a.timeAxisViewModel.getAvailableWidth()) {
                    a.timeAxisViewModel.update(a.getAvailableWidthForSchedule())
                }
                a.setWidth(a.timeAxisViewModel.getTotalWidth())
            }
        }, null, {
            single: !0
        });
        this.enableBubble('timeheaderclick', 'timeheaderdblclick', 'timeheadercontextmenu', 'horizontaltimeaxiscolumnrender');
        a.relayEvents(a.headerView, ['timeheaderclick', 'timeheaderdblclick', 'timeheadercontextmenu']);
        Ext.grid.column.Column.prototype.afterRender.apply(this, arguments);
        a.focusable = !1;
        this.fireEvent('horizontaltimeaxiscolumnrender', this)
    },
    initRenderData: function() {
        var a = this;
        a.renderData.headerCls = a.renderData.headerCls || a.headerCls;
        return Ext.grid.column.Column.prototype.initRenderData.apply(this, arguments)
    },
    destroy: function() {
        if (this.headerView) {
            this.headerView.destroy();
            this.headerView = null
        }
        Ext.grid.column.Column.prototype.destroy.apply(this, arguments)
    },
    onTimeAxisViewRefresh: function() {
        this.headerView.un('refresh', this.onTimeAxisViewRefresh, this);
        var a = this.timeAxisViewModel.getTotalWidth();
        if (this.getWidth() !== a) {
            this.setWidth(a)
        } else {
            this.updateLayout()
        }
        this.ensureSizing();
        this.headerView.on('refresh', this.onTimeAxisViewRefresh, this)
    },
    getAvailableWidthForSchedule: function() {
        if (!this.ownerCt) {
            return 0
        }
        var c = this.ownerCt.isVisible(!0) ? this.ownerCt.getWidth() : this.ownerCt.lastBox && this.ownerCt.lastBox.width || 0,
            d = this.ownerCt.items,
            a;
        for (var b = 1; b < d.length; b++) {
            a = d.get(b);
            if (!a.hidden) {
                c -= a.isVisible(!0) ? a.getWidth() : a.lastBox && a.lastBox.width || 0
            }
        }
        return Math.max(0, c - Ext.getScrollbarSize().width - 1)
    },
    onResize: function() {
        Ext.grid.column.Column.prototype.onResize.apply(this, arguments);
        this.timeAxisViewModel.setAvailableWidth(this.getAvailableWidthForSchedule())
    },
    onHeaderContainerResize: function(d, e, b, c, a) {
        this.timeAxisViewModel.setAvailableWidth(this.getAvailableWidthForSchedule());
        if (b !== a) {
            this.headerView.render()
        }
    },
    ensureSizing: function() {
        var a = this.headerView.containerEl;
        var b = this.ownerCt.getHeight();
        var c = a.getHeight();
        var d = b - c;
        if (d > 0) {
            var e = a.down('table:last-of-type tr');
            if (e) {
                a.select('table tr').setHeight(b / this.timeAxisViewModel.getHeaders().length)
            }
        }
    },
    refresh: function() {
        if (this.rendered) {
            this.timeAxisViewModel.update(null, !0);
            this.headerView.render()
        }
    }
});

Ext.define('TimesSquare.overrides.TimeAxisHorizontal', {
    override: 'Sch.column.timeAxis.Horizontal',
    onHeaderContainerResize: function() {
        var c = this.up('gantt'),
            e = c.getSchedulingView(),
            a = this.timeAxisViewModel,
            b = e.getScroll().left,
            d = a.getDateFromPosition(b);
        arguments.callee.$previous.apply(this, arguments);
        a._scrollRestoreDate = d
    }
});
