Ext.define('TimesSquare.model.searchleg.Leg', {
    extend: 'TimesSquare.model.details.Leg',
    proxy: {
        type: 'alfrest',
        url: '/NetLine-1.0/oss/searchLeg',
        pageParam: undefined,
        sortParam: undefined,
        limitParam: 'pageSize',
        opsId: 'searchleg',
        reader: {
            type: 'json',
            rootProperty: 'result.listLegDetailShorts',
            totalProperty: 'result.total'
        }
    }
});
