

const React = require('react');
const ReactDom = require('react-dom');
const ReactRouter = require('react-router-dom');
const App = require('./components/app');

const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

ReactDom.render(
  <Router>
    <Route path="/" component={App} />
  </Router>, document.getElementById('app'),
);
