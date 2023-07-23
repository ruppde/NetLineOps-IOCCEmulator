Ext.define('Wuis.ajax.DirectService', {
    singleton: true,
    useMsgBoxDialog: true,
    isWorking: false,

    provide: function(services, namespace) {
        var service, k, v;
        if (!namespace) {
            namespace = ''
        }
        if (services) {
            for (k in services) {
                if (services.hasOwnProperty(k)) {
                    v = services[k];
                    service = Ext.ns(namespace + v.ns);
                    service[v.name] = this.createService(v)
                }
            }
        }
    },
    
    createService: function(services) {
        var cs = this;
        return function(k, namespace, service) {
            cs.callService(services, k, namespace, service)
        }
    },

    callService: function(service, serviceCallParams, serviceCallback, m) {
        var serviceCallScope = this,
            url = service.url,
            method = service.method || 'GET',
            paramsKind = service.paramsKind || {},
            GETMethod = service.method === 'GET' ? 'QUERY' : 'BODY',
            queryParams = {},
            bodyParams = {},
            startTime = +new Date(),
            serviceCallId = Ext.id(),
            b, g;
        if (Ext.isFunction(serviceCallParams)) {
            m = serviceCallback;
            serviceCallback = serviceCallParams;
            serviceCallParams = null
        }
        if (paramsKind === 'BODY') {
            bodyParams = serviceCallParams
        } else {
            if (serviceCallParams) {
                for (b in serviceCallParams) {
                    if (serviceCallParams.hasOwnProperty(b)) {
                        g = typeof paramsKind === 'string' ? paramsKind : paramsKind[b] || GETMethod;
                        if (g === 'URL') {
                            url = url.replace('{' + b + '}', encodeURIComponent(serviceCallParams[b]))
                        } else {
                            if (g === 'QUERY') {
                                queryParams[b] = serviceCallParams[b]
                            } else {
                                if (g === 'ENTIREBODY') {
                                    bodyParams = serviceCallParams[b]
                                } else {
                                    bodyParams[b] = serviceCallParams[b]
                                }
                            }
                        }
                    }
                }
            }
        }
        url = url.replace(/\{[serviceCallParams-z]+\}/ig, '');
        if (service.loadingText !== false) {
            serviceCallScope.isWorking += 1
        }
        serviceCallScope.showMask(service, serviceCallId);
        Ext.Ajax.request({
            service: service,
            serviceCallParams: serviceCallParams,
            serviceCallId: serviceCallId,
            url: url,
            method: method,
            serviceCallback: serviceCallback,
            serviceScope: m,
            startTime: startTime,
            params: queryParams,
            jsonData: method === 'GET' ? undefined : bodyParams,
            callback: serviceCallScope.callServiceCallback,
            scope: serviceCallScope
        })
    },

    callServiceCallback: function(objService, i, b) {
        var serviceCallScope = this,
            g = +new Date(),
            c = i ? Ext.decode(b.responseText, true) : undefined,
            h = +new Date(),
            f, e;
        if (objService.service.loadingText !== false) {
            serviceCallScope.isWorking -= 1
        }
        serviceCallScope.hideMask(objService.service, objService.serviceCallId);
       // serviceCallScope.fireEvent('requestcomplete', c, b, objService.service, objService.serviceCallParams, objService);
        f = +new Date();
        if (objService.serviceCallback) {
            objService.serviceCallback.call(objService.serviceScope || serviceCallScope, c, b);
            e = +new Date()
        } else {
            e = false
        }
        Ext.log.info(['[DirectService] ', objService.service.ns, '.', objService.service.name, ': ', b.status, ' ', b.statusText, ' ', b.status === 200 ? '(' + (c ? 'success: ' + c.success : 'invalid JSON responce') + ') ' : '', g - objService.startTime, 'ms; ', 'event handlers: ', f - h, 'ms; ', 'service callback: ', e === false ? '-' : e - f + 'ms'].join(''));
       // serviceCallScope.fireEvent('callstat', objService.service.ns, objService.service.name, b.status === 200 && c && c.success, g - objService.startTime, (e || f) - h)
    },

    showMask: function(a, c) {
        var b;
        if (a.loadingText === false) {
            return
        }
        if (this.useMsgBoxDialog) {
            b = Ext.create('Ext.window.MessageBox', {
                id: 'loadmask-' + c
            });
            b.wait(a.loadingText || 'Loading', null, {
                interval: 40,
                increment: Math.round((a.loadingTime || 2000) / 40)
            })
        } else {
            b = Ext.widget('box', {
                floating: true,
                id: 'loadmask-' + c,
                html: '<div id="' + id + '-msgWrapEl" data-ref="msgWrapEl" class="x-mask-msg" role="presentation" style=""><div id="' + id + '-msgEl" data-ref="msgEl" class="x-mask-loading x-mask-msg-inner " role="presentation">'
                    + '<div id="' + id + '-msgTextEl" data-ref="msgTextEl" class="x-mask-msg-text" role="presentation">' + (a.loadingText || 'Loading...') + '</div></div></div>',
                shadow: false,
                cls: 'x-mask'
            }); 
            b.show()
        }
    },

    hideMask: function(c, b) {
        var a;
        if (c.loadingText === false) {
            return
        }
        a = Ext.getCmp('loadmask-' + b);
        if (a) {
            a.destroy()
        }
    },

});