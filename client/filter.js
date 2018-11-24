document.getElementById('filterSales').addEventListener('submit',(event) => {
  event.preventDefault();

  let id = document.getElementById('Id').value;
  id = parseInt(id,10);
    
  const token = localStorage.getItem('token')
  fetch(`http://localhost:4000/api/v1/sales/${id}`, {
    method: 'GET',
    mode: "cors",
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
                
          let sales =` <tr>
                    <th>salesID</th>
                    <th>Sold By</th>
                    <th>Product Name</th>
                    <th>Price Each</th>
                    <th>Quantity Sold</th>
                    <th>Price Sold</th>
                    <th>Total Amount</th>
                    <th>Date Sold</th>
                  </tr>`;
          data.forEach((sale) => {
            const {id, productname, price, attendants_id, totalprice, total,quantity ,created_date} = sale;

            sales +=
                            `<tr>
                            <td>${id}</td>
                            <td>${attendants_id}</td>
                            <td>${productname}</td>
                            <td>#${price}</td>
                            <td>${quantity}</td>
                            <td>#${total}</td>
                            <td>#${totalprice}</td>
                            <td>${created_date}</td>
                          </tr>`;
            document.getElementById('filSales').innerHTML = sales;
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
    .catch((err)=>console.log(err));
});
