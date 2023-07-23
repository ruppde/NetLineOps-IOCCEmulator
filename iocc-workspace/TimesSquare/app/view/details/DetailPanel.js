Ext.define('TimesSquare.view.details.DetailPanel', {
    extend: 'Ext.form.Panel',
    mixins: {
        fieldSizeMixin: 'TimesSquare.mixin.FieldSizeMixin'
    },
    component: !0,
    box: !0,
    //container: !0,
    panel: !0,
    form: !0,
    details_detailpanel: !0,
    alias: 'widget.details_detailpanel',
    xtype: 'details_detailpanel',
    title: 'Detail Panel',
    autoScroll: !0,
    border: !1,
    closable: !0,
    bodyPadding: 10,
    minWidth: 865,
    cls: 'detail-panel',
    initComponent: function() {
        var a = this;
        a.mxCreateItems();
        Ext.form.Panel.prototype.initComponent.apply(this, arguments)
    },
    detailType: null,
    modelName: null,
    afterModelLoadedIntoForm: null,
    updateView: function(b, c) {
        var a = this;
        if (!a.modelName) {
            return
        }
        if (Ext.isObject(c)) {
            a.loadRecord(c);
            b.setLoading(!1);
            a.setLoading(!1);
            a.down('tabpanel').setActiveTab(1)
        } else {
            TimesSquare.model.details[a.modelName].getProxy().url = c;
            TimesSquare.model.details[a.modelName].load(undefined, {
                failure: function() {
                    b.setLoading(!1);
                    a.setLoading(!1)
                },
                success: function(d) {
                    a.loadRecord(d);
                    if (a.afterModelLoadedIntoForm) {
                        a.afterModelLoadedIntoForm(a, d)
                    }
                    b.setLoading(!1);
                    a.setLoading(!1);
                    a.down('tabpanel').setActiveTab(a.is('details_aircraft_aircraft') ? 0 : 1)
                }
            })
        }
    },
    clearView: function() {
        var a = this;
        if (a.down('details_aircraft_allrestrictions')) {
            a.down('details_aircraft_allrestrictions').getSelectionModel().suspendEvent('selectionchange')
        }
        a.getForm().reset(!0);
        if (a.down('details_aircraft_allrestrictions')) {
            a.down('details_aircraft_allrestrictions').getSelectionModel().resumeEvent('selectionchange')
        }
        if (a.resetToDefaultState) {
            a.resetToDefaultState()
        }
        a.setLoading(!1)
    }
});
