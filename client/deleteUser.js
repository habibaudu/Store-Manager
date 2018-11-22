document.getElementById('deleteUser').addEventListener('submit',(event) => {
  event.preventDefault();
  let id = document.getElementById('Id').value;
  id = parseInt(id,10);
    
  const token = localStorage.getItem('token')
  fetch(`http://localhost:4000/api/v1/users/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,                
                           
    }
       
  }).then((Response) =>{
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
    
    .catch(err =>console.log(err));
});

