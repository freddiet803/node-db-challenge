const db = require('../data/dbConfig.js');

module.exports = {
  find,
  addProject,
  addTask,
  addResource,
  findResources,
  findById,
  findTasks,
  getTasks
};

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects').where({ id });
}

function addProject(project) {
  return db('projects').insert(project);
}

function addTask(task) {
  return db('tasks').insert(task);
}

function addResource(resource) {
  return db('resources').insert(resource);
}

function findResources() {
  return db('resources');
}

function findTasks() {
  return db('tasks');
}

function getTasks() {
  return db('tasks as t').join('projects as p', 't.project_id', 'p.id');
}
