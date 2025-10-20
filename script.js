function imageZoom(imgID, resultID) {
    var img = document.getElementById(imgID);
    var result = document.getElementById(resultID);

    var lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement.insertBefore(lens, img);

    var cx = result.offsetWidth / lens.offsetWidth;
    var cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(e) {
        e.preventDefault();
        var pos = getCursorPos(e);
        var x = pos.x - lens.offsetWidth / 2;
        var y = pos.y - lens.offsetHeight / 2;

        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        lens.style.left = x + "px";
        lens.style.top = y + "px";

        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        var a = img.getBoundingClientRect();
        var x = e.pageX - a.left - window.pageXOffset;
        var y = e.pageY - a.top - window.pageYOffset;
        return { x: x, y: y };
    }
}

imageZoom("myimage", "myresult");