Ext.define("WuisLogin.Security", {
  singleton : true,
  data : null,
  identity : null,
  rights : null,
  applications : null,
  config : null,
  tenants : null,
  authorize : function(action, options) {
    var self = this;
    if (!action) {
      Ext.log.error("WuisLogin.Security.authorize() method requires url parameter to be set!");
    }
    Ext.Ajax.request({
      url : action,
      method : "GET",
      disableCaching : true,
      success : function(file, i) {
        var response = Ext.decode(file.responseText, true);
        var item = null;
        var rights = null;
        var clients = null;
        if (response && response.success && response.result) {
          response = response.result;
          if (response.aggregatedRights) {
            rights = {};
            clients = {};
            Ext.each(response.aggregatedRights, function(entry) {
              var path = entry.application;
              rights[(path ? path + "." : "") + entry.name] = entry.active;
              if (path) {
                clients[path] = clients[path] || entry.active;
              }
            });
          }
          if (response.identity) {
            item = {};
            Ext.apply(item, {
              id : response.identity.id,
              name : response.identity.name,
              type : response.identity.type,
              roles : {},
              attributes : {}
            });
            if (response.ownRoles) {
              Ext.each(response.ownRoles, function(action) {
                item.roles[action.name] = true;
              });
            }
            if (response.identity.attributes) {
              Ext.each(response.identity.attributes, function(b) {
                item.attributes[b.attribute.name] = b.value;
              });
            }
          }
          self.data = response;
          self.identity = item;
          self.rights = rights;
          self.applications = clients;
          if (options && options.success) {
            options.success.call(options.scope || self, file, i, response);
          }
        } else {
          if (options && options.failure) {
            options.failure.call(options.scope || self, file, i, response);
          }
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        if (options && options.failure) {
          options.failure.call(options.scope || self, response, t, overlayFrag);
        }
      }
    });
  },
  neoSecurityAuthorize : function(c, config) {
    var me = this;
    if (!c) {
      Ext.log.error("WuisLogin.Security.authorize() method requires url parameter to be set!");
    }
    Ext.Ajax.request({
      url : c,
      method : "GET",
      disableCaching : true,
      success : function(e, changeset_id) {
        var data = Ext.decode(e.responseText, true);
        var origin = null;
        var value = null;
        var result = null;
        if (!data || !data.tenant || !data.userName) {
          if (config && config.failure) {
            config.failure.call(config.scope || me, e, changeset_id, data);
          }
          return;
        }
        me.data = data;
        if (data.rights) {
          value = {};
          result = {};
          Ext.each(data.rights, function(host) {
            var name = host.module;
            var a = host.name;
            result[name] = result[name] || {};
            result[name][a] = true;
            value[a] = value[a] || {};
            value[a][name] = true;
          });
        }
        origin = {
          name : data.userName || null,
          attributes : data.attributes || {},
          tenant : data.tenant || null
        };
        me.identity = origin;
        me.rights = value;
        me.applications = result;
        if (config && config.success) {
          config.success.call(config.scope || me, e, changeset_id, data);
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        if (config && config.failure) {
          config.failure.call(config.scope || me, response, t, overlayFrag);
        }
      }
    });
  },
  authenticate : function(res, config) {
    var me = this;
    if (!res) {
      Ext.log.error("WuisLogin.Security.authenticate() method requires at least url parameter to be set!");
    }
    Ext.Ajax.request({
      url : res,
      method : "GET",
      disableCaching : true,
      success : function(xhr, status) {
        var data = Ext.decode(xhr.responseText, true);
        if (data && data.success) {
          if (config && config.success) {
            config.success.call(config.scope || me, xhr, status, data);
          }
        } else {
          if (config && config.failure) {
            config.failure.call(config.scope || me, xhr, status, data);
          }
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        if (config && config.failure) {
          config.failure.call(config.scope || me, response, t, overlayFrag);
        }
      }
    });
  },
  authenticateWithPost : function(c, config) {
    var me = this;
    if (!c) {
      Ext.log.error("WuisLogin.Security.authenticateWithPost() method requires at least url parameter to be set!");
    }
    Ext.Ajax.request({
      url : c,
      method : "POST",
      disableCaching : true,
      headers : {
        password : config.password
      },
      success : function(xhr, status) {
        var data = Ext.decode(xhr.responseText);
        if (data && data.success) {
          if (config && config.success) {
            config.success.call(config.scope || me, xhr, status, data);
          }
        } else {
          if (config && config.failure) {
            config.failure.call(config.scope || me, xhr, status, data);
          }
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText);
        if (config && config.failure) {
          config.failure.call(config.scope || me, response, t, overlayFrag);
        }
      }
    });
  },
  neoSecurityAuthenticate : function(c, config) {
    var me = this;
    if (!c) {
      Ext.log.error("WuisLogin.Security.authenticate() method requires at least url parameter to be set!");
    }
    Ext.Ajax.request({
      url : c,
      method : "POST",
      jsonData : Ext.encode(config.credentials),
      success : function(xhr, status) {
        var data = Ext.decode(xhr.responseText, true);
        if (data && data.success) {
          if (config && config.success) {
            config.success.call(config.scope || me, xhr, status, data);
          }
        } else {
          if (config && config.failure) {
            config.failure.call(config.scope || me, xhr, status, data);
          }
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        if (config && config.failure) {
          config.failure.call(config.scope || me, response, t, overlayFrag);
        }
      }
    });
  },
  logout : function(options, config) {
    var me = this;
    config = config || {};
    if (Ext.isString(options)) {
      config.url = options;
      config.method = "GET";
    } else {
      if (Ext.isObject(options)) {
        config = Ext.apply(Ext.apply({}, options), config);
      }
    }
    if (!config.url) {
      Ext.log.error("WuisLogin.Security.logout() method requires at least url parameter to be set!");
    }
    Ext.Ajax.request({
      url : config.url,
      method : config.method || "GET",
      headers : {
        "Content-Type" : "application/json"
      },
      success : function(xhr, status) {
        var data = Ext.decode(xhr.responseText, true) || null;
        if (data && data.success) {
          if (config && config.success) {
            config.success.call(config.scope || me, xhr, status, data);
          }
        } else {
          if (config && config.failure) {
            config.failure.call(config.scope || me, xhr, status, data);
          }
        }
        me.resetAuthorizationData();
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        if (config && config.failure) {
          config.failure.call(config.scope || me, response, t, overlayFrag);
        }
      }
    });
  },
  validate : function(b, options) {
    var filter = this;
    if (!b) {
      Ext.log.error("WuisLogin.Security.validate() method requires url parameter to be set!");
    }
    options = options || {};
    Ext.log.info("Validating session...");
    Ext.Ajax.request({
      url : b,
      method : "GET",
      disableCaching : true,
      success : function(xhr, status) {
        var overlayFrag = Ext.decode(xhr.responseText, true);
        Ext.log.info("Session validation was successful.");
        if (options.success) {
          options.success.call(options.scope || filter, xhr, status, overlayFrag);
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        Ext.log.warn("Session validation failed with error code " + response.status);
        if (options.failure) {
          options.failure.call(options.scope || filter, response, t, overlayFrag);
        }
      }
    });
  },
  renewCertificate : function(b, options) {
    var filter = this;
    if (!b) {
      Ext.log.error("WuisLogin.Security.renewCertificate() method requires url parameter to be set!");
    }
    options = options || {};
    Ext.log.info("Renewing certificate...");
    Ext.Ajax.request({
      url : b,
      method : "GET",
      disableCaching : true,
      success : function(xhr, status) {
        var overlayFrag = Ext.decode(xhr.responseText, true);
        Ext.log.info("Certificate renewal was successful.");
        if (options.success) {
          options.success.call(options.scope || filter, xhr, status, overlayFrag);
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        Ext.log.warn("Certificate renewal failed with error code " + response.status);
        if (options.failure) {
          options.failure.call(options.scope || filter, response, t, overlayFrag);
        }
      }
    });
  },
  loadConfig : function(server, config) {
    var me = this;
    if (!server) {
      Ext.log.error("WuisLogin.Security.loadConfig() method requires url parameter to be set!");
    }
    config = config || {};
    Ext.Ajax.request({
      url : server,
      method : "GET",
      disableCaching : true,
      success : function(xhr, status) {
        var responseText = Ext.decode(xhr.responseText, true);
        if (!Ext.isObject(responseText)) {
          if (config && config.failure) {
            config.failure.call(config.scope || me, xhr, status, responseText);
          }
          return;
        }
        me.config = responseText;
        if (config && config.success) {
          config.success.call(config.scope || me, xhr, status, responseText);
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        if (config && config.failure) {
          config.failure.call(config.scope || me, response, t, overlayFrag);
        }
      }
    });
  },
  resetAuthorizationData : function() {
    var $scope = this;
    $scope.data = null;
    $scope.identity = null;
    $scope.applications = null;
    $scope.rights = null;
    $scope.tenants = null;
  },
  loadTenants : function(c, config) {
    var me = this;
    if (!c) {
      Ext.log.error("WuisLogin.Security.loadTenants() method requires url parameter to be set!");
    }
    config = config || {};
    Ext.Ajax.request({
      url : c,
      method : "GET",
      disableCaching : true,
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      success : function(xhr, status) {
        var d = Ext.decode(xhr.responseText, true);
        var res = [];
        if (!d || !Ext.isArray(d)) {
          if (config && config.failure) {
            config.failure.call(config.scope || me, xhr, status, d);
          }
          return;
        }
        Ext.each(d, function(newPrinter) {
          res.push({
            name : newPrinter
          });
        });
        me.tenants = res;
        if (config && config.success) {
          config.success.call(config.scope || me, xhr, status, d);
        }
      },
      failure : function(response, t) {
        var overlayFrag = Ext.decode(response.responseText, true);
        if (config && config.failure) {
          config.failure.call(config.scope || me, response, t, overlayFrag);
        }
      }
    });
  },
  hasRight : function(i, i2) {
    var indices = i.split(".");
    if (indices.length === 2) {
      i = indices[0];
      i2 = indices[1];
    }
    return this.applications && this.applications[i] && this.applications[i][i2];
  },
  getUrlFromConfig : function(name, result, url) {
    var req = this;
    var key = Ext.String.uncapitalize(name) + "Url";
    var param = Ext.String.uncapitalize(name) + "Method";
    var str = req.config && req.config[key] || null;
    var method = req.config && req.config[param] || "GET";
    result = result || "";
    if (str && Ext.isString(str)) {
      if (str.indexOf("http") === -1) {
        str = result + str;
      }
      return {
        url : str,
        method : method
      };
    }
    return url ? {
      url : result + url,
      method : method
    } : null;
  }
});
