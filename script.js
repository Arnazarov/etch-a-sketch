const grid = document.querySelector(".grid");
const sizeInput = document.querySelector(".input-grid");
const clear = document.querySelector(".btn-clear");
const resize = document.querySelector(".btn-resize");
const random = document.querySelector(".btn-random");
const eraser = document.querySelector(".btn-eraser");
let size = 50;
let colorChoice = 'default';


// functions to create grid and color
function getGridSize() {
    size = sizeInput.value;
    if (size > 200)
        size = 200;
    else if (size === "" || size === "false")
        size = 50;
    else if (size < 1)
        size = 1;

    clearGrid();
    createGrid(size);
}

function createGrid(size) {

    colorChoice = "default";
    let numPixels = size * size;
    let pixelLength = (getComputedStyle(grid).minWidth.replace('px', '') / size) + 'px';

    while (numPixels) {
        const pixel = document.createElement('div');
        pixel.style.width = pixelLength;
        pixel.style.height = pixelLength;
        pixel.style.backgroundColor = 'transparent';
        pixel.classList.add('pixel');
        grid.appendChild(pixel);
        pixel.addEventListener('mouseover', changeColor);
        numPixels--;
    }
}

function toggleButton(e) {
    colorChoice = e.target.id;
}

function changeColor(e) {
    if (colorChoice === "default")
        e.target.style.backgroundColor = "black";
    else if (colorChoice === "eraser")
        e.target.style.backgroundColor = "transparent";
    else if (colorChoice === "random")
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, ${Math.random() * (100 - 85) + 85}%, ${Math.random() * (65 - 35) + 35}%)`;
    else 
        e.target.style.backgroundColor = "black";
}

function clearDraw() {
    document.querySelectorAll(".pixel").forEach(pixel => pixel.style.backgroundColor = "transparent");
}

function clearGrid() {
    document.querySelectorAll(".pixel").forEach(pixel => grid.removeChild(pixel));
}

// event listeners for RESIZE, RANDOM, ERASER and CLEAR buttons
resize.addEventListener("click", getGridSize);
clear.addEventListener("click", clearDraw);
document.querySelectorAll(".btn").forEach(button => button.addEventListener("click", toggleButton));

// default grid size of 50*50
createGrid(size);


