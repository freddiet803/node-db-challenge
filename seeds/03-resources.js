exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('resources').insert([
        { resource_name: 'computer', project_id: 1 },
        { resource_name: 'internet', project_id: 2 },
        { resource_name: 'printer', project_id: 2 }
      ]);
    });
};
