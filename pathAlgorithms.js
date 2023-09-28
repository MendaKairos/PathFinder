
var path_Alg_selct = 0;

function setAlgorithm(alg) {
    if (!start_Botton.classList.contains("stateTwo")) {

        switch (alg) {
            case 0:
                path_Alg_selct = 0;
                algSelectedText.innerText = "Selected: Dijkstra's";
                break;
            case 1:
                path_Alg_selct = 1;
                algSelectedText.innerText = "Selected: A* Search";
                break;
            case 2:
                path_Alg_selct = 2;
                algSelectedText.innerText = "Selected: Greedy Best-Frist Search";
                break;
            case 3:
                path_Alg_selct = 3;
                algSelectedText.innerText = "Selected: Breadth-Frist Search";
                break;
            case 4:
                path_Alg_selct = 4;
                algSelectedText.innerText = "Selected: Depth-Frist Search";
                break;

            default:
            // code block
        }

        if (animationDone) {
            pathAlg(graph);
        }
    }
}

function pathAlg(graph) {
    var path = [];
    switch (path_Alg_selct) {
        case 0:
            path = Dijkstra(graph);
            break;
        case 1:
            path = astar(graph);
            break;
        case 2:
            path = greedyBestFirstSearch(graph);
            break;
        case 3:
            path = breadthFirstSearch(graph);
            break;
        case 4:
            path = depthFirstSearch(graph);
            break;
        default:
        // code block


    }
    pathlengthText.innerText = "Path Length: " + path[1].length;
    return path;
}

function clearSearch(graph) {
    for (var i = 0; i < graph.length; i++) {
        graph[i].element.classList.remove("path");
        graph[i].element.classList.remove("visited");
    }
}

function clearALL(graph) {
    if (!start_Botton.classList.contains("stateTwo")) {
        for (var i = 0; i < graph.length; i++) {
            graph[i].element.classList.remove("obsticle");
            graph[i].element.classList.remove("path");
            graph[i].element.classList.remove("visited");
        }
    }
}

function Dijkstra(graph) {
    var source = 0;
    var destination = 0;
    var Q = PriorityQue.create();
    let search = [];
    let final_path = [];
    for (var i = 0; i < graph.length; i++) {
        graph[i].dist = Infinity;
        graph[i].visited = false;
        if (graph[i].element.classList.contains("obsticle")) {
            graph[i].visited = true;
        }
        graph[i].element.classList.remove("path");
        graph[i].element.classList.remove("visited");
        if (graph[i].element.classList.contains("start")) {
            source = graph[i];
        }
        if (graph[i].element.classList.contains("end")) {
            destination = graph[i];
        }
    }
    source.dist = 0;
    Q.enqueue(source, 0);

    while (!Q.isEmpty()) {
        var u = Q.dequeue().element;

        if (u.visited) {
            continue;
        } else {
            u.visited = true;
            if (animationDone) {
                u.element.classList.add("visited");
            }
            search.push(u);
        }

        if (u == destination) {
            final_path = buildPath(source, destination);
            break;
        }



        for (var i = 0; i < u.neighbors.length; i++) {
            var alt = u.dist + 1;
            if (alt < u.neighbors[i].dist && !u.neighbors[i].visited) {
                u.neighbors[i].dist = alt;
            }
            Q.enqueue(u.neighbors[i], u.neighbors[i].dist);
        }
    }
    return [search, final_path];

}

function buildPath(source, destination) {
    let lowest = destination.dist;
    let current_node = destination;
    let final_path = [];
    do {
        if (animationDone) {
            current_node.element.classList.add("path");
        } else {
            // final_path.splice(0, 0, current_node);
        }


        lowest = current_node.dist;
        final_path.push(current_node);
        let next = 0;
        //console.log(current_node);
        current_node.neighbors.forEach((n) => {
            if (lowest >= n.dist && n.visited) {
                lowest = n.dist;
                next = n;
            }
        });
        current_node = next;

    } while (current_node != source);
    console.log("Current Path Length: " + final_path.length);
    return final_path;
}

function reconstructPath(source, destination) {//for astar
    let final_path = [];
    let current_node = destination;
    while (current_node != source) {
        if (animationDone) {
            current_node.element.classList.add("path");
        }
        final_path.push(current_node);
        current_node = current_node.parent;
    }
    return final_path;

}


function astar(graph) {
    var source = 0;
    var destination = 0;
    var Open = PriorityQue.create();
    let search = [];
    let final_path = [];
    for (var i = 0; i < graph.length; i++) {
        graph[i].dist = Infinity;
        graph[i].visited = false;
        graph[i].inopen = false;
        graph[i].parent = 0;
        graph[i].f = Infinity;
        if (graph[i].element.classList.contains("obsticle")) {
            graph[i].visited = true;
        }
        graph[i].element.classList.remove("path");
        graph[i].element.classList.remove("visited");
        if (graph[i].element.classList.contains("start")) {
            source = graph[i];
        }
        if (graph[i].element.classList.contains("end")) {
            destination = graph[i];
        }

    }
    source.dist = 0;
    Open.enqueue(source, 0);
    source.inopen = true;

    var closed_list = [];

    while (!Open.isEmpty()) {
        var current = Open.dequeue().element;
        current.inopen = false;
        closed_list.push(current);

        // if (u.visited) {
        //     continue;
        // } else {
        current.visited = true;
        if (animationDone) {
            current.element.classList.add("visited");
        }

        //current.element.classList.add("visited");

        search.push(current);


        if (current == destination) {

            console.log("found destination");
            final_path = reconstructPath(source, destination);
            break;
        }
        current.neighbors.forEach((n) => {
            var tentative_gScore = current.dist + d(n);
            if (tentative_gScore < n.dist) {
                h = heuristic(n, destination);
                n.dist = tentative_gScore;
                n.parent = current;
                n.f = tentative_gScore + h;
                // n.element.innerText = "" + n.f;
                if (!n.inopen) {
                    Open.enqueue(n, n.f);
                }
            }
        });



    }

    return [search, final_path];
}

