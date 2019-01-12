

const Dispatcher = require('../dispatcher/appDispatcher');
const ActionTypes = require('../constants/actionTypes');
const AuthorApi = require('../api/authorApi');

const InitializeActions = {
  initApp() {
    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      initialData: {
        authors: AuthorApi.getAllAuthors(),
      },
    });
  },
};

module.exports = InitializeActions;
