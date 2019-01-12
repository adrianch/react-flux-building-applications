/* eslint-disable no-console */


// This file is mocking a web API by hitting hard coded data.
import authors from './authorData';

const _ = require('lodash');

// This would be performed on the server in a real app. Just stubbing in.
const generateId = author => `${author.firstName.toLowerCase()}-${author.lastName.toLowerCase()}`;

// return cloned copy so that the item is passed by value instead of by reference
const clone = item => JSON.parse(JSON.stringify(item));

const AuthorApi = {
  getAllAuthors() {
    return clone(authors);
  },

  getAuthorById(id) {
    const author = _.find(authors, { id });
    return clone(author);
  },

  saveAuthor(author) {
    // pretend an ajax call to web api is made here
    console.log('Pretend this just saved the author to the DB via AJAX call...');

    if (author.id) {
      const existingAuthorIndex = _.indexOf(authors, _.find(authors, { id: author.id }));
      authors.splice(existingAuthorIndex, 1, author);
    } else {
      // Just simulating creation here.
      // The server would generate ids for new authors in a real app.
      // Cloning so copy returned is passed by value rather than by reference.
      author.id = generateId(author);
      authors.push(author);
    }

    return clone(author);
  },

  deleteAuthor(id) {
    console.log('Pretend this just deleted the author from the DB via an AJAX call...');
    _.remove(authors, { id });
  },
};

module.exports = AuthorApi;
