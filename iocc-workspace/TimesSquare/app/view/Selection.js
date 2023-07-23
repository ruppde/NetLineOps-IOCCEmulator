Ext.define('TimesSquare.view.Selection', {
    extend: 'Ext.panel.Panel',
    component: !0,
    box: !0,
    container: !0,
    panel: !0,
    SelectionView: !0,
    region: 'west',
    xtype: 'SelectionView',
    title: 'Selections',
    width: '25%',
    collapsible: !0,
    split: !0,
    layout: 'border',
    items: [{
        layout: 'hbox',
        anchor: '100%',
        flex: 1,
        region: 'north',
        split: !0,
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-apply',
                action: 'loadGantt',
                tooltip: 'Apply Selection',
                clickEvent: 'mousedown',
                disabled: !0
            }]
        }],
        items: [{
            html: 'Selections: ',
            border: !1,
            margin: 10,
            width: 70
        }, {
            xtype: 'grid',
            id: 'namedSelections',
            height: '100%',
            flex: 1,
            hideHeaders: !0,
            store: 'NamedSelections',
            selModel: {
                mode: 'single'
            },
            columns: [{
                flex: 1,
                dataIndex: 'selectionID',
                renderer: function(b, c, a) {
                    return b + ' (' + (a.getAircraftSelections().getCount() + a.getLogicalAircraftSubfleets().getCount()) + ' selections)'
                }
            }]
        }]
    }, {
        xtype: 'grid',
        region: 'center',
        id: 'aircrafts',
        flex: 2,
        store: 'SelectableAircrafts',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            defaults: {
                margin: '0 3'
            },
            items: [{
                xtype: 'datefield',
                fieldLabel: 'Date',
                labelWidth: 25,
                allowBlank: !1,
                width: 120,
                value: new Date()
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Days',
                hideTrigger: !1,
                labelWidth: 25,
                allowDecimals: !1,
                allowBlank: !1,
                minValue: 1,
                maxValue: 99,
                value: 1,
                width: 80
            }, {
                xtype: 'checkbox',
                margin: '0 3 0 10',
                labelWidth: 25,
                name: 'autoLoadPhysicalAircrafts',
                fieldLabel: 'Auto',
                value: !1
            }, {
                xtype: 'button',
                name: 'carriers',
                text: 'Carriers',
                menu: {
                    plain: !0,
                    defaults: {
                        xtype: 'checkbox',
                        margin: '0 0 0 5',
                        checked: !1
                    }
                }
            }]
        }],
        viewConfig: {
            markDirty: !1
        },
        plugins: [{
            ptype: 'gridfilters'
          }],
        columns: [{
            text: 'Owner',
            flex: 1,
            dataIndex: 'owner',
            filter: {
                type: 'list'
            }
        }, {
            text: 'Subtype',
            flex: 1,
            dataIndex: 'subtype',
            active: !0,
            filter: {
                type: 'list'
            }
        }, {
            text: 'Registration',
            flex: 2,
            dataIndex: 'registration',
            filter: !0
        }, {
            text: 'State',
            flex: 2,
            dataIndex: 'state',
            filter: {
                type: 'list'
            },
            renderer: function(a, b) {
                b.tdCls = 'icon-aircraft-' + a;
                return a
            }
        }, {
            text: 'Selected',
            flex: 1,
            dataIndex: 'selected',
            xtype: 'checkcolumn',
            filter: !0
        }, {
            text: 'Owner Name',
            flex: 3,
            dataIndex: 'ownerName',
            filter: !0
        }, {
            text: 'Subtype Name',
            flex: 3,
            dataIndex: 'subtypeName',
            filter: !0
        }],
        split: !0
    }],
    toggleCollapse: function() {
        return this.collapsed || this.floatedFromCollapse ? this.expand(!1) : this.collapse()
    }
});