function d(neighbor) {
    if (neighbor.element.classList.contains("obsticle")) {
        return Infinity;
    } else {
        return 1;
    }

}

function showDistence(ele) {
    var destination = 0;
    var show = ele.checked;
    graph.forEach((n) => {
        if (n.element.classList.contains("end")) {
            destination = n;
        }
    });
    graph.forEach((n) => {
        if (show) {
            n.element.innerText = "" + heuristic(n, destination, true);
        } else {
            n.element.innerText = "";
        }
    });
}

function heuristic(start, end, a) {
    var dx = start.position[0] - end.position[0] - Math.floor(start.position[1] / 2) + Math.floor(end.position[1] / 2);
    var dy = start.position[1] - end.position[1];
    //var toreturn=0;
    if (!a && start.element.classList.contains("obsticle")) {
        return Infinity;
    }
    else if (Math.sign(dx) == Math.sign(dy))
        return Math.abs(dx + dy);
    else
        return Math.max(Math.abs(dx), Math.abs(dy));
}

function greedyBestFirstSearch(graph) {
    var source = 0;
    var destination = 0;
    var Q = PriorityQue.create();
    let search = [];
    let final_path = [];
    for (var i = 0; i < graph.length; i++) {
        graph[i].dist = Infinity;
        graph[i].h = Infinity;
        graph[i].visited = false;
        if (graph[i].element.classList.contains("obsticle")) {
            graph[i].visited = true;
        }
        graph[i].element.classList.remove("path");
        graph[i].element.classList.remove("visited");
        if (graph[i].element.classList.contains("start")) {
            source = graph[i];
        }
        if (graph[i].element.classList.contains("end")) {
            destination = graph[i];
        }
    }
    source.h = heuristic(source, destination);
    source.dist = 0;
    Q.enqueue(source, 0);
    while (!Q.isEmpty()) {
        var current = Q.dequeue().element;

        // if (u.visited) {
        //     continue;
        // } else {
        if (animationDone) {
            current.element.classList.add("visited");
        }


        search.push(current);
        current.visited = true;


        if (current == destination) {

            console.log("found destination");
            final_path = buildPath(source, destination);
            break;
        }
        current.neighbors.forEach((n) => {
            var tentative_gScore = heuristic(n, destination);
            var alt = current.dist + d(n);
            if (alt < n.dist) {
                n.dist = alt;
            }
            if (tentative_gScore < n.h) {
                n.h = tentative_gScore;
                //n.element.innerText = "" + n.h;
                if (!n.visited) {
                    Q.enqueue(n, n.h);
                }
            }
        });
    }


    return [search, final_path];
}


function breadthFirstSearch(graph) {
    var source = 0;
    var destination = 0;
    var Q = PriorityQue.create();
    let search = [];
    let final_path = [];
    for (var i = 0; i < graph.length; i++) {
        graph[i].dist = Infinity;
        graph[i].h = Infinity;
        graph[i].visited = false;
        if (graph[i].element.classList.contains("obsticle")) {
            graph[i].visited = true;
        }
        graph[i].element.classList.remove("path");
        graph[i].element.classList.remove("visited");
        if (graph[i].element.classList.contains("start")) {
            source = graph[i];
        }
        if (graph[i].element.classList.contains("end")) {
            destination = graph[i];
        }
    }
    source.h = heuristic(source, destination);
    source.dist = 0;
    Q.enqueue(source, 0);
    while (!Q.isEmpty()) {
        var current = Q.dequeue().element;
        if (current.visited) {
            continue;
        };
        if (animationDone) {
            current.element.classList.add("visited");
        }

        search.push(current);
        current.visited = true;


        if (current == destination) {

            console.log("found destination");
            final_path = buildPath(source, destination);
            break;
        }
        current.neighbors.forEach((n) => {
            var alt = current.dist + d(n);
            if (alt < n.dist) {
                n.dist = alt;
            }
            if (n.visited == false) {
                Q.enqueue(n, 0);
            }

        });
    }


    return [search, final_path];
}
function depthFirstSearch(graph) {
    var source = 0;
    var destination = 0;
    var stack = [];
    let search = [];
    let final_path = [];
    for (var i = 0; i < graph.length; i++) {
        graph[i].dist = Infinity;
        graph[i].h = Infinity;
        graph[i].visited = false;
        if (graph[i].element.classList.contains("obsticle")) {
            graph[i].visited = true;
        }
        graph[i].element.classList.remove("path");
        graph[i].element.classList.remove("visited");
        if (graph[i].element.classList.contains("start")) {
            source = graph[i];
        }
        if (graph[i].element.classList.contains("end")) {
            destination = graph[i];
        }
    }
    source.h = heuristic(source, destination);
    source.dist = 0;
    stack.push(source);
    while (stack.length != 0) {
        var current = stack.pop();
        if (current.visited) {
            continue;
        };
        if (animationDone) {
            current.element.classList.add("visited");
        }

        search.push(current);
        current.visited = true;


        if (current == destination) {

            console.log("found destination");
            final_path = buildPath(source, destination);
            break;
        }
        current.neighbors.forEach((n) => {
            var alt = current.dist + d(n);
            if (alt < n.dist) {
                n.dist = alt;
            }
            if (n.visited == false) {
                stack.push(n);
            }

        });
    }


    return [search, final_path];
}
