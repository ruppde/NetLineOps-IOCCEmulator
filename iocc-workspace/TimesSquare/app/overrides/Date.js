Ext.define('TimesSquare.overrides.Date', {}, function() {
    var a = Ext.Date;
    a.diff = function(e, d, f) {
        var b, c = +d - e;
        switch (f) {
            case a.MILLI:
                return c;
            case a.SECOND:
                return Math.floor(c / 1000);
            case a.MINUTE:
                return Math.floor(c / 60000);
            case a.HOUR:
                return Math.floor(c / 3600000);
            case a.DAY:
                return Math.floor(c / 86400000);
            case 'w':
                return Math.floor(c / 604800000);
            case a.MONTH:
                b = d.getFullYear() * 12 + d.getMonth() - (e.getFullYear() * 12 + e.getMonth());
                if (a.add(e, f, b) > d) {
                    return b - 1
                };
                return b;
            case a.YEAR:
                b = d.getFullYear() - e.getFullYear();
                if (a.add(e, f, b) > d) {
                    return b - 1
                };
                return b;
            default:
        }
    }
});
