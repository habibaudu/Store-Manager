document.getElementById('title').addEventListener('click',getProducts);

 function getProducts(){
            
            token = localStorage.getItem('token')
            fetch('http://localhost:4000/api/v1/products', {
                method: 'GET',
                mode:'cors',
                headers: {'Content-Type': 'application/json',
                           'x-access-token':token,
                           'pragma':'no-cache', 
                           'cache-control': 'no-cache'               
                                   
                          }
               
            }).then((Response) =>{
                status = Response.status;
                return Response.json();
            })
            .then((data) => {
                switch(status){
                    case '200':
                           data2 = data.rows
                           
                        //    for(let i = 0; i <data2.length; i++) {
                        //     // const { images} = data[i];
                        //     console.log(data2[i]);

                        // }
                            let products =` `;
                            data2.forEach((product) => {
                                const {images,productname,price,quantity} = product
                                products +=
                                    `<section>
                                    <img src='${images}'>
                                    <span class='note2'>${productname}</span><br>
                                    <span class='note'>#${price}</span><br>
                                    <span class='note2'>${quantity} in stock</span><br>
                                    <a href='addcart.html' class='btn2'>details</a>
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
            .catch((err)=>console.log(err));
        }
