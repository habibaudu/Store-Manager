window.addEventListener("load", () => {          
  const token = localStorage.getItem('token')
  fetch('https://store-manager2.herokuapp.com/api/v1/users', {
    method: 'GET',
    mode:'cors',
    headers: {'Content-Type': 'application/json',
      'x-access-token':token,
      pragma:'no-cache', 
      'cache-control': 'no-cache'               
                           
    }
       
  }).then((Response) =>{
    status = Response.status;
    return Response.json();
  })
    .then((data) => {
      switch (status) {
        case '200':
                  
          const data2 = data.rows
          let users =` <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Date Created</th>
                    <th>Date Modified</th>
             
                  </tr>`;
          data2.forEach((user) => {
            const { id, username, role, email, modified_date, created_date } = user;
            users +=
                            `<tr>
                            <td>${id}</td>
                            <td>${username}</td>
                            <td>${email}</td>
                            <td>${role}</td>
                           
                            <td>${created_date}</td>
                            <td>${modified_date}</td>
                          </tr>`;
            document.getElementById('allusers').innerHTML = users;
          })
                    
          break;
        case '401': 
                            
          alert(`${data.message}`);
          window.location = 'login.html'
          break;
                    
        default:
                
          alert(`${data.message}`);
          window.location = 'index.html';
          break;
                        

      }
    })  
    .catch(err =>console.log(err));
});
