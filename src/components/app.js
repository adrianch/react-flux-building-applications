/* eslint-disable strict */ // Disabling check because we can't run strict mode. Need global vars.

// import $ from 'jquery';
import { Route, Switch, Redirect } from 'react-router-dom';

const React = require('react');
const Header = require('./common/header');
const HomePage = require('./homePage');
const AuthorPage = require('./authors/authorPage');
const ManageAuthorPage = require('./authors/manageAuthorPage');
const AboutPage = require('./about/aboutPage');
const NotFoundPage = require('./notFoundPage');


const App = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <Switch>
        { /* Redirect typos */ }
        <Redirect from="/awthurs" to="/authors" />
        <Redirect from="/about-us" to="/about" />

        <Route exact path="/" component={HomePage} />
        <Route path="/authors" component={AuthorPage} />
        <Route path="/author" component={ManageAuthorPage} exact />
        <Route path="/author/:id" component={ManageAuthorPage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </div>
);

export default App;
