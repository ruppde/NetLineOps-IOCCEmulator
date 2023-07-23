Ext.define('TimesSquare.view.gantt.Sorter', {
    extend: 'Ext.button.Button',
    component: !0,
    box: !0,
    button: !0,
    xtype: 'gantt.sorter',
    mixins: {
        observable: 'Ext.util.Observable'
    },
    config: {
        provider: undefined,
        store: undefined
    },
    text: 'Aircraft',
    constructor: function(a) {
        Ext.button.Button.prototype.constructor.apply(this, arguments);
        this.mixins.observable.constructor.call(this, a)
    },
    initComponent: function() {
        Ext.button.Button.prototype.initComponent.apply(this, arguments);
        if (this.provider) {
            this.setProviderStore();
            this.observeProvider()
        }
    },
    setProvider: function(a) {
        var b = this.provider;
        if (b) {
            this.unobserveProvider()
        }
        this.provider = a;
        if (a) {
            this.observeProvider();
            this.setProviderStore();
            this.refreshMenu()
        }
    },
    setProviderStore: function() {
        var b = this.provider,
            a = this.getStore();
        if (Ext.isString(a)) {
            this.store = a = Ext.getStore(a)
        }
        if (b) {
            b.setStore(a)
        }
    },
    observeProvider: function() {
        var a = this.provider;
        if (a) {
            this.mon(a, {
                menuchanged: 'onProviderMenuChanged',
                scope: this
            })
        }
    },
    unobserveProvider: function() {
        var a = this.provider;
        if (a) {
            this.mun(a, {
                menuchanged: 'onProviderMenuChanged',
                scope: this
            })
        }
    },
    onProviderMenuChanged: function() {
        this.refreshMenu()
    },
    refreshMenu: function() {
        var b = this.provider,
            a = b.getMenuItems().entries;
        Ext.each(a, function(a) {
            if (a.selected) {
                delete a.selected;
                a.checked = !0;
                return !1
            }
        });
        if (b && a && a.length) {
            this.enable();
            this.setMenu({
                plain: !0,
                defaults: {
                    xtype: 'radiofield',
                    name: 'sort'
                },
                items: a
            })
        } else {
            this.setMenu(undefined);
            this.disable()
        }
    },
    getMenuFromProvider: function() {
        var a = this.provider;
        return a ? a.getMenuItems() : undefined
    },
    setMenu: function() {
        Ext.button.Button.prototype.setMenu.apply(this, arguments);
        Ext.defer(function() {
            this.updateLayout()
        }, 200, this)
    }
});
