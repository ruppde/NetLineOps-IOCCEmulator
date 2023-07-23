Ext.define('TimesSquare.view.gantt.TimeModeButton', {
    extend: 'Ext.button.Button',
    component: !0,
    box: !0,
    button: !0,
    timemodebutton: !0,
    xtype: 'timemodebutton',
    config: {
        timemode: 'utc',
        airport: undefined,
        codeLength: 3,
        labelTpl: 'Time mode: {0}'
    },
    listeners: {
        menuhide: 'fireChangeMode',
        menushow: 'focusAirportField'
    },
    modes: {
        UTC: 'utc',
        LOCAL: 'local'
    },
    initComponent: function() {
        this.menu = this.buildMenu();
        Ext.button.Button.prototype.initComponent.call(this);
        this.lastFired = {
            airport: undefined,
            mode: undefined
        };
        this.airport_textfield = this.down('textfield[name=timemode_airport_code]');
        this.setLabelTpl(new Ext.Template(this.getLabelTpl()));
        this.setInitialValues();
        this.updateLabel()
    },
    buildMenu: function() {
        var a = this;
        return {
            plain: !0,
            items: [{
                xtype: 'radio',
                name: 'timeMode',
                inputValue: a.modes.UTC,
                boxLabel: 'UTC',
                listeners: {
                    change: {
                        fn: a.onTimeModeRadioChange,
                        scope: a
                    }
                }
            }, {
                xtype: 'container',
                layout: 'hbox',
                focusable: !0,
                getFocusEl: function() {
                    return this.down('radio')
                },
                items: [{
                    xtype: 'radio',
                    name: 'timeMode',
                    boxLabel: 'Local at Airport',
                    inputValue: a.modes.LOCAL,
                    margin: '0 10 0 0',
                    listeners: {
                        change: {
                            fn: a.onTimeModeRadioChange,
                            scope: a
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'timemode_airport_code',
                    disabled: !0,
                    upperCase: !0,
                    minLength: a.getCodeLength(),
                    maxLength: a.getCodeLength(),
                    listeners: {
                        specialkey: {
                            fn: a.onAirportCodeTextfieldSpecialKey,
                            scope: a
                        },
                        change: {
                            fn: a.onAirportCodeTextfieldChange,
                            scope: a
                        }
                    }
                }]
            }]
        }
    },
    fireChangeMode: function() {
        var b = this.getAirport(),
            a = this.getTimemode(),
            d = this.modes.LOCAL,
            c = this.modes.UTC;
        if (a === d && (!b || !this.airport_textfield.isValid() || this.lastFired.airport === b) || this.lastFired.mode === c && a === c) {
            return
        }
        if (a) {
            this.fireEvent('timemodechange', a, b);
            this.updateLabel();
            this.cacheFiredValues(a, b)
        }
    },
    updateLabel: function() {
        var a = [this.getTimemode() === this.modes.UTC ? 'UTC' : this.getAirport()];
        this.setText(this.getLabelTpl().apply(a))
    },
    focusAirportField: function functionName() {
        if (!this.airport_textfield.isDisabled()) {
            this.airport_textfield.focus(!0)
        }
    },
    setInitialValues: function() {
        this.airport_textfield.setValue(this.getAirport());
        if (this.getTimemode()) {
            this.down('radio[inputValue=' + this.getTimemode() + ']').setValue(!0)
        }
    },
    cacheFiredValues: function(a, b) {
        this.lastFired.mode = a;
        this.lastFired.airport = a === this.modes.UTC ? undefined : b
    },
    onTimeModeRadioChange: function(b, a) {
        if (b.inputValue === this.modes.LOCAL) {
            this.airport_textfield.setDisabled(!a);
            this.focusAirportField()
        }
        if (a) {
            this.setTimemode(b.inputValue)
        }
    },
    onAirportCodeTextfieldChange: function(a, b) {
        this.setAirport(a.isValid() ? b : undefined)
    },
    onAirportCodeTextfieldSpecialKey: function(b, a) {
        if (a.getKey() === a.ENTER && b.isValid()) {
            this.hideMenu()
        }
    }
});