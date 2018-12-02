
document.getElementById('cart').addEventListener('submit',() => {
  let cart = sessionStorage.getItem('CART');
  let cartobj = ctoObject(cart);
  let salesOrders = cartobj.salesOrders;


  const token = localStorage.getItem('token');
  fetch('https://store-manager2.herokuapp.com/api/v1/sales', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,

    },
    body:JSON.stringify({salesOrders})

  }).then((Response) => {
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch (status) {
        case '201':
          alert(`${data.message}`);
          window.location = 'products.html';
          break;

        case '400':
          alert(`${data.message}`);
          break;

        case '404':
          alert(`${data.message}`);
          break;

        default:
          alert(`${data.message}`);
          window.location = 'products.html';
          break;
      }
    })
    .catch(err => console.log(err));
});


window.addEventListener('load',() => {
  let cart = sessionStorage.getItem('CART');
  let cartobj = ctoObject(cart);
  let order = cartobj.salesOrders;

  const token = localStorage.getItem('token');
  fetch('https://store-manager2.herokuapp.com/api/v1/products', {
    method: 'GET',
    mode:'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,
      pragma:'no-cache',
      'cache-control': 'no-cache'
    }

  }).then((Response) => {
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch (status) {
        case '200':
          const img = data.imgArr;
          let count =0;
          data2 = data.rows;
          let grandtotal = 0;
          let cartproducts =` `;
          data2.forEach((product) => {
            const { id, images, productname, price, quantity } = product;
            
            for (let i = 0; i< order.length; i++ ) {
              let total = 0;
                
              if ( id === order[i].product_id) {
                
                total = price * order[i].quantity;
                grandtotal += total;
                cartproducts +=
                            `
                            <div class='show'>${img[id]}</div>
                            <div class='discrip'>
                            <span class='note2'>${productname}</span><br>
                            <span class='note2'>Price :#${price}</span><br>
                            <span class='note2'>Quantity :${order[i].quantity}</span><br>
                            <span class='note'>Total :#${total}</span><br>
                            <br><br><br><br>
                        
                            </div>
                            `;
                document.getElementById('cartproduct').innerHTML = cartproducts;
              }
            }
            document.getElementById('price').innerHTML = grandtotal;
          });

          break;
        case '401':

          alert(`${data.message}`);
          window.location = 'products.html';
          break;

        default:

          alert(`Error occured while loading carts, please try again later`);
          window.location = 'products.html';
          break;
      }
    })
    .catch(err => console.log(err));
}
);

document.getElementById('empty').addEventListener('click', () => {
  sessionStorage.removeItem('CART');
});


const ctoString = (obj) => {
  let str = JSON.stringify(obj);
  return str;
};

const ctoObject = (str) => {
  let obj = JSON.parse(str);
  return obj;
};

const createcart = () => {
  if(sessionStorage.getItem('CART')=== null){
    var cart ={};
    cart.salesOrders =[];
    sessionStorage.setItem('CART',ctoString(cart));
    return;
  }
  return;
};

const addTocart = (values) => {
 
  createcart();

  const token = localStorage.getItem('token');
  fetch('https://store-manager2.herokuapp.com/api/v1/products', {
    method: 'GET',
    mode: 'cors',
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
      switch (status) {
        case '200':
          let data2 = data.rows;

          for(let product of data2) {
            const { id, images, productname, price, quantity} = product;

            if ( parseInt(id,10) === parseInt(values.product_id,10)) {
              if ( parseInt(quantity,10) >= parseInt(values.quantity)) {
                let cart = sessionStorage.getItem('CART');
                let cartobj = ctoObject(cart);

                var salesOrders = cartobj.salesOrders;
                salesOrders.push(values);

                sessionStorage.setItem('CART',ctoString(cartobj));
                alert(`${values.quantity}  ${productname} ,Was Sucessfully Added to Cart`);
                break;
              }
            }
          }

          break;
        case '401':

          alert(`${data.message}`);
          window.location = 'products.html';
          break;

        default:

          alert(`Error occured while adding  product to cart, please try again later`);
          window.location = 'products.html';
          break;
      }
    })
    .catch(err => console.log(err));
};

document.getElementById('addCartdata').addEventListener('submit',(event) => {
  event.preventDefault();

  let id = document.getElementById('Id').value;
  let quantity = document.getElementById('Quantity').value;

  quantity = parseInt(quantity, 10);
  id = parseInt(id, 10);

  addTocart( {product_id :id,quantity:quantity});
});


const modalFour = () => {
  const modal4 = document.getElementById('myModal4');

  const button4 = document.getElementById('butt2');

  const clox4 = document.getElementsByClassName('close4')[0];

  button4.onclick = () => {
    modal4.style.display = 'block';
  };


  clox4.onclick = () => {
    modal4.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target == modal4) {
      modal4.style.display = 'none';
    }
  };
};
modalFour();
