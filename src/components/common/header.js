

const React = require('react');
const createReactClass = require('create-react-class');
const Link = require('react-router-dom').Link;

const Header = createReactClass({
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img src="/images/pluralsight-logo.png" />
        </Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-item nav-link">Home</Link>
          <Link to="/authors" className="nav-item nav-link">Authors</Link>
          <Link to="/about" className="nav-item nav-link">About</Link>
        </div>
      </nav>
    );
  },
});

module.exports = Header;
