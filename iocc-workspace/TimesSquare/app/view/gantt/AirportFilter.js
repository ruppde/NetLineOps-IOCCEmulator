Ext.define('TimesSquare.view.gantt.AirportFilter', {
    extend: 'Ext.form.field.Text',
    component: !0,
    box: !0,
    field: !0,
    textfield: !0,
    airportfilter: !0,
    xtype: 'airportfilter',
    upperCase: !0,
    hideTrigger: !0,
    emptyText: 'Filter by Airport',
    config: {
        fields: []
    },
    listeners: {
        specialkey: 'onSpecialKeyHandler',
        change: 'onChangeHandler'
    },
    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: 'clearFilters'
        },
        search: {
            cls: 'x-form-search-trigger',
            handler: 'fireFilterEvent'
        }
    },
    initComponent: function() {
        Ext.form.field.Text.prototype.initComponent.call(this);
        this.cachedFilters = {
            resources: undefined,
            events: undefined
        };
        this.isFilterApplied = !1
    },
    applyTriggers: function(a) {
        delete a.picker;
        return Ext.form.field.Text.prototype.applyTriggers.call(this, a)
    },
    clearFilters: function() {
        this.setValue(null);
        this.fireFilterEvent()
    },
    fireFilterEvent: function() {
        var c = this.isValid(),
            a = this.getValue(),
            b;
        a = Ext.isArray(a) ? undefined : a;
        if (c) {
            b = {
                resources: this.getResourceFilter(a),
                events: this.getEventFilter(a)
            };
            this.isFilterApplied = a;
            this.fireEvent('filter', b, this.cachedFilters);
            this.cacheFilters(b)
        }
        this.focus(!0);
        this.updateTriggersVisibility()
    },
    updateTriggersVisibility: function() {
        this.setHideTrigger(!this.isDirty() && !this.isFilterApplied)
    },
    getResourceFilter: function(a) {
        if (!a) {
            return
        }
        var b = this.getFields();
        return Ext.create('Ext.util.Filter', {
            filterFn: function(c) {
                return Ext.Array.some(c.getEvents(), function(d) {
                    return Ext.Array.some(b, function(b) {
                        var e = d.get(b) || '';
                        return a.toUpperCase() === e.toUpperCase()
                    })
                })
            }
        })
    },
    getEventFilter: function(a) {
        var b = this.getFields();
        return function(c) {
            var e = c.get('legId'),
                f = e ? c.store.getById(e) : c,
                d;
            if (a) {
                d = Ext.Array.every(b, function(b) {
                    var d = f.get(b) || '';
                    return a.toUpperCase() !== d.toUpperCase()
                })
            } else {
                d = !1
            }
            c.data.filteredOut = d
        }
    },
    cacheFilters: function(a) {
        this.cachedFilters = a
    },
    onSpecialKeyHandler: function(b, a) {
        if (a.getKey() === a.ENTER && b.isValid()) {
            this.fireFilterEvent()
        }
    },
    onChangeHandler: function(a) {
        a.updateTriggersVisibility()
    }
});