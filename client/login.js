
document.getElementById('postData').addEventListener('submit', postData);

 function postData(event){
            event.preventDefault();
            
           
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            // alert(`${email}`);
            fetch('http://localhost:4000/api/v1/auth/login', {
                method: 'POST',
                mode: "cors",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({email:email,password:password})
               
            }).then((Response) =>{
                status = Response.status;
                return Response.json();
            })
            .then((data) => {
            switch(status){
                case '200': 
                    localStorage.setItem("token",data.token);
                   
                    alert(`${data.message}`);
                   const Role = String(data.userRole)

                    if(Role == 'ADMIN'){
                    return window.location = 'admin.html';  
                    } 
                    window.location = 'products.html';
                    break;
                
                case '400':    
                    alert(`${data.message}`);
                    window.location = 'index.html';
                    break;
                
                default:
                
                 alert(`${status}`); 
                    alert(`${data.message}`);
                    window.location = 'index.html';
                    break;
                    
                     
             }
          
            })
            
            .catch((err)=>console.log(err));
        }
