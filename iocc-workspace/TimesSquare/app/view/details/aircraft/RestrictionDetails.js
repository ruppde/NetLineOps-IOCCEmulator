Ext.define('TimesSquare.view.details.aircraft.RestrictionDetails', {
    extend: 'Ext.form.Panel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    details_aircraft_restrictiondetails: !0,
    xtype: 'details_aircraft_restrictiondetails',
    padding: '10px 5px',
    border: !1,
    layout: {
        type: 'table',
        columns: 11
    },
    initComponent: function() {
        var a = this;
        a.createItems();
        Ext.form.Panel.prototype.initComponent.apply(this, arguments)
    },
    createItems: function() {
        var b = this,
            a;
        a = b.getAreaLayout();
        b.items = Alf.MetaManager.decorateFields('AircraftDetail.fields', a)
    },
    displayFields: function(d) {
        var a = this,
            c = a.getFieldsLayout(d),
            b;
        a.removeAll();
        b = Alf.MetaManager.decorateFields('AircraftDetail.fields', c);
        a.add(b)
    },
    getFieldsLayout: function(b) {
        var a = this;
        b = b.toLowerCase();
        switch (b) {
            case 'mel_item':
                return a.getMelItemLayout();
            case 'area':
                return a.getAreaLayout();
            case 'technical':
                return a.getTechnicalLayout();
            case 'feature':
                return a.getFeatureLayout();
            default:
                return undefined;
        }
    },
    getMelItemLayout: function() {
        return [{
            mtype: 'typeLabel',
            colspan: 1
        }, {
            mtype: 'type',
            colspan: 2
        }, {
            xtype: 'box',
            colspan: 3
        }, {
            mtype: 'acknowledgeStateLabel',
            colspan: 1
        }, {
            mtype: 'acknowledgeState',
            colspan: 1
        }, {
            xtype: 'box',
            colspan: 3
        }, {
            mtype: 'validFromLabel'
        }, {
            mtype: 'validFrom'
        }, {
            mtype: 'validFromTF'
        }, {
            mtype: 'validUntilLabel'
        }, {
            mtype: 'validUntil'
        }, {
            mtype: 'validUntilTF'
        }, {
            mtype: 'acknowledgeUserLabel'
        }, {
            mtype: 'acknowledgeUser'
        }, {
            mtype: 'acknowledgeDateLabel'
        }, {
            mtype: 'acknowledgeDate'
        }, {
            mtype: 'acknowledgeDateTF'
        }, {
            mtype: 'remarksLabel',
            colspan: 1
        }, {
            mtype: 'remarks',
            colspan: 10
        }, {
            mtype: 'expireDateLabel'
        }, {
            mtype: 'expireDate'
        }, {
            mtype: 'expireDateTF'
        }, {
            mtype: 'ataChapterLabel'
        }, {
            mtype: 'ataChapter',
            colspan: 2
        }, {
            mtype: 'ataSubChapter',
            colspan: 2
        }, {
            mtype: 'ataSection',
            colspan: 2
        }, {
            mtype: 'ataItem',
            colspan: 2
        }, {
            mtype: 'totalFlightHoursLabel',
            colspan: 1
        }, {
            mtype: 'totalFlightHours',
            colspan: 2
        }, {
            mtype: 'ataDescriptionLabel',
            colspan: 1,
            rowspan: 2
        }, {
            mtype: 'ataDescription',
            colspan: 7,
            rowspan: 2
        }, {
            mtype: 'totalCyclesLabel',
            colspan: 1
        }, {
            mtype: 'totalCycles',
            colspan: 2
        }, {
            mtype: 'descriptionLabel',
            colspan: 1
        }, {
            mtype: 'description',
            colspan: 10
        }, {
            mtype: 'limitationsLabel',
            colspan: 1
        }, {
            mtype: 'limitations',
            colspan: 10
        }, {
            mtype: 'missingRequirementsLabel',
            colspan: 1
        }, {
            mtype: 'missingRequirements',
            colspan: 10
        }]
    },
    getTechnicalLayout: function() {
        return [{
            mtype: 'typeLabel'
        }, {
            mtype: 'type',
            colspan: 10
        }, {
            mtype: 'validFromLabel'
        }, {
            mtype: 'validFrom'
        }, {
            mtype: 'validFromTF'
        }, {
            mtype: 'validUntilLabel'
        }, {
            mtype: 'validUntil'
        }, {
            mtype: 'validUntilTF'
        }, {
            xtype: 'box',
            width: 500,
            colspan: 6
        }, {
            mtype: 'remarksLabel'
        }, {
            mtype: 'remarks',
            colspan: 10
        }, {
            mtype: 'technicalReasonLabel'
        }, {
            mtype: 'technicalReason',
            colspan: 10
        }]
    },
    getAreaLayout: function() {
        return [{
            mtype: 'typeLabel'
        }, {
            mtype: 'type',
            colspan: 10
        }, {
            mtype: 'validFromLabel'
        }, {
            mtype: 'validFrom'
        }, {
            mtype: 'validFromTF'
        }, {
            mtype: 'validUntilLabel'
        }, {
            mtype: 'validUntil'
        }, {
            mtype: 'validUntilTF'
        }, {
            xtype: 'box',
            width: 500,
            colspan: 6
        }, {
            mtype: 'remarksLabel',
            colspan: 1
        }, {
            mtype: 'remarks',
            colspan: 10
        }, {
            mtype: 'missingRequirementsLabel'
        }, {
            mtype: 'missingRequirements',
            colspan: 10
        }]
    },
    getFeatureLayout: function() {
        return [{
            mtype: 'typeLabel'
        }, {
            mtype: 'type',
            colspan: 10
        }, {
            mtype: 'validFromLabel'
        }, {
            mtype: 'validFrom'
        }, {
            mtype: 'validFromTF'
        }, {
            mtype: 'validUntilLabel'
        }, {
            mtype: 'validUntil'
        }, {
            mtype: 'validUntilTF'
        }, {
            xtype: 'box',
            width: 500,
            colspan: 6
        }, {
            mtype: 'remarksLabel',
            colspan: 1
        }, {
            mtype: 'remarks',
            colspan: 10
        }, {
            mtype: 'aircraftFeatureLabel'
        }, {
            mtype: 'aircraftFeature',
            colspan: 10
        }]
    }
});
