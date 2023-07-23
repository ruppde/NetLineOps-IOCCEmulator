Ext.define('TimesSquare.controller.Selection', {
    extend: 'Ext.app.Controller',
    mixins: {
        logger: 'TimesSquare.mixin.ExecutionTimeLogger'
    },
    refs: [{
        ref: 'topButton',
        selector: 'SelectionView button[action=loadGantt]'
    }, {
        ref: 'selectionView',
        selector: 'SelectionView'
    }, {
        ref: 'namedSelection',
        selector: 'SelectionView #namedSelections'
    }, {
        ref: 'aircraftsView',
        selector: 'SelectionView #aircrafts'
    }, {
        ref: 'ownerColumn',
        selector: 'SelectionView #aircrafts gridcolumn[dataIndex=owner]'
    }, {
        ref: 'subtypeColumn',
        selector: 'SelectionView #aircrafts gridcolumn[dataIndex=subtype]'
    }, {
        ref: 'stateColumn',
        selector: 'SelectionView #aircrafts gridcolumn[dataIndex=state]'
    }, {
        ref: 'startDate',
        selector: 'SelectionView datefield'
    }, {
        ref: 'days',
        selector: 'SelectionView numberfield'
    }, {
        ref: 'autoLoad',
        selector: 'SelectionView checkbox'
    }, {
        ref: 'carriers',
        selector: 'SelectionView button[name=carriers]'
    }],
    stores: ['SelectableAircrafts', 'NamedSelections'],
    init: function() {
        var a = this,
            b = a.getSelectableAircraftsStore();
        a.track(['onClickSelectionsItem', 'loadGantt']);
        b.on('datachanged', a.loadOptions, a);
        b.on('update', a.setTopButtonState, a);
        a.control({
            'SelectionView button[action=loadGantt]': {
                click: a.onClickLoadGanttButton
            },
            'SelectionView': {
                afterrender: a.afterRender
            },
            'SelectionView #namedSelections': {
                selectionchange: a.onClickSelectionsItem,
                itemdblclick: a.onDblClickSelectionsItem
            },
            'SelectionView datefield': {
                validitychange: a.setTopButtonState
            },
            'SelectionView numberfield': {
                validitychange: a.setTopButtonState
            }
        })
    },
    setTopButtonState: function() {
        var a = this,
            f = a.getTopButton(),
            b, d = !1,
            e = a.getSelectableAircraftsStore().getUnfilteredData(),
            c = e.collect('selected', 'data');
        if (a.getStartDate().isValid() === !0 && a.getDays().isValid() === !0) {
            for (b = 0; b < c.length; b += 1) {
                if (c[b] === !0) {
                    d = !0;
                    break
                }
            }
        }
        f.setDisabled(!d)
    },
    findSelections: function() {
        var a = this;
        TimesSquare.service.Aircraft.findSelections(function(b) {
            if (b) {
                a.getNamedSelectionsStore().loadRawData(b.result.namedSelections);
                a.getSelectableAircraftsStore().loadRawData(b.result.aircraftList);
                a.setDefaultCarriers(b.result.defaultCarriers)
            }
        })
    },
    afterRender: function() {
        this.findSelections()
    },
    loadOptions: function() {
        var b = this,
            a = b.getSelectableAircraftsStore();
        this.getOwnerColumn().initialConfig.filter.options = a.collect('owner').sort();
        this.getSubtypeColumn().initialConfig.filter.options = a.collect('subtype').sort();
        this.getStateColumn().initialConfig.filter.options = a.collect('state').sort()
    },
    onClickSelectionsItem: function() {
        var a = this,
            h = !1,
            b = a.getNamedSelection().getSelectionModel().getSelection(),
            g = a.getSelectableAircraftsStore(),
            i = g.getUnfilteredData(),
            d, c, f, e;
        if (b) {
            b = b[0];
            Ext.log.info('[Selection] Selection change: ' + b.data.selectionID);
            Ext.suspendLayouts();
            g.un('update', a.setTopButtonState, a);
            f = b.getAircraftSelections().data.items;
            e = b.getLogicalAircraftSubfleets().data.items;
            a.getStartDate().setValue(b.getBeginDate());
            a.getDays().setValue(b.getNumberOfDays());
            a.getAutoLoad().setValue(b.get('autoLoadPhysicalAircrafts'));
            a.populateCarriers(b.get('flightCarriers'));
            i.each(function(a) {
                c = !1;
                for (d = 0; d < f.length; d += 1) {
                    c = a.equalsAircraft(f[d]);
                    if (c === !0) {
                        break
                    }
                }
                if (!c) {
                    for (d = 0; d < e.length; d += 1) {
                        c = a.equalsLogicalAircraft(e[d]);
                        if (c === !0) {
                            break
                        }
                    }
                }
                if (!h) {
                    h = a.data.selected !== c
                }
                a.data.selected = c
            });
            if (h) {
                a.getAircraftsView().getView().refresh()
            }
            g.on('update', a.setTopButtonState, a);
            a.setTopButtonState();
            Ext.resumeLayouts();
            a.onClickSelectionsItem.options(function(h) {
                var j = ' | Selectable Aircrafts: {0}; Aircraft selections: {1}; Logical Aircraft selections: {2}',
                    d = i.length,
                    c = f.length,
                    b = e.length,
                    g = Ext.String.format(j, d, c, b);
                h.tpl = a.trackingTpl + g
            }, a)
        }
    },
    onClickLoadGanttButton: function() {
        this.loadGantt()
    },
    onDblClickSelectionsItem: function() {
        var a = this,
            b = a.getTopButton();
        if (!b.isDisabled()) {
            a.loadGantt()
        }
    },
    loadGantt: function() {
        var d = this,
            e, b, a = {
                aircraftSelections: [],
                logicalAircraftSubfleets: [],
                beginDate: d.getStartDate().getValue(),
                numberOfDays: d.getDays().getValue()
            },
            c = d.getSelectableAircraftsStore().getUnfilteredData();
        c = c.items;
        Ext.log.info('[Selection] Load gantt... Number of days: ' + a.numberOfDays + ', begin date: ' + Ext.Date.format(a.beginDate, 'Y-m-d'));
        for (e = 0; e < c.length; e += 1) {
            b = c[e];
            if (b.isSelected()) {
                if (b.isLogical()) {
                    a.logicalAircraftSubfleets.push(b.getLogicalAircraftSubfleet())
                } else {
                    a.aircraftSelections.push(b.getAircraftSelection())
                }
            }
        }
        a.autoLoadPhysicalAircrafts = this.getAutoLoad().getValue();
        a.flightCarriers = this.getSelectedCarriers();
        d.getController('gantt.Gantt').loadGantt(a)
    },
    getSelectionDates: function(g) {
        var e = this,
            a = Ext.Date,
            b = a.format,
            d = e.getStartDate().getValue() || new Date(),
            h = e.getDays().getValue() || 1,
            f = a.add(d, a.DAY, h),
            c = g || 'Y-m-d';
        return {
            beginDate: b(d, c),
            endDate: b(f, c)
        }
    },
    setDefaultCarriers: function(a) {
        this.defaultCarriers = a || [];
        this.populateCarriers()
    },
    getSelectedCarriers: function() {
        var a = [];
        this.getCarriers().getMenu().items.each(function(b) {
            if (!b.isCheckbox) {
                return
            }
            if (b.getValue()) {
                a.push(b.name)
            }
        });
        return a
    },
    populateCarriers: function(b) {
        var c = this.defaultCarriers,
            a = this.getCarriers().getMenu(),
            d;
        c = c || [];
        b = b || [];
        this.selectionCarriers = b;
        a.removeAll();
        Ext.Array.each(c, function(c) {
            a.add({
                boxLabel: c,
                name: c,
                checked: !1
            })
        });
        if (b.length > 0) {
            a.add({
                xtype: 'menuseparator',
                margin: '3 0'
            })
        }
        Ext.Array.each(b, function(c) {
            var d = a.down('[name=' + c + ']');
            if (d) {
                d.setValue(!0)
            } else {
                a.add({
                    boxLabel: c,
                    name: c,
                    checked: !0
                })
            }
        });
        d = a.add({
            xtype: 'textfield',
            hideLabel: !0,
            emptyText: 'Add carrier...',
            triggers: {
                add: {
                    cls: 'add-trigger',
                    handler: 'addCarrier',
                    scope: this
                }
            },
            listeners: {
                specialkey: function(c, a) {
                    if (a.getKey() === a.ENTER) {
                        this.addCarrier(d)
                    }
                },
                scope: this
            }
        })
    },
    addCarrier: function(e) {
        var a = Ext.String.trim(e.getValue()),
            c = this.getCarriers().getMenu(),
            b = this.selectionCarriers,
            f = this.defaultCarriers,
            d = Ext.Array.contains;
        if (Ext.isEmpty(a) || d(b, a) || d(f, a)) {
            return
        }
        if (b.length <= 0) {
            c.add({
                xtype: 'menuseparator',
                margin: '3 0'
            })
        }
        b.push(a);
        c.insert(c.items.length - 1, {
            boxLabel: a,
            name: a,
            checked: !0
        });
        e.selectText()
    }
});