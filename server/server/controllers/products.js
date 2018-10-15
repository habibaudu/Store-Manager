import products from '../dummy_data/products.json';

export default {
getproducts(req,res) {
  // console.log(req.decoded.role);
       if(products){
       return res.status(200).json({
         products,
         error: false
       });
   }else{
    
    return res.status(404).json({
      message: 'Could not get products',
      error: true
    });
   
}

},
getAproduct(req,res) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === parseInt(req.params.productId, 10)) {
         
     let id=products[i].id;
     let productName=products[i].productName;
     let  priceEach=products[i].priceEach; 
     let inStock=products[i].inStock;
     let mininumAllowedinStock = products[i].mininumAllowedinStock;
     let  date= products[i].date;
   

let aProduct=[
{
 id,
 productName,
 priceEach,
 inStock,
 mininumAllowedinStock,
 Date
 
}
        ]
     
        return res.status(200).json({
        aProduct,
        error:false
        });
   
    }
  }
  return res.status(404).json({
    message: 'Product not found',
    error: true
  });


}

};