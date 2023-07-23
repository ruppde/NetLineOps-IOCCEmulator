Ext.define('Inspector.Controller', {
    extend: 'Ext.app.Controller',
    target: null,
    enable: function() {
        this.setListeners(!0);
        this.setOverlay(!0)
    },
    disable: function() {
        this.setListeners(!1);
        this.setOverlay(!1)
    },
    setListeners: function(a) {
        var b = a ? 'on' : 'un';
        Ext.getBody()[b]('mousemove', this.onMouseMove, this)
    },
    setOverlay: function(c) {
        var a = this.overlay,
            b = this.highlightEl;
        if (!a) {
            this.overlay = a = Ext.getBody().appendChild(document.createElement('div'));
            this.highlightEl = b = a.appendChild(document.createElement('div'));
            a.addCls('inspector-overlay');
            b.addCls('inspector-highlight')
        }
        a[c ? 'show' : 'hide']()
    },
    onMouseMove: function(b, c) {
        var a = this.getDeepestTarget(c, b.getXY());
        if (a && (!this.target || this.target !== a)) {
            this.setTarget(a)
        }
    },
    highlight: function(a) {
        this.highlightEl.setBox(a.getBox())
    },
    setTarget: function(a) {
        this.target = a;
        this.publishTarget()
    },
    publishTarget: function() {
        this.highlight(this.target)
    },
    getDeepestTarget: function(f, d) {
        var e = new Ext.util.Point(d[0], d[1]),
            a = Ext.get(f),
            c, b;
        a = a.up('[data-inspectioncls]') || a;
        b = a.select('[data-inspectioncls]').elements.filter(function(a) {
            return e.isContainedBy(a)
        });
        if (a.getAttribute('data-inspectioncls')) {
            b.push(a)
        }
        c = b.map(function(c) {
            var b = Ext.get(c),
                a = b;
            b.depth = 0;
            do {
                a = a.parent('[data-inspectioncls]');
                if (a === b) {
                    a = null
                } else {
                    b.depth++
                }
            } while (a);
            return b
        }).sort(function(a, b) {
            return a.depth > b.depth ? -1 : 1
        })[0];
        return c
    }
});
