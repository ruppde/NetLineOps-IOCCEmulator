Ext.define('TimesSquare.view.details.leg.DelaysGrid', {
    extend: 'Alf.form.field.Grid',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tablepanel: !0,
    gridpanel: !0,
    grid: !0,
    gridfield: !0,
    details_leg_delaysgrid: !0,
    xtype: 'details_leg_delaysgrid',
    columnsConfig: {
        delayCode: {
            header: 'Delay Code',
            minWidth: 50
        },
        subDelayCode: {
            header: 'Sub Delay',
            minWidth: 50
        },
        delayTime: {
            header: 'Duration',
            minWidth: 50
        },
        delayResponsibilityCode: {
            header: 'Responsibility',
            minWidth: 50
        },
        delayResponsibilityDescription: {
            header: 'Responsibility Description',
            minWidth: 100,
            flex: 2,
            align: 'left'
        },
        delayImputation: {
            header: 'Imputation',
            minWidth: 50
        },
        delayReason: {
            header: 'Reason',
            minWidth: 50
        },
        'irregularities.delayCode': {
            header: 'Irregularity Nature',
            minWidth: 50
        },
        'irregularities.delayReason': {
            header: 'Irregularity Reason',
            minWidth: 50
        }
    },
    initComponent: function() {
        var a = this,
            c = a.columnsConfig,
            d = a.fields || [],
            b = [];
        Ext.Array.each(d, function(a) {
            var d = Ext.isObject(a) ? a.name : a,
                e = Ext.isObject(a) && a || {},
                f = e && e.columnCfg || {},
                g = c[d] || {};
            b.push(Ext.apply(Ext.apply({
                header: d,
                dataIndex: d
            }, g), f))
        });
        a.columns = {
            defaults: {
                type: 'string',
                flex: 1,
                menuDisabled: !1,
                sortable: !0,
                draggable: !1,
                hideable: !1,
                lockable: !1,
                align: 'left'
            },
            items: b
        };
        Alf.form.field.Grid.prototype.initComponent.apply(this, arguments)
    }
});
