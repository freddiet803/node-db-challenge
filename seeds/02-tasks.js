exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_name: 'make backend',
          description: 'complete backend for sprint',
          project_id: 1
        },
        {
          task_name: 'make api',
          description: 'make api for sprint',
          notes: 'this shouldnt be too bad',
          completed: false,
          project_id: 1
        },
        {
          task_name: 'find quotes',
          description: 'find quotes to use',
          completed: false,
          project_id: 2
        },
        {
          task_name: 'put on board',
          description: 'put quotes on board',
          notes: 'remember to make it look nice',
          project_id: 2
        }
      ]);
    });
};
