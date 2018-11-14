document.getElementById('postData').addEventListener('submit', postData);

 function postData(event){
            event.preventDefault();
            
            let productname = document.getElementById('productname').value;
            let price = document.getElementById('Price').value;
            let minimum = document.getElementById('Minimum').value;
            let quantity = document.getElementById('Quantity').value;
            let images = document.getElementById('avatar').value;
            let description = document.getElementById('description').value;
            quantity = parseInt(quantity, 10);
            price = parseInt(price, 10);
            minimum = parseInt(minimum, 10);
            

            token = localStorage.getItem('token')
            fetch('http://localhost:4000/api/v1/products', {
                method: 'POST',
                mode: "cors",
                headers: {'Content-Type': 'application/json',
                           'x-access-token':token,                
                                   
                          },
                body:JSON.stringify({productname,minimum,description,images,price,quantity})
               
            }).then((Response) =>{
                status = Response.status;
                return Response.json();
            })
            .then((data) => {
            switch(status){
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
            
            .catch((err)=>console.log(err));
        }
