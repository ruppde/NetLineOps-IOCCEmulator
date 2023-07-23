Ext.define('TimesSquare.view.details.aircraft.Aircraft', {
    requires: [ 'TimesSquare.view.details.DetailPanel' ],
    extend: 'TimesSquare.view.details.DetailPanel',
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    details_detailpanel: !0,
    details_aircraft_aircraft: !0,
    xtype: 'details_aircraft_aircraft',
    title: 'Aircraft Details',
    modelName: 'Aircraft',
    statics: {
        showAlternativeRegistration: !1
    },
    constructor: function() {
        this.detailType = TimesSquare.model.IdFactory.TYPE.AIRCRAFT;
        return TimesSquare.view.details.DetailPanel.prototype.constructor.apply(this, arguments)
    },
    width: 970,
    afterModelLoadedIntoForm: function() {
        var a = this,
            e = a.down('#spacer1'),
            d = a.down('#alternativeRegistrationLabel'),
            c = a.down('#alternativeRegistrationField'),
            b = a.self.showAlternativeRegistration;
        e[b ? 'hide' : 'show']();
        d[b ? 'show' : 'hide']();
        c[b ? 'show' : 'hide']()
    },
    clearView: function() {
        var a = this,
            b = a.down('details_aircraft_allrestrictions').getSelectionModel();
        b.suspendEvent('selectionchange');
        a.getForm().reset(!0);
        b.resumeEvent('selectionchange');
        a.setLoading(!1)
    },
    createItems: function(c, a, b, d) {
        var e = this;
        e.items = [{
            xtype: 'container',
            defaults: {
                margin: d,
                readOnly: !0
            },
            layout: {
                type: 'table',
                columns: 8
            },
            items: [{
                xtype: 'label',
                text: 'Registration'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                name: 'registration',
                cls: 'test-id-aircraftdetail-registration'
            }, {
                xtype: 'box',
                itemId: 'spacer1',
                colspan: 2,
                hidden: !0
            }, {
                xtype: 'label',
                text: 'Alt. Registration',
                itemId: 'alternativeRegistrationLabel'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: a,
                name: 'alternativeRegistration',
                cls: 'test-id-aircraftdetail-alternativeRegistration',
                itemId: 'alternativeRegistrationField'
            }, {
                xtype: 'label',
                text: 'Owner'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: c,
                name: 'owner',
                cls: 'test-id-aircraftdetail-owner'
            }, {
                xtype: 'label',
                text: '/'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: b,
                name: 'ownerName',
                cls: 'test-id-aircraftdetail-ownerName'
            }, {
                xtype: 'label',
                text: 'Valid From'
            }, {
                xtype: 'datefield',
                fieldLabel: '',
                hideTrigger: !0,
                name: 'validSince',
                cls: 'test-id-aircraftdetail-validSince'
            }, {
                xtype: 'label',
                text: 'Until'
            }, {
                xtype: 'datefield',
                fieldLabel: '',
                hideTrigger: !0,
                name: 'validUntil',
                cls: 'test-id-aircraftdetail-validUntil'
            }, {
                xtype: 'label',
                text: 'Sub Type'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: c,
                name: 'subtype',
                cls: 'test-id-aircraftdetail-subtype'
            }, {
                xtype: 'label',
                text: '/'
            }, {
                xtype: 'textfield',
                fieldLabel: '',
                width: b,
                name: 'subtypeName',
                cls: 'test-id-aircraftdetail-subtypeName'
            }]
        }, {
            xtype: 'details_aircraft_tabs',
            margin: '15px 0 0 0'
        }]
    }
});
