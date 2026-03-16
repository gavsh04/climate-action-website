// Scrolls smoothly to the "mission" section when the Learn More button is clicked
function scrollToMission(){
    document.getElementById("mission").scrollIntoView({
        behavior:"smooth"
    });
}


// Animates numbers counting up from start value to end value
// id → HTML element id where the number will appear
// start → starting number
// end → final number
// duration → total time for the animation (milliseconds)
function animateValue(id, start, end, duration){

let current = start;                 // current number displayed
let range = end - start;             // total range of numbers
let increment = end > start ? 1 : -1; // determines if counting up or down
let stepTime = Math.abs(Math.floor(duration / range)); // time between each increment
let obj = document.getElementById(id); // target HTML element

// Repeatedly update the number until it reaches the final value
let timer = setInterval(function(){
current += increment;
obj.textContent = current;

// Stop the animation once the final value is reached
if(current == end){
clearInterval(timer);
}
}, stepTime);
}


// Start the number animations for the statistics section
animateValue("trees", 0, 1000, 2000);
animateValue("volunteers", 0, 500, 2000);
animateValue("projects", 0, 120, 2000);


// Add a scroll event listener to trigger the reveal animation
window.addEventListener("scroll", reveal);


// Reveals elements when they enter the viewport while scrolling
function reveal(){

// Select all elements with the "reveal" class
let reveals = document.querySelectorAll(".reveal");

for(let i = 0; i < reveals.length; i++){

let windowHeight = window.innerHeight; // height of the visible browser window
let elementTop = reveals[i].getBoundingClientRect().top; // distance of element from top of viewport
let elementVisible = 100; // threshold for when the element becomes visible

// If the element is within the visible area, add the "active" class
if(elementTop < windowHeight - elementVisible){
reveals[i].classList.add("active");
}
}
}