document.getElementById('giverights').addEventListener('submit', () => {

  let id = document.getElementById('Id').value;
  const Role = document.getElementById('Role').value;
  id = parseInt(id,10);
  const token = localStorage.getItem('token')
  fetch(`http://localhost:4000/api/v1/users/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,

    },
    body:JSON.stringify({Role})

  }).then((Response) =>{
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch (status) {
        case '200':
          alert(`Role changed to  ${Role}`);
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
