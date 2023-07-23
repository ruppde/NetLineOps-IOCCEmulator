Ext.define('TimesSquare.controller.Clock', {
    extend: 'Ext.app.Controller',
    expiry: 3600000,
    lastQueried: undefined,
    lastKnown: undefined,
    task: undefined,
    model: undefined,
    stores: ['gantt.Timelines'],
    refs: [{
        ref: 'gantt',
        selector: 'gantt'
    }],
    start: function() {
        var a = this;
        if (!a.model) {
            a.loadCurrentTime(function(b) {
                a.model = Ext.create('TimesSquare.model.gantt.Timeline');
                a.setCurrentTime(b);
                a.getGanttTimelinesStore().add(a.model)
            })
        } else {
            a.loadCurrentTime(a.setCurrentTime)
        }
        if (!a.task) {
            a.task = Ext.util.TaskManager.newTask({
                run: a.refreshClock,
                interval: 60000,
                scope: a
            })
        }
        a.task.start()
    },
    refreshClock: function() {
        var a = this,
            d = Ext.Date.now(),
            b = d - a.lastQueried,
            c;
        if (b > a.expiry) {
            a.loadCurrentTime(a.setCurrentTime)
        } else {
            c = new Date(a.lastKnown + b);
            a.setCurrentTime(c)
        }
    },
    loadCurrentTime: function(b) {
        var a = this;
        TimesSquare.service.Oss.getCurrentTime(function(d) {
            var c;
            if (d) {
                c = Ext.Date.parse(d.result.currentTime, 'c');
                a.lastQueried = Ext.Date.now();
                a.lastKnown = c.getTime();
                if (b) {
                    b.call(a, c)
                }
            }
        }, a)
    },
    setCurrentTime: function(b) {
        var d = this,
            c = this.getGantt(),
            a = c && c.getPlugin('lines');
        d.model.setDate(b);
        d.fireEvent('opsclockchanged', b);
        if (a) {
            a.renderElements()
        }
    },
    getCurrentTime: function() {
        return this.model.getDate()
    },
    setTimelineColor: function(b, c) {
        var a = this.model;
        if (a) {
            a.set('Color', b);
            a.set('Width', c || 1)
        }
    }
});