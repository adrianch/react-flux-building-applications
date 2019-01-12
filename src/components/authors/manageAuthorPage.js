

const React = require('react');
const createReactClass = require('create-react-class');
const ReactRouter = require('react-router-dom');
const AuthorForm = require('./authorForm');
const AuthorActions = require('../../actions/authorActions');
const AuthorStore = require('../../stores/authorStore');

const Redirect = ReactRouter.Redirect;
const Prompt = ReactRouter.Prompt;

const ManageAuthorPage = createReactClass({
  getInitialState() {
    return {
      author: { id: '', firstName: '', lastName: '' },
      errors: {},
      dirty: false,
      redirect: false,
    };
  },

  componentDidMount() {
    const authorId = this.props.match.params.id; // from the path '/author:id'
    if (authorId) {
      this.setState({ author: AuthorStore.getAuthorById(authorId) });
    }
  },

  setAuthorState(event) {
    const author = Object.assign({}, this.state.author);
    author[event.target.name] = event.target.value;
    this.setState({ author, dirty: true });
  },

  authorFormIsValid() {
    let formIsValid = true;
    this.state.errors = {}; // clear any previous errors.

    if (this.state.author.firstName.length < 3) {
      this.state.errors.firstName = 'First name must be at least 3 characters.';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 3) {
      this.state.errors.lastName = 'Last name must be at least 3 characters.';
      formIsValid = false;
    }

    this.setState({ errors: this.state.errors });
    return formIsValid;
  },

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    if (this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
    } else {
      AuthorActions.createAuthor(this.state.author);
    }

    this.setState({ dirty: false, redirect: true });
    // TODO: display author saved
  },

  render() {
    return (
      <div>
        { this.state.redirect && <Redirect to="/authors" />}
        <Prompt when={this.state.dirty} message="Leave without saving?" />
        <AuthorForm
          author={this.state.author}
          onChange={this.setAuthorState}
          onSave={this.saveAuthor}
          errors={this.state.errors}
        />
      </div>
    );
  },
});

module.exports = ManageAuthorPage;
