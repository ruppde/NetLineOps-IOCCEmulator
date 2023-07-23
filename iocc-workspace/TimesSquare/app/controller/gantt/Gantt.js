Ext.define('TimesSquare.controller.gantt.Gantt', {
  extend: 'Ext.app.Controller',
  stores: ['gantt.Events', 'gantt.Resources', 'gantt.Timelines', 'TimesSquare.mixin.ExecutionTimeLogger'],
  views: ['Gantt'],
  mixins : {
    logger : "TimesSquare.mixin.ExecutionTimeLogger"
  },
  refs: [{
    ref: 'gantt',
    selector: 'gantt'
  }, {
    ref: 'viewport',
    selector: 'viewport'
  }, {
    ref: 'resourceGrid',
    selector: 'gantt grid[isLocked=true]'
  }, {
    ref: 'ganttInfo',
    selector: 'gantt #ganttInfo'
  }],
  findLegsRequest: undefined,
  statusLineLeg: null,
  statusLineRequest: null,
  parameterList: undefined,
  titleTpl: new Ext.XTemplate('({0:date("dMy")} - {1:date("dMy")})'),
  localAirport: null,
  statusLineScrollStep: 50,
  ganttLoaded: !1,
  init: function() {
    var a = this;
    a.track(['loadGantt', 'loadEvents', 'onPanelClose']);
    a.listen({
      controller: {
        '#Messaging': {
          opsdatachanged: a.dataChanged
        }
      },
      component: {
        'gantt': {
          eventdblclick: a.onEventDblClick,
          eventselectionchange: a.onSelectionChange,
          close: a.onPanelClose,
          beforeclose: a.removeAirportFilters,
          afterrender: a.onGanttAfterRender,
          resize: a.checkStatusLineScrolling
        },
        'gantt grid[isLocked=true]': {
          itemdblclick: a.onResourceGridItemDblClick,
          columnresize: a.setResizerBounds,
          columnschanged: a.setResizerBounds,
          viewready: function(b) {
            a.setResizerBounds(b.headerCt)
          }
        },
        'gantt button[action=jump-first]': {
          click: a.onClickTbarJumpFirst
        },
        'gantt button[action=jump-previous]': {
          click: a.onClickTbarJumpPrevious
        },
        'gantt button[action=jump-next]': {
          click: a.onClickTbarJumpNext
        },
        'gantt button[action=jump-last]': {
          click: a.onClickTbarJumpLast
        },
        'gantt button[action=jump-now]': {
          click: a.onClickTbarJumpNow
        },
        'gantt checkbox[action=show-status-line]': {
          change: a.onShowStatusLineChange
        },
        'gantt #statusLine': {
          show: a.onStatusLineShow
        },
        'gantt button[action=status-line-scroll-left]': {
          click: a.onStatusLineScrollLeft
        },
        'gantt button[action=status-line-scroll-right]': {
          click: a.onStatusLineScrollRight
        },
        'gantt toolbar combobox[name=zoom]': {
          change: a.onZoomComboBoxChange
        },
        'gantt toolbar timemodebutton#timemode': {
          timemodechange: a.onTimeModeChange
        },
        'gantt toolbar airportfilter': {
          filter: a.onAirportFilter
        }
      }
    })
  },
  startPolling: function() {
    var a = this,
        b = a.getController('Messaging'),
        c = a.getController('gantt.AtcSlot');
    b.stop();
    b.start(a.getMessagingSelector());
    c.start()
  },
  getMessagingSelector: function() {
    return Ext.String.format('OpsLegStart<{0} AND OpsLegEnd>={1}', Ext.Date.format(this.endDate, 'Ymd'), Ext.Date.format(this.originalStartDate, 'Ymd'))
  },
  stopPolling: function() {
    var a = this,
        b = a.getController('Messaging'),
        c = a.getController('gantt.AtcSlot');
    c.stop();
    b.stop()
  },
  onPanelClose: function() {
    var a = this;
    TimesSquare.util.Time.timeMode = 'utc';
    a.currentZoomLevel = 4;
    a.stopPolling();
    a.clearStores();
    a.ganttLoaded = !1;
    a.getController('Messaging').start()
  },
  currentZoomLevel: 4,
  onZoomComboBoxChange: function(d, a) {
    var c = this,
        b = c.getGantt();
    this.currentZoomLevel = a;
    b.zoomToLevel(a, !1)
  },
  getCorrectedStartDate: function(b, a) {
    var d = this,
        c;
    a = a || d.originalStartDate;
    b = Ext.isEmpty(b) ? d.currentZoomLevel : b;
    if (b !== 1 && b !== 2 && b !== 3) {
      return a
    }
    c = TimesSquare.util.Time.convert(a);
    if (a === c) {
      return a
    }
    a = new Date(a);
    while ((c.getHours() * 60 + c.getMinutes()) % (b === 3 ? 120 : 360) !== 0) {
      a.setMinutes(a.getMinutes() - 1);
      c = TimesSquare.util.Time.convert(a)
    }
    return a
  },
  setResizerBounds: function(e) {
    var f = this,
        a = f.getResourceGrid(),
        d = e.getGridColumns(),
        b, c;
    b = Ext.Array.reduce(d, function(b, a) {
      if (a.isFirstVisible) {
        c = a.width
      }
      return a.hidden && !a.hideable ? b : b + a.width
    }, 0);
    a.setMinWidth(c);
    a.setMaxWidth(b + 1)
  },
  dataChanged: function(c) {
    var a = this,
        b = !1,
        f = a.getGanttEventsStore(),
        e, d;
    if (!a.ganttLoaded) {
      return
    }
    for (d in c) {
      if (c.hasOwnProperty(d)) {
        b = a.dataChanged_OneEvent(c[d], b)
      }
    }
    if (b) {
      e = Date.now();
      Ext.resumeLayouts(!0);
      f.resumeEvents();
      a.getGantt().refreshViews();
      Ext.log.info('[Gantt controller] Update gantt, resume layouts: ' + (Date.now() - e) + ' ms');
      a.getGantt().refreshSelection()
    }
  },
  dataChanged_OneEvent: function(l, f) {
    if (!l) {
      return f
    }
    var e = this,
        c = l.getUpdatedObjects(),
        d = l.getDeletedObjects(),
        i = l.getNewAircrafts(),
        p = e.getGanttEventsStore(),
        k = e.statusLineEvent,
        n = e.getGantt(),
        u = n.getResourceStore(),
        v = e.getGanttResourcesStore().collect('Id'),
        s = n.getEventSelectionModel(),
        h = s.getSelection()[0],
        t = {},
        q = 0,
        j, m, r, a, o, g, b;
    if (!d.length && !c.length && !i.length) {
      return f
    }
    if (!f) {
      p.suspendEvents(!1);
      Ext.suspendLayouts();
      f = !0
    }
    e.getController('gantt.AtcSlot').handleAtcSlotUpdates(c, d);
    if (d.length) {
      if (k) {
        j = k.getId();
        for (b = 0; b < d.length; b += 1) {
          a = d[b];
          if (a.getId() === j) {
            e.updateStatusLine(null)
          }
          if (h && a.getId() === h.getId()) {
            s.deselect(h)
          }
        }
      }
      o = Date.now();
      p.removeOptimized(d);
      Ext.log.info('[Gantt controller] Removed ' + d.length + ' events by HQ: ' + (Date.now() - o) + ' ms')
    }
    if (c.length) {
      if (k) {
        j = k.getId();
        for (b = 0; b < c.length; b += 1) {
          a = c[b];
          g = a.original;
          if (g && g.getId() === j) {
            e.updateStatusLine(a)
          }
          if (g && h && g.getId() === h.getId()) {
            s.select(a)
          }
        }
      }
      for (b = 0; b < c.length; b += 1) {
        a = c[b];
        m = a.getResourceId();
        if (Ext.Array.contains(v, m) && (n.isInRange(a.get('StartDate')) || n.isInRange(a.get('EndDate')))) {
          r = t[m] || [];
          r.push(a);
          t[m] = r;
          q++
        }
      }
      if (q) {
        o = Date.now();
        p.addOptimized(t);
        Ext.log.info('[Gantt controller] Events store updated by HQ, ' + q + ' events: ' + (Date.now() - o) + ' ms')
      }
    }
    if (i.length) {
      i = Ext.Array.map(i, function(a) {
        return TimesSquare.model.gantt.Resource.transformResource(a)
      });
      u.add(i)
    }
    return f
  },
  numberOfDays: null,
  startDate: null,
  originalStartDate: null,
  endDate: null,
  loadGantt: function(f) {
    var a = this,
        c = a.getGantt(),
        b, d, e, h = c && c.normalGrid,
        g = h && h.getView();
    if (g) {
      c.setBufferVerticalScroll(g.getVerticalScroll())
    }
    a.stopPolling();
    a.clearStores();
    a.ganttLoaded = !0;
    if (f) {
      a.findLegsRequest = Ext.clone(f)
    }
    d = a.findLegsRequest.numberOfDays;
    b = a.findLegsRequest.beginDate;
    e = Ext.Date.add(b, Ext.Date.DAY, d);
    if (c && TimesSquare.util.Time.timeMode === 'local' && a.localAirport && !TimesSquare.util.Time.isCached(a.localAirport, b, d)) {
      TimesSquare.util.Time.loadAirportTime(a.localAirport, b, d, function() {
        Ext.log.info('Set local airport: timezone information loaded.');
        a.setAirport(a.localAirport);
        Ext.log.info('Recall the loadGantt method.');
        a.loadGantt(f)
      });
      return
    }
    a.numberOfDays = d;
    a.originalStartDate = new Date(b);
    b = a.getCorrectedStartDate(b);
    a.startDate = new Date(b);
    a.endDate = new Date(e);
    Ext.suspendLayouts();
    if (!c) {
      c = a.getViewport().add(Ext.create('TimesSquare.view.Gantt', {
        startDate: b,
        endDate: e
      }))
    } else {
      c.setTimeSpan(b, e)
    }
    c.setTitle(a.titleTpl.apply([b, Ext.Date.add(e, Ext.Date.DAY, -1)]));
    Ext.resumeLayouts();
    a.startPolling();
    a.getController('Messaging').collectedMessageEvents.clearChanges();
    setTimeout(function() {
      TimesSquare.service.Oss.findLegs(a.findLegsRequest, a.loadEvents, a)
    })
  },
  clearStores: function() {
    var a = this;
    a.getGanttResourcesStore().removeAll();
    a.getGanttEventsStore().removeAll()
  },
  onSelectionChange: function(c, a) {
    var b = this;
    Ext.Array.each(a, function(d) {
      if (d.data.eventType) {
        Ext.log.info('[Gantt] Selection change ' + (d ? '(eventType = "' + d.data.eventType + '", naturalId = "' + d.data.naturalId + '", Id = "' + d.data.Id + '")' : '(deselect)'));
        b.updateStatusLine(d);
        return !1
      }
    })
  },
  onStatusLineShow: function() {
    this.updateStatusLine(this.statusLineEvent)
  },
  updateStatusLine: function(b) {
    var a = this,
        f = a.getGantt(),
        g = f.getSchedulingView(),
        c = f.down('#statusLine{isVisible()}'),
        d = b && b.get(g.timeMode === 'local' ? 'urlStatusLineLocal' : 'urlStatusLine'),
        e = c && c.down('#statusLineContent');
    a.statusLineEvent = b;
    if (!e) {
      return
    }
    e.update('');
    a.checkStatusLineScrolling();
    if (a.statusLineRequest) {
      Ext.Ajax.abort(a.statusLineRequest);
      a.statusLineRequest = null
    }
    if (!b || !d) {
      return
    }
    a.statusLineRequest = Ext.Ajax.request({
      method: 'GET',
      url: d,
      success: function(i) {
        var e = i && Ext.decode(i.responseText, !0) || null,
            h = e && e.success && Ext.isObject(e.result) && e.result.statusLine,
            g = c && c.down('#statusLineContent'),
            f;
        a.statusLineRequest = null;
        if (!Ext.isString(h)) {
          f = 'Errorneous or missing Status Line Service response!';
          Ext.log.warn('Unable to retrieve status line (' + d + '): ' + f);
          Ext.Msg.show({
            icon: Ext.Msg.WARNING,
            buttons: Ext.Msg.OK,
            title: 'Flightlog Load Service',
            msg: f
          });
          return
        }
        if (g) {
          g.update('<div class="scrolling-content" style="position: absolute;white-space: nowrap;overflow: visible;">' + h + '</div>');
          a.checkStatusLineScrolling()
        }
      }
    })
  },
  onEventDblClick: function(f, b) {
    var e = this.getGantt().getSchedulingView().tip,
        c = this.getController('details.Main'),
        d = TimesSquare.controller.details.Main.view,
        a;
    if (b instanceof TimesSquare.model.gantt.Leg) {
      a = b.getUrl();
      c.open(d.LEG, a)
    } else {
      if (b instanceof TimesSquare.model.gantt.Check) {
        a = b.getUrl();
        if (a) {
          c.open(d.CHECK, a)
        }
      }
    }
    if (e) {
      Ext.defer(function() {
        e.hide()
      }, 100)
    }
  },
  onResourceGridItemDblClick: function(d, b) {
    var c = this,
        a = b.getUrl();
    if (a) {
      c.getController('details.Main').open(TimesSquare.controller.details.Main.view.AIRCRAFT, a)
    }
  },
  loadEvents: function(b) {
    var a = this,
        e = a.getGanttResourcesStore(),
        k = a.getGanttEventsStore(),
        i = a.getGanttInfo(),
        j = a.beforeShiftScrollPos,
        c, d, h, g, f;
    a.beforeShiftScrollPos = null;
    if (b && b.result) {
      d = Date.now();
      Ext.suspendLayouts();
      a.statusLineLeg = null;
      a.setParameterList(b.result.parameterList);
      e.enableLoadDataBuffer();
      e.addRawAircrafts(b.result.aircraftList);
      k.addRawEvents(b.result.legList, b.result.atcSlotList);
      e.flushLoadDataBuffer();
      Ext.resumeLayouts();
      d = Date.now() - d;
      Ext.log.info('Gantt Load time: ' + d + ' ms');
      if (i) {
        i.setText(Ext.String.format(i.tplText, d, e.getCount(), k.getCount()))
      }
      c = a.getGantt();
      h = c && c.normalGrid;
      g = h && h.getView();
      if (g) {
        f = c.getSchedulingView().el.down('table');
        if (f) {
          f.setWidth(0)
        }
        g.scrollVerticallyTo(c.getBufferVerticalScroll())
      }
      a.removeAirportFilters();
      a.getController('Clock').setTimelineColor(a.parameterList['com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.ops.gantt.now.line.color'], a.parameterList['com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.ops.compact.gantt.now.line.width']);
      if (j) {
        a.getGantt().getScrollable().scrollTo(j.x, j.y)
      }
      a.loadEvents.options(function(c) {
        c.tpl = a.trackingTpl + Ext.String.format(' | Legs: {0}; Aircrafts: {1}', b.result.legList.length, b.result.aircraftList.length)
      }, a)
    }
  },
  setParameterList: function(b) {
    var c = this,
        a;
    c.parameterList = {};
    for (a = 0; a < b.length; a += 1) {
      c.parameterList[b[a].key] = b[a].value
    }
    c.applySettings();
    TimesSquare.util.SortProvider.loadParameters(b)
  },
  applySettings: function() {
    var c = this,
        h = c.parameterList.ENABLE_FINE_LOG,
        a = c.parameterList['com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.HANDLE_ALTERNATE_REGISTRATION'],
        f = c.parameterList['com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.COMPACT_STATUS_LINE_DISPLAY'],
        g = c.parameterList['com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.COMPACT_SMART_INFO_DISPLAY'],
        b = c.getGantt(),
        e = b && b.down('checkbox[action=show-smart-info]'),
        d = b && b.down('checkbox[action=show-status-line]');
    TimesSquare.util.Logger.enableFineLog = h === !0 || h === 'true' || !1;
    a = a === !0 || a === 'true' || !1;
    b.toggleAltRegistrationColumn(a);
    TimesSquare.view.details.aircraft.Aircraft.showAlternativeRegistration = a;
    if (d) {
      d.setValue(f === !0 || f === 'true' || !1)
    }
    if (e) {
      e.setValue(g === !0 || g === 'true' || !1)
    }
  },
  onClickTbarJumpFirst: function() {
    var a = this,
        b = a.findLegsRequest.numberOfDays;
    a.shift(-b)
  },
  onClickTbarJumpPrevious: function() {
    this.shift(-1)
  },
  onClickTbarJumpNext: function() {
    this.shift(1)
  },
  onClickTbarJumpLast: function() {
    var a = this,
        b = a.findLegsRequest.numberOfDays;
    a.shift(b)
  },
  onClickTbarJumpNow: function() {
    var a = this,
        d = a.getGantt(),
        f = a.getController('Clock'),
        b = f.getCurrentTime(),
        c = d.getSchedulingView(),
        g = c.getBox().width / 2,
        e = Math.max(0, Math.round(c.getCoordinateFromDate(b, !0) - g));
    if (!d.isInRange(b)) {
      a.findLegsRequest.beginDate = Ext.Date.clearTime(b, !0);
      a.loadGantt()
    }
    c.scrollHorizontallyTo(e)
  },
  shift: function(c) {
    var a = this,
        b = a.findLegsRequest.beginDate;
    a.findLegsRequest.beginDate = Ext.Date.add(b, Ext.Date.DAY, c);
    a.beforeShiftScrollPos = Ext.clone(a.getGantt().getScrollable().getPosition());
    a.loadGantt()
  },
  onTimeModeChange: function(b, g) {
    var c = this,
        f = c.getGantt(),
        a = f.getSchedulingView(),
        h = Date.now(),
        e, d = a.el.down('table');
    a.timeMode = b;
    TimesSquare.util.Time.timeMode = b;
    Ext.log.info('[Gantt] Time mode is changed to "' + b + '", current local airport: "' + (this.localAirport || '') + '"');
    e = a.hasLoadingHeight;
    a.hasLoadingHeight = !0;
    f.refreshViews();
    a.hasLoadingHeight = e;
    if (d) {
      d.setWidth(0)
    }
    Ext.log.info('[Gantt controller] Time mode change: ' + (Date.now() - h) + ' ms');
    if (b === 'local') {
      this.selectLocalAirportHandler(g)
    } else {
      this.refreshTimeline()
    }
    c.updateStatusLine(c.statusLineEvent)
  },
  selectLocalAirportHandler: function(a) {
    var b = this,
        c, d, e;
    if (a) {
      a = a.toUpperCase();
      if (!a.match(/^[A-Z]{3}$/)) {
        Ext.Msg.show({
          title: 'Select local airport',
          msg: 'Wrong airport code!',
          icon: Ext.Msg.ERROR,
          buttons: Ext.Msg.OK
        });
        return
      }
    }
    if (!a) {
      TimesSquare.util.Time.setAirport(null);
      b.setAirport(null);
      return
    }
    c = b.startDate;
    d = b.numberOfDays;
    e = TimesSquare.util.Time.setAirport(a, c, d);
    if (e) {
      Ext.log.info('Set local airport: the timezone information is already in the cache.');
      b.setAirport(a);
      return
    }
    Ext.log.info('Set local airport: load the timezone information...');
    TimesSquare.util.Time.loadAirportTime(a, c, d, function() {
      Ext.log.info('Set local airport: timezone information loaded.');
      b.setAirport(a)
    })
  },
  setAirport: function(b) {
    var a = this;
    a.localAirport = b;
    if (TimesSquare.util.Time.timeMode === 'local') {
      a.refreshTimeline()
    }
  },
  refreshTimeline: function() {
    var b = this.getGantt(),
        a = b.timeAxis;
    a.reconfigure({
      start: this.getCorrectedStartDate(),
      end: a.end
    })
  },
  onGanttAfterRender: function() {
    TimesSquare.util.Time.timeMode = 'utc'
  },
  onAirportFilter: function(a, c) {
    var b = Ext.getStore('gantt.Resources'),
        d = Ext.getStore('gantt.Events');
    d.each(a.events);
    if (c.resources) {
      b.removeFilter(c.resources, !a.resources)
    }
    if (a.resources) {
      b.addFilter(a.resources)
    } else {
      this.getGantt().refreshViews()
    }
  },
  removeAirportFilters: function() {
    this.getGantt().down('airportfilter').clearFilters()
  },
  checkStatusLineScrolling: function() {
    var f = this,
        e = f.getGantt(),
        b = e && e.down('#statusLine{isVisible()}'),
        a = b && b.down('#statusLineContent'),
        c, d;
    if (a) {
      c = a.getEl().down('.scrolling-content');
      d = a && c && c.getWidth() > a.getWidth() || !1;
      b.items.getByKey('statusLineScrollLeft')[d ? 'show' : 'hide']();
      b.items.getByKey('statusLineScrollRight')[d ? 'show' : 'hide']()
    }
  },
  onShowStatusLineChange: function(e, b) {
    var d = this,
        c = d.getGantt(),
        a = c.down('#statusLine');
    a[b ? 'show' : 'hide']()
  },
  onStatusLineScrollLeft: function() {
    var d = this,
        c = d.getGantt(),
        b = c && c.down('#statusLine{isVisible()}'),
        a = b && b.down('#statusLineContent');
    if (a) {
      a.scrollBy(-d.statusLineScrollStep)
    }
  },
  onStatusLineScrollRight: function() {
    var d = this,
        c = d.getGantt(),
        b = c && c.down('#statusLine{isVisible()}'),
        a = b && b.down('#statusLineContent');
    if (a) {
      a.scrollBy(d.statusLineScrollStep)
    }
  }
});
