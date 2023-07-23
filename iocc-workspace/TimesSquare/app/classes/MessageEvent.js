Ext.define('TimesSquare.classes.MessageEvent', {
    statics: {
        TYPE: {
            UPDATE: 'UPDATE',
            DELETE: 'DELETE',
            MESSAGE: 'MESSAGE',
            NEW_AIRCRAFT: 'INSERT_AIRCRAFT'
        }
    },
    updatedObjects: null,
    deletedObjects: null,
    messages: null,
    newAircrafts: null,
    constructor: function(b) {
        var a = this,
            c = b && b.data;
        a.updatedObjects = [];
        a.deletedObjects = [];
        a.messages = [];
        a.newAircrafts = [];
        if (c) {
            a.consumeMessages(c)
        }
    },
    destroy: function() {
        this.updatedObjects = null;
        this.deletedObjects = null;
        this.messages = null;
        this.newAircrafts = null;
        return this.callParent(arguments)
    },
    consumeMessages: function(a) {
        var c = this,
            b;
        if (!a) {
            return
        }
        if (Ext.isObject(a)) {
            c.consumeMessage(a)
        } else {
            if (Ext.isArray(a)) {
                for (b = 0; b < a.length; b++) {
                    c.consumeMessage(a[b])
                }
            }
        }
    },
    consumeMessage: function(a) {
        var b = this,
            d, c;
        if (a.notificationType === b.self.TYPE.UPDATE) {
            d = b.addRawObject(b.updatedObjects, a);
            if (a.legType === TimesSquare.model.IdFactory.TYPE.LEG || a.legType === TimesSquare.model.IdFactory.TYPE.CHECK) {
                if (!Ext.isEmpty(a.oldRegistration, !0)) {
                    a.legDetail.schedule.rotationIdentifier.registration = a.oldRegistration
                }
                if (a.oldIdentifier) {
                    a.identifier = a.oldIdentifier
                }
                if (a.oldEventType === 'ACTUAL' && a.eventType === 'SCHEDULED') {
                    a.eventType = a.oldEventType;
                    a.layoutActual = a.layoutSchedule;
                    a.legDetail.actuals = {
                        offblockTime: {
                            value: undefined
                        },
                        onblockTime: {
                            value: undefined
                        }
                    };
                    c = b.addRawObject(b.deletedObjects, a)
                } else {
                    if (!Ext.isEmpty(a.oldRegistration, !0) || a.oldIdentifier) {
                        c = b.addRawObject(b.deletedObjects, a)
                    }
                }
                if (c && d) {
                    d.original = c
                }
            }
        } else {
            if (a.notificationType === b.self.TYPE.DELETE) {
                b.addRawObject(b.deletedObjects, a)
            } else {
                if (a.notificationType === b.self.TYPE.MESSAGE) {
                    b.addMessage(a)
                } else {
                    if (a.notificationType === b.self.type.NEW_AIRCRAFT) {
                        b.newAircrafts.push(a)
                    }
                }
            }
        }
    },
    getStateContainer: function(d, e) {
        var a = this,
            c, b;
        if (e === TimesSquare.model.IdFactory.TYPE.LEG) {
            b = 'TimesSquare.model.gantt.Leg'
        } else {
            if (e === TimesSquare.model.IdFactory.TYPE.CHECK) {
                b = 'TimesSquare.model.gantt.Check'
            }
        }
        c = a.getStateContainerFromArray(a.deletedObjects, d, b, a.self.TYPE.DELETE);
        if (c) {
            if (a.updatedObjects.length) {
                return a.getStateContainerFromArray(a.updatedObjects, null, b, a.self.TYPE.UPDATE)
            }
            return c
        }
        return a.getStateContainerFromArray(a.updatedObjects, d, b, a.self.TYPE.UPDATE)
    },
    getStateContainerFromArray: function(b, c, d, e) {
        var a;
        for (a = 0; a < b.length; a += 1) {
            if (b[a].$className === d) {
                if (!c || b[a].getNaturalId() === c) {
                    return {
                        state: e,
                        o: b[a]
                    }
                }
            }
        }
    },
    getUpdatedObjects: function() {
        return this.updatedObjects
    },
    getDeletedObjects: function() {
        return this.deletedObjects
    },
    getMessages: function() {
        return this.messages
    },
    getNewAircrafts: function() {
        return this.newAircrafts
    },
    hasChanges: function() {
        return this.updatedObjects.length > 0 || this.deletedObjects.length > 0 || this.newAircrafts.length > 0
    },
    hasMessages: function() {
        return this.messages.length > 0
    },
    addRawObject: function(c, a) {
        var b;
        if (!Ext.isArray(a)) {
            a = [a]
        }
        b = TimesSquare.store.gantt.Events.transformEvents(a);
        Ext.Array.push(c, b);
        return b[0]
    },
    addMessage: function(a) {
        this.messages.push(a)
    },
    clearChanges: function() {
        this.updatedObjects = [];
        this.deletedObjects = []
    }
});