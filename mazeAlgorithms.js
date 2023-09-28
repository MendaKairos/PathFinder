function basicRandomMaze(graph) {
    if (!start_Botton.classList.contains("stateTwo")) {
        for (var i = 0; i < graph.length; i++) {
            graph[i].element.classList.remove("obsticle");
        }
        for (var i = 0; i < graph.length; i++) {
            if (graph[i].element.classList.contains("start")) {

            } else if (graph[i].element.classList.contains("end")) {

            } else {
                if (Math.random() < 0.33) {
                    graph[i].element.classList.add("obsticle");
                }
            }
        }
        if (start_Botton.classList.contains("stateThree")) {
            pathAlg(graph);
        }
    }
}

function SparseDepthFirstSearchMaze(graph) {
    if (!start_Botton.classList.contains("stateTwo")) {
        for (var i = 0; i < graph.length; i++) {
            graph[i].element.classList.remove("obsticle");
            graph[i].found = false;
        }
        var stack = [];


        stack.push(graph[(Math.random() * graph.length) | 0]);
        while (stack.length != 0) {
            var current = stack.pop();
            search.push(current);
            //current.found = true;



            var t = (Math.random() * current.neighbors.length) | 0;
            var k = t;
            var f = true;
            while (current.neighbors[t].found == true) {
                t = (t + 1) % current.neighbors.length;
                if (k == t) {
                    f = false;
                    break;
                }
            }
            var count = 0;
            current.neighbors.forEach((n) => {
                if (n.element.classList.contains("obsticle")) {
                    count++;
                }
            });

            current.found = true;

            if (f) {

                //if (count <= 1) {
                stack.push(current);
                // }

                stack.push(current.neighbors[t]);


            }
            if (current.element.classList.contains("start")) {

            } else if (current.element.classList.contains("end")) {

            }
            else if (count <= 1) {
                current.element.classList.add("obsticle");
            }
        }
        if (start_Botton.classList.contains("stateThree")) {
            pathAlg(graph);
        }
    }
}

function randomDepthFirstSearchMaze(graph) {
    if (!start_Botton.classList.contains("stateTwo")) {
        for (var i = 0; i < graph.length; i++) {
            graph[i].element.classList.add("obsticle");
            graph[i].found = false;
        }
        var stack = [];


        stack.push(graph[(Math.random() * graph.length) | 0]);
        while (stack.length != 0) {
            var current = stack.pop();
            if (current.found) {
                // continue;
            };
            search.push(current);
            //current.found = true;



            var t = (Math.random() * current.neighbors.length) | 0;
            var k = t;
            var f = true;
            while (current.neighbors[t].found == true) {
                t = (t + 1) % current.neighbors.length;
                if (k == t) {
                    f = false;
                    break;
                }
            }
            var count = 0;
            current.neighbors.forEach((n) => {
                if (!n.element.classList.contains("obsticle")) {
                    count++;
                }
            });

            current.found = true;

            if (!current.element.classList.contains("obsticle")) {

            } else
                if (count > 1) {
                    continue;
                }
            if (f) {

                if (count <= 1) {
                    stack.push(current);
                }

                stack.push(current.neighbors[t]);


            }
            if (count <= 1) {
                current.element.classList.remove("obsticle");
            }
        }
        graph.forEach((current) => {
            if (current.element.classList.contains("start")) {
                current.element.classList.remove("obsticle");

            } else if (current.element.classList.contains("end")) {
                current.element.classList.remove("obsticle");

            }
        });

        if (start_Botton.classList.contains("stateThree")) {
            pathAlg(graph);
        }
    }
}