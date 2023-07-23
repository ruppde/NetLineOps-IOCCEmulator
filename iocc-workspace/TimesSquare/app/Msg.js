Ext.define('TimesSquare.Msg', {
    extend: 'Ext.window.MessageBox',
    singleton: !0,
    initComponent: function() {
        var a = this;
        a.callParent(arguments);
        a.textArea.setReadOnly(!0);
        a.showDetailsLink = a.promptContainer.insert(2, {
            xtype: 'button',
            text: 'Details',
            width: 75,
            margin: '0 0 10 0',
            handler: a.toggleDetailsView,
            scope: a
        })
    },
    show: function(b) {
        var a = this;
        if (b && b.msg && Ext.isString(b.msg) && b.msg.match(/:\s*$/)) {
            b.msg = b.msg.replace(/:\s*$/, '')
        }
        a.callParent(arguments);
        if (a.textArea.isVisible()) {
            a.textArea.hide();
            a.showDetailsLink.setText('Details');
            a.showDetailsLink.show()
        } else {
            a.showDetailsLink.hide()
        }
        return a
    },
    toggleDetailsView: function() {
        var a = this;
        if (a.textArea.isVisible()) {
            a.textArea.hide();
            a.showDetailsLink.setText('Details')
        } else {
            a.textArea.show();
            a.textArea.el.setWidth('100%');
            a.showDetailsLink.setText('Hide');
            a.textArea.inputEl.setWidth('100%')
        }
    }
})