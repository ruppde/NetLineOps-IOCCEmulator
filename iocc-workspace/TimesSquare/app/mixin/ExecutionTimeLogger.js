Ext.define('TimesSquare.mixin.ExecutionTimeLogger', {
    executionTrackMap: {},
    trackingTpl: '{0} | Execution time: {1}ms',
    trackingDefaults: {
        level: 'info'
    },
    track: function(a) {
        var b = this;
        a = b.assembleConfig(a);
        b.configure(a);
        Ext.Object.each(a, function(e, c) {
            var f = Ext.isObject(a) ? c.level : c,
                d = Ext.isObject(a) ? c.tpl || b.trackingTpl : b.trackingTpl;
            b.trackMethod(e, {
                lvl: f,
                tpl: d
            })
        })
    },
    untrack: function(a) {
        var b = this.executionTrackMap[a].original;
        if (b) {
            this[a] = b;
            delete this.executionTrackMap[a]
        }
    },
    assembleConfig: function(a) {
        var b = {};
        if (Ext.isString(a)) {
            b[a] = {}
        } else {
            if (Ext.isArray(a)) {
                Ext.each(a, function(c) {
                    b[c] = {}
                })
            } else {
                if (Ext.isObject(a)) {
                    Ext.Object.each(a, function(d, c) {
                        if (Ext.isString(c)) {
                            b[d] = {
                                level: c
                            }
                        } else {
                            b[d] = c
                        }
                    })
                } else {
                    b = a
                }
            }
        }
        return b
    },
    configure: function(a) {
        var b = Ext.Object.merge(this.trackingDefaults || {}, a.defaults || {});
        Ext.Object.each(a, function(d, c) {
            a[d] = Ext.Object.merge(b, c)
        });
        if (a.defaults) {
            delete a.defaults
        }
        return a
    },
    trackMethod: function(a, c) {
        var b = this,
            d = b[a],
            e = function() {
                var h = d.displayName,
                    g = c.lvl || 'info',
                    i = Ext.Function.createInterceptor(d, function() {
                        var b = this.executionTrackMap[a];
                        b.start = b.start || new Date();
                        b.step = b.step || 0;
                        b.options = b.options || c;
                        b.step += 1
                    }, b),
                    f = function() {
                        var b = this.executionTrackMap[a],
                            d, e;
                        b.step -= 1;
                        if (b.step <= 0) {
                            d = new Date() - this.executionTrackMap[a].start;
                            e = Ext.String.format(c.tpl, h, d);
                            Ext.log[g](e);
                            delete b.start;
                            delete b.step;
                            delete b.options
                        }
                    },
                    e = Ext.Function.createSequence(i, f, b);
                e.options = function(b, d) {
                    Ext.callback(b, d, [c])
                };
                e.stepIn = function() {
                    b.executionTrackMap[a].step += 1
                };
                e.stepOut = function() {
                    f.apply(b)
                };
                return e
            }();
        b.executionTrackMap[a] = {
            original: d
        };
        b[a] = e
    }
});