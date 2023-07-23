Ext.define('TimesSquare.view.common.OptionalTextArea', {
    extend: 'Ext.form.field.TextArea',
    component: !0,
    box: !0,
    field: !0,
    textfield: !0,
    textareafield: !0,
    textarea: !0,
    xtype: 'textarea-optional',
    config: {
    optionalValues: [null, undefined]
},
setValue: function(d) {
    var a = this.up(),
        c = a && a.down('[forId="id-legdetail-remarks-internal"]'),
        b = Ext.Array.contains(this.optionalValues, d);
    Ext.form.field.TextArea.prototype.setValue.apply(this, arguments);
    if (a && c) {
        this[b ? 'hide' : 'show']();
        c[b ? 'hide' : 'show']()
    }
}
});
