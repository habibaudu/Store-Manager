
document.getElementById('postData').addEventListener('submit', () => {
  const productname = document.getElementById('productname').value;
  let price = document.getElementById('Price').value;
  let minimum = document.getElementById('Minimum').value;
  let quantity = document.getElementById('Quantity').value;
  const images = document.getElementById('avatar').value;
  const description = document.getElementById('description').value;
  quantity = parseInt(quantity, 10);
  price = parseInt(price, 10);
  minimum = parseInt(minimum, 10);


  const token = localStorage.getItem('token')
  fetch('http://localhost:4000/api/v1/products', {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,

    },
    body:JSON.stringify({ productname, minimum, description, images, price, quantity })

  }).then((Response) =>{
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch (status) {
        case '201':
          alert(`${data.message}`);
          window.location = 'admin.html';
          break;

        case '400':
          alert(`${data.message}`);
          break;

        default:
          alert(`${data.message}`);
          window.location = 'index.html';
          break;
      }
    })

    .catch(err => console.log(err));
});


document.getElementById('updateData').addEventListener('submit', () => {
    
  let id = document.getElementById('Id1').value;
  const productname = document.getElementById('Productname').value;
  let price = document.getElementById('price').value;
  let minimum = document.getElementById('minimum').value;
  let quantity = document.getElementById('quantity').value;
  const images = document.getElementById('Avatar').value;
  const description = document.getElementById('Description').value;
  id = parseInt(id,10);
  quantity = parseInt(quantity, 10);
  price = parseInt(price, 10);
  minimum = parseInt(minimum, 10);

  const token = localStorage.getItem('token')
  fetch(`http://localhost:4000/api/v1/products/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,
    },
    body:JSON.stringify({ productname, minimum, description, images, price, quantity })
  }).then((Response) => {
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch (status) {
        case '200':
          alert(`${data.message}`);
          window.location = 'admin.html';
          break;

        case '404':
          alert(`${data.message}`);
          break;

        default:
          alert(`${data.message}`);
          window.location = 'index.html';
          break;
      }
    })

    .catch(err=> console.log(err));
});

window.addEventListener('load',() => {
  const token = localStorage.getItem('token');
  fetch('http://localhost:4000/api/v1/products', {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,
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
          const  data2 = data.rows;
          let products =` <tr>
                            <th>ProductID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Minimum Allowed</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Modified At</th>
                          </tr>`;
          data2.forEach((product) => {
            const { id, minimum, productname, price, quantity, description, modified_date, created_date } = product;
            products +=
                                    `<tr>
                                    <td>${id}</td>
                                    <td>${productname}</td>
                                    <td>${quantity}</td>
                                    <td>#${price}</td>
                                    <td>${minimum}</td>
                                    <td>${description}</td>
                                    <td>${created_date}</td>
                                    <td>${modified_date}</td>
                                  </tr>`;
            document.getElementById('allproducts').innerHTML = products;
          })

          break;
        case '401':
          alert(`${data.message}`);
          window.location = 'login.html'
          break;

        default:
          alert('Error occured while loading products ,please tri again later');
          window.location = 'index.html';
          break;
      }
    })
    .catch(err => console.log(err));
});
