

const React = require('react');
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');
const Input = require('../common/textInput');

const AuthorForm = createReactClass({
  propTypes: {
    author:	PropTypes.object.isRequired,
    onSave:	PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
  },

  render() {
    return (
      <form>
        <h1>Manage Author</h1>
        <Input
          name="firstName"
          label="First Name"
          value={this.props.author.firstName}
          onChange={this.props.onChange}
          error={this.props.errors.firstName}
        />

        <Input
          name="lastName"
          label="Last Name"
          value={this.props.author.lastName}
          onChange={this.props.onChange}
          error={this.props.errors.lastName}
        />

        <input type="submit" value="Save" className="btn btn-primary" onClick={this.props.onSave} />
      </form>
    );
  },
});

module.exports = AuthorForm;
