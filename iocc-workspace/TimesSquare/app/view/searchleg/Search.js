Ext.define('TimesSquare.view.searchleg.Search', {
    extend: 'Ext.form.Panel',
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    searchleg_search: !0,
    xtype: 'searchleg_search',
    border: !1,
    layout: {
        type: 'table',
        columns: 8
    },
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.form.Panel.prototype.initComponent.apply(this, arguments)
    },
    getRequestObject: function() {
        var c = this,
            b = {},
            a = c.getForm().getValues();
        Ext.merge(b, c.convertToStringList('flight', a.flightOp, a.flightValue));
        Ext.merge(b, c.convertToDateRange('doo', a.dooStartOp, a.dooStartValue, a.dooEndValue));
        Ext.merge(b, c.convertToDateRange('ldo', a.ldoStartOp, a.ldoStartValue, a.ldoEndValue));
        Ext.merge(b, c.convertToStringList('dep', a.depOp, a.depValue));
        Ext.merge(b, c.convertToDateRange('depDate', a.depDateStartOp, a.depDateStartValue, a.depDateEndValue));
        Ext.merge(b, c.convertToStringList('arr', a.arrOp, a.arrValue));
        Ext.merge(b, c.convertToDateRange('arrDate', a.arrDateStartOp, a.arrDateStartValue, a.arrDateEndValue));
        Ext.merge(b, c.convertToObject('state', a.stateOp, a.stateValue));
        Ext.merge(b, c.convertToObject('serviceType', a.serviceTypeOp, a.serviceTypeValue));
        Ext.merge(b, c.convertToStringList('owner', a.ownerOp, a.ownerValue));
        Ext.merge(b, c.convertToStringList('subtype', a.subtypeOp, a.subtypeValue));
        Ext.merge(b, c.convertToStringList('registration', a.registrationOp, a.registrationValue));
        return b
    },
    convertToStringList: function(b, d, c) {
        var a = this.convertToObject(b, d, c);
        if (a && a[b] && a[b].value) {
            a[b].values = a[b].value.split(/\s*,\s*/);
            delete a[b].value
        }
        return a
    },
    convertToDateRange: function(c, b, e, f) {
        var d = this,
            a = {};
        Ext.merge(a, d.convertToObject(c, b, e, 'startOperation', 'startValue'));
        Ext.merge(a, d.convertToObject(c, b, f, 'endOperation', 'endValue'));
        return a
    },
    convertToObject: function(b, d, c, e, g) {
        var a = {},
            f = e || 'operation',
            h = g || 'value';
        if (!Ext.isEmpty(d)) {
            if (!Ext.isEmpty(c)) {
                a[b] = {};
                a[b][f] = d;
                a[b][h] = c
            }
        }
        return a
    },
    createItems: function(f, i, a, j) {
        var d = this,
            e = TimesSquare.CONFIG.expressionOperationList,
            g = 'http://127.0.0.1:8080/NetLine-1.0/oss/findAllCompactParameters',
            h = 'result.expressionOperationList',
            c = TimesSquare.store.common.Lovs.getRestStore(g, h).setCache(e),
            b = TimesSquare.store.common.Lovs.getRestStore(g, h, {
                excludeOptions: ['CONTAINS', 'NOT_CONTAINS', 'IN_LIST', 'NOT_IN_LIST'],
                excludeKey: 'value'
            }).setCache(e);
        d.defaults = {
            margin: j
        };
        d.items = [{
            xtype: 'label',
            text: 'Flight'
        }, {
            xtype: 'searchleg_operators',
            store: c,
            width: a,
            name: 'flightOp',
            cls: 'test-id-searchleg-search-flightOp',
            value: 'EQUAL'
        }, {
            xtype: 'textfield',
            upperCase: !0,
            fieldLabel: '',
            width: a,
            name: 'flightValue',
            colspan: 2,
            cls: 'test-id-searchleg-search-flightValue'
        }, {
            xtype: 'box',
            colspan: 4
        }, {
            xtype: 'label',
            text: 'DOO'
        }, {
            xtype: 'searchleg_operators',
            store: b,
            width: a,
            group: 'doo',
            role: 'operator',
            name: 'dooStartOp',
            cls: 'test-id-searchleg-search-dooStartOp',
            value: 'EQUAL'
        }, {
            xtype: 'searchleg_datefield',
            sisterFieldName: 'dooEndValue',
            vtype: 'searchLegDate',
            fieldLabel: '',
            group: 'doo',
            role: 'start',
            name: 'dooStartValue',
            colspan: 2,
            width: a,
            cls: 'test-id-searchleg-search-dooStartValue'
        }, {
            xtype: 'searchleg_datefield',
            width: a,
            fieldLabel: '',
            group: 'doo',
            role: 'end',
            name: 'dooEndValue',
            enableKeyEvents: !0,
            colspan: 4,
            cls: 'test-id-searchleg-search-dooEndValue'
        }];
        if (TimesSquare.CONFIG.localDoo) {
            d.items.push({
                xtype: 'label',
                text: 'LDO'
            }, {
                xtype: 'searchleg_operators',
                store: b,
                width: a,
                group: 'ldo',
                role: 'operator',
                name: 'ldoStartOp',
                cls: 'test-id-searchleg-search-ldoStartOp',
                value: 'EQUAL'
            }, {
                xtype: 'searchleg_datefield',
                sisterFieldName: 'ldoEndValue',
                vtype: 'searchLegDate',
                fieldLabel: '',
                group: 'ldo',
                role: 'start',
                name: 'ldoStartValue',
                colspan: 2,
                width: a,
                cls: 'test-id-searchleg-search-ldoStartValue'
            }, {
                xtype: 'searchleg_datefield',
                width: a,
                fieldLabel: '',
                group: 'ldo',
                role: 'end',
                name: 'ldoEndValue',
                enableKeyEvents: !0,
                colspan: 3,
                cls: 'test-id-searchleg-search-ldoEndValue'
            })
        }
        d.items.push({
            xtype: 'label',
            text: 'Dep'
        }, {
            xtype: 'searchleg_operators',
            store: c,
            width: a,
            name: 'depOp',
            cls: 'test-id-searchleg-search-depOp',
            value: 'EQUAL'
        }, {
            xtype: 'textfield',
            upperCase: !0,
            fieldLabel: '',
            width: f,
            name: 'depValue',
            cls: 'test-id-searchleg-search-depValue'
        }, {
            xtype: 'label',
            text: 'Dep Date'
        }, {
            xtype: 'searchleg_operators',
            store: b,
            width: a,
            group: 'depDate',
            role: 'operator',
            name: 'depDateStartOp',
            cls: 'test-id-searchleg-search-depDateStartOp',
            value: 'EQUAL'
        }, {
            xtype: 'searchleg_datefield',
            width: a,
            sisterFieldName: 'depDateEndValue',
            fieldLabel: '',
            group: 'depDate',
            role: 'start',
            name: 'depDateStartValue',
            cls: 'test-id-searchleg-search-depDateStartValue'
        }, {
            xtype: 'searchleg_datefield',
            width: a,
            fieldLabel: '',
            group: 'depDate',
            role: 'end',
            name: 'depDateEndValue',
            enableKeyEvents: !0,
            colspan: 3,
            cls: 'test-id-searchleg-search-depDateEndValue'
        }, {
            xtype: 'label',
            text: 'Arr'
        }, {
            xtype: 'searchleg_operators',
            store: c,
            width: a,
            name: 'arrOp',
            cls: 'test-id-searchleg-search-arrOp',
            value: 'EQUAL'
        }, {
            xtype: 'textfield',
            upperCase: !0,
            fieldLabel: '',
            width: f,
            name: 'arrValue',
            cls: 'test-id-searchleg-search-arrValue'
        }, {
            xtype: 'label',
            text: 'Arr Date'
        }, {
            xtype: 'searchleg_operators',
            store: b,
            width: a,
            group: 'arrDate',
            role: 'operator',
            name: 'arrDateStartOp',
            cls: 'test-id-searchleg-search-arrDateStartOp',
            value: 'EQUAL'
        }, {
            xtype: 'searchleg_datefield',
            width: a,
            sisterFieldName: 'arrDateEndValue',
            fieldLabel: '',
            group: 'arrDate',
            role: 'start',
            name: 'arrDateStartValue',
            cls: 'test-id-searchleg-search-arrDateStartValue'
        }, {
            xtype: 'searchleg_datefield',
            width: a,
            fieldLabel: '',
            group: 'arrDate',
            role: 'end',
            name: 'arrDateEndValue',
            enableKeyEvents: !0,
            colspan: 3,
            cls: 'test-id-searchleg-search-arrDateEndValue'
        }, {
            xtype: 'label',
            text: 'State'
        }, {
            xtype: 'searchleg_operators',
            store: b,
            width: a,
            name: 'stateOp',
            cls: 'test-id-searchleg-search-stateOp',
            value: 'EQUAL'
        }, {
            xtype: 'lovcombo',
            restUrl: '/NetLine/oss/findAllLegStates',
            root: 'result.listAllLegStates',
            name: 'stateValue',
            colspan: 2,
            width: a,
            cls: 'test-id-searchleg-search-stateValue'
        }, {
            xtype: 'box',
            colspan: 4
        }, {
            xtype: 'label',
            text: 'Service Type'
        }, {
            xtype: 'searchleg_operators',
            store: b,
            width: a,
            name: 'serviceTypeOp',
            cls: 'test-id-searchleg-search-serviceTypeOp',
            value: 'EQUAL'
        }, {
            xtype: 'lovcombo',
            valueField: 'key',
            restUrl: '/NetLine/oss/findAllLegServiceTypes',
            root: 'result.listAllServiceTypes',
            name: 'serviceTypeValue',
            colspan: 2,
            width: i,
            cls: 'test-id-searchleg-search-serviceTypeValue'
        }, {
            xtype: 'box',
            colspan: 4
        }, {
            xtype: 'label',
            text: 'Owner'
        }, {
            xtype: 'searchleg_operators',
            store: c,
            width: a,
            name: 'ownerOp',
            cls: 'test-id-searchleg-search-ownerOp',
            value: 'EQUAL'
        }, {
            xtype: 'textfield',
            upperCase: !0,
            fieldLabel: '',
            name: 'ownerValue',
            colspan: 2,
            width: a,
            cls: 'test-id-searchleg-search-ownerValue'
        }, {
            xtype: 'box',
            colspan: 4
        }, {
            xtype: 'label',
            text: 'Subtype'
        }, {
            xtype: 'searchleg_operators',
            store: c,
            width: a,
            name: 'subtypeOp',
            cls: 'test-id-searchleg-search-subtypeOp',
            value: 'EQUAL'
        }, {
            xtype: 'textfield',
            upperCase: !0,
            fieldLabel: '',
            name: 'subtypeValue',
            colspan: 2,
            width: a,
            cls: 'test-id-searchleg-search-subtypeValue'
        }, {
            xtype: 'box',
            colspan: 4
        }, {
            xtype: 'label',
            text: 'Registration'
        }, {
            xtype: 'searchleg_operators',
            store: c,
            width: a,
            name: 'registrationOp',
            cls: 'test-id-searchleg-search-registrationOp',
            value: 'EQUAL'
        }, {
            xtype: 'textfield',
            upperCase: !0,
            fieldLabel: '',
            name: 'registrationValue',
            colspan: 2,
            width: a,
            cls: 'test-id-searchleg-search-registrationValue'
        })
    }
});
