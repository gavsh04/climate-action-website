function scrollToMission(){
    document.getElementById("mission").scrollIntoView({
        behavior:"smooth"
    });
}

function animateValue(id, start, end, duration){
let current = start;
let range = end - start;
let increment = end > start ? 1 : -1;
let stepTime = Math.abs(Math.floor(duration / range));
let obj = document.getElementById(id);

let timer = setInterval(function(){
current += increment;
obj.textContent = current;

if(current == end){
clearInterval(timer);
}
}, stepTime);
}

animateValue("trees", 0, 1000, 2000);
animateValue("volunteers", 0, 500, 2000);
animateValue("projects", 0, 120, 2000);

window.addEventListener("scroll", reveal);

function reveal(){
let reveals = document.querySelectorAll(".reveal");

for(let i = 0; i < reveals.length; i++){

let windowHeight = window.innerHeight;
let elementTop = reveals[i].getBoundingClientRect().top;
let elementVisible = 100;

if(elementTop < windowHeight - elementVisible){
reveals[i].classList.add("active");
}
}
}