Ext.define('TimesSquare.overrides.ColumnLines', {
    override: 'Sch.feature.ColumnLines',
    init: function(a) {
        this.timeAxis = a.getTimeAxis();
        this.timeAxisViewModel = a.timeAxisViewModel;
        this.panel = a;
        this.store = new Ext.data.JsonStore({
            fields: ['Date', 'Cls']
        });
        this.store.loadData = this.store.loadData || this.store.setData;
        Sch.plugin.Lines.prototype.init.apply(this, arguments);
        a.on({
            orientationchange: this.populate,
            destroy: this.onHostDestroy,
            scope: this
        });
        this.timeAxisViewModel.on('update', this.populate, this);
        this.populate()
    },
    getData: function() {
        var f = this,
            h = f.panel,
            d = [],
            c, a, b, g, e;
        if (h.isHorizontal()) {
            f.timeAxisViewModel.forEachInterval(f.timeAxisViewModel.columnLinesFor, function(f, h, i) {
                if (i > 0) {
                    e = 'sch-column-line';
                    a = TimesSquare.util.Time.convert(f);
                    b = TimesSquare.util.Time.convert(h);
                    if (a.getHours() === 0 && a.getMinutes() === 0) {
                        e = 'sch-column-line-db';
                        c = !0
                    } else {
                        c = !1
                    }
                    d.push({
                        Date: f,
                        Cls: e
                    });
                    if (!c && !(b.getHours() === 0 && b.getMinutes() === 0) && Ext.Date.format(a, 'Ymd') !== Ext.Date.format(b, 'Ymd')) {
                        f = new Date(f);
                        g = Ext.Date.format(b, 'Ymd');
                        do {
                            f.setMinutes(f.getMinutes() + 1);
                            a = TimesSquare.util.Time.convert(f);
                            if (a.getHours() === 0 && a.getMinutes() === 0) {
                                d.push({
                                    Date: new Date(f),
                                    Cls: 'sch-column-line-db'
                                })
                            }
                        } while (Ext.Date.format(a, 'Ymd') <= g)
                    }
                }
            })
        }
        return d
    }
});
