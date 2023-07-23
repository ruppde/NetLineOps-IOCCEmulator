Ext.define("TimesSquare.classes.ParameterList", {
    _map : undefined,
    constructor : function(map, uri, headers) {
      var finalQueryParams = this._map = {};
      if (Ext.isArray(map)) {
        Ext.Array.each(map, function(qp) {
          finalQueryParams[qp.key] = qp.value;
        });
      } else {
        if (Ext.isObject(map)) {
          this._map = map;
        }
      }
      if (uri) {
        return this.get(uri, headers);
      }
    },
    get : function(key, prop) {
      var map = this._map;
      var RegExp;
      var a;
      if (this._map.hasOwnProperty(key)) {
        return map[key];
      }
      RegExp = this.self;
      a = {};
      Ext.Object.each(map, function(e, S) {
        if (e.match(key)) {
          e = e.replace(key, "").replace(/^\./, "");
          a[e] = S;
        }
      });
      if (!prop) {
        a = new RegExp(a);
      }
      return a;
    }
  });
  