Ext.define('TimesSquare.overrides.Controller', {
    override: 'Ext.app.Controller'
}, function() {
    Ext.Msg = Ext.apply(Ext.Msg || {}, {
        ERROR: 'x-message-box-error',
        WARNING: 'x-message-box-warning',
        INFO: 'x-message-box-info'
    })
});
