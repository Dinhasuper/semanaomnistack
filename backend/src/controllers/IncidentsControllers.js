const connection = require('../database/connections');// conexão com o banco

module.exports ={
    async index(request,response){
        const {page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs','ongs.id', '=','incidents.ong_id')
        .limit(5)
        .offset((page -1)*5) //ele vai colocar 5 em cada página
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

       //para exibir o total de registros
       response.header('X-Total_Count',count['count(*)']);

        return response.json(incidents);
    },
    async create(request, response){
          const{title,description,value} = request.body;
         const ong_id =  request.headers.authorization;

        const [id] =  await connection('incidents').insert({
             title,
             description,
             value,
             ong_id,
         });

      return response.json({id});
    },

    async delete(request,response){
        const { id }  = request.params;
        const ong_id =  request.headers.authorization;

        //pesquisar o incidente e pegar o id
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();
//console.log(incident.ong_id, ong_id);

        //verificar se o id é realmente o id correto e verificar se o usuário tem permissão para deletar
        if (incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id',id).delete();//deleta o registro

        return response.status(204).send(); //sucesso
    }
};