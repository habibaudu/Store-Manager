document.getElementById('postData').addEventListener('submit',(event) => {
  event.preventDefault();
            
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let password2 = document.getElementById('password2').value;
  let Role = document.getElementById('Role').value;

  if ( password !== password2) {
    alert('passwords do not match');
    return
  }
  const token = localStorage.getItem('token')
  fetch('https://store-manager2.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    mode: 'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,                
                                   
    },
    body:JSON.stringify({email, password, username, Role})
               
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
          window.location = 'create_acc.html';
          break;
                
        default:
          alert(`${data.message}`);
          window.location = 'index.html';
          break;
                    
                     
      }
          
    })           
    .catch(err =>console.log(err));
});
