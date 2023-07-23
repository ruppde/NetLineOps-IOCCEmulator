Ext.define('WuisLogin.controller.LoginEx', {
    extend: 'WuisLogin.controller.Login',
    titleMap: {
        ERROR: 'Error in Operation',
        WARNING: 'Warning',
        INFO: 'Information'
    },
    messageMap: null,
    errorState: null,
    restPrefix: '/rest',
    applicationId: null,
    checkCertificateOnFocus: !1,
    allowInactivityControl: !1,
    userInteractionOccured: !1,
    checkInactivityTask: null,
    checkInactivityInterval: 30,
    propertiesConfigUrl: 'resources/config/properties.json',
    propertiesConfig: null,
    autoLoadSecurityConfig: !0,
    allowSaml2Auth: !1,
    suppressSaml2Hash: 'nosaml2',
    actionMap: {
        certificateNotFound: ['CLOSE', 'iocc.sec.internal.button.close'],
        invalidCertificate: 'REVALIDATE',
        fatalError: 'CLOSE',
        certificateExpired: 'LOGOUT',
        sessionExpired: ['RELOAD', 'iocc.sec.internal.button.reload'],
        sessionExpiredLogout: ['CLOSE', 'iocc.sec.internal.button.close'],
        logout: 'NOTIFY/CLOSE',
        initError: ['NOTIFY/CLOSE', 'iocc.sec.internal.button.close']
    },
    ssoLogoutTimeoutInterval: 30000,
    loggingOut: !1,
    init: function() {
        var a = this;
        a.handleAjaxException = !1;
        if (!a.iconMap) {
            a.iconMap = {
                ERROR: Ext.Msg.ERROR,
                WARNING: Ext.Msg.WARNING,
                INFO: Ext.Msg.INFO
            }
        }
        WuisLogin.controller.Login.prototype.init.call(this);
        if (!a.messageMap) {
            Ext.log.warn('Application messages not set in messagesMap: only `WuisLogin.Common.messageMap` messages will be translated!')
        }
        a.messageMap = Ext.applyIf(a.messageMap || {}, WuisLogin.Common.messageMap);
        a.on('serviceError', a.handleServiceError, a);
        if (a.checkCertificateOnFocus) {
            window.onfocus = a.checkCertificateValidity.bind(a)
        }
        if (!a.loadProperties() && a.autoLoadSecurityConfig) {
            a.loadSecurityConfig()
        }
    },
    handleInitError: function() {
        var c = this,
            a = window.location,
            d = a.hash || '',
            b = Ext.Object.fromQueryString(d.substr(1));
        if (c.isSaml2Allowed() && b && +b.errorCode === 102) {
            a.href = a.href.split('#')[0] + '#';
            c.logout({
                forced: !0,
                logoutActionKey: 'initError',
                notifyMessageKey: b.messageKey || 'iocc.sec.internal.authentication.not.found'
            });
            return !0
        }
        return !1
    },
    loadProperties: function(b) {
        var a = this;
        b = b || a.propertiesConfigUrl;
        if (!b) {
            return !1
        }
        Ext.log.info('Loading application properties config...');
        Ext.Ajax.request({
            url: b,
            method: 'GET',
            disableCaching: !0,
            success: function(d, e) {
                var c = Ext.decode(d.responseText, !0);
                a.propertiesConfig = c;
                if (Ext.isObject(c.applications)) {
                    Ext.apply(WuisLogin.Common.applications, c.applications)
                } else {
                    Ext.log.warn('Unable to get application configuration from properties.json! Using the default applications / requiredRight config!')
                }
                if (a.fireEvent('propertiesloaded', c, !0, d, e) === !1) {
                    return
                }
                if (a.autoLoadSecurityConfig) {
                    a.loadSecurityConfig()
                }
            },
            failure: function(c, d) {
                var e = Ext.decode(c.responseText, !0);
                Ext.log.warn('Unable to load properties.json (' + d.url + ')! It can be a network/service error or even the file is not bundled with the application. Using the default applications / requiredRight config (status: ' + (c.status || 'N/A') + ')!');
                if (a.fireEvent('propertiesloaded', e, !1, c, d) === !1) {
                    return
                }
                if (a.autoLoadSecurityConfig) {
                    a.loadSecurityConfig()
                }
            }
        });
        return !0
    },
    loadSecurityConfig: function() {
        var a = this;
        WuisLogin.Security.loadConfig(a.restPrefix + 'config', {
            success: function(b, c) {
                var d = Ext.decode(b.responseText, !0);
                if (a.handleInitError()) {
                    return
                }
                if (a.fireEvent('securityconfigloaded', d, !0, b, c) === !1) {
                    return
                }
                a.startInactivityControl()
            },
            failure: function(b, c) {
                var d = Ext.decode(b.responseText, !0);
                Ext.log.warn('Unable to load security configuration (' + c.url + ') - application can continue, but with reduced functionality only!');
                if (a.handleInitError()) {
                    return
                }
                if (a.fireEvent('securityconfigloaded', d, !1, b, c) === !1) {
                    return
                }
                a.startInactivityControl()
            }
        })
    },
    onForgottenPasswordChange: function(c, b) {
        var a = this;
        Ext.Ajax.request({
            url: a.restPrefix + 'identity/resetpassword/' + encodeURIComponent(b.user),
            method: 'GET',
            disableCaching: !0,
            serviceName: 'Reset Password',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: a.successResetPassword.bind(a),
            failure: function(d, e) {
                a.fireEvent('serviceError', d, e, null, a.onCancelForgottenPassword, a)
            },
            scope: a
        })
    },
    successResetPassword: function(b, d) {
        var a = this,
            c = b && Ext.decode(b.responseText, !0);
        if (!c.success) {
            a.fireEvent('serviceError', b, d, c, a.onCancelForgottenPassword, a);
            return
        }
        Ext.Msg.alert('Password Reset', 'Please check your email for the activation link!', function() {
            a.onCancelForgottenPassword()
        })
    },
    checkActivation: function() {
        var c = this,
            e = document.location.href.split('?')[1],
            a = e && Ext.Object.fromQueryString(e) || null,
            d = a && a.token,
            b = a && a.user;
        if (d && b) {
            Ext.Ajax.request({
                url: c.restPrefix + 'activation/check/' + encodeURIComponent(b) + '?token=' + encodeURIComponent(d),
                method: 'GET',
                disableCaching: !0,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                success: function(a, d) {
                    c.onSuccessCheckActivation(a, d, b)
                },
                failure: function(a, b) {
                    c.fireEvent('serviceError', a, b)
                }
            });
            return !0
        }
        return !1
    },
    onSuccessCheckActivation: function(f, h, i) {
        var a = this,
            c = Ext.decode(f.responseText, !0),
            b = c && c.result || 'UNKNOWN',
            g, d, e;
        if (!c.success) {
            a.fireEvent('serviceError', f, h, c, a.showLoginWindow, a);
            return
        }
        if (b === 'VALID') {
            g = a.passwordChangeViewConfig && a.passwordChangeViewConfig.parentContainer;
            e = Ext.widget('WuisLoginPasswordReset', Ext.apply({
                eventController: a
            }, a.passwordChangeViewConfig));
            d = e.down('[itemId=user]');
            if (d && i) {
                d.setValue(i)
            }
            g.add(e);
            return
        }
        if (b === 'ALREADYACTIVATED') {
            Ext.Msg.alert('Information', 'You have already activated your password! Please login!', a.showLoginWindow, a);
            return
        }
        if (b === 'INVALID') {
            Ext.Msg.alert('Error', 'This activation link is invalid! Please check the URL or send a new password reset request!', a.showLoginWindow, a);
            return
        }
        if (b === 'EXPIRED') {
            Ext.Msg.alert('Error', 'This activation link has expired. Please send a new password reset request!', a.showLoginWindow, a);
            return
        }
        if (b === 'UNKNOWN') {
            Ext.Msg.alert('Error', 'The validity of the activation link cannot be verified, please contact system administrator!', a.showLoginWindow, a);
            return
        }
        a.fireEvent('serviceError', f, h, c, a.showLoginWindow, a)
    },
    onPasswordChange: function(f, a) {
        var b = this,
            e = document.location.href.split('?')[1],
            c = e && Ext.Object.fromQueryString(e) || null,
            d = {},
            g = c && c.token;
        d.newPassword = a.password1;
        Ext.Ajax.request({
            url: b.restPrefix + 'activation/activate/' + encodeURIComponent(a.user) + '?token=' + encodeURIComponent(g),
            method: 'POST',
            disableCaching: !0,
            jsonData: d,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: function(c, d) {
                b.onPasswordChangeSuccess(f, a, c, d)
            },
            failure: function(c, d) {
                b.fireEvent('serviceError', c, d, null, function() {
                    b.onCancelPasswordChange(f, a)
                })
            }
        })
    },
    onPasswordChangeSuccess: function(f, e, d, g) {
        var a = this,
            c = Ext.decode(d.responseText, !0),
            b = c && c.result || 'UNKNOWN',
            h = document.location.href.split('?')[0];
        if (!c.success || !b) {
            a.fireEvent('serviceError', d, g, c, function() {
                a.onCancelPasswordChange(f, e)
            });
            return
        }
        if (b === 'VALID') {
            Ext.Msg.alert('Password Reset', 'Successfully reset your password. Please login with your new password!', function() {
                window.history.pushState({}, '', h);
                a.onCancelPasswordChange(f, e)
            });
            return
        }
        if (b === 'ALREADYACTIVATED') {
            Ext.Msg.alert('Information', 'You have already activated your password! Please login!', a.showLoginWindow, a);
            return
        }
        if (b === 'INVALID') {
            Ext.Msg.alert('Error', 'This activation link is invalid! Please check the URL or send a new password reset request!', a.showLoginWindow, a);
            return
        }
        if (b === 'EXPIRED') {
            Ext.Msg.alert('Error', 'This activation link has expired. Please send a new password reset request!', a.showLoginWindow, a);
            return
        }
        if (b === 'UNKNOWN') {
            Ext.Msg.alert('Error', 'The validity of the activation link cannot be verified, please contact system administrator!', a.showLoginWindow, a);
            return
        }
        a.fireEvent('serviceError', d, g, c, function() {
            a.onCancelPasswordChange(f, e)
        })
    },
    onPasswordChangeFailure: function(b, a) {
        var c = this;
        Ext.Msg.alert('Error', 'Please try again later or contact the system administrator.', function() {
            c.onCancelPasswordChange(b, a)
        })
    },
    doAuthorization: function(b) {
        var a = this;
        WuisLogin.Security.authorize(a.restPrefix + 'authorization', {
            success: a.onAuthorizationSuccess,
            failure: function(d, c) {
                c.afterLogin = b === !0;
                a.onAuthorizationFailure(d, c)
            },
            scope: a
        })
    },
    checkCertificateValidity: function() {
        this.validateSession()
    },
    onAuthorizationSuccess: function() {
        var a = this,
            b = a.errorState;
        if (b) {
            if (!WuisLogin.Common.checkCompatibleRights(b.rights)) {
                a.reloadApplication()
            }
            if (a.handleServiceErrorComplete()) {
                return !1
            }
        }
        if (a.applicationId && !WuisLogin.Common.hasApplicationAccess(a.applicationId)) {
            a.resetAuthorizationData();
            Ext.Msg.alert('Authorization Error', 'You are not authorized to access this application!<br/>Please contact your system administrator or try log in with a different credential.', function() {
                a.showLoginWindow()
            });
            return !1
        }
        a.fireEvent('userauthorized');
        return !0
    },
    isSaml2Allowed: function() {
        var b = this,
            e = window.location.hash || '',
            a = b.suppressSaml2Hash,
            c = WuisLogin.Security.config && WuisLogin.Security.config.authUrl,
            d = WuisLogin.Security.config && WuisLogin.Security.config.useSso;
        return b.allowSaml2Auth && d && c && (!a || e.toLowerCase().indexOf('#' + a) < 0)
    },
    redirectToAuthenticationUrl: function() {
        var c = this,
            a = WuisLogin.Security.config && WuisLogin.Security.config.authUrl,
            b = window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        if (c.isSaml2Allowed()) {
            a += '?' + Ext.Object.toQueryString({
                backUrl: b + window.location.pathname
            });
            Ext.log.info('Session is unauthenticated, but SAML2/SSO authentication is enabled: redirecting to `' + a + '` ...');
            window.location.href = a;
            return !0
        }
        return !1
    },
    onAuthorizationFailure: function(c, b, e) {
        var a = this,
            f = b && b.afterLogin,
            d = a.isSaml2Allowed();
        if (a.checkUnauthenticated(c)) {
            if (a.handleSessionExpired(c, b, e)) {
                return
            }
            Ext.log.info('Session is unauthenticated, and SAML2/SSO authentication is ' + (a.isSaml2Allowed() ? 'enabled' : 'disabled') + ': showing login window...');
            if (!f && !d) {
                a.showLoginWindow();
                return
            }
            Ext.Msg.show({
                title: a.titleMap.INFO,
                icon: Ext.Msg.INFO,
                msg: a.messageMap['iocc.sec.authorization.failed'],
                message: a.messageMap['iocc.sec.authorization.failed'],
                closable: !1,
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: 'Ok'
                },
                fn: function() {
                    if (d) {
                        a.closeApplication()
                    } else {
                        a.showLoginWindow()
                    }
                }
            });
            return
        }
        a.fireEvent('serviceError', c, b, e, a.showLoginWindow)
    },
    onLogin: function(c, b) {
        var a = this;
        c.setLoading('Login...');
        WuisLogin.Security.authenticate(a.restPrefix + 'authentication/' + encodeURIComponent(b.user) + '?password=' + encodeURIComponent(b.password), {
            success: a.onSuccessLogin,
            failure: a.onFailureLogin,
            scope: a
        })
    },
    onSuccessLogin: function(a, e) {
        var b = this,
            d = b.getLoginWin(),
            c = a && Ext.decode(a.responseText, !0) || null;
        if (d) {
            d.setLoading(!1)
        }
        if (!c || !c.success) {
            b.fireEvent('serviceError', a, e, null);
            return
        }
        WuisLogin.controller.Login.prototype.onSuccessLogin.apply(this, arguments);
        b.doAuthorization(!0)
    },
    onFailureLogin: function(c, d) {
        var b = this,
            a = b.getLoginWin();
        if (a) {
            a.setLoading(!1)
        }
        b.fireEvent('serviceError', c, d, null)
    },
    handleServiceError: function(b, e, d, f, g) {
        var a = this,
            c;
        if (a.errorState) {
            Ext.log.warn('Repeated error occurred while processing requests!')
        }
        a.errorState = {
            response: b,
            opts: e,
            data: d,
            rights: a.errorState && a.errorState.rights,
            identity: WuisLogin.Security.identity,
            callback: f,
            scope: g
        };
        c = a.processMessages(b, e, d);
        if (b && a.checkUnauthenticated(b)) {
            a.showMessages(c, 0, function() {
                if (a.handleSessionExpired(b, e, d)) {
                    return
                }
                a.handleServiceErrorReauthenticate()
            });
            return
        }
        a.showMessages(c, 0, a.handleServiceErrorComplete, a)
    },
    handleServiceErrorReauthenticate: function() {
        var a = this,
            d = '',
            c = !1,
            b = Ext.ComponentQuery.query('WuisLoginPasswordReset')[0];
        if (WuisLogin.Security.identity) {
            d = a.getLoginUserName();
            c = !0
        }
        if (b) {
            b.destroy()
        }
        a.errorState.rights = WuisLogin.Security.rights;
        a.showLoginWindow({
            userName: d,
            userNameReadOnly: c
        })
    },
    handleServiceErrorComplete: function() {
        var a = this,
            b = a.errorState && a.errorState.callback,
            c = a.errorState && a.errorState.scope;
        if (b) {
            b.call(c || a);
            a.errorState = null;
            return !0
        }
        a.errorState = null;
        return !1
    },
    processMessages: function(e, g, b, i) {
        var c = this,
            a = [],
            f = c.messageMap,
            h, d = g && g.serviceName && ' - ' + g.serviceName || '';
        if (!e) {
            a.push({
                icon: Ext.Msg.ERROR,
                title: 'Error in Service' + d,
                message: f['iocc.sec.unexpected.exception']
            });
            return a
        }
        if (!b && e.responseText) {
            try {
                b = Ext.decode(e.responseText, !0)
            } catch (j) {
                Ext.log.warn('Unable to decode response text.', j)
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
                        Ext.each(b.messages, function(j) {
                            var l = Ext.isString(j) ? j : Ext.isObject(f) && f[j.messageKey] || j.messageKey,
                                k = Ext.isArray(j.params) ? j.params : [];
                            if (!l) {
                                Ext.iterate(j, function(a, c) {
                                    if (a !== 'params' && a !== 'messageKey' && a !== 'popUpType' && a !== 'severity') {
                                        l = c;
                                        return !1
                                    }
                                })
                            }
                            if (k[0] && Ext.isNumber(k[0])) {
                                h = k[0]
                            }
                            a.push({
                                icon: c.iconMap[j.severity] || Ext.Msg.ERROR,
                                title: (c.titleMap[j.severity] || c.titleMap.ERROR) + d,
                                message: Ext.String.format(l, k.join(', ')) || 'An unrecongnized error occurred',
                                errorCode: h
                            })
                        })
                    }
                }
            }
        }
        if (a.length) {
            return a
        }
        if (c.checkUnauthenticated(e)) {
            a.push({
                icon: Ext.Msg.ERROR,
                title: 'Unauthorized Operation' + d,
                message: f[i ? 'iocc.sec.internal.logged.out.or.session.expired' : 'iocc.sec.internal.error.no.message']
            });
            return a
        }
        a.push({
            icon: Ext.Msg.ERROR,
            title: c.titleMap.ERROR + d,
            message: 'An unexpected error (status: ' + (e.status || 'none') + ') occurred while trying to process your request!<br/>Please try again or notify the system administrator if the problem persists!'
        });
        return a
    },
    showMessages: function(d, b, c, e) {
        b = b || 0;
        var f = this,
            a = d[b];
        if (!a) {
            if (c) {
                c.call(e || f)
            }
            return
        }
        Ext.Msg.show({
            title: a.title,
            msg: a.message,
            message: a.message,
            icon: a.icon || Ext.Msg.ERROR,
            buttons: Ext.Msg.OK,
            closable: !1,
            fn: function() {
                f.showMessages(d, b + 1, c, e)
            }
        })
    },
    startInactivityControl: function() {
        var a = this;
        if (!a.allowInactivityControl) {
            Ext.log.info('Inactivity control is disabled on client-side.');
            return !1
        }
        if (!a.getCheckInactivityInterval()) {
            Ext.log.info('Inactivity control is disabled on server-side.');
            return !1
        }
        a.resetInactivityCheckTask(!0);
        Ext.getBody().on({
            click: a.handleUserInteraction,
            keypress: a.handleUserInteraction,
            scope: a
        });
        return !0
    },
    getCheckInactivityInterval: function() {
        var b = this,
            a;
        if (b.checkInactivityInterval) {
            return b.checkInactivityInterval
        }
        a = WuisLogin.Security.config && WuisLogin.Security.config.certValidity || null;
        return a ? Math.floor(a * 60 / 3) : null
    },
    resetInactivityCheckTask: function(d) {
        var a = this,
            b = a.getCheckInactivityInterval(),
            c = !1;
        if (a.checkInactivityTask) {
            c = !0;
            a.checkInactivityTask.stop();
            a.checkInactivityTask = null
        }
        if (!a.allowInactivityControl) {
            d = !1
        }
        if (!d || !b || !a.allowInactivityControl) {
            Ext.log.info(c ? 'User inactivity check is stopped.' : 'User inactivity check has already stopped.');
            return
        }
        a.checkInactivityTask = Ext.TaskManager.newTask({
            run: a.checkInactivity,
            scope: a,
            interval: b * 1000
        });
        a.checkInactivityTask.start();
        Ext.log.info('User inactivity check is ' + (c ? 'restarted ' : 'started') + ' (' + b + ' sec).')
    },
    checkInactivity: function() {
        var a = this,
            b = a.userInteractionOccured;
        a.userInteractionOccured = !1;
        a.resetInactivityCheckTask(!0);
        if (!a.isLoggedIn()) {
            return
        }
        if (b) {
            a.renewSession();
            return
        }
        a.validateSession()
    },
    validateSession: function() {
        var a = this,
            b = a.messageMap;
        if (!a.isLoggedIn()) {
            return
        }
        WuisLogin.Security.validate(a.restPrefix + 'authentication/validate', {
            success: function(e, f, c) {
                var d = c && c.userName || null;
                if (!a.isLoggedIn()) {
                    return
                }
                if (d.toUpperCase() !== a.getLoginUserName().toUpperCase()) {
                    a.resetAuthorizationData();
                    Ext.Msg.show({
                        title: a.titleMap.WARNING,
                        icon: a.iconMap.WARNING,
                        msg: b['iocc.sec.internal.warning.identity.changed'],
                        message: b['iocc.sec.internal.warning.identity.changed'],
                        closable: !1,
                        buttons: Ext.Msg.OK,
                        buttonText: {
                            ok: b['iocc.sec.internal.button.reload']
                        },
                        fn: function() {
                            a.reloadApplication()
                        }
                    });
                    return
                }
            },
            failure: function(b, c, d) {
                if (a.checkUnauthenticated(b)) {
                    a.handleSessionExpired(b, c, d, !0)
                }
            }
        })
    },
    renewSession: function() {
        var a = this,
            b = a.messageMap,
            c = a.getLoginUserName();
        if (!a.isLoggedIn()) {
            return
        }
        if (!c) {
            Ext.log.warn('Unable to start heartbeat: identity name is missing!');
            return
        }
        WuisLogin.Security.renewCertificate(a.restPrefix + 'authentication/renew/' + encodeURIComponent(c), {
            success: function(f, g, d) {
                var e = d && d.user || null;
                if (!a.isLoggedIn()) {
                    return
                }
                if (e.toUpperCase() !== c.toUpperCase()) {
                    a.resetAuthorizationData();
                    Ext.Msg.show({
                        title: a.titleMap.WARNING,
                        icon: a.iconMap.WARNING,
                        msg: b['iocc.sec.internal.warning.identity.changed'],
                        message: b['iocc.sec.internal.warning.identity.changed'],
                        closable: !1,
                        buttons: Ext.Msg.OK,
                        buttonText: {
                            ok: b['iocc.sec.internal.button.reload']
                        },
                        fn: function() {
                            a.reloadApplication()
                        }
                    });
                    return
                }
            },
            failure: function(b, c, d) {
                if (a.checkUnauthenticated(b)) {
                    a.handleSessionExpired(b, c, d, !0)
                }
            }
        })
    },
    isLoggedIn: function() {
        return this.loggingOut ? !1 : !!WuisLogin.Security.identity
    },
    getLoginUserName: function() {
        return WuisLogin.Security.identity && Ext.isString(WuisLogin.Security.identity.name) ? WuisLogin.Security.identity.name : null
    },
    handleUserInteraction: function(a) {
        var b = this;
        if (!b.userInteractionOccured) {
            b.userInteractionOccured = !0;
            Ext.log.info('User interaction occured (' + (a && a.type || '???') + ').')
        }
    },
    logout: function(a) {
        var b = this;
        a = a || {};
        if (a.forced !== !0 && !b.isLoggedIn()) {
            return !1
        }
        b.loggingOut = !0;
        Ext.getBody().mask();
        WuisLogin.Security.logout(Ext.apply(WuisLogin.Security.getUrlFromConfig('logout', b.restPrefix, 'logout'), {
            success: function(d, c, e) {
                Ext.getBody().unmask();
                b.logoutInIframe(function() {
                    b.loggingOut = !1;
                    if (a.success && a.success.call(a.scope || b, d, c, e) === !1) {
                        return
                    }
                    b.handleLogout(d, c, a, e, !0)
                })
            },
            failure: function(c, d) {
                b.loggingOut = !1;
                Ext.getBody().unmask();
                if (a.failure && a.failure.call(a.scope || b, c, d) === !1) {
                    return
                }
                b.fireEvent('serviceError', c, a, null)
            }
        }));
        return !0
    },
    logoutInIframe: function(b, f) {
        var d = this,
            e = WuisLogin.Security.config && WuisLogin.Security.config.useSsoLogoutUrl ? WuisLogin.Security.getUrlFromConfig('ssoLogout') : null,
            c = !1,
            a;
        if (d.isSaml2Allowed() && e && e.url) {
            Ext.getBody().mask();
            a = document.createElement('iframe');
            a.setAttribute('border', 0);
            a.setAttribute('height', 0);
            a.setAttribute('width', 0);
            a.src = e.url;
            a.onload = function() {
                Ext.getBody().unmask();
                if (!c) {
                    return
                }
                c = !1;
                if (b) {
                    b.call(f || d, !0)
                }
            };
            c = !0;
            Ext.getBody().dom.appendChild(a);
            Ext.defer(function() {
                Ext.getBody().unmask();
                if (!c) {
                    return
                }
                c = !1;
                if (b) {
                    b.call(f || d, !1)
                }
            }, d.ssoLogoutTimeoutInterval);
            return
        }
        if (b) {
            b.call(f || d)
        }
    },
    handleSessionExpired: function(h, l, e, o, f) {
        var a = this,
            m = {
                100: 'certificateNotFound',
                101: 'invalidCertificate',
                102: 'fatalError',
                103: 'certificateExpired'
            },
            n = a.messageMap,
            j = a.actionMap,
            i = 'OK',
            d = [],
            g, c, k, b;
        if (o !== !0 && !a.isLoggedIn()) {
            return !1
        }
        e = e || Ext.decode(h.responseText, !0);
        d = a.processMessages(h, l, e, !0);
        if (d && d.length) {
            c = d[0].errorCode;
            g = d[0].message
        }
        k = c && m[c] || 'sessionExpired';
        b = j[k] || j.sessionExpired;
        if (Ext.isArray(b)) {
            i = n[b[1]] || 'OK';
            b = b[0]
        }
        if (a.isSaml2Allowed() && b === 'REAUTHENTICATE') {
            b = 'CLOSE'
        }
        if (f && (!c || c === 100)) {
            a.handleValidateResponse('RELOAD', !0);
            return !0
        }
        if (!f && a.fireEvent('sessionexpired', h, l, e, b) === !1) {
            return !0
        }
        if (!c || !a.isSaml2Allowed()) {
            if (b === 'RELOAD') {
                a.resetAuthorizationData();
                a.logoutInIframe(function() {
                    a.reloadApplication()
                });
                return !0
            }
            if (b === 'REAUTHENTICATE') {
                if (f) {
                    a.showLoginWindow()
                } else {
                    a.resetAuthorizationData();
                    a.logoutInIframe(function() {
                        a.reloadApplication()
                    })
                }
                return !0
            }
        }
        if (b !== 'LOGOUT') {
            a.resetAuthorizationData()
        } else {
            a.loggingOut = !0
        }
        a.logoutInIframe(function() {
            Ext.Msg.show({
                title: a.titleMap.INFO,
                icon: Ext.Msg.INFO,
                msg: g,
                message: g,
                closable: !1,
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: i
                },
                fn: function() {
                    a.handleValidateResponse(b)
                }
            })
        });
        return !0
    },
    handleValidateResponse: function(b, c) {
        var a = this;
        if (b === 'CLOSE') {
            a.closeApplication();
            return
        }
        if (b === 'CLOSE/RELOAD') {
            a.closeApplication();
            a.reloadApplication();
            return
        }
        if (b === 'REVALIDATE') {
            a.validateSession();
            return
        }
        if (b === 'REAUTHENTICATE' || b === 'RELOAD') {
            if (!a.redirectToAuthenticationUrl()) {
                if (c) {
                    a.showLoginWindow()
                } else {
                    a.reloadApplication()
                }
            }
            return
        }
        if (b === 'LOGOUT') {
            a.logout({
                forced: !0,
                logoutActionKey: 'sessionExpiredLogout'
            });
            return
        }
    },
    handleLogout: function(f, g, c, d, h) {
        var b = this,
            a = b.actionMap[c.logoutActionKey || 'logout'] || b.actionMap.logout,
            e = 'OK';
        if (Ext.isArray(a)) {
            e = b.messageMap[a[1]] || 'OK';
            a = a[0]
        }
        d = d || Ext.decode(f.responseText, !0);
        if (b.fireEvent('logout', f, g, c, d, h, a) === !1) {
            return
        }
        Ext.util.Cookies.clear('IOCC-Cert');
        Ext.util.Cookies.clear('IOCC-Cert-zipped');
        b.resetAuthorizationData();
        if (a.indexOf('NOTIFY') !== 0 && b.handleDefaultAction(a)) {
            return !1
        }
        b.notifyMessage(c.notifyMessageKey || 'iocc.sec.internal.logged.out', e, a)
    },
    notifyMessage: function(a, d, e) {
        var c = this,
            b = c.messageMap;
        Ext.Msg.show({
            title: c.titleMap.INFO,
            icon: Ext.Msg.INFO,
            msg: b[a] || a,
            message: b[a] || a,
            closable: !1,
            buttons: Ext.Msg.OK,
            buttonText: {
                ok: b[d] || d
            },
            fn: function() {
                c.handleDefaultAction(e)
            }
        })
    },
    handleDefaultAction: function(b) {
        var a = this;
        if (b.indexOf('CLOSE/RELOAD') >= 0) {
            a.closeApplication();
            a.reloadApplication();
            return !0
        }
        if (b.indexOf('RELOAD') >= 0) {
            a.reloadApplication();
            return !0
        }
        if (b.indexOf('CLOSE') >= 0) {
            a.closeApplication();
            return !0
        }
        return !1
    },
    resetAuthorizationData: function() {
        WuisLogin.Security.resetAuthorizationData()
    },
    closeApplication: function() {
        window.close()
    }
});