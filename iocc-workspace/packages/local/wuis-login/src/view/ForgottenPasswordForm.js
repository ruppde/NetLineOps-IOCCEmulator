Ext.define("WuisLogin.view.ForgottenPasswordForm", {
  extend: 'Ext.panel.Panel',
  component: true,
  box: true,
  container: true,
  panel: true,
  WuisLoginForgottenPasswordForm: true,
  xtype: 'WuisLoginForgottenPasswordForm',
  cls: "wuislogin-forgottenpwd",
  layout: "fit",
  closable: false,
  resizable: false,
  constrain: true,
  width: 300,
  title: "Forgotten Password - Password Reset",
  iconCls: "icon-key",
  frame: false,
  bodyBorder: false,
  border: true,
  hideBorders: true,
  buttonTextOk: "Send Password Reset",
  buttonTextCancel: "Cancel",
  passwordResetText: "",
  eventController: null,
  headerHtml: '<img src="resources/wuis-login/lsy-logo-small.png" style="width:250px;height:30px;margin-top:10px" />',
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
      frame: false,
      bodyBorder: false,
      border: false,
      hideBorders: true,
      bodyPadding: 15,
      dockedItems: [{
        xtype: "box",
        html: me.headerHtml
      }],
      items: [{
        xtype: "textfield",
        labelAlign: "top",
        fieldLabel: "User Name",
        name: "user",
        itemId: "user",
        margin: "0 0 5 0",
        labelStyle: "margin-bottom:5px",
        anchor: "100%",
        allowBlank: false,
        listeners: {
          specialkey: me.onSpecialKey,
          scope: me
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
      text: me.buttonTextCancel || "Cancel",
      itemId: "cancelBtn",
      cls: "id-cancelBtn",
      handler: me.onCancelClick,
      scope: me
    }, {
      text: me.buttonTextOk || "Send reset instructions",
      itemId: "okBtn",
      cls: "id-okBtn",
      disabled: true,
      handler: me.onOkClick,
      scope: me
    }];
  },
  afterRender: function () {
    Ext.panel.Panel.prototype.afterRender.call(this);
    this.focus();
    this.down("[name=user]").focus();
  },
  onFormValidityChange: function (uvy1, a) {
    this.down("#okBtn").setDisabled(!a);
  },
  onSpecialKey: function (t, event) {
    if (event.getKey() === event.ENTER) {
      this.onOkClick();
    }
  },
  onCancelClick: function () {
    var node = this;
    var invalidateStub = node.down("form");
    (node.eventController || node).fireEvent("forgottenpasswordcancel", node, invalidateStub.getValues());
  },
  onOkClick: function () {
    var node = this;
    var b = node.down("form");
    if (!b.isValid()) {
      return;
    }
    node.down("#okBtn").setDisabled(true);
    (node.eventController || node).fireEvent("forgottenpasswordchange", node, b.getValues());
  },
  getUserField: function () {
    return this.down("#user");
  }

});
