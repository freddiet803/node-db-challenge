exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments('id');
      tbl.string('project_name', 128).notNullable();
      tbl.string('description', 250);
      tbl.boolean('completed');
    })

    .createTable('tasks', tbl => {
      tbl.increments('id');
      tbl.string('task_name', 128).notNullable();
      tbl.string('description', 500).notNullable();
      tbl.string('notes', 200);
      tbl.boolean('completed');

      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects');
    })

    .createTable('resources', tbl => {
      tbl.increments('id');
      tbl.string('resource_name', 128).notNullable();
      tbl.string('description', 250);
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects');
    });
};

exports.down = function(knex) {
  return knex.schema

    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
