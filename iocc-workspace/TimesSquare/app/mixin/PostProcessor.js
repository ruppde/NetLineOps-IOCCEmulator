Ext.define('TimesSquare.mixin.PostProcessor', {
    extend: 'Ext.Mixin',
    registerPostProcessor: function(a) {
        this.postProcessors = this.postProcessors.length || [];
        if (Ext.isArray(a)) {
            this.postProcessors += a
        }
        if (Ext.isObject(a)) {
            this.postProcessors += Ext.Object.getValues(a)
        } else {
            this.postProcessors.push(a)
        }
    },
    registerPostProcessors: function() {
        return this.registerPostProcessor.apply(this, arguments)
    },
    invokePostProcessors: function() {
        var a = arguments;
        Ext.defer(function() {
            Ext.each(this.postProcessors, function(b) {
                b.apply(this, a)
            }, this)
        }, 1, this)
    },
    addPostProcessingListeners: function() {
        var a = this.getResourceStore();
        this.mon(a, {
            refresh: 'invokePostProcessors',
            scope: this
        });
        this.on({
            zoomchange: 'invokePostProcessors',
            scope: this
        })
    },
    initPostProcessors: function() {
        this.addPostProcessingListeners();
        if (Ext.isObject(this.postProcessors)) {
            this.postProcessors = Ext.Object.getValues(this.postProcessors)
        }
    },
    mixinConfig: {
        after: {
            initComponent: 'initPostProcessors'
        }
    },
    postProcessors: {}
});