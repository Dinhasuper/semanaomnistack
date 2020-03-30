const connection = require('../database/connections');// conexão com o banco
const crypto = require('crypto');//criar criptografia
module.exports = {
   
    //listar - está sendo chamada no arquivo routes
 async index(request,response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
}, 
   
    async create(request,response){

        const {name,email,whatsapp,city,uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX'); 

       await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
      return response.json({id} );
    }
}