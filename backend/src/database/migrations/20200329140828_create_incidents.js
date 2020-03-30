
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        
        table.string('ong_id').notNullable();///chave relacional
        table.foreign('ong_id').references('id').inTable('ongs'); //ver na documentação do knex se precisar
     });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
