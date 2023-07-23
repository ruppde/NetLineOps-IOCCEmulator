Ext.define('TimesSquare.util.SortProvider', {
    singleton: !0,
    mixins: {
        observable: 'Ext.util.Observable'
    },
    config: {
        store: null,
        selected: undefined
    },
    constructor: function(a) {
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this, a);
        if (this.store) {
            this.observeStore(this.store)
        }
    },
    observeStore: function(a) {
        this.mon(a, {
            add: 'onDataChanged',
            remove: 'onDataChanged',
            update: 'onDataChanged',
            scope: this
        });
        this.defaultSorters = a.getSorters()
    },
    unobserveStore: function(a) {
        this.mun(a, {
            add: 'onDataChanged',
            remove: 'onDataChanged',
            update: 'onDataChanged',
            scope: this
        })
    },
    setStore: function(a) {
        if (this.store) {
            this.unobserveStore(this.store)
        }
        this.store = a;
        if (a) {
            this.observeStore(a)
        }
    },
    paramRegexp: /^com\.lhsystems\.ops\.profile\.server\.dataimpl\.parameterconfiguration\.ops\.gantt\.ac\.sorter/,
    paramMatcher: function(a) {
        //return a.key.match(this.paramRegexp)
        return a
        return;
    },
    idRegexp: /^\d+$/,
    extractId: function(a) {
        var c = this,
        b = a;
          //  b = a.key.split('.');
          b = true;
        return Ext.Array.findBy(b, function(b) {
            return b.match(c.idRegexp)
        })
    },
    loadParameters: function(c) {
        var b = this,
            a = Ext.Array.filter(c, b.paramMatcher, this);
        a = Ext.Array.map(a, function(a) {
            return {
                id: b.extractId(a),
                name: a.value
            }
        });
        this.sorts = Ext.Array.sort(a, function(a, b) {
            return a.id > b.id
        });
        this.fireEvent('menuchanged')
    },
    onDataChanged: function() {
        this.fireEvent('menuchanged')
    },
    getSort: function(a) {
        return {
            prop: 'custom_sorter_' + a.sortData.id,
            direction: 'ASC'
        }
    },
    getMenuItems: function() {
        var a = this,
            b = Ext.Array.map(this.sorts || [], function(b) {
                return {
                    boxLabel: b.name,
                    sortData: b,
                    selected: a.selected === b.id,
                    handler: a.sortHandler,
                    margin: '0 0 0 5',
                    scope: a
                }
            }),
            c = [{
                boxLabel: 'Default',
                selected: !a.selected,
                handler: a.defaultSortHandler,
                margin: '0 0 0 5',
                scope: a
            }];
        Ext.Array.insert(b, 0, c);
        return {
            entries: b
        }
    },
    sortHandler: function(b, c) {
        if (!c) {
            return
        }
        var d = this.store,
            a;
        a = this.getSort(b);
        d.sort(a.prop, a.direction, this.multiColumnSort ? 'multi' : 'replace');
        this.selected = b.sortData.id
    },
    defaultSortHandler: function(d, a) {
        if (!a) {
            return
        }
        var c = this.store,
            b = this.defaultSorters;
        this.selected = null;
        c.sort(b)
    }
//}, 1, 0, 0, 0, 0, [
 //   ['observable', Ext.util.Observable]
//], [TimesSquare.util, 'SortProvider'], 0);
});