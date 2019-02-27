import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="login-form-wrapper">
                <h2>Register</h2>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <MuiThemeProvider>
                          <TextField  hintText="Your First Name" floatingLabelText="First Name" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        </MuiThemeProvider>
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <MuiThemeProvider>
                          <TextField  hintText="Your Last Name" floatingLabelText="Last Name" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        </MuiThemeProvider>
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <MuiThemeProvider>
                          <TextField  hintText="Your username" floatingLabelText="Username" name="username" value={user.username} onChange={this.handleChange} />
                        </MuiThemeProvider>
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <MuiThemeProvider>
                          <TextField
                            hintText="Password Field"
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={this.handleChange}
                          />
                        </MuiThemeProvider>
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                      <MuiThemeProvider>
                        <div className="form-group">
                          <RaisedButton type="submit" label="Register" primary={true} />
                          <FlatButton label="login" primary={true} href="/login" />
                        </div>
                      </MuiThemeProvider>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
