exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('projects').insert([
        { project_name: 'Sprint Challenge', completed: false },
        { project_name: 'Vision Board' }
      ]);
    });
};
