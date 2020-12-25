'user strict'

const carouselSlide = document.querySelector(".carousel-slide");
const carouselImges = document.querySelectorAll(".carousel-img");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

let counter = 1;
const size = carouselImges[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click',()=>{
    if(counter <= 0) return;
    carouselSlide.style.transition ="transform 0.3s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click',()=>{
    if(counter >= carouselImges.length-1) return;
    carouselSlide.style.transition ="transform 0.3s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});


carouselSlide.addEventListener('transitionend',()=>{
    if(carouselImges[counter].id === 'lastClone'){
        carouselSlide.style.transition = "none";
        counter = carouselImges.length -2 ; 
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    };
    if(carouselImges[counter].id === 'firstClone'){
        carouselSlide.style.transition = "none";
        counter = carouselImges.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    };
}); 


// auto


function autoSlide(){
    if(counter<7){
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        counter++;
    }
    if(counter>=7){
        counter = carouselImges.length - 6;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
}

setInterval(autoSlide,2000);
