Ext.define('TimesSquare.model.IdFactory', {
    statics: {
        TYPE: {
            LEG: 'LEG',
            CHECK: 'CHECK',
            AIRCRAFT: 'AIRCRAFT'
        },
        getEventName: function(a) {
            return this.getLegName(a.natKey.flight)
        },
        getLegName: function(a) {
            var b = a.fnCarrier;
            if (!Ext.isEmpty(a.fnNumber)) {
                b = b + a.fnNumber
            }
            if (!Ext.isEmpty(a.fnSuffix) && a.fnSuffix !== ' ') {
                b = b + a.fnSuffix
            }
            return b
        },
        getEventNaturalIdString: function(a) {
            return this.getNaturalIdString(this.getEventName, a)
        },
        getNaturalIdString: function(d, a) {
            var b = d.call(this, a),
                c = Ext.String.format('{0}-{1}-{2}', b, a.departureSched, a.natKey.depApSched);
            return c
        },
        getEventId: function(e, b) {
            var a = ['{0}-{1}-{2}', e, b.ResourceId, b.eventType],
                c = b.counter,
                d;
            if (Ext.isNumber(c)) {
                a[0] += '-{3}';
                Ext.Array.insert(a, 3, [c])
            }
            d = Ext.String.format.apply(null, a);
            return d.replace(/:/g, '-')
        }
    }
});