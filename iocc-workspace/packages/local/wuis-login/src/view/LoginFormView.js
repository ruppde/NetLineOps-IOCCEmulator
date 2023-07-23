Ext.cmd.derive('WuisLogin.view.LoginForm', Ext.panel.Panel, {
    cls: 'wuislogin-form',
    requires: [
        'Ext.layout.container.Fit',
    ],
    layout: 'fit',
    closable: !1,
    resizable: !1,
    constrain: !0,
    width: 300,
    frame: !1,
    bodyBorder: !1,
    border: !0,
    hideBorders: !0,
    bodyPadding: 15,
    headerHtml: null,
    eventController: null,
    initComponent: function () {
        var a = this;
        a.createItems();
        a.createButtons();
        Ext.panel.Panel.prototype.initComponent.apply(this, arguments)
    },
    createItems: function () {
        var a = this,
            b = [];
        if (a.headerHtml) {
            b.push({
                xtype: 'box',
                html: a.headerHtml
            })
        }
        if (WuisLogin.Security.tenants) {
            b.push({
                xtype: 'combobox',
                name: 'tenant',
                labelAlign: 'top',
                fieldLabel: 'Airline',
                emptyText: 'Please choose an airline',
                store: {
                    fields: ['name'],
                    data: WuisLogin.Security.tenants
                },
                queryMode: 'local',
                displayField: 'name',
                valueField: 'name',
                allowBlank: !1,
                itemId: 'tenant',
                margin: '0 0 5 0',
                labelStyle: 'margin-bottom:5px',
                anchor: '100%',
                value: WuisLogin.Common.loadTenant(),
                editable: !1
            })
        }
        b.push({
            xtype: 'textfield',
            labelAlign: 'top',
            fieldLabel: 'User Name',
            name: 'user',
            itemId: 'user',
            margin: '0 0 5 0',
            labelStyle: 'margin-bottom:5px',
            anchor: '100%',
            allowBlank: !1,
            value: a.userName || '',
            readOnly: a.userNameReadOnly || !1,
            listeners: {
                specialkey: a.onSpecialKey,
                scope: a
            }
        });
        b.push({
            xtype: 'textfield',
            labelAlign: 'top',
            fieldLabel: 'Password',
            inputType: 'password',
            name: 'password',
            itemId: 'password',
            margin: '0 0 30 0',
            labelStyle: 'margin-bottom:5px',
            anchor: '100%',
            allowBlank: a.emptyPasswordEnabled,
            listeners: {
                specialkey: a.onSpecialKey,
                scope: a
            }
        });
        if (a.showForgottenPassword) {
            b.push({
                xtype: 'component',
                autoEl: {
                    tag: 'a',
                    href: '#',
                    html: 'Forgot your password?'
                },
                listeners: {
                    el: {
                        click: a.onForgottenPasswordClick,
                        scope: a
                    }
                }
            })
        }
        a.items = {
            xtype: 'form',
            frame: !1,
            bodyBorder: !1,
            border: !1,
            hideBorders: !0,
            items: b,
            listeners: {
                validitychange: a.onFormValidityChange,
                scope: a
            }
        }
    },
    createButtons: function () {
        var a = this;
        a.buttons = [{
            text: 'Change password',
            itemId: 'changePasswordBtn',
            cls: 'id-changePasswordBtn',
            hidden: !a.showPasswordChange,
            handler: a.onPasswordChangeClick,
            scope: a
        }, {
            text: 'Login',
            iconCls: 'icon-key',
            cls: 'id-loginBtn',
            itemId: 'loginBtn',
            disabled: !0,
            handler: a.onLoginClick,
            scope: a
        }]
    },
    afterRender: function () {
        Ext.panel.Panel.prototype.afterRender.call(this);
        this.focus();
        this.down('#user').focus()
    },
    onFormValidityChange: function (b, a) {
        this.down('#loginBtn').setDisabled(!a)
    },
    onSpecialKey: function (b, a) {
        if (a.getKey() === a.ENTER) {
            this.onLoginClick()
        }
    },
    onForgottenPasswordClick: function (c) {
        c.preventDefault();
        var a = this,
            b = a.getForm();
        (a.eventController || a).fireEvent('forgottenpasswordclick', a, b.getValues())
    },
    onPasswordChangeClick: function () {
        var a = this,
            b = a.getForm();
        (a.eventController || a).fireEvent('passwordchangeclick', a, b.getValues())
    },
    onLoginClick: function () {
        var a = this,
            b = a.getForm();
        if (!b.isValid()) {
            return
        } (a.eventController || a).fireEvent('login', a, b.getValues())
    },
    getUserField: function () {
        return this.down('#user')
    },
    getPasswordField: function () {
        return this.down('#password')
    },
    getForm: function () {
        return this.items.getAt(0)
    }
}, 0, ['WuisLoginForm'], ['component', 'box', 'container', 'panel', 'WuisLoginForm'], {
    'component': !0,
    'box': !0,
    'container': !0,
    'panel': !0,
    'WuisLoginForm': !0
}, ['widget.WuisLoginForm'], 0, [WuisLogin.view, 'LoginForm'], 0);