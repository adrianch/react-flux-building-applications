

const React = require('react');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const Link = require('react-router-dom').Link;
const AuthorActions = require('../../actions/authorActions');

const AuthorList = createReactClass({
  propTypes: {
    authors: PropTypes.array.isRequired,
  },

  deleteAuthor(id, event) {
    event.preventDefault();
    AuthorActions.deleteAuthor(id);
    // TODO: display delete confirmation
  },

  render() {
    const createAuthorRow = function (author) {
      return (
        <tr key={author.id}>
          <td><a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
          <td><Link to={`author/${author.id}`}>{author.id}</Link></td>
          <td>
            {author.firstName}
            {' '}
            {author.lastName}
          </td>
        </tr>
      );
    };

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th />
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.authors.map(createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    );
  },
});

module.exports = AuthorList;
