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
