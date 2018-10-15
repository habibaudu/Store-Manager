import products from '../dummy_data/products.json';

export default {
getproducts(req,res) {
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

}

}