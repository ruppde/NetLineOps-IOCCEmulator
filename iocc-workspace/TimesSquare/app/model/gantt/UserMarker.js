Ext.define('TimesSquare.model.gantt.UserMarker', {
    extend: 'Ext.data.Model',
    fields: ['number'],
    constructor: function() {
        var a = Ext.Array.from(arguments),
            b = a[0];
        if (b && Ext.isNumeric(b)) {
            b = {
                number: a.shift()
            };
            a.unshift(b)
        }
        Ext.data.Model.prototype.constructor.apply(this, a)
    },
    composeAttributes: function(b) {
        var a = this.getInfoFromParameters(b);
        if (Ext.Object.getKeys(a).length > 0) {
            return {
                'data-qtip': a.name.replace('\n', '<br>'),
                style: {
                    'border-color': 'transparent transparent ' + a.color + ' transparent'
                }
            }
        }
        return null
    },
    getInfoFromParameters: function(b) {
        var c = 'com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration.MARKER_',
            a = Ext.Object.getKeys(b),
            e = new RegExp(Ext.String.format('{0}.+_{1}$', c, this.get('number'))),
            d = {};
        a = Ext.Array.filter(a, function(a) {
            return e.test(a)
        });
        Ext.each(a, function(a) {
            var e = a.replace(c, '').replace(/_\d+$/, '').toLowerCase();
            d[e] = b[a]
        });
        return d
    }
});
