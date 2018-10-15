

 module.exports = (app) => {
  
   app.get('/api', (req, res) => res.status(200).send({
     message: 'Welcome to the Store Manager API!',
   }));

       

   app.all('/sales/:salesId/', (req, res) =>
     res.status(405).send({
       message: 'Method Not Allowed',
     }));
};
