Ext.define("Wuis.controller.EventLogger", {
    extend: 'Ext.app.Controller',
    init: function () {
        var ctrl = this;
        ctrl.control({
            "panel": {
                render: "onPanelRender",
                close: "onPanelClose",
                collapse: "onPanelCollapse",
                expand: "onPanelExpand"
            },
            "button": {
                click: "onButtonClick"
            }
        });
        Ext.app.Controller.prototype.init.call(this);
    },
    log: function (actual) {
        Ext.log.info(actual);
    },
    buttonProperties: ["$className", "text", "tooltip", "iconCls", "itemId", "functionId"],
    panelProperties: ["$className", "title"],
    formatText: function (text, obj, start) {
        var cells = start.length;
        var collector = [];
        var i;
        var j;
        j = 0;
        for (; j < cells; j++) {
            i = start[j];
            if (obj[i]) {
                if (i === "$className") {
                    collector.push(obj[i]);
                } else {
                    collector.push(i + ": " + obj[i]);
                }
            }
        }
        return text + collector.join("; ");
    },
    onPanelRender: function (data) {
        var className = data.$className;
        var b = data.title || "";
        if ((!b || b === "&#160;") && className.match(/^Ext/)) {
            return;
        }
        this.log(this.formatText("Render panel ", data, this.panelProperties));
    },
    onPanelClose: function (key) {
        this.log(this.formatText("Close panel ", key, this.panelProperties));
    },
    onPanelCollapse: function (key) {
        this.log(this.formatText("Collapse panel ", key, this.panelProperties));
    },
    onPanelExpand: function (key) {
        this.log(this.formatText("Expand panel ", key, this.panelProperties));
    },
    onButtonClick: function (row) {
        var Index = row.up("panel[title]");
        var value;
        value = this.formatText("Button click: ", row, this.buttonProperties);
        if (Index) {
            value = value + this.formatText("; Parent panel ", Index, this.panelProperties);
        }
        this.log(value);
    }
});
