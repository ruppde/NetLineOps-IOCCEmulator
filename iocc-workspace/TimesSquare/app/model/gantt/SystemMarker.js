Ext.define('TimesSquare.model.gantt.SystemMarker', {
    extend: 'Ext.data.Model',
    fields: ['tooltip', 'icon', 'layout'],
    composeAttributes: function() {
        var d = this.internalId,
            c = this.get('icon'),
            b = this.get('layout'),
            a = {
                'data-identifier': d,
                'data-qtip': this.getTooltip(),
                style: {}
            };
        if (c) {
            a.style['background-size'] = 'contain';
            a.style['background-image'] = 'url("resources/icons/marker/' + c + '.png")'
        } else {
            if (b && b.bgColor) {
                a.style['background-color'] = b.bgColor;
                a.style.border = 'solid 1px #585858'
            }
        }
        return a
    },
    getTooltip: function() {
        var b = (this.get('tooltip') || '').split('\n'),
            d = b.shift(),
            c = b.join('<br>'),
            a = ["<span class='ops-remark-tooltip-header'>" + d + '</span>'];
        if (!Ext.isEmpty(c)) {
            a.push('<br>', "<p class='ops-remark-tooltip-text'>", c, '</p>')
        }
        return Ext.String.htmlEncode(a.join(''))
    }
});
