const express = require('express');
const db = require('./project-model.js');

const router = express.Router();

// find projects
router.get('/', (req, res) => {
  db.find()
    .then(projects => {
      if (projects.length) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: ' no projects exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'error getting projects from database' });
    });
});

//add project
router.post('/', (req, res) => {
  const newProject = req.body;
  const theBoolean = newProject.completed ? newProject.completed : false;
  newProject.completed = theBoolean;
  if (newProject.project_name) {
    db.addProject(newProject)
      .then(added => {
        res.status(201).json(added);
      })
      .catch(err => {
        res
          .status(500)
          .json({ errorMessage: 'error adding project to database', err });
      });
  } else {
    res.status(400).json({ message: 'project must have a name' });
  }
});

//find resources
router.get('/resources', (req, res) => {
  db.findResources()
    .then(resources => {
      if (resources.length) {
        res.status(200).json(resources);
      } else {
        res.status(400).json({ message: 'no resources' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'error getting resources from database' });
    });
});

//add resource

router.post('/:id/resources', (req, res) => {
  const newResource = req.body;
  const projectId = req.params.id;
  newResource.project_id = projectId;

  db.findById(projectId)
    .then(project => {
      if (project.length) {
        if (newResource.resource_name) {
          db.addResource(newResource)
            .then(added => {
              res.status(201).json(added);
            })
            .catch(err => {
              res
                .status(500)
                .json({ errorMessage: 'resource could not be added' });
            });
        } else {
          res.status(400).json({ message: ' resource needs a name' });
        }
      } else {
        res.status(400).json({ message: 'project does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'error adding resource to datbase' });
    });
});

//get tasks

router.get('/tasks', (req, res) => {
  db.getTasks()
    .then(tasks => {
      if (tasks.length) {
        res.status(200).json(tasks);
      } else {
        res.status(400).json({ message: 'no tasks' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'error getting task from database' });
    });
});

//add a task

router.post('/:id/tasks', (req, res) => {
  const newTask = req.body;
  const projectId = req.params.id;
  newTask.project_id = projectId;
  const theBoolean = newTask.completed ? newTask.completed : false;
  newTask.completed = theBoolean;

  db.findById(projectId)
    .then(project => {
      if (project.length) {
        if (newTask.task_name && newTask.description) {
          db.addTask(newTask)
            .then(added => {
              res.status(201).json(added);
            })
            .catch(err => {
              res
                .status(500)
                .json({ errorMessage: 'could not add task to database' });
            });
        } else {
          res
            .status(400)
            .json({ message: 'task need to have name and description' });
        }
      } else {
        res.status(400).json({ message: 'project does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'could not retrieve project' });
    });
});

module.exports = router;
