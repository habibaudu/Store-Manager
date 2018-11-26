document.getElementById('deleteData').addEventListener('submit', () => {
  
  let id = document.getElementById('Id').value;
  id = parseInt(id,10);

  let deleteProducts =`http://localhost:4000/api/v1/products/${id}`;
  let deleteUser =`http://localhost:4000/api/v1/users/${id}`;
  
  let url ='';
  let checkValue = document.getElementById('deleteUser')
  
  if (checkValue === null) {
    url = deleteProducts;
  } else {
        
    url = deleteUser;
  }


  const token = localStorage.getItem('token')
  fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,

    }

  }).then((Response) => {
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch ( status ) {
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

    .catch(err => console.log(err));
});