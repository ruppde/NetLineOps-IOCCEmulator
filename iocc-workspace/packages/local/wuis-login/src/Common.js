Ext.define("WuisLogin.Common", {
    singleton: true,
    tenantKeyLS: "NeoSecurity-Tenant",
    applications: {
        usrMgmt: {
            name: "usrMgmt",
            requiredRight: "readIdentity"
        },
        ioccSecurity: {
            name: "iocc-security-webui",
            requiredRight: "View_SecurityAdminApplication"
        },
        ioccSecurityAuthorization: {
            name: "iocc-security-authorization",
            requiredRight: "editRight"
        },
        ioccSecurityIdentity: {
            name: "iocc-security-identity",
            requiredRight: "editIdentity"
        },
        briefing: {
            name: "Briefing",
            requiredRight: "View_myBriefingApplication"
        },
        opsTimesSquare: {
            name: "NetLineOps",
            requiredRight: "View_TimesSquareApplication"
        },
        crewLinkRoster: {
            name: "CrewLink",
            requiredRight: "View_CrewLinkRosterApplication"
        },
        crewLinkAdmin: {
            name: "CrewLink",
            requiredRight: "View_CrewLinkNoCrewApplication"
        },
        crewLinkCrewInformation: {
            name: "CrewLink",
            requiredRight: "View_CrewLinkCrewApplication"
        },
        crewLinkCheckIn: {
            name: "CrewLink",
            requiredRight: "View_CrewLinkCrewApplication"
        }
    },
    messageMap: {
        "iocc.sec.internal.config.load.error": "An unexpected error has occurred while loading the security configuration! Please try again later or contact the system administrator!",
        "iocc.sec.unexpected.exception": "An unexpected server error has occurred while processing your request! Please try again later or contact the system administrator!",
        "iocc.sec.authorization.failed": "Authorization failed! Please try again later or contact the system administrator!",
        "iocc.sec.authentication.failed": "Authentication failed: username or password invalid!",
        "iocc.sec.authentication.failed.user.not.activated": "Authentication failed: user not activated!",
        "iocc.sec.authentication.failed.incorrect.pw": "Authentication failed: incorrect password",
        "iocc.sec.authentication.validation.failed": "The certificate has expired!",
        "iocc.sec.authentication.certificate.nullorempty": "You have logged out from the application or the login session is expired.<br/>You can close this window or reload the application to sign in again!",
        "iocc.sec.authentication.certificate.decodingerror": "The certificate could not be decoded!",
        "iocc.sec.authentication.certificate.expired": "The login session has been expired.<br/>Please reauthenticate yourself with your username and password!",
        "iocc.sec.authentication.certificate.notyetvalid": "The current Date or the specified Date is before the notBefore date/time in the Certificate validity period!",
        "iocc.sec.authentication.certificate.invalidkey": "Certificate public key not found!",
        "iocc.sec.authentication.certificate.exception": "Certificate validation failed!",
        "iocc.sec.authentication.certificate.nosuchalgorithm": "Certificate validation failed!",
        "iocc.sec.authentication.certificate.nosuchprovider": "Certificate validation failed!",
        "iocc.sec.authentication.certificate.wrongsignature": "Generic Signature exception occurred!",
        "iocc.sec.authentication.notfound": "Authentication failed: user not found!",
        "iocc.sec.authentication.publickey.notfound": "Certificate public key not found!",
        "iocc.sec.connection.error": "Connection to security service could not be created!",
        "iocc.sec.identity.password.weak": "New password too weak, password not changed!",
        "iocc.sec.identity.password.incorrect": "Provided credentials are not correct, password not changed!",
        "iocc.sec.identity.password.notallowed": "Password change not allowed!",
        "iocc.sec.identity.password.exception": "Could not cahnge password. An error happened!",
        "iocc.sec.internal.session.expired.close": "The login session has been expired.<br/>You must close this window and restart the application to sign in again!",
        "iocc.sec.internal.session.expired.reload": "The login session has been expired.<br/>You must close this window or reload the application to sign in again!",
        "iocc.sec.internal.session.expired.reauthenticate": "The login session has been expired.<br/>Please reauthenticate yourself with your username and password!",
        "iocc.sec.internal.logged.out": "You have logged out from the application!<br/>You can close this window or reload the application to sign in again!",
        "iocc.sec.internal.warning.identity.changed": "Application must be reloaded, because login credentials has been changed since last login!",
        "iocc.sec.internal.button.reload": "Reload Application",
        "iocc.sec.internal.button.close": "Close Application",
        "iocc.sec.internal.error.load.config": "Unable to retrieve security configuration from server!<br/>Application can continue, but some features might not work properly.<br/>If the problem persist, please call system administrator!<br/>",
        "iocc.sec.internal.logged.out.or.session.expired": "You have logged out from the application or the login session is expired!<br/>You can close this window or reload the application to sign in again!",
        "iocc.sec.internal.error.no.message": 'Either your user name or password is invalid.<br/>Please retry the operation or click the "forgot password to reset your password.',
        "iocc.sec.internal.authentication.not.found": "You are not authorized to use this application!<br/>You have to log in with a different credential, or contact the system administrator!",
        "iocc.sec.mailsending.error": "Unable to complete the operation as server is not able to send e-mails now.<br/>If the problem persist, please call system administrator!<br/>"
    },
    hasApplicationAccess: function (id) {
        var $scope = this;
        var schema = WuisLogin.Security.applications;
        var p = WuisLogin.Security.rights;
        var collection = $scope.applications;
        var obj = collection[id];
        var type;
        if (!obj || !schema) {
            return false;
        }
        type = obj.name;
        if (schema[type] === true && Ext.isObject(p)) {
            return p[type + "." + obj.requiredRight] === true;
        }
        return schema[type] && schema[type][obj.requiredRight];
    },
    checkCompatibleRights: function (eventMapping) {
        var rights = WuisLogin.Security.rights;
        var a = true;
        Ext.iterate(eventMapping, function (action, canCreateDiscussions) {
            if (canCreateDiscussions && !rights[action]) {
                a = false;
                return false;
            }
        });
        return a;
    },
    loadTenant: function () {
        return window.localStorage && window.localStorage.getItem(this.tenantKeyLS) || null;
    },
    saveTenant: function (a) {
        var course = this;
        if (!window.localStorage) {
            return false;
        }
        if (!a) {
            window.localStorage.removeItem(course.tenantKeyLS);
            return null;
        }
        if (!Ext.isString(a)) {
            return false;
        }
        window.localStorage.setItem(course.tenantKeyLS, a);
        return a;
    }
});