const header = document.querySelector('h1');
const container = document.querySelector('#container');
let colorMode = 0;//0 is black and white only; 1 is rgb; 2 is rgb gradient
let gridSize = 16;

//Generates random color
function getRandomColor(){
    let red = Math.floor(Math.random() * 256);//Use 256 cuz 1 is not inclusive in Math.random()
    let green = Math.floor(Math.random() * 256);
    let blue= Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`
}

function makeNewGrid(){
    container.setAttribute('style',`grid-template-columns: repeat(${gridSize}, auto)`)
    //Checks to see if the value the user input is valid
    if ((isNaN(gridSize) != false) || (gridSize== null)){
        alert('Please input a valid number next time. Click New Sketch to try again.');
    }else{
        //Adds styles and attributes to new an x amount of new divs specified by gridSize
        for (i = 0; i < Number(gridSize**2); i++){
            const newDiv = document.createElement('div')
            newDiv.className = 'grid';
            newDiv.id = i;
            newDiv.style.backgroundColor = '#75776e';
            newDiv.style.borderStyle = 'none'
            newDiv.style.display = 'inline-block';
            //data-insertNameHere attribute allows you to add custom data
            newDiv.setAttribute('data-counter',9);
            container.appendChild(newDiv);  
        }
    }
    //Adds a event listener to every div that was generated
    const grid = document.querySelectorAll('.grid');
    for(i = 0; i < grid.length; i++){
        grid[i].addEventListener('mouseover',changeBackgroundColor)
    }
    function changeBackgroundColor(e){
        //colorMode 0 will turn the mouseover div black
        //colorMode 1 will turn the mouseover div some random color
        //colorMode 2 will turn the mouseover div some random color
        //In colorMode 2 each time you go over the same div again it will turn a darker shade up to 10 times when it will turn black
        if (colorMode == 0){
            e.target.style.backgroundColor = 'black';
        }else if(colorMode ==1){
            e.target.style.backgroundColor = getRandomColor();
        }else if(colorMode ==2){
            //Checks to see if it already has an assigned color
            if (!e.target.classList.contains('hasColor')){
                e.target.style.backgroundColor = getRandomColor();
                e.target.classList.add('hasColor');//An element can have more than one class
            }else{
                //If it has already been assigned a color make it darker
                let counter = e.target.getAttribute('data-counter');
                e.target.style.filter = `brightness(${counter * 10}%)`;
                if (counter > 0) {
                    counter -= 1;
                }
                e.target.setAttribute('data-counter', counter);
            }
        }
    }
}

//Generic grid remaker
function newGrid(){
    const grid = document.querySelectorAll('.grid');
    //Removes existing grid
    for(i = 0; i < grid.length; i++){
        grid[i].remove()
    }
    //Asks for the new grid size
    gridSize = prompt('Create a grid of size:', '16');
    makeNewGrid()
}

//New B/W Sketch button
const newSketch = document.querySelector('#New-Sketch');
newSketch.addEventListener('click',newBWGrid);

function newBWGrid(){
    colorMode = 0;
    newGrid();
}

//Clear Sketch button
const clearSketch = document.querySelector('#clear-sketch');
clearSketch.addEventListener('click',wipeGrid);

function wipeGrid(){
    const grid = document.querySelectorAll('.grid');
    for(i = 0; i < grid.length; i++){
        grid[i].style.backgroundColor = '#75776e';
        grid[i].style.filter = 'brightness(100%)';
        grid[i].setAttribute('data-counter', 9);
        grid[i].classList.remove('hasColor')
    }
}

//New RGB Sketch button
const rgbSketch = document.querySelector('#RGB-Sketch');
rgbSketch.addEventListener('click',newRGBGrid);

function newRGBGrid(){
    colorMode = 1;
    newGrid();
}

//New RGB Gradient Sketch button
const rgbGradientSketch = document.querySelector('#RGB-Gradient-Sketch');
rgbGradientSketch.addEventListener('click',newRGBGradientSketch);

function newRGBGradientSketch(){
    colorMode = 2;
    newGrid();
}
makeNewGrid()