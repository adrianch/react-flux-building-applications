

const React = require('react');
const createReactClass = require('create-react-class');
const Router = require('react-router');
const Link = require('react-router-dom').Link;
const AuthorStore = require('../../stores/authorStore');
const AuthorActions = require('../../actions/authorActions');
const AuthorList = require('./authorList');

const AuthorPage = createReactClass({
  getInitialState() {
    return {
      authors: AuthorStore.getAllAuthors(),
    };
  },

  componentWillMount() {
    AuthorStore.addChangeListener(this._onChange);
  },

  // Clean up when this component is unmounted
  componentWillUnmount() {
    AuthorStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({ authors: AuthorStore.getAllAuthors() });
  },

  render() {
    return (
      <div>
        <h1>Authors</h1>
        <Link to="author" className="btn btn-primary">Add Author</Link>
        <AuthorList authors={this.state.authors} />
      </div>
    );
  },
});

module.exports = AuthorPage;
