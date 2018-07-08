'use strict';

// Use EXPRESS
const express = require('express');
// Create an router instance (aka "mini-app")
const router = express.Router();
// Use knex
const knex = require('../knex');

// GET all folders
router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

// Get a folder by ID
router.get('/:id', (req, res, next) => {
  knex.first('id', 'name')
    .where('id', req.params.id)
    .from('folders')
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// Create a folder
router.post('/', (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('folders')
    .returning(['id', 'name'])
    .then((results) => {
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

// Update a folder by ID
router.put('/:id', (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const updateItem = { name };

  knex('folders')
    .update(updateItem)
    .where('id', req.params.id)
    .returning(['id', 'name'])
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// Delete a folder by ID
router.delete('/:id', (req, res, next) => {
  knex.del()
    .where('id', req.params.id)
    .from('folders')
    .then(() => {
      res.status(204).end();
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;