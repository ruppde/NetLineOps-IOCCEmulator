Ext.define('TimesSquare.controller.Main', {
    extend: 'Ext.app.Controller',
    views: ['MainToolbar'],
    refs: [{
        ref: 'viewport',
        selector: 'viewport'
    }, {
        ref: 'loginWin',
        selector: 'WuisLogin'
    }, {
        ref: 'msgCmp',
        selector: 'systemmessage'
    }],
    init: function() {
        var a = this;
        a.control({
            'maintoolbar button[action=searchleg]': {
                click: a.onClickTbarSearchLeg
            }
        })
    },
    onClickTbarSearchLeg: function() {
        this.getController('details.Main').open(TimesSquare.controller.details.Main.view.SEARCHLEG)
    },
    switchToInitPerspective: function() {
        var a = this,
            c = a.getViewport(),
            b = a.getLoginWin();
        if (b) {
            b.close()
        }
        c.removeAll();
        c.add([new TimesSquare.view.Selection(), new TimesSquare.view.MainToolbar(), new TimesSquare.view.SystemMessage()]);
        a.getController('Clock').start();
        a.getController('SearchLeg').loadOperators(function() {
            a.setMessageOfTheDay(TimesSquare.CONFIG.messageOfTheDay)
        });
        a.getController('Messaging').start()
    },
    setMessageOfTheDay: function(a) {
        var b = this.getMsgCmp();
        if (a && b) {
            b.setText(a)
        }
    }
});