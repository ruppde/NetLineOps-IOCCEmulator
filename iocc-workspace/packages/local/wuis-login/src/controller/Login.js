Ext.define("WuisLogin.controller.Login", {
    extend: 'Ext.app.Controller',
    handleAjaxException: true,
    handleForbiddenAsUnauthorized: false,
    showPasswordChange: true,
    passwordChangeWidget: "WuisLoginPasswordChange",
    passwordChangeViewConfig: null,
    showForgottenPassword: false,
    forgottenPasswordWidget: null,
    forgottenPasswordViewConfig: null,
    loginWidget: "WuisLogin",
    loginViewConfig: null,
    loginService: null,
    passwordChangeService: null,
    forgottenPasswordService: null,
    init: function () {
        var me = this;
        if (me.handleAjaxException) {
            Ext.Ajax.on("requestexception", me.onAjaxRequestException, me);
        }
        me.on({
            login: me.onLogin,
            passwordchangeclick: me.onPasswordChangeClick,
            validatepassword: me.onValidatePassword,
            passwordchange: me.onPasswordChange,
            passwordchangecancel: me.onCancelPasswordChange,
            forgottenpasswordclick: me.onForgottenPasswordClick,
            forgottenpasswordchange: me.onForgottenPasswordChange,
            forgottenpasswordcancel: me.onCancelForgottenPassword,
            scope: me
        });
    },
    checkCertificateValidity: function () {
    },
    getLoginWin: function () {
        return Ext.ComponentQuery.query(this.loginWidget)[0];
    },
    getPasswordChangeWin: function () {
        return Ext.ComponentQuery.query(this.passwordChangeWidget)[0];
    },
    getForgottenPasswordWin: function () {
        return Ext.ComponentQuery.query(this.forgottenPasswordWidget)[0];
    },
    showLoginWindow: function (config) {
        var me = this;
        var self = me.getLoginWin();
        var view;
        var w;
        config = Ext.apply(Ext.apply({
            showForgottenPassword: me.showForgottenPassword,
            showPasswordChange: me.showPasswordChange
        }, me.loginViewConfig), config);
        if (!self) {
            self = Ext.widget(me.loginWidget, Ext.apply(config, {
                eventController: me,
                showPasswordChange: config.showPasswordChange && !!me.passwordChangeWidget,
                showForgottenPassword: config.showForgottenPassword && !!me.forgottenPasswordWidget
            }, config));
            if (self.parentContainer) {
                self.parentContainer.add(self);
            } else {
                self.show();
            }
        } else {
            if (self.isHidden()) {
                self.show();
            }
        }
        view = self.getUserField();
        w = self.getPasswordField();
        view.setValue(config.userName || "");
        view.setReadOnly(config.userNameReadOnly || false);
        w.setValue("");
        (view.readOnly ? w : view).focus(true);
    },
    hasToBeReload: function () {
        var spColor = this;
        var b = spColor.loginWidget;
        if (spColor.passwordChangeWidget) {
            b = b + ("," + spColor.passwordChangeWidget);
        }
        if (spColor.forgottenPasswordWidget) {
            b = b + ("," + spColor.forgottenPasswordWidget);
        }
        return !Ext.ComponentQuery.query(b).length;
    },
    onAjaxRequestException: function (shipping, item) {
        var _ = this;
        if (item.status === 401 && _.hasToBeReload(shipping, item)) {
            _.reloadApplication();
        }
    },
    reloadApplication: function () {
        location.href = location.href.replace(/#.*/, "");
    },
    checkUnauthenticated: function (testsStatus) {
        return testsStatus && (testsStatus.status === 401 || this.handleForbiddenAsUnauthorized && testsStatus.status === 403) || false;
    },
    onPasswordChangeClick: function (a, ud) {
        this.showPasswordChangeWindow(a, ud);
    },
    showPasswordChangeWindow: function (view, value) {
        var me = this;
        var entry = Ext.widget(me.passwordChangeWidget, Ext.apply({
            eventController: me
        }, me.passwordChangeViewConfig));
        var result = entry && entry.getUserField();
        var response = entry && entry.getOldPasswordField();
        if (view && value === true) {
            value = Ext.isFunction(view.getForm) && view.getForm().getValue() || null;
        }
        if (result) {
            result.setValue(value && value.user || "");
        }
        if (response) {
            response.setValue(value && value.password || "");
        }
        if (view) {
            if (view.parentContainer) {
                view.parentContainer.remove(view);
            } else {
                view.destroy();
            }
        }
        if (entry.parentContainer) {
            entry.parentContainer.add(entry);
        } else {
            entry.show();
        }
    },
    onForgottenPasswordClick: function (view, data) {
        var me = this;
        var action = Ext.widget(me.forgottenPasswordWidget, Ext.apply({
            eventController: me
        }, me.forgottenPasswordViewConfig));
        var attrField = action.getUserField();
        if (attrField) {
            attrField.setValue(data && data.user || "");
        }
        if (view) {
            if (view.parentContainer) {
                view.parentContainer.remove(view);
            } else {
                view.destroy();
            }
        }
        if (action.parentContainer) {
            action.parentContainer.add(action);
        } else {
            action.show();
        }
    },
    onValidatePassword: function (f, data) {
        var self = this;
        var d = Ext.isObject(data) ? data.newPassword : data;
        if (!self.passwordValidatorService) {
            Ext.log.error("[WuisLogin] Please, set passwordValidatorService property or implement the onValidatePassword method!");
            return;
        }
        if (f.lastValidatedPassword === d) {
            return;
        }
        f.lastValidatedPassword = d;
        f.passwordErrors = "Checking password strength...";
        f.getForm().isValid();
        if (!Ext.isObject(data)) {
            data = {
                newPassword: data
            };
        }
        self.passwordValidatorService(data, self.validatePasswordCallback, self);
    },
    validatePasswordCallback: function (response) {
        var key = this;
        var $scope = key.getPasswordChangeWin();
        var attrType = $scope && $scope.getPasswordField().getValue();
        var gridcontX = $scope && $scope.getPwStrengthField();
        var g = $scope.getErrorMsgBox();
        var options = response && response.success && response.result;
        var left;
        if (!$scope) {
            return;
        }
        if (options && attrType === $scope.getPasswordField().getValue()) {
            gridcontX.removeCls("pw-ok");
            gridcontX.removeCls("pw-error");
            gridcontX.removeCls("pw-warn");
            if (Ext.isEmpty(options.texts)) {
                gridcontX.addCls("pw-ok");
                $scope.passwordErrors = null;
                g.update("");
            } else {
                gridcontX.addCls(options.passed ? "pw-warn" : "pw-error");
                left = Ext.isArray(options.texts) ? options.texts : [options.texts || ""];
                left = left.map(key.translateValidationError.bind(key)).map(Ext.htmlEncode).join("<br>");
                $scope.passwordErrors = options.passed ? "" : left;
                g.update(left);
            }
        } else {
            gridcontX.addCls("pw-error");
            $scope.passwordErrors = "Password check failed!";
        }
        $scope.getForm().isValid();
    },
    translateValidationError: function (a) {
        return a;
    },
    onLogin: function (identityId, provider) {
        var options = this;
        if (options.loginService) {
            identityId.setLoading("Login...");
            options.loginService(provider, options.loginCallback, options);
        } else {
            Ext.log.error("[WuisLogin] Please, set loginService property or implement the onLogin method!");
        }
    },
    loginCallback: function (data) {
        var command_codes = this;
        var newSourceWindow = command_codes.getLoginWin();
        if (newSourceWindow) {
            newSourceWindow.setLoading(false);
        }
        command_codes[data && data.success ? "onSuccessLogin" : "onFailureLogin"](data);
    },
    onSuccessLogin: function () {
        this.closeLoginWindow();
    },
    onFailureLogin: function () {
        var d = this;
        var User = d.getLoginWin();
        var params = User.getUserField();
        var last = User.getPasswordField();
        Ext.Msg.alert("Error", "Wrong login name or password!", function () {
            (params.readOnly ? last : params).focus(true);
        });
    },
    closeLoginWindow: function () {
        var view = this.getLoginWin();
        if (view) {
            if (view.parentContainer) {
                view.parentContainer.remove(view);
            } else {
                view.destroy();
            }
        }
    },
    onCancelPasswordChange: function (container, result) {
        var res = this;
        var user = result.user;
        if (container.parentContainer) {
            container.parentContainer.remove(container);
        } else {
            container.destroy();
        }
        res.showLoginWindow({
            userName: user
        });
    },
    onCancelForgottenPassword: function () {
        var res = this;
        var view = res.getForgottenPasswordWin();
        var userName = view.down("#user").getValue();
        if (view.parentContainer) {
            view.parentContainer.remove(view);
        } else {
            view.destroy();
        }
        res.showLoginWindow({
            userName: userName
        });
    },
    onPasswordChange: function (event, data) {
        var _this = this;
        if (!_this.passwordChangeService) {
            Ext.log.error("[WuisLogin] Please, set the passwordChangeService property or implement the onPasswordChange method!");
            return;
        }
        _this.passwordChangeService({
            newPassword: data.password1,
            currentPassword: data.oldPassword,
            userName: data.user
        }, _this.passwordChangeCallback, _this);
    },
    passwordChangeCallback: function (res) {
        var me = this;
        var formContainer = me.getPasswordChangeWin();
        if (res && res.success) {
            me.onCancelPasswordChange(formContainer, formContainer.down("form").getValues());
            return;
        }
        Ext.Msg.alert("Error", res && res.result || "Error on service calling!");
    },
    onForgottenPasswordChange: function (depsOptions, node) {
        var res = this;
        if (!res.forgottenPasswordService) {
            Ext.log.error("[WuisLogin] Please, set the forgottenPasswordService property or implement the onForgottenPasswordChange method!");
            return;
        }
        res.forgottenPasswordService({
            userName: node.user
        }, res.forgottenPasswordCallback, res);
    },
    forgottenPasswordCallback: function (res) {
        var me = this;
        var formContainer = me.getForgottenPasswordWin();
        if (res && res.success) {
            me.onCancelForgottenPassword(formContainer, formContainer.down("form").getValues());
            return;
        }
        Ext.Msg.alert("Error", res && res.result || "Error on service calling!");
    }
});
