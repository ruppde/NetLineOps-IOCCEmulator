Ext.define('TimesSquare.plugin.tooltipable.UserMarker', {
    extend: 'TimesSquare.plugin.tooltipable.BaseTooltipable',
    type: 'userMarker',
    elementWidth: 10,
    elementHeight: 10,
    elementProperty: 'userMarkers',
    elementCls: 'x-event-usermarker',
    wrapperCls: 'x-event-usermarker-wrapper',
    alias: 'tooltipable.usermarker',
    xtype: 'tooltipable.usermarker',
    recordResolver: function(a) {
        var b = '[id^=' + this.eventWrapperPrefix + ']',
            c = this.resolveEventRecord(a.up(b).down(this.eventSelector));
        return c.getNestedBy('userMarkers', 'internalId', a.getAttribute('data-identifier'))
    },
    recordDataPresent: function(a) {
        return a.get(this.elementProperty) && a.get(this.elementProperty).length
    },
    assembleElements: function(c) {
        var d = this,
            b = TimesSquare.app.getController('gantt.Gantt').parameterList,
            a;
        a = Ext.Array.map(c, function(a) {
            return d.assembleElement(a.composeAttributes(b))
        });
        return Ext.Array.filter(a, function(a) {
            return !!a
        })
    },
    getElementSpec: function() {
        if (!this.elementSpec) {
            TimesSquare.plugin.tooltipable.BaseTooltipable.prototype.getElementSpec.call(this);
            this.elementSpec.style = {
                width: '0px',
                height: '0px',
                borderWidth: '0 ' + this.elementWidth / 2 + 'px ' + this.elementHeight + 'px ' + this.elementWidth / 2 + 'px',
                borderColor: 'transparent transparent #585858 transparent',
                position: 'relative',
                margin: '0px'
            };
            this.elementSpec.children = [{
                tag: 'span',
                style: {
                    position: 'absolute',
                    left: -((this.elementWidth - 2) / 2) + 'px',
                    top: '2px',
                    width: '0px',
                    height: '0px',
                    borderWidth: '0 ' + (this.elementWidth - 2) / 2 + 'px ' + (this.elementHeight - 2) + 'px ' + (this.elementWidth - 2) / 2 + 'px',
                    borderStyle: 'solid'
                }
            }]
        }
        return this.elementSpec
    },
    assembleElement: function(a) {
        if (!a) {
            return null
        }
        var c = this.getElementSpec(),
            b = Ext.Object.merge(Ext.clone(c), a);
        b.style = c.style;
        Ext.Object.merge(b.children[0].style, a.style);
        return b
    },
    getWrapperSpec: function() {
        if (!this.wrapperSpec) {
            TimesSquare.plugin.tooltipable.BaseTooltipable.prototype.getWrapperSpec.call(this);
            this.wrapperSpec.style.height = '0px';
            this.wrapperSpec.style.lineHeight = '0px';
            this.wrapperSpec.style.top = -this.elementHeight + (Ext.isIE ? 1 : 0.5) + 'px'
        }
        return this.wrapperSpec
    }
});
