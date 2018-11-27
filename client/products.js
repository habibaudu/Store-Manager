
document.getElementById('search').addEventListener('submit', (event) => {
  event.preventDefault();
  let productName = document.getElementById('filter2').value;

  const token = localStorage.getItem('token')

  fetch(`http://localhost:4000/api/v1/product/${productName}`, {
    method: 'GET',
    mode:'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token': token,
      pragma:'no-cache',
      'cache-control': 'no-cache'
    }

  }).then((Response) => {
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      if(status === '200') { 
        const { id, images, productname, price, quantity, minimum, description, created_date } = data; 
          let products =
                            `<section>
                            <img src='${images}'>
                           
                            </section>
                            <section>
                            <span class ='note'> Details</span>
                             <hr>
                             <span class='note2'>productId : ${id}</span><br>
                            <span class='note2'>product Name : ${productname}</span><br>
                            <span class='note'>Price : #${price}</span><br>
                            <span class='note2'>Quantity : ${quantity} in stock</span><br>
                            <span class='note2'>Minimum  : ${minimum} Allowed in stock</span><br>
                            <span class='note2'>Date Added : ${created_date} </span><br>
                            <hr><br>
                            <span class='note'>Description : ${description} </span><br>
                            
                            <section>
                            `;

          document.getElementById('aproduct').innerHTML = products;
  
        } else if(status === '404'){ 
            alert(`${productName} not Found `);
        } else if(status === '400'){ 
            alert(`unable to get  ${productName}  check your connection and try again `);
        }


    })
    .catch(err => console.log(err));
});


window.addEventListener('load',() => {

  const token = localStorage.getItem('token')
  fetch('http://localhost:4000/api/v1/products', {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token': token,
      pragma: 'no-cache',
      'cache-control': 'no-cache'

    }

  }).then((Response) => {
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch (status) {
        case '200':
          const data2 = data.rows;

          let products =` `;
          data2.forEach((product) => {
            const { id, images, productname, price, quantity} = product
            products +=
                                    `<section>
                                    <img src='${images}'>
                                    <span class='note2'>${id}</span><br>
                                    <span class='note2'>${productname}</span><br>
                                    <span class='note'>#${price}</span><br>
                                    <span class='note2'>${quantity} in stock</span><br>
                                    <a href='addcart.html' class='btn2'>Add to Cart</a>
                                    </section>`;
            document.getElementById('allproduct').innerHTML = products
          })

          break;
        case '401':

          alert(`${data.message}`);
          window.location = 'login.html'
          break;

        default:

          alert(`Error occured while loading products ,please tri again later`);
          window.location = 'index.html';
          break;


      }
    })
    .catch(err =>console.log(err));
});
