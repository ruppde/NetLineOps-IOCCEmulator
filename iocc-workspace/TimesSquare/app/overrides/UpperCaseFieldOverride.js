Ext.define('TimesSquare.overrides.UpperCaseFieldOverride', {
    override: 'Ext.form.field.Base',
    initComponent: function() {
        (arguments.callee.$previous || Ext.Component.prototype.initComponent).call(this);
        this.setUpperCase(this.upperCase)
    },
    getUpperCase: function() {
        return this.upperCase
    },
    setUpperCase: function(a) {
        this.upperCase = a;
        this[a ? 'addCls' : 'removeCls']('x-form-uppercase')
    },
    getRawValue: function() {
        var a = arguments.callee.$previous.apply(this, arguments);
        return this.valueToRaw(a)
    },
    valueToRaw: function(a) {
        if (this.upperCase && Ext.isString(a)) {
            a = a.toUpperCase()
        }
        return a
    }
});
