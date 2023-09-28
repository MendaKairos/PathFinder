
var load = (event) => {
    var k = 26;
    //create the visual compenent
    //create nodes to hold the hexgon div
    //to manipulate later
    var screen = document.getElementById("screen");

    algSelectedText = document.getElementById("selectedALGtext");
    pathlengthText = document.getElementById("pathlength");

    screen.innerHTML = '';
    graph = [];
    let box = document.querySelector('.navigation');
    let width = box.offsetWidth;
    let height = window.innerHeight - box.offsetHeight;
    console.log(width);
    console.log((width / 26) | 0);
    var lastRight = 0;
    var grid = [];
    for (var i = 0; i < (height / 29) | 0; i++) {
        var drawRow = true;
        var row = [];
        while (drawRow) {
            var screen = document.getElementById("screen");
            var hexagon = document.createElement("div");
            hexagon.classList.add("hexagon");
            screen.appendChild(hexagon);
            var rect = hexagon.getBoundingClientRect();
            if (rect.right < lastRight) {
                screen.removeChild(hexagon);
                lastRight = 0;
                drawRow = false;
            } else {
                lastRight = rect.right;
                hexagon.addEventListener("click", toggleCell);
                hexagon.addEventListener("dragstart", startdraw);
                // hexagon.addEventListener("touchstart", startdraw);
                //hexagon.addEventListener("dragend", draw);
                hexagon.addEventListener("dragover", draw);
                hexagon.addEventListener("touchmove", (e) => {

                    //console.log(e.clientX, e.clientY);
                    //e.srcElement.classList.add("obsticle")
                    var secondElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
                    console.log(offtouch);
                    if (!offtouch) {
                        if (drawtouch) {
                            secondElement.classList.add("obsticle")
                        } else {
                            secondElement.classList.remove("obsticle")
                        }
                    }
                    if (animationDone) {
                        pathAlg(graph);
                    }

                });

                var h = Hexagon.create(hexagon);
                row.push(h);
                graph.push(h);
            }
        }
        grid.push(row);
    }
    //uses the node objects in varible grid to cuntruct a graph
    // ie conects the hexagon with its neighbors
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            var evenrow = i % 2 == 0 ? 0 : 1;
            grid[i][j].position = [j, i];
            //grid[i][j].element.style.backgroundColor = "green";
            if (j - 1 + evenrow >= 0) {
                if (i + 1 < grid.length) {
                    grid[i + 1][j - 1 + evenrow].add_neighbor(grid[i][j]);
                    grid[i][j].add_neighbor(grid[i + 1][j - 1 + evenrow]);
                }
            }
            if (j + 1 < (grid[i]).length) {
                grid[i][j + 1].add_neighbor(grid[i][j]);
                grid[i][j].add_neighbor(grid[i][j + 1]);
            }
            if (i + 1 < grid.length && j + evenrow < (grid[i + 1]).length) {

                // grid[i + 1][j + evenrow].element.style.backgroundColor = "red";
                grid[i + 1][j + evenrow].add_neighbor(grid[i][j]);
                grid[i][j].add_neighbor(grid[i + 1][j + evenrow]);

            }
        }
    }


    grid[0][0].element.classList.add("start");
    grid[grid.length - 1][grid[grid.length - 1].length - 1].element.classList.add("end");
    source = grid[0][0];
    start_Botton = document.getElementById("startbutton");
    toggleSelected = document.getElementById("toggleSelected");
    loading = document.getElementById("loading");
    loading.classList.remove("loading");
    loading.classList.add("loadingDone");
    //Dijkstra(graph);
};
var graph = [];
var start_Botton = 0;
var algSelectedText;
animationDone = false;

window.onload = load;
//indow.onresize = location.reload;


function Start_Botton(ele) {
    if (ele.classList.contains("stateOne")) {
        ele.classList.remove("stateOne");
        ele.classList.add("stateTwo");
        console.log("hi");
        ele.innerText = "Running";
        StartAnimation(ele);
    } else if (ele.classList.contains("stateTwo")) {

        animationDone = true;

    } else if (ele.classList.contains("stateThree")) {
        ele.classList.remove("stateThree");
        ele.classList.add("stateOne");
        ele.innerText = " Start ";
        animationDone = false;
        clearSearch(graph);
    }
}

function changeToggle(ele, toog) {
    defualtToggle = toog;
    console.log(ele);

    toggleSelected.classList.remove("start");
    toggleSelected.classList.remove("end");
    toggleSelected.classList.remove("obsticle");
    toggleSelected.classList.add(defualtToggle);

}
var offtouch = true;
var drawtouch = false;



var defualtToggle = "obsticle";
var toggleSelected = 0;
function toggleCell() {
    console.log(defualtToggle);

    if (defualtToggle != "obsticle") {
        graph.forEach((index) => {
            //if (index.classList.contains(defualtToggle)) {
            index.element.classList.remove(defualtToggle);

            //}
        });
    }

    if (!start_Botton.classList.contains("stateTwo")) {
        if (this.classList.contains(defualtToggle)) {
            this.classList.remove(defualtToggle);

        } else {
            this.classList.add(defualtToggle);

        }
        if (animationDone) {
            pathAlg(graph);
        }
    }
}
var drawstatus = -1;
var lastele = null;
function startdraw() {
    if (!start_Botton.classList.contains("stateTwo")) {


        if (this.classList.contains("start")) {
            this.classList.remove("start");
            lastele = this;
            drawstatus = 2;
        }
        else if (this.classList.contains("end")) {
            this.classList.remove("end");
            lastele = this;
            drawstatus = 3;
        }
        else if (this.classList.contains("obsticle")) {
            this.classList.remove("obsticle");
            drawstatus = 0;
        } else {
            this.classList.add("obsticle");
            drawstatus = 1;
        }
    }
}
function draw() {
    if (!start_Botton.classList.contains("stateTwo")) {
        if (drawstatus == 2) {
            lastele.classList.remove("start");
            this.classList.add("start");
            lastele = this;

        }
        else if (drawstatus == 3) {
            lastele.classList.remove("end");
            this.classList.add("end");
            lastele = this;
        }
        else if (drawstatus == 0) {
            this.classList.remove("obsticle");
        }
        else if (drawstatus == 1) {
            this.classList.add("obsticle");
        }

        if (animationDone) {
            pathAlg(graph);
        }
    }
}
//not finished
