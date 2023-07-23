Ext.define('TimesSquare.overrides.Connection', {
    override: 'Ext.data.Connection',
    onComplete: function(b) {
        var a = !0;
        switch (b.xhr.status) {
            case 401:
                a = Ext.globalEvents.fireEvent('unauthorizedstatus');
                break;
            default:
        }
        if (a) {
            return this.callParent(arguments)
        }
    }
});
