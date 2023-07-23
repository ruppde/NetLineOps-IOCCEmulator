Ext.define("WuisLogin.view.Login", {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.layout.container.Fit',
    ],
    alias: 'widget.WuisLogin',
    component: true,
    box: true,
    container: true,
    panel: true,
    window: true,
    WuisLogin: true,
    cls: "wuislogin-window",
    layout: "fit",
    closable: false,
    resizable: false,
    modal: true,
    constrain: true,
    width: 500,
    y: 140,
    title: "Login",
    iconCls: "icon-key",
    eventController: null,
    headerHtml: null,
    initComponent: function () {
        var me = this;
        me.createItems();
        me.createButtons();
        Ext.window.Window.prototype.initComponent.apply(this, arguments);
    },
    createItems: function () {
        var me = this;
        var items = [];
        if (me.headerHtml) {
            items.push({
                xtype: "box",
                cls: "login-header",
                html: me.headerHtml
            });
        }
        if (WuisLogin.Security.tenants) {
            items.push({
                xtype: "combobox",
                name: "tenant",
                labelAlign: "top",
                fieldLabel: "Airline",
                emptyText: "Please choose an airline",
                store: {
                    fields: ["name"],
                    data: WuisLogin.Security.tenants
                },
                queryMode: "local",
                displayField: "name",
                valueField: "name",
                allowBlank: false,
                itemId: "tenant",
                margin: "0 0 5 280",
                labelStyle: "margin-bottom:5px",
                anchor: "100%",
                value: WuisLogin.Common.loadTenant(),
                editable: false
            });
        }
        items.push({
            xtype: "textfield",
            labelAlign: "top",
            fieldLabel: "Login Name",
            name: "user",
            itemId: "user",
            margin: "0 0 5 280",
            labelStyle: "margin-bottom:5px",
            anchor: "100%",
            allowBlank: false,
            value: me.userName || "",
            readOnly: me.userNameReadOnly || false,
            listeners: {
                specialkey: me.onSpecialKey,
                scope: me
            }
        });
        items.push({
            xtype: "textfield",
            labelAlign: "top",
            fieldLabel: "Password",
            inputType: "password",
            name: "password",
            itemId: "password",
            margin: "0 0 30 280",
            labelStyle: "margin-bottom:5px",
            anchor: "100%",
            allowBlank: false,
            listeners: {
                specialkey: me.onSpecialKey,
                scope: me
            }
        });
        if (me.showForgottenPassword) {
            items.push({
                xtype: "component",
                autoEl: {
                    tag: "a",
                    href: "#",
                    html: "Forgot your password?"
                },
                listeners: {
                    el: {
                        click: me.onForgottenPasswordClick
                    },
                    scope: me
                }
            });
        }
        me.items = {
            xtype: "form",
            border: 0,
            bodyPadding: 15,
            items: items,
            listeners: {
                validitychange: me.onFormValidityChange,
                scope: me
            }
        };
    },
    createButtons: function () {
        var self = this;
        var data = {
            text: "Change password",
            itemId: "changePasswordBtn",
            cls: "id-changePasswordBtn",
            hidden: !self.showPasswordChange,
            handler: self.onPasswordChangeClick,
            scope: self
        };
        var defaults = {
            text: "Login",
            iconCls: "icon-key",
            cls: "id-loginBtn",
            itemId: "loginBtn",
            disabled: true,
            handler: self.onLoginClick,
            scope: self
        };
        self.buttons = self.loginFirst ? [defaults, data] : [data, defaults];
    },
    afterRender: function () {
        Ext.window.Window.prototype.afterRender.call(this);
        this.focus();
        this.getUserField().focus();
    },
    onFormValidityChange: function (uvy1, a) {
        this.down("#loginBtn").setDisabled(!a);
    },
    onSpecialKey: function (t, event) {
        if (event.getKey() === event.ENTER) {
            this.onLoginClick();
        }
    },
    onForgottenPasswordClick: function (event) {
        event.preventDefault();
        var node = this;
        var invalidateStub = node.down("form");
        (node.eventController || node).fireEvent("forgottenpasswordclick", node, invalidateStub.getValues());
    },
    onPasswordChangeClick: function () {
        var self = this;
        var checklistForm = self.getForm();
        (self.eventController || self).fireEvent("passwordchangeclick", self, checklistForm.getValues());
    },
    onLoginClick: function () {
        var self = this;
        var initialValueMoment = self.getForm();
        if (!initialValueMoment.isValid()) {
            return;
        }
        (self.eventController || self).fireEvent("login", self, initialValueMoment.getValues());
    },
    getUserField: function () {
        return this.getForm().items.get("user");
    },
    getPasswordField: function () {
        return this.getForm().items.get("password");
    },
    getForm: function () {
        return this.items.getAt(0);
    }
});  