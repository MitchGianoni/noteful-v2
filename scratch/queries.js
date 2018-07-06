'use strict';

const knex = require('../knex');

// Get notes including searchTerm
let searchTerm = 'gaga';
knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

// Get a note by ID
let getId = 1008;
knex()
  .select('notes.id', 'title', 'content')
  .from('notes')
  .where({id: getId})
  .then(results =>{
    console.log(results[0]);
  })
  .catch(err =>{
    console.log(err);
  });

// Update a note by id
let getId2 = 1005;
let updateObj = {title: 'Who cares about Mike Green', content: 'He is no longer relevant and the wings are awful.'};
knex()
  .from('notes')
  .where({id: getId2})
  .update(updateObj)
  .returning(['id', 'title', 'content'])
  .then(results =>{
    console.log(results[0]);
  })
  .catch(err =>{
    console.log(err);
  });

// Create a new note
let newObj = {title: 'Tavares to the Maple Leafs', content: 'The Northeast may have a new contender!'};
knex()
  .from('notes')
  .insert(newObj)
  .returning(['id','title','content'])
  .then(results =>{
    console.log(results[0]);
  })
  .catch(err =>{
    console.log(err);
  });


// Delete a note by ID
let id = 1005;
knex()
  .from('notes')
  .where('id', id)
  .del()
  .then(results =>{
    console.log('Deleted: ', results);
  })
  .catch(err =>{
    console.log(err);
  });