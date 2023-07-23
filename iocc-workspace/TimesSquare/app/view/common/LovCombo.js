Ext.define('TimesSquare.view.common.LovCombo', {
    extend: 'Ext.form.field.ComboBox',
    component: !0,
    box: !0,
    field: !0,
    textfield: !0,
    pickerfield: !0,
    combobox: !0,
    combo: !0,
    lovcombo: !0,
    xtype: 'lovcombo',
    fieldLabel: '',
    name: '',
    forceSelection: !0,
    editable: !1,
    displayField: 'key',
    valueField: 'value',
    emptyText: '(none)',
    triggers: {
        clear: {
            cls: 'x-form-clear-trigger',
            handler: 'clearValue'
        }
    },
    initComponent: function() {
        var a = this;
        if (!a.store) {
            a.initLovStore()
        }
        Ext.form.field.ComboBox.prototype.initComponent.call(this)
    },
    excludeOptions: [],
    initLovStore: function() {
        var a = this,
            b;
        if (a.lovName) {
            a.store = TimesSquare.store.common.Lovs.getMemoryStore(a.lovName);
            a.queryMode = 'local';
            return
        }
        if (a.restUrl) {
            if (a.excludeOptions.length) {
                b = {
                    excludeOptions: a.excludeOptions,
                    excludeKey: 'value'
                }
            }
            a.store = TimesSquare.store.common.Lovs.getRestStore(a.restUrl, a.root, b);
            a.queryMode = 'remote';
            return
        }
    }
});