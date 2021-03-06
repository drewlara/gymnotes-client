import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import { Link } from 'react-router-dom';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div className="registration-form-wrapper">
                <h1>Sign Up</h1>
                <form
                    className="registration-form"
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <div className="registration-form-group">
                        <label htmlFor="firstName">First name</label>
                        <Field component={Input} type="text" name="firstName" />
                    </div>
                    <div className="registration-form-group">
                        <label htmlFor="lastName">Last name</label>
                        <Field component={Input} type="text" name="lastName" />
                    </div>
                    <div className="registration-form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                        component={Input}
                        type="text"
                        name="username"
                        validate={[required, nonEmpty, isTrimmed]}
                    />
                    </div>
                    <div className="registration-form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="password"
                        validate={[required, passwordLength, isTrimmed]}
                    />
                    </div>
                    <div className="registration-form-group">
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <Field
                        component={Input}
                        type="password"
                        name="passwordConfirm"
                        validate={[required, nonEmpty, matchesPassword]}
                    />
                    </div>
                    <div className="registration-form-button-wrapper">
                    <button className="registration-form-button"
                        type="submit"
                        disabled={this.props.pristine || this.props.submitting}>
                        Sign Up
                    </button>
                    </div>
                </form>
                <span className="to-login">Already have a GymNotes account? <Link to={'/login'}>Login!</Link></span>
            </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
