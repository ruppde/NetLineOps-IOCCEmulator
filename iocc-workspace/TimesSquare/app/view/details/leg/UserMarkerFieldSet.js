Ext.define('TimesSquare.view.details.leg.UserMarkerFieldSet', {
    extend: 'Ext.form.CheckboxGroup',
    component: !0,
    box: !0,
    //container: !0,
    fieldcontainer: !0,
    checkboxgroup: !0,
    xtype: 'leg-details-user-markers',
    fieldLabel: '',
    vertical: !0,
    bodyPadding: 10,
    config: {
        amount: 0,
        labelMarkerTpl: '<span class="details-marker-icon"></span>'
    },
    setAmount: function(b) {
        var a = this,
            f = a.amount || a.items && a.items.length || 0,
            d = a.items,
            e = d && d.getCount() || 0,
            c;
        a.amount = b;
        if (b < e) {
            Ext.Array.each(d.data, function(d, c) {
                if (c >= b) {
                    a.remove(d)
                }
            })
        } else {
            for (c = f; c < b; c++) {
                a.add({
                    name: (c + 1).toString(),
                    cls: 'details-marker-checkbox',
                    boxLabel: '',
                    readOnly: !0
                })
            }
        }
    },
    setValue: function(e) {
        var a = this,
            c = {},
            d = TimesSquare.getApplication().getController('gantt.Gantt').parameterList,
            b = a.extractMarkerData(d);
        a.setAmount(b.length);
        Ext.Array.each(b, function(b) {
            var d = a.items.findBy(function(a) {
                    return a.name === b.index.toString()
                }),
                f = Ext.Array.findBy(e, function(a) {
                    return a.get('number') === b.index
                });
            d.setBoxLabel(a.labelMarkerTpl + '<span style="vertical-align:top; line-height: 16px">' + b.name + '</span>');
            a.setCheckboxMarkerColor(d, b.color);
            c[d.name] = !!f
        });
        Ext.form.CheckboxGroup.prototype.setValue.call(this, c)
    },
    extractMarkerData: function(b) {
        var c = Ext.create('TimesSquare.model.gantt.UserMarker', 0),
            e = Ext.Array.filter(Ext.Object.getKeys(b), function(a) {
                return a.match('MARKER_NAME_')
            }).length,
            a, d = [];
        for (a = 1; a <= e; a++) {
            c.set('number', a);
            d.push(Ext.apply(c.getInfoFromParameters(b), {
                index: a
            }))
        }
        return d
    },
    setCheckboxMarkerColor: function(a, d) {
        if (!a.rendered) {
            a.on('afterrender', Ext.bind(this.setCheckboxMarkerColor, this, arguments), this, {
                single: !0
            });
            return
        }
        var b = a.boxLabelEl,
            c = b && b.down('span.details-marker-icon');
        if (c) {
            c.setStyle('background-color', d)
        }
    }
});
