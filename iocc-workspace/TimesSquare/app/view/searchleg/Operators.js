Ext.define('TimesSquare.view.searchleg.Operators', {
    extend: 'TimesSquare.view.common.LovCombo',
    component: !0,
    box: !0,
    field: !0,
    textfield: !0,
    pickerfield: !0,
    combobox: !0,
    combo: !0,
    lovcombo: !0,
    searchleg_operators: !0,
    xtype: 'searchleg_operators',
    value: '',
    initComponent: function() {
        var b = this,
            a = b.value;
        TimesSquare.view.common.LovCombo.prototype.initComponent.apply(this, arguments);
        if (a) {
            b.setValue(a)
        }
    }
});