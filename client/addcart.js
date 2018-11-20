document.getElementById('addCartdata').addEventListener('submit', addCartdata);
document.getElementById('empty').addEventListener('click', clearCart);
document.getElementById('cart').addEventListener('submit',createRecord);
window.addEventListener('load',viewcart);

function createRecord(event){
                
               
                var cart = sessionStorage.getItem('CART');
                var cartobj = ctoObject(cart);
                var salesOrders = cartobj.salesOrders;
              

                token = localStorage.getItem('token')
                fetch('http://localhost:4000/api/v1/sales', {
                    method: 'POST',
                    mode: "cors",
                    headers: {'Content-Type': 'application/json',
                            'x-access-token':token,                
                                    
                            },
                    body:JSON.stringify({salesOrders})
                
                }).then((Response) =>{
                    status = Response.status;
                    return Response.json();
                })
                .then((data) => {
                switch(status){
                    case '201':
                        console.log('am here now'); 
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
                
                .catch((err)=>console.log(err));
}

function viewcart(event){
    event.preventDefault();
    
    var cart = sessionStorage.getItem('CART');
    var cartobj = ctoObject(cart);
    var order = cartobj.salesOrders;

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
                   var grandtotal = 0
                    let cartproducts =` `;
                    data2.forEach((product) => {
                        const {id,images,productname,price,quantity} = product
                        
                        for(let i =0; i< order.length; i++ ){
                            var total = 0;

                                if ( id === order[i].product_id) {
                               total = price * order[i].quantity;
                               grandtotal += total; 
                            cartproducts +=
                            `
                            <div class='show'><img src='${images}'></div>
                            <div class='discrip'>
                            <span class='note2'>${productname}</span><br>
                            <span class='note2'>Price :#${price}</span><br>
                            <span class='note2'>Quantity :${order[i].quantity}</span><br>
                            <span class='note'>Total :#${total}</span><br>
                            <br><br><br><br>
                        
                            </div>
                            `;
                                document.getElementById('cartproduct').innerHTML = cartproducts

                                }
                            }
                            document.getElementById('price').innerHTML = grandtotal;
                        })
                    
                        break;
            case '401': 
                            
                        alert(`${data.message}`);
                        window.location = 'products.html'
                        break;
                    
            default:
                
                        alert(`Error occured while loading carts, please try again later`);
                        window.location = 'products.html';
                        break;
                        

        }
})  
    .catch((err)=>console.log(err));
}


function clearCart(){
   
   sessionStorage.removeItem('CART')

}

function ctoString(obj){
   
        var str = JSON.stringify(obj);
        return str;

 }

 function ctoObject(str){
   
    var obj = JSON.parse(str);
    return obj;

}
function createcart(){
   if(sessionStorage.getItem('CART')=== null){
       var cart ={};
       cart.salesOrders =[];
       sessionStorage.setItem('CART',ctoString(cart))
       return;
}
return
}

function addTocart(values){
    event.preventDefault();
    createcart()

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
       
                    for(var product of data2) {
                        const {id,images,productname,price,quantity} = product

                            if ( parseInt(id,10) === parseInt(values.product_id,10)) {
                              
                                if ( parseInt(quantity,10) >= parseInt(values.quantity)) {
                              
                                    var cart = sessionStorage.getItem('CART');
                                    var cartobj = ctoObject(cart);
                               
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
                        window.location = 'products.html'
                        break;
                    
            default:
                
                        alert(`Error occured while adding  product to cart, please try again later`);
                        window.location = 'products.html';
                        break;
                        

        }
})  
    .catch((err)=>console.log(err));

}


function addCartdata(event){
            event.preventDefault();
           
            let id = document.getElementById('Id').value;
            let quantity = document.getElementById('Quantity').value;

            quantity = parseInt(quantity, 10);
            id = parseInt(id, 10);
            
            addTocart( {"product_id" :id,"quantity":quantity});

        }
