//TODO
Ext.define('TimesSquare.overrides.TimeAxis', {
    override: 'Sch.view.model.TimeAxis',
    calculateTickWidth: function() {
        var a = this.timeAxis,
            c = this.getAvailableWidth(),
            d = a.defaultSpan,
            b = a.getResolution().increment;
        return Math.floor(c / (d * b)) || 1
    }
});
