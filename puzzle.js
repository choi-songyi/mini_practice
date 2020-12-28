const container = document.querySelector(".img-container");
const startBtn = document.querySelector(".start-btn");
const gameText = document.querySelector(".game-text");
const playTime = document.querySelector(".play-time");

const tileCount = 16;

let tiles = [];
const dragged ={
    el:null,
    class:null,
    index:null,
}

let isPlaying = false;
let timeInterval;
let time = 0;


// function
function setGame(){
    isPlaying = true;
    time = 0;
    container.innerHTML = "";
    gameText.style.display = 'none';
    clearInterval(timeInterval);
    playTime.innerText = time;

    tiles = createImageTiles();
    tiles.forEach(tile => container.appendChild(tile))
    setTimeout(()=>{
        container.innerHTML = "";
        shuffle(tiles).forEach(tile => container.appendChild(tile))
        timeInterval= setInterval(()=>{
            playTime.innerText = time;
            time++;
        },1000)
    },2000)
}

function createImageTiles(){
    const tempArray = [];
    Array(tileCount).fill().forEach((_, i)=>{
        const li = document.createElement("li");
        li.setAttribute('data-index',i);
        li.setAttribute('draggable','true');
        li.classList.add(`list${i}`);
        tempArray.push(li);
    });
    return tempArray;
}

function shuffle(array){
    let index = array.length-1;
    while(index > 0){
        const randomIndex = Math.floor(Math.random()*(index+1));
        [array[index], array[randomIndex]] = [array[randomIndex],array[index]];
        index--;
    }
    return array;
}

function checkStatus(){
    const currentList = [...container.children];
    const unMatchedList = currentList.filter((child,index)=>{
       return Number(child.getAttribute("data-index")) !== index;
    })
    console.log(unMatchedList)
    if(unMatchedList.length === 0){
        gameText.style.display = 'block';
        isPlaying = false;
        clearInterval(timeInterval);
    }
}


// event
container.addEventListener('dragstart',e=>{
    if(!isPlaying) return;
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj);
    
})
container.addEventListener('dragover',e=>{
    e.preventDefault()
})
container.addEventListener('drop',e=>{
    if(!isPlaying) return;
    const obj = e.target;
    if(obj.className !== dragged.class){
        let originPlace;
        let isLast = false;
    
        if(dragged.el.nextSibling){
            originPlace = dragged.el.nextSibling;
        } else{
            originPlace = dragged.el.previousSibling;
            isLast = true;
        }
        const droppendIndex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppendIndex ? obj.before(dragged.el) : obj.after(dragged.el);
        isLast ? originPlace.after(obj) : originPlace.before(obj);
    }
    checkStatus();
    
})

startBtn.addEventListener('click',()=>{
    setGame();
})