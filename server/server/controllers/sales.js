import sales from '../dummy_data/sales.json';

export default {
allSales(req,res) {
  // console.log(req.decoded.role);
       if(req.decoded.role == "Admin"){
       return res.status(200).json({
         sales,
         error: false
       });
   }else{
    
    return res.status(404).json({
      message: 'Only the admin can access all sales',
      error: true
    });
   
}

},

getAsalesRecord(req,res) {
    for (let i = 0; i < sales.length; i++) {
      if (sales[i].id === parseInt(req.params.saleId, 10)) {
           
       let id=sales[i].id;
       let username=sales[i].username;
       let  customerName=sales[i].customerName; 
       let date=sales[i].Date;
       let price = sales[i].price;
       let  product= sales[i].product;
       let  quantity =sales[i].quantity;
  
  let aSale=[
  {
   id,
   username,
   customerName,
   date,
   price,
   product,
   quantity
   }
    ]
          if(req.decoded.role === "Admin" || req.decoded.username ===username){
                return res.status(200).json({
                aSale,
                error:false
                });
     
      }else{
        return res.status(401).json({
            message:'Only the Admin or the creator of the sales record can access',
            error:true
            });
    }
    }
}
    return res.status(404).json({
      message: 'Sale record not found',
      error: true
    });
  
},

createSalesOrder(req,res) {
 
  if(req.decoded.role == "user"){
  if (!req.body.product || !req.body.price || !req.body.quantity || !req.body.username || !req.body.Date || !req.body.customerName || !req.body.id) {
      return res.json({
        message: 'NO product created',
        error: true
      });
    }
    let Date2=req.body.Date;
    Date2 = Date2.match(/^(\d{1,2})(\/)(\d{1,2})(\/)(\d{4})$/)||[Date2];
    if(Date2.length > 1){

    sales.push(req.body);

    return res.json({
      message: 'sales Created successfully',
      error: false
    });
    }else{
      return res.json({
      message: 'wrong Date format, enter in 12/08/2020',
      error:true
    });
    }
    }else{
       return res.json({
        message: 'Only a store attendant  can create a sales record',
        error:true
      });
    }

  }



};