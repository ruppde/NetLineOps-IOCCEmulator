Ext.define('TimesSquare.view.common.SearchLegDateField', {
    extend: 'Ext.form.field.Date',
    component: !0,
    box: !0,
    field: !0,
    textfield: !0,
    pickerfield: !0,
    datefield: !0,
    searchleg_datefield: !0,
    xtype: 'searchleg_datefield',
    clearable: !0,
    sisterFieldName: '',
    sisterField: null,
    submitFormat: 'Y-m-d\\TH:i:s',
    initComponent: function() {
        var a = this;
        a.addBehaviours();
        Ext.form.field.Date.prototype.initComponent.apply(this, arguments)
    },
    addBehaviours: function() {
        var a = this;
        if (a.clearable) {
            a.trigger2Cls = 'x-form-clear-trigger';
            a.onTrigger2Click = a.onClearClick
        }
        if (a.sisterFieldName) {
            a.initRelation()
        }
    },
    onClearClick: function() {
        this.setValue(null);
        this.fireEvent('select', this, !1)
    },
    initRelation: function() {
        var a = this;
        a.on('afterrender', function() {
            var b = a.getSisterField();
            if (!b) {
                return
            }
            a.on('select', a.onBrotherSelect)
        })
    },
    onBrotherSelect: function(e, b) {
        var d = this,
            a = d.getSisterField(),
            c;
        if (!a || !a.setMinValue) {
            return
        }
        c = Ext.form.field.VTypes;
        if (b && !c.searchLegDate(b, e)) {
            a.setValue(null);
            d.clearInvalid()
        }
        a.setMinValue(b)
    },
    getSisterField: function() {
        var a = this,
            b;
        if (a.sisterField) {
            return a.sisterField
        }
        b = a.up('form') || a.up('panel');
        a.sisterField = b && b.down('[name=' + a.sisterFieldName + ']');
        return a.sisterField
    }
});