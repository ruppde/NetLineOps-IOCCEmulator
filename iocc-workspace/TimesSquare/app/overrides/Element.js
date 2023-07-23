Ext.define('TimesSquare.overrides.Element', {
    override: 'Ext.dom.Element',
    focus: function(c, a) {
        var b = this;
        a = a || b.dom;
        if (Number(c)) {
            Ext.defer(b.focus, c, b, [null, a])
        } else {
            Ext.GlobalEvents.fireEvent('beforefocus', a);
            if (a) {
                a.focus()
            }
        }
        return b
    }
});
