Ext.define('TimesSquare.mixin.FieldSizeMixin', {
    mxCreateItems: function() {
        var b = this,
            a = TimesSquare.CONFIG.detailViewFieldSize,
            f = a.smallField,
            c = a.mediumField,
            e = a.largeField,
            g = a.margin,
            d = a.labelStyle;
        if (b.createItems) {
            b.createItems(f, c, e, g, d)
        }
    }
});