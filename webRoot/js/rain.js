var speed = 33; // lower number for faster
var drops = 100; // number of 'drops'
var colour = "#999"; // colour of drops (generally grey!)

/***************************\
*   Rainy Afternoon Effect  *
*(c)2011-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
\***************************/

var flks = new Array();
var flkx = new Array();
var flky = new Array();
var fldy = new Array();
var swide, shigh, boddie;
var ie_version = (navigator.appVersion.indexOf("MSIE") != -1) ? parseFloat(navigator.appVersion.split("MSIE")[1]) : false;

function addLoadEvent(funky) {
    var oldonload = window.onload;
    if (typeof(oldonload) != 'function') window.onload = funky;
    else window.onload = function() {
        if (oldonload) oldonload();
        funky();
    }
}

addLoadEvent(storm);

function storm() {
    if (document.getElementById) {
        var r1, r2;
        boddie = document.createElement("div");
        boddie.style.position = "fixed";
        boddie.style.top = "0px";
        boddie.style.left = "0px";
        boddie.style.width = "1px";
        boddie.style.height = "1px";
        boddie.style.overflow = "visible";
        boddie.style.backgroundColor = "transparent";
        document.body.appendChild(boddie);
        set_width();
        for (var i = 0; i < drops; i++) {
            flks[i] = createDiv(16, 2, "transparent");
            r1 = createDiv(6, 2, colour);
            r1.style.top = "10px";
            r1.style.left = "0px";
            flks[i].appendChild(r1);
            r2 = createDiv(10, 2, colour);
            r2.style.top = "0px";
            r2.style.left = "0px";
            if (ie_version && ie_version < 10) r2.style.filter = "alpha(opacity=25)";
            else r2.style.opacity = 0.25;
            flks[i].appendChild(r2);
            flkx[i] = 2 * Math.floor(Math.random() * swide / 2);
            flky[i] = Math.floor(Math.random() * shigh);
            fldy[i] = 2 + Math.floor(Math.random() * 4);
            flks[i].style.left = flkx[i] + "px";
            flks[i].style.top = flky[i] + "px";
            boddie.appendChild(flks[i]);
        }
        setInterval("cats_and_dogs()", speed);
    }
}

function createDiv(height, width, colour) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    div.style.backgroundColor = colour;
    return (div);
}

window.onresize = set_width;

function set_width() {
    var sw_min = 999999;
    var sh_min = 999999;
    if (document.documentElement && document.documentElement.clientWidth) {
        sw_min = document.documentElement.clientWidth;
        sh_min = document.documentElement.clientHeight;
    }
    if (typeof(self.innerWidth) != "undefined" && self.innerWidth) {
        if (self.innerWidth < sw_min) sw_min = self.innerWidth;
        if (self.innerHeight < sh_min) sh_min = self.innerHeight;
    }
    if (document.body.clientWidth) {
        if (document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
        if (document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
    }
    if (sw_min == 999999 || sh_min == 999999) {
        sw_min = 800;
        sh_min = 600;
    }
    swide = sw_min - 2;
    shigh = sh_min;
}

function cats_and_dogs(c) {
        var i, x, o = 0;
        for (i = 0; i < drops; i++) {
            flky[i] += fldy[i];
            if (flky[i] >= shigh - 16) {
                flky[i] = -16;
                fldy[i] = 2 + Math.floor(Math.random() * 4);
                flkx[i] = 2 * Math.floor(Math.random() * swide / 2);
                flks[i].style.left = flkx[i] + "px";
            }
            flks[i].style.top = flky[i] + "px";
        }
    }
    // ]]>
