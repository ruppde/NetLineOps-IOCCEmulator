Ext.define("WuisLogin.view.PasswordChange", {
  requires: [
    'WuisLogin.util.VTypes',
  ],
  xtype: 'WuisLoginPasswordChange',
  extend: 'Ext.window.Window',
  component: true,
  box: true,
  container: true,
  panel: true,
  window: true,
  WuisLoginPasswordChange: true,
  cls: "wuislogin-passwordchange",
  layout: "fit",
  closable: false,
  resizable: false,
  modal: true,
  constrain: true,
  width: 500,
  y: 100,
  title: "Change Password",
  iconCls: "icon-key",
  passwordVtype: "wuisPassword",
  passwordValidator: null,
  eventController: null,
  headerHtml: null,
  validateMethod: "validator",
  passwordValidateTimerId: null,
  passwordErrors: null,
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
        padding: "15 15 0 15",
        html: me.headerHtml
      });
    }
    items.push({
      xtype: "box",
      dock: "left",
      itemId: "errorMsg",
      padding: "19 15 15 15",
      html: "",
      width: 230
    });
    me.items = {
      xtype: "form",
      border: 0,
      bodyStyle: "border:0 none",
      bodyPadding: 15,
      dockedItems: items,
      items: [{
        xtype: "textfield",
        labelAlign: "top",
        fieldLabel: "User Name",
        name: "user",
        itemId: "user",
        margin: "0 0 5 20",
        labelStyle: "margin-bottom:5px",
        anchor: "100%",
        allowBlank: false,
        listeners: {
          specialkey: me.onSpecialKey,
          scope: me
        }
      }, {
        xtype: "textfield",
        labelAlign: "top",
        fieldLabel: "Old Password",
        inputType: "password",
        name: "oldPassword",
        itemId: "oldPassword",
        margin: "0 0 5 20",
        labelStyle: "margin-bottom:5px",
        anchor: "100%",
        allowBlank: false,
        listeners: {
          specialkey: me.onSpecialKey,
          scope: me
        }
      }, {
        xtype: "textfield",
        labelAlign: "top",
        fieldLabel: "New Password",
        inputType: "password",
        name: "password1",
        itemId: "password1",
        margin: "0 0 5 20",
        labelStyle: "margin-bottom:5px",
        anchor: "100%",
        allowBlank: false,
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
        labelAlign: "top",
        fieldLabel: "New Password Again",
        inputType: "password",
        name: "password2",
        itemId: "password2",
        margin: "0 0 5 20",
        labelStyle: "margin-bottom:5px",
        anchor: "100%",
        allowBlank: false,
        validator: function (isSelection) {
          return isSelection === this.prev().getValue() ? true : "Passwords do not match!";
        },
        listeners: {
          specialkey: me.onSpecialKey,
          scope: me
        }
      }, {
        xtype: "textfield",
        labelAlign: "top",
        fieldLabel: "\u00a0",
        labelSeparator: "",
        margin: "0 0 5 20",
        labelStyle: "margin-bottom:5px",
        anchor: "100%",
        readOnly: true,
        itemId: "pwStrength",
        value: "Password Strength",
        cls: "password-strength-field",
        validator: function () {
          return me.validateMethod !== "service" || !me.passwordErrors ? true : me.passwordErrors;
        }
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
    var inlineEditor2 = this;
    var domainTextField = inlineEditor2.getOldPasswordField();
    Ext.window.Window.prototype.afterRender.call(this);
    inlineEditor2.focus();
    if (domainTextField.getValue()) {
      inlineEditor2.getPasswordField().focus();
    } else {
      domainTextField.focus();
    }
  },
  onFormValidityChange: function (eventStr, a) {
    this.down("#okBtn").setDisabled(!a);
  },
  onSpecialKey: function (cmp, event) {
    if (event.getKey() === event.ENTER) {
      this.doPasswordChange();
    }
  },
  onCancelClick: function () {
    var self = this;
    (self.eventController || self).fireEvent("passwordchangecancel", self, self.getForm().getValues());
  },
  onPasswordChangeClick: function () {
    this.doPasswordChange();
  },
  onPassword1Change: function () {
    var me = this;
    me.getForm().items.get("password2").isValid();
    if (me.validateMethod === "service") {
      if (me.passwordValidateTimerId) {
        clearTimeout(me.passwordValidateTimerId);
      }
      me.passwordValidateTimerId = Ext.defer(me.firePasswordValidationEvent, 500, me);
    }
  },
  firePasswordValidationEvent: function () {
    var self = this;
    (self.eventController || self).fireEvent("validatepassword", self, self.getForm().getValues());
  },
  onPassword1ErrorChange: function (md, s) {
    var c = this;
    var b = !md.getValue();
    var gridcontX = this.getPwStrengthField();
    if (c.validateMethod === "service") {
      return;
    }
    gridcontX.removeCls(["pw-ok", "pw-error"]);
    if (!b && !s) {
      gridcontX.addCls("pw-ok");
    } else {
      if (!b) {
        gridcontX.addCls("pw-error");
      }
    }
  },
  getUserField: function () {
    return this.getForm().items.get("user");
  },
  getOldPasswordField: function () {
    return this.getForm().items.get("oldPassword");
  },
  getPasswordField: function () {
    return this.getForm().items.get("password1");
  },
  getPwStrengthField: function () {
    return this.getForm().items.get("pwStrength");
  },
  getErrorMsgBox: function () {
    return this.down("#errorMsg");
  },
  getForm: function () {
    return this.items.getAt(0);
  },
  doPasswordChange: function () {
    var self = this;
    var form = self.getForm();
    if (!form.isValid()) {
      return;
    }
    (self.eventController || self).fireEvent("passwordchange", self, form.getValues());
  }
});
