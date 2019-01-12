import EventEmitter from 'events';

const assign = require('object-assign');
const _ = require('lodash');
const ActionTypes = require('../constants/actionTypes');
const Dispatcher = require('../dispatcher/appDispatcher');

const CHANGE_EVENT = 'change';

let authors = [];

const AuthorStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  getAllAuthors() {
    return authors;
  },

  getAuthorById(id) {
    return _.find(authors, { id });
  },
});

Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.INITIALIZE:
      authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      authors.push(action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
      const existingAuthor = _.find(authors, { id: action.author.id });
      const existingAuthorIndex = _.indexOf(authors, existingAuthor);
      authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      _.remove(authors, author => action.id === author.id);
      AuthorStore.emitChange();
      break;
    default:
      // no op
      break;
  }
});

module.exports = AuthorStore;
