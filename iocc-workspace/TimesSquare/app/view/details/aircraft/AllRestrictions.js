Ext.define('TimesSquare.view.details.aircraft.AllRestrictions', {
    extend: 'Alf.form.field.Grid',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    tablepanel: !0,
    gridpanel: !0,
    grid: !0,
    gridfield: !0,
    details_aircraft_allrestrictions: !0,
    xtype: 'details_aircraft_allrestrictions',
    name: 'restrictionsList',
    model: 'TimesSquare.model.details.Restriction',
    readOnly: !0,
    initComponent: function() {
        var a = this;
        a.columns = a.getGridColumns();
        Alf.form.field.Grid.prototype.initComponent.apply(this, arguments)
    },
    displayRestrictions: function() {},
    getGridColumns: function() {
        return {
            defaults: {
                type: 'string',
                flex: 1,
                menuDisabled: !0,
                sortable: !1,
                draggable: !1,
                hideable: !1,
                lockable: !1
            },
            items: [{
                header: 'Type',
                dataIndex: 'type'
            }, {
                xtype: 'datecolumn',
                header: 'Valid From',
                format: 'dMy H:i',
                dataIndex: 'validFrom'
            }, {
                xtype: 'datecolumn',
                header: 'Valid Until',
                format: 'dMy H:i',
                dataIndex: 'validUntil'
            }, {
                header: 'Remark',
                dataIndex: 'remarks'
            }, {
                header: 'ATA Code',
                dataIndex: 'ataCode'
            }, {
                header: 'ATA Description',
                dataIndex: 'ataDescription'
            }, {
                header: 'Missing Requirements',
                dataIndex: 'missingRequirements'
            }, {
                header: 'Feature',
                dataIndex: 'aircraftFeature'
            }, {
                header: 'Technical',
                dataIndex: 'technicalReason'
            }, {
                header: 'ACK State',
                dataIndex: 'acknowledgeState'
            }, {
                header: 'ACK User',
                dataIndex: 'acknowledgeUser'
            }, {
                xtype: 'datecolumn',
                header: 'ACK Date',
                format: 'dMy H:i',
                dataIndex: 'acknowledgeDate'
            }]
        }
    }
});
