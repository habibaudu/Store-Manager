

function navSlide() {
    var burger = document.querySelector('.burger');
    var nav = document.querySelector('.nav-links');
    var navLinks = document.querySelectorAll('.nav-links li');
   //  console.log(navLinks)
    //Toggle Nav
    burger.addEventListener('click',function(){
        //Toggle Nav
        nav.classList.toggle('nav-active');
   
         //Animate links
         navLinks.forEach(function(link,index){
           if(link.style.animation){
               link.style.animation = ''
           }else{
              link.style.animation = `navLinkFade 0.5s ease forwards ${index /7 + 0.7}s`;
           }
        
      
      
       });
       //burger animation
       burger.classList.toggle('toggle');
    });
   
   }
   
   navSlide();




   function modalFour(){
    // Get the modal
 var modal4 = document.getElementById('myModal4');
 
 
 // Get the button that opens the modal
 var button4 = document.getElementById("butt2");
 
 
 // Get the <span> element that closes the modal
 var clox4 = document.getElementsByClassName("close4")[0];
 
 
 // When the user clicks on the button, open the modal 
 button4.onclick = function() {
     modal4.style.display = "block";
 }
 
 
 // When the user clicks on <span> (x), close the modal
 clox4.onclick = function() {
     modal4.style.display = "none";
 }
 
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal4) {
         modal4.style.display = "none";
     }
 }
 
 }
 
 modalFour();


   function modalThree(){
    // Get the modal
 var modal3 = document.getElementById('myModal3');
 
 
 // Get the button that opens the modal
 var button3 = document.getElementById("del");
 
 
 // Get the <span> element that closes the modal
 var clox3 = document.getElementsByClassName("close3")[0];
 
 
 // When the user clicks on the button, open the modal 
 button3.onclick = function() {
     modal3.style.display = "block";
 }
 
 
 // When the user clicks on <span> (x), close the modal
 clox3.onclick = function() {
     modal3.style.display = "none";
 }
 
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal3) {
         modal3.style.display = "none";
     }
 }
 
 }
 
 modalThree();


   function modalTwo(){
    // Get the modal
 var modal2 = document.getElementById('myModal2');
 
 
 // Get the button that opens the modal
 var button2 = document.getElementById("modi");
 
 
 // Get the <span> element that closes the modal
 var clox2 = document.getElementsByClassName("close2")[0];
 
 
 // When the user clicks on the button, open the modal 
 button2.onclick = function() {
     modal2.style.display = "block";
 }
 
 
 // When the user clicks on <span> (x), close the modal
 clox2.onclick = function() {
     modal2.style.display = "none";
 }
 
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal2) {
         modal2.style.display = "none";
     }
 }
 
 }
 
 modalTwo();



function modalOne(){
   // Get the modal
var modal = document.getElementById('myModal');


// Get the button that opens the modal
var button = document.getElementById("butt");


// Get the <span> element that closes the modal
var clox = document.getElementsByClassName("close")[0];


// When the user clicks on the button, open the modal 
button.onclick = function() {
    modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
clox.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

}

modalOne();


function modalTwo(){
    // Get the modal
 var modal2 = document.getElementById('myModal2');
 
 
 // Get the button that opens the modal
 var button2 = document.getElementById("modi");
 
 
 // Get the <span> element that closes the modal
 var clox2 = document.getElementsByClassName("close2")[0];
 
 
 // When the user clicks on the button, open the modal 
 button2.onclick = function() {
     modal2.style.display = "block";
 }
 
 
 // When the user clicks on <span> (x), close the modal
 clox2.onclick = function() {
     modal2.style.display = "none";
 }
 
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal2) {
         modal2.style.display = "none";
     }
 }
 
 }
 
 modalTwo();