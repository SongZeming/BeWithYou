let handlers = {};

let event = {
    add (tag, event, handler, logFlag = false) {
        if (handlers[tag]) {
            cc.log("event", "error: this tag has added " + tag);
            return;
        }
        handlers[tag] = {
            event: event,
            handler: handler,
        };
        if (logFlag) {
            cc.log("event", "add new event " + tag + event);
        }
    },

    getSum () {
        let count = 0;
        for(const key in handlers) {
            count++;
        }
        return count;
    },

    remove (tag, logFlag = false) {
        delete handlers[tag];
        if (logFlag) {
            cc.log("event", "remove event success " + tag);
        }
    },

    dispatch (event, data, logFlag = false) {
        for (const k in handlers) {
            if (handlers[k].event === event) {
                if (logFlag) {
                    cc.log("event", "dispatch event " + k + event, data);
                }
                handlers[k].handler(data);
            }
        }
    },

    clearUp () {
        handlers = {};
    },
};

module.exports = event;