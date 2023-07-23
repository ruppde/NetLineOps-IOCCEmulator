/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define("TimesSquare.Application", {
    extend: "Ext.app.Application",
    requires: [
        'TimesSquare.overrides.*', 'TimesSquare.plugin.*', 'TimesSquare.mixin.*', //'Sch.*'
    ],
    name: "TimesSquare",
    autoCreateViewport: false,
    launch: function () {
        this.initUpdateListener();
        if (!window.location.href.match(/\?testing=true/)) {
            this.callParent(arguments);
        }
    },
    initUpdateListener: function () {
        var me = this;
        var installingWorker = navigator && navigator.serviceWorker && navigator.serviceWorker.controller;
        if (installingWorker) {
            installingWorker.onstatechange = function (event) {
                if (event.target.state === "redundant") {
                    me.onAppUpdate();
                }
            };
        }
    },
    onAppUpdate: function () {
        Ext.Msg.renderTo = Ext.getBody();
        Ext.defer(this.updatePrompt, this.updateDelay);
    },
    updateDelay: 5000,
    onAppUpdate: function () {
        Ext.Msg.confirm("Application Update", "This application has an update, reload?", function (choice) {
            if (choice === "yes") {
                window.location.reload();
            }
        });
    }
});
