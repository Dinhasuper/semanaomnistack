const connection = require('../database/connections');// conexão com o banco

module.exports = {
    //lista a ong especifica
    async create(request, response){
      const { id } = request.body;

      const  ong = await connection('ongs').where('id', id).select('name').first();

     
      if(!ong){
          return response.status(400).json({error: 'No oNg found with this id'})
      }

      return response.json(ong);
    }

    
}