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

}

};