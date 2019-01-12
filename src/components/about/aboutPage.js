

const React = require('react');
const createReactClass = require('create-react-class');
const Prompt = require('react-router-dom').Prompt;
const withRouter = require('react-router').withRouter;

const About = createReactClass({
  render() {
    return (
      <div>
        <Prompt message="Are you sure you want to leave a page this exiting?" />
        <h1>About</h1>
        <div>
					This application uses the following technologies:

          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Flux</li>
            <li>Node</li>
            <li>Gulp</li>
            <li>Browserify</li>
            <li>Bootstrap</li>
          </ul>
        </div>
      </div>
    );
  },
});

module.exports = About;
