Ext.define('TimesSquare.view.common.MessageWindow', {
    extend: 'Ext.window.MessageBox',
    component: !0,
    box: !0,
    container: !0,
    panel: !0,
    window: !0,
    messagebox: !0,
    closable: !0,
    draggable: !1,
    closeDelay: undefined,
    closeTimer: undefined,
    focusOnToFront: !1,
    closeAction: 'destroy',
    statics: {
        _cache: [],
        windows: [],
        maxWindows: 5,
        stackOffsets: [0, -10],
        offsets: [-10, -10],
        animated: !0,
        cache: !1,
        maxCache: !1,
        animConfig: {
            duration: 200,
            easing: 'linear'
        },
        show: function(b) {
            var a;
            if (this.cache && this.windows.length >= this.maxWindows) {
                if (this.maxCache !== !1 && this._cache.length >= this.maxCache) {
                    this._cache.shift()
                }
                this._cache.push(b);
                return
            }
            a = (new this()).show(b);
            a.on({
                beforeClose: this.onBeforeClose,
                close: this.onClose,
                scope: this
            });
            this.windows.unshift(a);
            while (this.windows.length > this.maxWindows) {
                this.windows.pop().close()
            }
            this.repositionWindows();
            this.organizeZIndex();
            return a
        },
        onBeforeClose: function(a) {
            Ext.Array.remove(this.windows, a);
            this.repositionWindows()
        },
        onClose: function() {
            var b = this._cache,
                a = b.shift(),
                c = this.windows.length < this.maxWindows;
            if (a && c) {
                this.show(a)
            } else {
                this.organizeZIndex()
            }
        },
        repositionWindows: function(a) {
            var c = Ext.getBody(),
                h = this.windows,
                i = h.length,
                f = this.animConfig,
                g = this.offsets,
                e = this.stackOffsets,
                d, b;
            a = a || !this.animated;
            Ext.Array.each(h, function(h, j) {
                d = c.getWidth() - h.getWidth() + g[0] + e[0] * (i - j - 1);
                b = c.getHeight() - h.getHeight() + g[1] + e[1] * (i - j - 1);
                if (!h.initiallyPositioned) {
                    h.constrain = !1;
                    h.setPosition(c.getWidth() + 200, b);
                    h.constrain = !0;
                    h.setPosition(d, b, a ? !1 : f);
                    h.initiallyPositioned = !0
                } else {
                    h.setPosition(d, b, a ? !1 : f)
                }
            })
        },
        organizeZIndex: function() {
            var b = this.windows,
                a;
            for (a = 0; a < b.length; a++) {
                b[a].toFront(!0)
            }
        }
    },
    onShow: function() {
        var a = this,
            b = a.closeDelay;
        Ext.window.MessageBox.prototype.onShow.apply(this, arguments);
        if (b) {
            a.closeTimer = Ext.defer(a.close, b, a);
            a.el.on('mouseenter', function() {
                Ext.undefer(a.closeTimer)
            });
            a.el.on('mouseleave', function() {
                Ext.defer(a.close, b, a)
            })
        }
    },
    setIcon: function(d, c, b) {
        var a = this.iconComponent;
        if (a) {
            (arguments.callee.$previous || Ext.window.MessageBox.prototype.setIcon).apply(this, arguments)
        } else {
            this.icon = [d, c, b]
        }
    },
    afterRender: function() {
        Ext.window.MessageBox.prototype.afterRender.apply(this, arguments);
        if (this.icon) {
            this.setIcon.apply(this, this.icon)
        }
    },
    reconfigure: function(a) {
        if (!Ext.isDefined(a.modal)) {
            a.modal = !1
        }
        if (a.closeDelay) {
            this.closeDelay = a.closeDelay
        }
        Ext.window.MessageBox.prototype.reconfigure.apply(this, arguments)
    },
    btnCallback: function() {
        this.close()
    },
    close: function() {
        if (this.fireEvent('beforeclose', this) === !1) {
            return
        }
        if (!this.self.animated) {
            return this.doClose()
        }
        var a = this,
            c = Ext.getBody(),
            d = c.getWidth() + 200,
            e = a.getY(),
            b = this.self.animConfig;
        a.constrain = !1;
        a.setPosition(d, e, Ext.apply({
            callback: function() {
                a.doClose()
            }
        }, b))
    }
}, function(a) {
    Ext.onReady(function() {
        Ext.getBody().on('resize', function() {
            a.repositionWindows(!0)
        })
    })
});
