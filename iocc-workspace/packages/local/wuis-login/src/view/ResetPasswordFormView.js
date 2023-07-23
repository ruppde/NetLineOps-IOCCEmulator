Ext.cmd.derive("WuisLogin.view.ResetPasswordForm", Ext.panel.Panel, {
    cls: "wuislogin-passwordchange",
    layout: "fit",
    closable: false,
    resizable: false,
    modal: true,
    constrain: true,
    width: 360,
    title: "Change Password",
    iconCls: "icon-key",
    passwordVtype: "wuisPassword",
    passwordValidator: null,
    validateMethod: "validator",
    eventController: null,
    passwordValidateTimerId: null,
    passwordErrors: null,
    headerHtml: '<div style="font-size:14px;color:#194C7F;font-weight:bold">Change password</div><img src="resources/wuis-login/lsy-logo-small.png" style="width:250px;height:30px;margin-top:10px" />',
    initComponent: function () {
        var me = this;
        me.createItems();
        me.createButtons();
        Ext.panel.Panel.prototype.initComponent.apply(this, arguments);
    },
    createItems: function () {
        var me = this;
        me.items = {
            xtype: "form",
            border: 0,
            bodyStyle: "border:0 none",
            bodyPadding: 15,
            dockedItems: [me.headerHtml ? {
                xtype: "box",
                html: me.headerHtml
            } : null],
            defaults: {
                labelAlign: "top",
                minWidth: 300,
                margin: "0 0 5 20"
            },
            items: [{
                xtype: "textfield",
                fieldLabel: "User Name",
                itemId: "user",
                name: "user",
                allowBlank: false,
                listeners: {
                    specialkey: me.onSpecialKey,
                    scope: me
                }
            }, {
                xtype: "textfield",
                fieldLabel: "New Password",
                inputType: "password",
                itemId: "password1",
                name: "password1",
                allowBlank: me.emptyPasswordEnabled,
                vtype: me.passwordVtype,
                validator: me.validateMethod === "validator" ? me.passwordValidator : null,
                listeners: {
                    specialkey: me.onSpecialKey,
                    change: me.onPassword1Change,
                    errorchange: me.onPassword1ErrorChange,
                    scope: me
                }
            }, {
                xtype: "textfield",
                fieldLabel: "New Password Again",
                inputType: "password",
                itemId: "password2",
                name: "password2",
                allowBlank: me.emptyPasswordEnabled,
                validator: function (isSelection) {
                    return isSelection === this.prev("#password1").getValue() ? true : "Passwords do not match!";
                },
                listeners: {
                    specialkey: me.onSpecialKey,
                    change: me.onPassword2Change,
                    scope: me
                }
            }, {
                xtype: "textfield",
                fieldLabel: "\u00a0",
                labelSeparator: "",
                readOnly: true,
                itemId: "pwStrength",
                value: "Password Strength",
                cls: "password-strength-field",
                validator: function () {
                    return me.validateMethod !== "service" || !me.passwordErrors ? true : me.passwordErrors;
                }
            }, {
                xtype: "box",
                cls: "password-errors",
                itemId: "errorMsg",
                html: ""
            }],
            listeners: {
                validitychange: me.onFormValidityChange,
                scope: me
            }
        };
    },
    createButtons: function () {
        var me = this;
        me.buttons = [{
            text: "Ok",
            itemId: "okBtn",
            cls: "id-okBtn",
            disabled: true,
            handler: me.onPasswordChangeClick,
            scope: me
        }, {
            text: "Cancel",
            itemId: "cancelBtn",
            cls: "id-cancelBtn",
            handler: me.onCancelClick,
            scope: me
        }];
    },
    afterRender: function () {
        Ext.panel.Panel.prototype.afterRender.call(this);
        this.focus();
    },
    updateButtonStatus: function () {
        var me = this;
        var formMetadata = me.getForm();
        var date = me.down("#okBtn");
        var month = formMetadata && formMetadata.getForm();
        if (date && month) {
            date.setDisabled(!month.isValid() || me.validateMethod === "service" && me.passwordValidateTimerId);
        }
    },
    onFormValidityChange: function () {
        this.updateButtonStatus();
    },
    onSpecialKey: function (cmp, event) {
        if (event.getKey() === event.ENTER) {
            this.doPasswordChange();
        }
    },
    onCancelClick: function () {
        var node = this;
        var form = node.down("form");
        (node.eventController || node).fireEvent("passwordchangecancel", node, form.getValues());
    },
    onPasswordChangeClick: function () {
        this.doPasswordChange();
    },
    onPassword1Change: function () {
        var me = this;
        me.getForm().items.get("password2").isValid();
        me.updateButtonStatus();
        if (me.validateMethod === "service") {
            if (me.passwordValidateTimerId) {
                clearTimeout(me.passwordValidateTimerId);
                me.passwordValidateTimerId = null;
            }
            me.passwordValidateTimerId = Ext.defer(me.firePasswordValidationEvent, 500, me);
        }
    },
    firePasswordValidationEvent: function () {
        var self = this;
        self.passwordValidateTimerId = null;
        (self.eventController || self).fireEvent("validatepassword", self, self.getForm().getValues());
        self.updateButtonStatus();
    },
    onPassword2Change: function () {
        this.updateButtonStatus();
    },
    onPassword1ErrorChange: function (ecPropertyDesc, ecGroupId) {
        var c = this;
        var b = !ecPropertyDesc.getValue();
        var textarea = this.getPwStrengthField();
        if (c.validateMethod === "service") {
            return;
        }
        textarea.removeCls(["pw-ok", "pw-error"]);
        if (b) {
            textarea.setValue("Password Strength");
        } else {
            if (!ecGroupId) {
                textarea.addCls("pw-ok");
            } else {
                textarea.addCls("pw-error");
            }
        }
    },
    getForm: function () {
        return this.items.getAt(0);
    },
    getUserField: function () {
        return this.getForm().items.get("user");
    },
    getPasswordField: function () {
        return this.getForm().items.get("password1");
    },
    getPwStrengthField: function () {
        return this.getForm().items.get("pwStrength");
    },
    getErrorMsgBox: function () {
        return this.getForm().items.get("errorMsg");
    },
    doPasswordChange: function () {
        var self = this;
        var p = self.getForm();
        var c = self.down("#okBtn");
        if (!p || !c || c.isDisabled() || !p.isValid()) {
            return;
        }
        (self.eventController || self).fireEvent("passwordchange", self, p.getValues());
    }
}, 0, ["WuisLoginPasswordReset"], ["component", "box", "container", "panel", "WuisLoginPasswordReset"], {
    "component": true,
    "box": true,
    "container": true,
    "panel": true,
    "WuisLoginPasswordReset": true
}, ["widget.WuisLoginPasswordReset"], 0, [WuisLogin.view, "ResetPasswordForm"], 0);
