import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="login-form-wrapper">
              <h2>Login</h2>
              <form className="login-form" name="form" onSubmit={this.handleSubmit} >
                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                  <MuiThemeProvider>
                    <TextField  hintText="Your username" floatingLabelText="Username" name="username" value={username} onChange={this.handleChange} />
                  </MuiThemeProvider>
                  {submitted && !username &&
                      <div className="help-block">Username is required</div>
                  }
                </div>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <MuiThemeProvider>
                      <TextField
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </MuiThemeProvider>
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                <MuiThemeProvider>
                  <div className="form-group">
                    <RaisedButton type="submit" label="login" primary={true} />
                    <FlatButton label="Register" primary={true} href="/register" />
                  </div>
                </MuiThemeProvider>
              </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
