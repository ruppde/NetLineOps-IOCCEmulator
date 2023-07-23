Ext.define('TimesSquare.view.Gantt', {
    extend: 'Sch.panel.SchedulerGrid', //ExSch
    mixins: {
        postprocessing: 'TimesSquare.mixin.PostProcessor'
    },
    xtype: 'gantt',
    component: !0,
    box: !0,
    container: !0,
    panel: !0,
    tablepanel: !0,
    gridpanel: !0,
    grid: !0,
    timelinegrid: !0,
    schedulergrid: !0,
    schedulerpanel: !0,
    exschedulergrid: !0,
    gantt: !0,
    title: 'Gantt',
    region: 'center',
    infinitescroll: !0,
    closable: !0,
    loadMask: !0,
    readOnly: !0,
    enableEventDragDrop: !1,
    forceFit: !0,
    suppressFit: !1,
    eventStore: 'gantt.Events',
    resourceStore: 'gantt.Resources',
    viewPreset: 'opsHourAndDay',
    zoomLevels: [{
        width: 100,
        increment: 1,
        resolution: 2,
        preset: 'opsWeekAndDay',
        label: '2 weeks',
        zoomId: 0
    }, {
        width: 50,
        increment: 1,
        resolution: 1,
        preset: 'opsWeekAndDay',
        label: '1 week',
        zoomId: 1
    }, {
        width: 100,
        increment: 3,
        resolution: 1,
        preset: 'opsHourAndDay',
        label: '3 days',
        zoomId: 2
    }, {
        width: 60,
        increment: 2,
        resolution: 1,
        preset: 'opsHourAndDay',
        label: '2 days',
        zoomId: 3
    }, {
        width: 60,
        increment: 1,
        resolution: 1,
        preset: 'opsHourAndDay',
        label: '1 day',
        zoomId: 4
    }, {
        width: 30,
        increment: 15,
        resolution: 1,
        preset: 'opsMinuteAndHour',
        label: '12 hours',
        zoomId: 5
    }, {
        width: 45,
        increment: 15,
        resolution: 2 / 3,
        preset: 'opsMinuteAndHour',
        label: '8 hours',
        zoomId: 6
    }, {
        width: 60,
        increment: 15,
        resolution: 0.5,
        preset: 'opsMinuteAndHour',
        label: '6 hours',
        zoomId: 7
    }, {
        width: 60,
        increment: 10,
        resolution: 0.5,
        preset: 'opsMinuteAndHour',
        label: '4 hours',
        zoomId: 8
    }],
    zoomKeepsOriginalTimespan: !0,
    rowHeight: 60,
    variableRowHeight: !1,
    config: {
        bufferVerticalScroll: 0
    },
    viewConfig: {
        dynamicRowHeight: !1,
        managedEventSizing: !1,
        timeMode: 'utc'
    },
    lockedGridConfig: {
        resizeHandles: 'e',
        resizable: {
            width: 108,
            pinned: !0,
            minWidth: 108
        },
        width: 200
    },
    dockedItems: [{
        xtype: 'panel',
        itemId: 'statusLine',
        cls: 'status-line',
        dock: 'bottom',
        layout: 'hbox',
        hidden: !0,
        height: 40,
        items: [{
            xtype: 'button',
            inspect: 'status-line-left',
            itemId: 'statusLineScrollLeft',
            action: 'status-line-scroll-left',
            iconCls: 'icon-jump-previous',
            hidden: !0,
            repeat: !0,
            padding: '10 0 0 0',
            width: 20,
            height: '100%'
        }, {
            xtype: 'box',
            itemId: 'statusLineContent',
            flex: 1,
            scrollable: 'x',
            cls: 'status-line-content',
            height: 55,
            padding: 4,
            html: '',
            style: 'font-size: 24px; overflow: hidden; display: relative !important;'
        }, {
            xtype: 'button',
            inspect: 'status-line-right',
            itemId: 'statusLineScrollRight',
            action: 'status-line-scroll-right',
            hidden: !0,
            repeat: !0,
            iconCls: 'icon-jump-next',
            padding: '10 0 0 2',
            width: 20,
            height: '100%'
        }]
    }],
    tooltipTpl: new Ext.Template('{tooltipForDisplay}'),
    tipCfg: {
        cls: 'sch-tip',
        showDelay: 500,
        dismissDelay: 0,
        hideDelay: 0,
        liquidLayout: !0,
        anchorToTarget: !0,
        defaultAlign: 'tl-r50?',
        constrainPosition: !0
    },
    onBeforeTooltipShow: function(i, b) {
        var c = this,
            d = c.getSchedulingView(),
            a = d.tip,
            g = d.timeMode === 'local' ? 'tooltipLocal' : 'tooltip',
            h = d.timeMode === 'local' ? 'urlTooltipLocal' : 'urlTooltip',
            e = b.data[h],
            f;
        if (!c.down('checkbox[action=show-smart-info]').checked) {
            return !1
        }
        c.currentTooltipRec = b;
        if (!e) {
            Ext.log.warn('[Gantt Tooltip] No urlTooltip: ' + b.data.Id);
            return !1
        }
        a.beforeDataFetch();
        f = {
            me: c,
            rec: b,
            tip: a,
            tooltipField: g
        };
        Ext.log.info('[Gantt Tooltip] Load tooltip for ' + b.data.Id + ', URL: ' + e);
        if (a._loadDefer) {
            window.clearTimeout(a._loadDefer);
            a._loadDefer = null
        }
        if (a._hideTimeout) {
            window.clearTimeout(a._hideTimeout);
            a._hideTimeout = null;
            a.hide()
        }
        Ext.Ajax.request({
            url: e,
            success: c.tooltipServiceCallback,
            scope: f
        })
    },
    tooltipServiceCallback: function(e) {
        var b = this.me,
            a = this.rec,
            g = this.tip,
            d = b.getSchedulingView(),
            c = Ext.decode(e.responseText, !0),
            f = d.getElementsFromEventRecord(b.currentTooltipRec)[0];
        a.data[this.tooltipField] = c && c.success && c.result && c.result.tooltip || null;
        a.data.tooltipForDisplay = a.data[this.tooltipField];
        if (b.currentTooltipRec === a && a.data.tooltipForDisplay) {
            Ext.log.info('[Gantt Tooltip] Show tooltip for ' + a.data.Id);
            g.showData(d.getDataForTooltipTpl(a), b.tooltipTpl, f)
        }
    },
    eventTpl: new Ext.XTemplate('<tpl for=".">', '<div id="{wrapperPrefix}{id}" ', 'style="opacity:{[values.eventData.filteredOut ? 0.5 : 1]};right:{right}px;left:{left}px;top:{top}px;height:{height}px;width:{width}px;" ', 'class="{wrapperCls} {cls} {internalCls} ', 'overlap-{eventData.overlapCount} ', '{[ this.getEventSelector(values) ]} ', '{eventData.Id}">', '<div class="x-event-ontop-wrapper">', '{systemMarkers}', '{userMarkers}', '{remarks}', '</div>', '<div unselectable="on" id="{eventPrefix}{id}" style="{style};position:initial;height:100%" data-tooltip-type="event" class="x-event-tooltipable sch-event x-unselectable">', '<div unselectable="on" class="sch-event-inner {iconCls}">', '<tpl if="eventData.eventType==\'AS\'">', '<div class="event-atc-slot-state" style="{atcSlotStyle}">{eventData.displayState}</div>', '<div class="event-atc-slot-time" style="{atcSlotStyle}">{eventData.displayTime}</div>', '<tpl else>', '<div class="event-leg-departure" style="{startStyle}"><tpl if="useLocalTime">{eventData.StartDateLocal:date("H:i")}<tpl else>{eventData.StartDate:date("H:i")}</tpl></div>', '<div class="event-leg-arrival" style="{endStyle}"><tpl if="useLocalTime">{eventData.EndDateLocal:date("H:i")}<tpl else>{eventData.EndDate:date("H:i")}</tpl></div>', '<div class="event-leg-name">{eventData.Name}</div>', '</tpl>', '</div>', '</div>', '</div>', '<tpl if="airportMarker">', '<div style="left:{airportMarker.left}px;top:{top}px" ', 'class="', '{[ this.getAirportSelector(values) ]} ', 'event-airport">', '{airportMarker.airport}<br>{airportMarker.time}', '</div>', '</tpl>', '</tpl>', {
        getEventSelector: function(b) {
            var e = Inspector.Config.prefix || '',
                a = b.eventData,
                d = Ext.Array.filter,
                c;
            c = d([a.Name || a.eventType, Ext.Date.format(a.dayOfOrigin, 'dMy'), a.ResourceId, a.departureAirport + '-' + a.arrivalAirport, Ext.Date.format(a.StartDate, 'dMy-Hi'), Ext.Date.format(a.EndDate, 'dMy-Hi'), b.eventData.state, b.eventData.counter], function(a) {
                return !Ext.isEmpty(a)
            });
            return e + c.join('/')
        },
        getAirportSelector: function(a) {
            var b = Inspector.Config.prefix || '';
            return b + [a.airportMarker.airport, a.airportMarker.time.replace(':', '-')].join('-')
        }
    }),
    eventRenderer: function(b, c, a) {
        a.style = ['background-color:' + b.getBgColor(), 'color:' + b.getFgColor()].join(';');
        a.eventData = b.data;
        if (a.width < 80) {
            a.startStyle = 'display:none;'
        }
        if (a.width < 110) {
            a.endStyle = 'display:none;'
        }
        if (a.width < 10) {
            a.atcSlotStyle = 'display:none;'
        }
        //console.log(b);
        a.eventPrefix = this.eventPrefix;
        a.wrapperPrefix = this.eventWrapperPrefix;
        a.wrapperCls = this.eventWrapperCls;
        //this.renderAdditionalElements(arguments)
    },
    initComponent: function() {
        var a = this;
        a.plugins = a.plugins || [];
        a.plugins.push(Ext.create('Sch.plugin.Lines', {
            store: 'gantt.Timelines',
            pluginId: 'lines'
        }));
        a.columns = a.createColumns();
        a.tbar = a.createToolbar();
        Sch.panel.SchedulerGrid.prototype.initComponent.apply(this, arguments); //ExSch
        a.normalGrid.on({
            resize: a.onNormalGridResize,
            scope: a
        });
        a.normalGrid.getView().on('scroll', a.onNormalGridViewScroll, a);
        a.on('beforetooltipshow', a.onBeforeTooltipShow)
    },
    onNormalGridResize: function(d) {
        if (!d.scrollConfig) {
            return
        }
        var a = d.scrollConfig;
        var c = a.wasEndOfScroll;
        var b = a.dateScrollValue;
        var e = a.wasBeginOfScroll;
        if (c || e) {
            this.getSchedulingView().scrollHorizontallyTo(c ? Infinity : 0, !0)
        } else {
            if (b) {
                this.scrollToDateCentered(b)
            }
        }
    },
    onNormalGridViewScroll: function(c) {
        var a = c.getScrollable();
        var b = Math.round(a.getPosition().x);
        var d = Math.round(a.getMaxPosition().x);
        this.normalGrid.scrollConfig = {
            dateScrollValue: this.getViewportCenterDate(),
            wasEndOfScroll: b >= d,
            wasBeginOfScroll: b === 0
        }
    },
    toggleAltRegistrationColumn: function(b) {
        var c = this,
            a = c.getColumnManager().getHeaderById('alternativeRegistration');
        if (a.isVisible() !== b) {
            Ext.defer(a[b ? 'show' : 'hide'], 1, a)
        }
    },
    createColumns: function() {
        var a = this;
        return [{
            header: 'AC',
            dataIndex: 'ac',
            width: 108,
            renderer: a.aircraftColumnRenderer
        }, {
            header: 'Registration',
            dataIndex: 'registration',
            width: 80,
            renderer: a.aircraftColumnRenderer
        }, {
            header: 'Alt. Registration',
            dataIndex: 'alternativeRegistration',
            itemId: 'alternativeRegistration',
            width: 80,
            renderer: a.aircraftColumnRenderer,
            hideable: !1,
            hidden: !0
        }, {
            header: 'Subtype',
            dataIndex: 'subtype',
            width: 50,
            renderer: a.aircraftColumnRenderer
        }, {
            header: 'Owner',
            dataIndex: 'owner',
            width: 50,
            renderer: a.aircraftColumnRenderer
        }, {
            xtype: 'checkcolumn',
            header: 'Own',
            dataIndex: 'isOwn',
            width: 50,
            disabled: !0,
            renderer: a.aircraftColumnRenderer
        }, {
            header: 'State',
            dataIndex: 'state',
            width: 100,
            renderer: a.aircraftColumnRenderer
        }]
    },
    createToolbar: function() {
        var a = this;
        return [{
            iconCls: 'icon-jump-first',
            action: 'jump-first',
            clickEvent: 'mousedown',
            tooltip: 'Scroll selection backward'
        }, {
            iconCls: 'icon-jump-previous',
            action: 'jump-previous',
            clickEvent: 'mousedown',
            tooltip: 'Scroll selection backward one day'
        }, {
            iconCls: 'icon-jump-next',
            action: 'jump-next',
            clickEvent: 'mousedown',
            tooltip: 'Scroll selection forward one day'
        }, {
            iconCls: 'icon-jump-last',
            action: 'jump-last',
            clickEvent: 'mousedown',
            tooltip: 'Scroll selection forward'
        }, {
            iconCls: 'icon-jump-now',
            action: 'jump-now',
            clickEvent: 'mousedown',
            tooltip: 'Goto now'
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'combobox',
            queryMode: 'local',
            name: 'zoom',
            editable: !1,
            width: 80,
            forceSelection: !0,
            displayField: 'label',
            valueField: 'zoomId',
            value: 4,
            store: Ext.create('Ext.data.Store', {
                fields: ['zoomId', 'label'],
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json'
                    }
                },
                data: a.zoomLevels
            })
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'button',
            text: 'Show',
            menu: {
                plain: !0,
                defaults: {
                    xtype: 'checkbox',
                    margin: '0 0 0 5',
                    checked: !1
                },
                items: [{
                    action: 'show-status-line',
                    boxLabel: 'Status Line'
                }, {
                    action: 'show-smart-info',
                    boxLabel: 'Smart Info'
                }]
            }
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'gantt.sorter',
            store: this.getResourceStore(),
            provider: TimesSquare.util.SortProvider
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'timemodebutton',
            itemId: 'timemode'
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'airportfilter',
            minLength: 3,
            maxLength: 3,
            fields: ['arrivalAirport', 'departureAirport', 'diversionAirport']
        }]
    },
    refreshSelection: function() {
        var a = this.getEventSelectionModel(),
            b = a.getSelection()[0];
        if (b) {
            a.deselect(b);
            a.select(b)
        }
    },
    aircraftColumnRenderer: function(d, c, b) {
        var a = this.defaultRenderer;
        c.style = ['background-color:' + b.getBgColor(), 'color:' + b.getFgColor()].join(';');
        return a ? a.apply(this, arguments) : d
    },
    isInRange: function(d) {
        var a = this,
            b = a.getStartDate(),
            c = a.getEndDate();
        return Ext.Date.between(d, b, c)
    },
    setTitle: function(a) {
        (arguments.callee.$previous || Sch.panel.SchedulerGrid.prototype.setTitle).call(this, 'Gantt ' + a) //ExSch
    }
});
