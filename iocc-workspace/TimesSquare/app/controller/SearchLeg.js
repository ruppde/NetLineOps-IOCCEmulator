Ext.define('TimesSquare.controller.SearchLeg', {
    extend: 'Ext.app.Controller',
    xtype: 'SearchLeg',
    stores: ['common.Lovs', 'searchleg.Legs'],
    models: ['TimesSquare.model.searchleg.Leg'],
    views: ['common.SearchLegDateField', 'common.LovCombo', 'searchleg.Operators', 'searchleg.Search', 'searchleg.Legs', 'searchleg.SearchLeg'],
    refs: [{
        ref: 'searchPanel',
        selector: 'searchleg_searchleg'
    }, {
        ref: 'filterForm',
        selector: 'searchleg_search'
    }, {
        ref: 'legGrid',
        selector: 'searchleg_legs'
    }, {
        ref: 'searchButton',
        selector: 'searchleg_searchleg button[action=search]'
    }, {
        ref: 'stopSearchButton',
        selector: 'searchleg_searchleg button[action=stopSearch]'
    }, {
        ref: 'searchMask',
        selector: '#searchleg_mask'
    }],
    init: function() {
        var a = this;
        a.listen({
            component: {
                'searchleg_searchleg button[action=search]': {
                    click: a.onSearchlegButtonClick
                },
                'searchleg_searchleg button[action=stopSearch]': {
                    click: a.onStopSearchButtonClick
                },
                'searchleg_searchleg [role=operator]': {
                    change: a.onGroupOperatorChange
                },
                'searchleg_searchleg [role=end]': {
                    change: a.onGroupEndChange,
                    keyup: a.onGroupEndChange
                },
                'searchleg_legs': {
                    itemdblclick: a.onLegDoubleClick
                }
            },
            store: {
                '#searchleg.Legs': {
                    beforeload: a.onLegsBeforeLoad,
                    load: a.onLegsLoad
                }
            }
        })
    },
    onLegsBeforeLoad: function(e) {
        var a = this,
            f = a.getFilterForm(),
            d = a.getSearchMask().getEl(),
            c = a.getSearchButton(),
            b = a.getStopSearchButton();
        d.mask('Searching...');
        b.setDisabled(!1);
        c.setDisabled(!0);
        e.proxy.extraParams = f.getRequestObject()
    },
    onGroupOperatorChange: function(b, a) {
        if (a !== 'BETWEEN') {
            this.getFilterForm().down('[group=' + b.group + '][role="end"]').setValue('')
        }
    },
    onGroupEndChange: function(a) {
        var b = a.rawValue;
        if (b) {
            this.getFilterForm().down('[group=' + a.group + '][role="operator"]').setValue('BETWEEN')
        }
    },
    onLegsLoad: function() {
        var a = this,
            d = a.getSearchMask().getEl(),
            c = a.getSearchButton(),
            b = a.getStopSearchButton();
        d.unmask();
        b.setDisabled(!0);
        c.setDisabled(!1)
    },
    onSearchlegButtonClick: function() {
        var b = this,
            c = b.getFilterForm(),
            a;
        if (!c.isValid()) {
            return
        }
        a = b.getLegGrid();
        a.loadLegs()
    },
    onStopSearchButtonClick: function() {
        var b = this,
            a = b.getLegGrid();
        a.getStore().abortRequest()
    },
    onLegDoubleClick: function(d, a) {
        var c = this,
            b = c.getController('details.Main');
        b.open(TimesSquare.controller.details.Main.view.LEG, a)
    },
    loadOperators: function(b, a) {
        TimesSquare.service.Oss.findAllCompactParameters(null, function(c) {
            this.loadOperatorsCallback(c);
            Ext.callback(b, a, [c])
        }, this)
    },
    loadOperatorsCallback: function(a) {
        var c, b;
        if (a && a.success && a.result) {
            c = a.result.parameterList;
            b = new TimesSquare.classes.ParameterList(c); //, 'com.lhsystems.ops.profile.server.dataimpl.parameterconfiguration');
            TimesSquare.CONFIG.expressionOperationList = a.result.expressionOperationList;
            TimesSquare.CONFIG.messageOfTheDay = b.get('COMPACT_MESSAGE_OF_THE_DAY');//"<p><marquee>MOTD:<b>WARNING!</b> TEST ENVIRONMENT! <b>WARNING!</b> TEST ENVIRONMENT! <b>WARNING!</b> TEST ENVIRONMENT!</marquee></p>";//b.get('COMPACT_MESSAGE_OF_THE_DAY');
            TimesSquare.CONFIG.localDoo = b.get('LOCAL_DOO') === 'true';
            TimesSquare.CONFIG.paxDetailShowCheckedIn = b.get('PAX_DETAIL_SHOW_CHECKED_IN') === 'true'
        }
    }
});
