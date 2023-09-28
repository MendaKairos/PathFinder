var Hexagon = {
    element: 0,
    neighbors: 0,
    create: function (element) {
        var obj = Object.create(this);
        obj.element = element;
        obj.neighbors = [];
        obj.parent = 0;
        obj.inopen = false;
        return obj;
    },
    add_neighbor(neighbor) {
        this.neighbors.push(neighbor);
    },
    test() {
        for (var i = 0; i < this.neighbors.length; i++) {
            this.neighbors[i].element.style.backgroundColor = "green";
        }
    }
}