const express = require('express');

const router = express.Router();

const {
  Project,
  User
} = require('../models');

// CREATE
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      technologies,
      category,
      githubLink,
      demoLink
    } = req.body;

    const project = await Project.create({
      userId,
      title,
      description,
      technologies,
      category,
      githubLink: githubLink || null,
      demoLink: demoLink || null
    });

    const createdProject = await Project.findByPk(
      project.id,
      {
        include: [
          {
            model: User,
            as: 'user',
            attributes: [
              'id',
              'name',
              'email'
            ]
          }
        ]
      }
    );

    res.status(201).json({
      message: 'Project created successfully.',
      project: createdProject
    });
  } catch (error) {
    res.status(400).json({
      message: 'Unable to create project.',
      error: error.message
    });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: [
            'id',
            'name',
            'email'
          ]
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch projects.',
      error: error.message
    });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(
      req.params.id,
      {
        include: [
          {
            model: User,
            as: 'user',
            attributes: [
              'id',
              'name',
              'email'
            ]
          }
        ]
      }
    );

    if (!project) {
      return res.status(404).json({
        message: 'Project not found.'
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch project.',
      error: error.message
    });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: 'Project not found.'
      });
    }

    const {
      userId,
      title,
      description,
      technologies,
      category,
      githubLink,
      demoLink
    } = req.body;

    await project.update({
      userId,
      title,
      description,
      technologies,
      category,
      githubLink: githubLink || null,
      demoLink: demoLink || null
    });

    const updatedProject = await Project.findByPk(
      project.id,
      {
        include: [
          {
            model: User,
            as: 'user',
            attributes: [
              'id',
              'name',
              'email'
            ]
          }
        ]
      }
    );

    res.json({
      message: 'Project updated successfully.',
      project: updatedProject
    });
  } catch (error) {
    res.status(400).json({
      message: 'Unable to update project.',
      error: error.message
    });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: 'Project not found.'
      });
    }

    await project.destroy();

    res.json({
      message: 'Project deleted successfully.'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to delete project.',
      error: error.message
    });
  }
});

module.exports = router;