Ext.define('TimesSquare.overrides.LockingView', {
    override: 'Ext.grid.locking.View',
    destroy: function() {
        var a = this,
            b;
        arguments.callee.$previous.apply(this, arguments);
        if (a.normalView && a.normalView.store) {
            a.unbindStoreListeners(a.normalView.store)
        }
        b = a.normalView ? a.getSelectionModel() : a.selModel;
        if (b && b.store) {
            b.unbindStoreListeners(b.store)
        }
        if (a.loadMask) {
            a.loadMask.destroy()
        }
    }
});
