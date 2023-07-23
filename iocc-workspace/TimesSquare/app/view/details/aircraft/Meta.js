Ext.define('TimesSquare.view.details.aircraft.Meta', {
    alias: 'meta.AircraftDetail',
    singleton: !0,
    constructor: function() {
        var b = TimesSquare.CONFIG.detailViewFieldSize,
            c = b.mediumField,
            a = b.largeField,
            d = b.margin;
        this.callParent(arguments);
        this.fieldsDefaults = {
            margin: d,
            readOnly: !0
        };
        this.fields = {
            typeLabel: {
                xtype: 'label',
                text: 'Restriction Type',
                width: 130
            },
            type: {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                cls: 'test-id-aircraftdetail-restriction-type'
            },
            acknowledgeStateLabel: {
                xtype: 'label',
                text: 'ACK State',
                width: 130
            },
            acknowledgeState: {
                xtype: 'textfield',
                fieldLabel: '',
                width: c,
                cls: 'test-id-aircraftdetail-restriction-acknowledgeState'
            },
            validFromLabel: {
                xtype: 'label',
                text: 'Valid From'
            },
            validFrom: {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                timeFieldName: 'validFromTF',
                cls: 'test-id-aircraftdetail-restriction-validFrom'
            },
            validFromTF: {
                xtype: 'timefield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-validFromTF'
            },
            validUntilLabel: {
                xtype: 'label',
                text: 'Until'
            },
            validUntil: {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                timeFieldName: 'validUntilTF',
                cls: 'test-id-aircraftdetail-restriction-validUntil'
            },
            validUntilTF: {
                xtype: 'timefield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-validUntilTF'
            },
            acknowledgeUserLabel: {
                xtype: 'label',
                text: 'ACK User'
            },
            acknowledgeUser: {
                xtype: 'textfield',
                fieldLabel: '',
                width: c,
                cls: 'test-id-aircraftdetail-restriction-acknowledgeUser'
            },
            acknowledgeDateLabel: {
                xtype: 'label',
                text: 'ACK Date'
            },
            acknowledgeDate: {
                xtype: 'datefield',
                hideTrigger: !0,
                fieldLabel: '',
                timeFieldName: 'acknowledgeDateTF',
                cls: 'test-id-aircraftdetail-restriction-acknowledgeDate'
            },
            acknowledgeDateTF: {
                xtype: 'timefield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-acknowledgeDateTF'
            },
            remarksLabel: {
                xtype: 'label',
                text: 'Remarks'
            },
            remarks: {
                xtype: 'textarea',
                width: '100%',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-remarks'
            },
            expireDateLabel: {
                xtype: 'label',
                text: 'Expire Date'
            },
            expireDate: {
                xtype: 'datefield',
                fieldLabel: '',
                timeFieldName: 'expireDateTF',
                cls: 'test-id-aircraftdetail-restriction-expireDate'
            },
            expireDateTF: {
                xtype: 'timefield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-expireDateTF'
            },
            ataChapterLabel: {
                xtype: 'label',
                text: 'ATA Code'
            },
            ataChapter: {
                xtype: 'textfield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-ataChapter'
            },
            ataSubChapter: {
                xtype: 'textfield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-ataSubChapter'
            },
            ataSection: {
                xtype: 'textfield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-ataSection'
            },
            ataItem: {
                xtype: 'textfield',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-ataItem'
            },
            totalFlightHoursLabel: {
                xtype: 'label',
                text: 'Total Flight Hours',
                width: 130
            },
            totalFlightHours: {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                cls: 'test-id-aircraftdetail-restriction-totalFlightHours'
            },
            ataDescriptionLabel: {
                xtype: 'label',
                text: 'ATA Description',
                width: 130
            },
            ataDescription: {
                xtype: 'textarea',
                width: '100%',
                fieldLabel: '',
                cls: 'test-id-aircraftdetail-restriction-ataDescription'
            },
            totalCyclesLabel: {
                xtype: 'label',
                text: 'Total Cycles'
            },
            totalCycles: {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                cls: 'test-id-aircraftdetail-restriction-totalCycles'
            },
            descriptionLabel: {
                xtype: 'label',
                text: 'Description'
            },
            description: {
                xtype: 'textarea',
                fieldLabel: '',
                width: '100%',
                cls: 'test-id-aircraftdetail-restriction-description'
            },
            limitationsLabel: {
                xtype: 'label',
                text: 'Limitations'
            },
            limitations: {
                xtype: 'textarea',
                fieldLabel: '',
                width: '100%',
                cls: 'test-id-aircraftdetail-restriction-limitations'
            },
            missingRequirementsLabel: {
                xtype: 'label',
                text: 'Missing Requirements',
                width: 130
            },
            missingRequirements: {
                xtype: 'textfield',
                fieldLabel: '',
                width: '100%',
                cls: 'test-id-aircraftdetail-restriction-missingRequirements'
            },
            aircraftFeatureLabel: {
                xtype: 'label',
                text: 'Aircraft Feature',
                width: 130
            },
            aircraftFeature: {
                xtype: 'textfield',
                fieldLabel: '',
                width: '100%',
                cls: 'test-id-aircraftdetail-restriction-aircraftFeature'
            },
            technicalReasonLabel: {
                xtype: 'label',
                text: 'Technical Description'
            },
            technicalReason: {
                xtype: 'textfield',
                fieldLabel: '',
                width: '100%',
                cls: 'test-id-aircraftdetail-restriction-technicalReason'
            }
        }
    }
});