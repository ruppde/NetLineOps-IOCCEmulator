Ext.define('TimesSquare.view.common.NumberFormatedTextField', {
    extend: 'Ext.form.field.Text',
    component: !0,
    box: !0,
    field: !0,
    textfield: !0,
    numberformatedtextfield: !0,
    xtype: 'numberformatedtextfield',
    setValue: function(a) {
        if (Ext.isEmpty(a) || !Ext.isNumber(a)) {
            return Ext.form.field.Text.prototype.setValue.apply(this, arguments)
        }
        a = Ext.util.Format.number(a, '0.00');
        return Ext.form.field.Text.prototype.setValue.call(this, a)
    }
});
