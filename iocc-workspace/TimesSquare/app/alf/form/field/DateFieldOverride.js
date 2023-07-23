Ext.define('Alf.form.field.DateFieldOverride', {
    override: 'Ext.form.field.Date',
    getTimeField: function() {
        var a = this,
            b;
        if (a.timeFieldName && !a.timeField) {
            b = a.up('form') || a.up('panel');
            a.timeField = b && b.rendered && b.down('[name=' + a.timeFieldName + ']')
        }
        return a.timeField
    },
    mergeDateWithTime: function(a, b) {
        if (!a) {
            return null
        }
        if (!b) {
            return a
        }
        a.setHours(b.getHours());
        a.setMinutes(b.getMinutes());
        a.setSeconds(b.getSeconds());
        a.setMilliseconds(b.getMilliseconds());
        return a
    },
    setValue: function(a) {
        var e = a ? new Date(a) : a,
            f = (arguments.callee.$previous || Ext.form.field.Picker.prototype.setValue).apply(this, arguments),
            b = this.getTimeField();
        if (b) {
            var d = arguments.callee && arguments.callee.caller;
            var c = [Ext.form.field.Date.prototype.onSelect, Ext.form.field.Date.prototype.beforeBlur, Ext.form.field.Date.prototype.onBlur];
            if (!Ext.Array.contains(c, d)) {
                b.setValue(e)
            }
        }
        return f
    },
    parseDate: function() {
        var a = arguments.callee.$previous.apply(this, arguments),
            b = this.getTimeField();
        if (b) {
            a = this.mergeDateWithTime(a, b.getValue())
        }
        return a
    }
});
