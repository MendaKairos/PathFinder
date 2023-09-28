var QElement = {
    create: function (element, priority) {
        var obj = Object.create(this);
        obj.element = element;
        obj.priority = priority;
        return obj;
    }
};

var PriorityQue = {
    create: function () {
        var obj = Object.create(this);
        obj.items = [];
        return obj;
    },
    removeMember: function (element) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].element == element) {
                this.items.splice(i, 1);
                break;
            }
        }
    }
    ,
    contains: function (element) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].element == element) {
                return true;
            }
        }
        return false;
    },
    enqueue: function (element, priority) {
        // creating object from queue element
        var qElement = QElement.create(element, priority);
        var contain = false;

        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }

        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
    },
    dequeue: function () {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    },
    front: function () {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    },
    rear: function () {
        // returns the lowest priority
        // element of the queue
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[this.items.length - 1];
    },
    isEmpty: function () {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

};