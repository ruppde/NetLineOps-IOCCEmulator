Ext.define('TimesSquare.view.SystemMessage', {
    extend: 'Ext.Component',
    xtype: 'systemmessage',
    //component: !0,
    //box: !0,
    systemmessage: !0,
    alias: 'systemmessage',
    cls: 'system-message',
    region: 'north',
    split: !1,
    border: !1,
    normalHeight: 30,
    animated: !1,
    animConfig: {
        duration: 100,
        easing: 'linear',
        dynamic: !1
    },
    config: {
        text: undefined,
        closable: !1
    },
    childEls: ['innerEl', 'messageEl'],
    renderTpl: ['<div id="{id}-innerEl" data-ref="innerEl" class="{$comp.cls}-inner">', '<div id="{id}-messageEl" data-ref="messageEl" class="{$comp.cls}-message"><!-- { text } --></div>', '<div id="{id}-closeEl" data-ref="closeEl" class="{$comp.cls}-close">', '{% this.renderCloseTool(out, values) %}', '</div>', '</div>', {
        renderCloseTool: function(c, a) {
            var d = a.$comp,
                b = d.closeTool;
            Ext.DomHelper.generateMarkup(b.getRenderTree(), c)
        }
    }],
    constructor: function() {
        Ext.Component.prototype.constructor.apply(this, arguments);
        this.createTool()
    },
    initComponent: function() {
        this.height = this.text ? this.normalHeight : 0;
        Ext.Component.prototype.initComponent.call(this)
    },
    createTool: function() {
        this.closeTool = new Ext.panel.Tool({
            type: 'close',
            callback: 'close',
            scope: this,
            hidden: !this.closable
        })
    },
    close: function(a) {
        if (a || this.animated) {
            this.animate(Ext.apply({}, this.animConfig, {
                to: {
                    height: 0
                }
            }))
        } else {
            this.setHeight(0)
        }
    },
    open: function(a) {
        if (a || this.animated) {
            this.animate(Ext.apply({}, this.animConfig, {
                to: {
                    height: this.normalHeight
                }
            }))
        } else {
            this.setHeight(this.normalHeight)
        }
    },
    setText: function(a) {
        this.text = a;
        this.setHeight(this.normalHeight);
        if (this.messageEl) {
            this.messageEl.setHtml(a)
        }
    },
    setClosable: function(a) {
        this.closable = a;
        if (this.closeTool) {
            this.closeTool.setHidden(!a)
        }
    },
    initRenderData: function() {
        var a = Ext.Component.prototype.initRenderData.apply(this, arguments);
        return Ext.apply({
            text: this.text
        }, a)
    },
    privates: {
        finishRenderChildren: function() {
            Ext.Component.prototype.finishRenderChildren.apply(this, arguments);
            this.closeTool.finishRender()
        }
    }
});
