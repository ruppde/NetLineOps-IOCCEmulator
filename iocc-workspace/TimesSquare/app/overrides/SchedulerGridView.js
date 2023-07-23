Ext.define('TimesSquare.overrides.SchedulerGridView', {
    override: 'Sch.view.SchedulerGridView',
    mixins: {
        tooltipable: 'TimesSquare.mixin.Tooltipable'
    },
    initComponent: function() {
        (arguments.callee.$previous || Sch.view.SchedulerGridView.prototype.initComponent).call(this);
        this.getEventSelectionModel().on({
            'select': this.onEventSelect,
            'deselect': this.onEventDeselect,
            scope: this
        })
    },
    onEventSelect: function(a, c) {
        var d = this,
            b;
        b = d.getAdjacentEvents(c);
        if (a.view.onInitialEventSelect) {
            a.view.onInitialEventSelect(c)
        }
        Ext.each(b, function(b) {
            a.view.onEventBarSelect(b)
        })
    },
    onEventDeselect: function(c, b) {
        var d = this,
            a;
        a = d.getAdjacentEvents(b);
        Ext.each(a, function(a) {
            c.view.onEventBarDeselect(a)
        })
    },
    getAdjacentEvents: function(c) {
        var b = c.data.Id,
            f = b.substr(0, b.length - 1),
            d = c.store,
            e = [],
            a, g;
        if (!d) {
            return
        }
        if (c.data.legId) {
            a = g = d.findRecord('Id', c.data.legId);
            if (a) {
                e.push(a);
                a = null
            }
            if (g) {
                b = g.data.Id;
                f = b.substr(0, b.length - 1)
            }
        }
        if (Ext.String.endsWith(b, 'S')) {
            a = d.findRecord('Id', f + 'A')
        } else {
            if (Ext.String.endsWith(b, 'A')) {
                a = d.findRecord('Id', f + 'S')
            }
        }
        if (a) {
            e.push(a);
            a = null
        }
        a = d.findRecord('legId', c.data.Id);
        if (a) {
            e.push(a)
        }
        return e
    }
});
