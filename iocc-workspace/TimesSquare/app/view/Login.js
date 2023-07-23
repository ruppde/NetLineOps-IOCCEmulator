Ext.define('TimesSquare.view.Login', {
    extend: 'WuisLogin.view.Login',
    xtype: 'TSLogin',
    component: true,
    box: true,
    container: true,
    panel: true,
    window: true,
    WuisLogin: true,
    TSLogin: true,
    afterRender: function() {
        WuisLogin.view.Login.prototype.afterRender.call(this);
        //this.getUserField().setUpperCase(false)
    }
});