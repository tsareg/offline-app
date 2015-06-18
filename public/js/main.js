function loadImage() {
    var img = document.createElement("img");
    img.src = "images/offline.png";

    document.body.appendChild(img);
}

document.querySelector("button").addEventListener("click", loadImage);