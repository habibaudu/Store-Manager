
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click',() => {

    nav.classList.toggle('nav-active');

    navLinks.forEach((link,index) => {
      if (link.style.animation) {
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index /7 + 0.7}s`;
      }



    });
 
    burger.classList.toggle('toggle');
  });

}

navSlide();

const modal = () => {

  for(let i = 0; i < 3; i++) { 
  let modal = document.getElementsByClassName('modal')[i];
  let  button = document.getElementsByClassName('addproduct')[i];


  let clox = document.getElementsByClassName('close')[i];


  button.onclick = () => {
    modal.style.display = 'block';
  }


  clox.onclick = () => {
    modal.style.display = 'none';
  }


  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
  }
  
};

modal();


