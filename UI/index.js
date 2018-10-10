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