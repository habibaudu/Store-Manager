
const navSlide = () => {
  let burger = document.querySelector('.burger');
  let nav = document.querySelector('.nav-links');
  let navLinks = document.querySelectorAll('.nav-links li');

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

const modalOne = () => {

  const modal = document.getElementById('myModal');


  const  button = document.getElementById('butt');


  const clox = document.getElementsByClassName('close')[0];


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
};

modalOne();


const modalTwo = () =>{

  const modal2 = document.getElementById('myModal2');


const button2 = document.getElementById('modify');

  const clox2 = document.getElementsByClassName('close2')[0];

  button2.onclick = () => {
    modal2.style.display = 'block';
  }

  clox2.onclick = () => {
    modal2.style.display = 'none';
  }

  window.onclick = (event) => {
    if (event.target == modal2) {
      modal2.style.display = 'none';
    }
  };
};

modalTwo();

const modalThree = () => {

  const modal3 = document.getElementById('myModal3');


  const button3 = document.getElementById('del');

  const clox3 = document.getElementsByClassName('close3')[0];

  button3.onclick = () => {
    modal3.style.display = 'block';
  }


  clox3.onclick = () => {
    modal3.style.display = 'none';
  }


  window.onclick = (event) => {
    if (event.target == modal3) {
      modal3.style.display = 'none';
    }
  };
};
modalThree();

