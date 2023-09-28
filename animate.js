

var search = [];
var path = [];
var calling_button = 0;

function StartAnimation(ele) {
    var temp = pathAlg(graph)
    search = temp[0];
    path = temp[1];
    calling_button = ele;

    searchframeindex = 0;
    pathframeindex = 0;
    searchframe();
}
var searchframeindex = 0;
function searchframe() {
    if (!animationDone && searchframeindex < search.length) {
        search[searchframeindex++].element.classList.add("visited");

        requestAnimationFrame(searchframe);
    } else {
        requestAnimationFrame(pathframe);
    }
}
var pathframeindex = 0;
function pathframe() {
    if (!animationDone && pathframeindex < path.length) {
        path[path.length - 1 - (pathframeindex++)].element.classList.add("path");

        requestAnimationFrame(pathframe);
    } else {
        animationDone = true;
        calling_button.classList.remove("stateTwo");
        calling_button.classList.add("stateThree");
        calling_button.classList.add("stateThree");
        calling_button.innerText = "Reset";
        pathAlg(graph);

    }
}

