Ext.define("WuisLogin.util.VTypes", {
  override: "Ext.form.field.VTypes",
  wuisPassword: function (c, e) {
    var d = e.next("#pwStrength");
    var a = true;
    var b = "";
    if (!c) {
      a = false;
    }
    if (a && c.length < 8) {
      b = "Invalid password. Must be min. 8 characters!";
      a = false;
    }
    if (a && !/^(?=.*[a-z].*[a-z].*[a-z])/.test(c)) {
      b = "Must contain at least 3 lower case characters!";
      a = false;
    }
    if (a && !/^(?=.*[A-Z])/.test(c)) {
      b = "Must contain at least 1 upper case character!";
      a = false;
    }
    if (a && !/^(?=.*[0-9])/.test(c)) {
      b = "Must contain at least 1 digit!";
      a = false;
    }
    if (a && !/^(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(c)) {
      b = "Must contain at least 1 symbol (!@#$%^&*)!";
      a = false;
    }
    this.wuisPasswordText = b;
    if (d) {
      if (!a) {
        d.setValue(b);
      } else {
        d.setValue("Valid password.");
      }
    }
    return a;
  },
  wuisPasswordText: "Invalid password. Must be min. 8 characters and must contain at least 1 upper case character, 3 lower case character,1 digit or digit character in the middle and 1 symbol character!"
});
