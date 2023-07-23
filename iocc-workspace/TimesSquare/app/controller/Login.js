Ext.define('TimesSquare.controller.Login', {
    extend: 'WuisLogin.controller.LoginEx',
    requires: [ 'TimesSquare.view.Login', "WuisLogin.view.Login" ],
    refs: [{
        ref: 'viewport',
        selector: 'viewport'
    }],
    loginWidget: 'TSLogin',
    messageMap: {
        'iocc.sec.identity.password.weak': 'Credentials not changed. Password strength is not sufficient.',
        'iocc.sec.identity.password.alreadyused': 'Password matches a password from history',
        'iocc.sec.identity.password.incorrect': 'Credentials not changed. No valid current credentials provided.',
        'iocc.sec.identity.password.notallowed': 'Credentials not changed. Password change not allowed.'
    },
    autoLoadSecurityConfig: !1,
    init: function() {
        var a = this,
            b;
        if (!a.getViewport()) {
            Ext.create('TimesSquare.view.Viewport')
        }
        if (window.location.href.match(/\?testing=true/)) {
            return
        }
        a.control({
            'maintoolbar button[action=logout]': {
                click: 'onLogoutButtonClick'
            }
        });
        a.listen({
            global: {
                unauthorizedstatus: 'onSessionTimeout'
            }
        });
        a.applicationId = 'opsTimesSquare';
        a.restPrefix = 'http://127.0.0.1:8080/NetLine-1.0/';
        b = WuisLogin.Common.applications[a.applicationId];
        a.loginViewConfig = {
            iconCls: 'icon-ops',
            title: 'NetLine/Ops ++ Compact',
            headerHtml: ['<div style="font-size:14px;color:#194C7F;font-weight:bold;margin-bottom:10px">Login</div>', '<img src="resources/images/lsy-logo-small.png" style="max-width:460px;height:30px;" />'].join(''),
            showPasswordChange: !(b && b.pwdChangeDisabled)
        };
        a.on({
            userauthorized: a.authorizationSuccess,
            scope: a
        });
        WuisLogin.controller.LoginEx.prototype.init.call(this);
        a.application.authorizing = !0;
        a.doAuthorization()
    },
    authorizationSuccess: function() {
        this.getController('Main').switchToInitPerspective();
        this.application.authorizing = !1
    },
    onSessionTimeout: function() {
        var a = this.application.authorizing;
        if (!a) {
            Ext.Msg.show({
                title: 'Session timeout',
                msg: 'The user has been logged out due to session timeout.',
                buttons: Ext.Msg.OK,
                closable: !1,
                icon: Ext.Msg.WARNING,
                fn: function() {
                    window.location.reload()
                }
            });
            return !1
        }
    },
    onLogoutButtonClick: function() {
        var a = this,
            c = a.getViewport(),
            b = a.getController('gantt.Gantt');
        a.getController('gantt.Gantt').stopPolling();
        Ext.Ajax.request({
            serviceName: 'Logout',
            url: a.restPrefix + 'authentication',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(e, f) {
                var d = Ext.JSON.decode(e.responseText);
                if (!d || !d.success) {
                    a.fireEvent('serviceError', e, f, d);
                    return
                }
                if (c) {
                    c.destroy()
                }
                if (b) {
                    b.stopPolling()
                }
                window.location.reload()
            },
            failure: function(d, e) {
                a.fireEvent('serviceError', d, e);
                if (c) {
                    c.destroy()
                }
                if (b) {
                    b.stopPolling()
                }
                a.init()
            }
        })
    },
    onPasswordChange: function(e, a) {
        var b = this,
            c = {},
            d;
        c.oldPassword = a.oldPassword;
        c.newPassword = a.password1;
        d = b.restPrefix + 'identity/password/' + encodeURIComponent(a.user);
        Ext.Ajax.request({
            url: d,
            method: 'PUT',
            disableCaching: !0,
            jsonData: c,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: function(c, d) {
                b.onPasswordChangeSuccess(e, a, c, d)
            },
            failure: function(c, d) {
                b.fireEvent('serviceError', c, d, null, function() {
                    b.onCancelPasswordChange(e, a)
                })
            }
        })
    },
    onPasswordChangeSuccess: function(f, e, b, d) {
        var c = this,
            a = Ext.JSON.decode(b.responseText, !0);
        if (a && a.success) {
            Ext.Msg.alert('Password change', 'Successfully password change. Please login with your new password!', function() {
                c.onCancelPasswordChange(f, e)
            });
            return
        }
        c.fireEvent('serviceError', b, d, a, function() {})
    },
    onLogin: function(d, b) {
        var a = this,
            c = {
                password: b.password
            };
        d.setLoading('Login...');
        a.authenticate(a.restPrefix + 'authentication/' + encodeURIComponent(b.user), c, {
            success: a.onSuccessLogin,
            failure: a.onFailureLogin,
            scope: a
        })
    },
    authenticate: function(c, d, a) {
        var b = WuisLogin.Security;
        if (!c) {
            Ext.log.error('WuisLogin.Security.authenticate() method requires at least url parameter to be set!')
        }
        Ext.Ajax.request({
            url: c,
            headers: d,
            method: 'POST',
            disableCaching: !0,
            success: function(e, f) {
                var g = Ext.JSON.decode(e.responseText);
                if (g && g.success) {
                    if (a && a.success) {
                        a.success.call(a.scope || b, e, f)
                    }
                } else {
                    if (a && a.failure) {
                        a.failure.call(a.scope || b, e, f)
                    }
                }
            },
            failure: function(f, e) {
                if (a && a.failure) {
                    a.failure.call(a.scope || b, f, e)
                }
            }
        })
    },
    processMessages: function(e, f, b) {
        var c = this,
            a = [],
            g = c.messageMap,
            d = f && f.serviceName && ' - ' + f.serviceName || '';
        if (!e) {
            a.push({
                icon: Ext.Msg.ERROR,
                title: 'Error in Service' + d,
                message: 'An unexpected error occurred while trying to process your request!<br/>Please try again or notify the system administrator if the problem persists!'
            });
            return a
        }
        if (!b && e.responseText) {
            try {
                b = Ext.JSON.decode(e.responseText, !0)
            } catch (h) {
                Ext.log.warn('Unable to decode response text.', h)
            }
        }
        if (b) {
            if (Ext.isString(b)) {
                a.push({
                    icon: Ext.Msg.ERROR,
                    title: c.titleMap.ERROR + d,
                    message: b
                })
            } else {
                if (b.errState && b.errState.errMessage) {
                    a.push({
                        icon: Ext.Msg.ERROR,
                        title: c.titleMap.ERROR + d,
                        message: b.errState.errMessage
                    })
                } else {
                    if (b.messages) {
                        Ext.each(b.messages, function(h) {
                            var i = Ext.isObject(g) && g[h.messageKey] || h.messageKey,
                                j = Ext.isArray(h.params) ? h.params : [];
                            if (!i) {
                                Ext.iterate(h, function(a, c) {
                                    if (a !== 'params' && a !== 'messageKey' && a !== 'popUpType' && a !== 'severity') {
                                        i = c;
                                        return !1
                                    }
                                })
                            }
                            a.push({
                                icon: c.iconMap[h.severity] || Ext.Msg.ERROR,
                                title: (c.titleMap[h.severity] || c.titleMap.ERROR) + d,
                                message: Ext.String.format(i, j.join(', ')) || 'An unrecongnized error occurred'
                            })
                        })
                    }
                }
            }
        } else {
            if (e.status === 401) {
                a.push({
                    icon: Ext.Msg.ERROR,
                    title: 'Unauthorized Operation' + d,
                    message: 'It is not allowed to complete the operation!<br/>Please log in again with your username and retry the operation.<br/>If the problem persists please notify the system administrator!'
                })
            }
        }
        if (a.length) {
            return a
        }
        a.push({
            icon: Ext.Msg.ERROR,
            title: c.titleMap.ERROR + d,
            message: 'An unexpected error (status: ' + (e.status || 'none') + ') occurred while trying to process your request!<br/>Please try again or notify the system administrator if the problem persists!'
        });
        return a
    },
    handleServiceErrorReauthenticate: function() {
        var d = this,
            a = WuisLogin.Security.identity,
            b = this.getLoginWin(),
            c = a && a.name;
        if (!a && b && !b.isHidden()) {
            c = b.getUserField().getValue()
        }
        d.errorState.rights = WuisLogin.Security.rights;
        d.showLoginWindow({
            userName: c,
            userNameReadOnly: !!a
        })
    },
    doAuthorization: function() {
        this.errorState = null;
        WuisLogin.controller.LoginEx.prototype.doAuthorization.call(this)
    }
});
