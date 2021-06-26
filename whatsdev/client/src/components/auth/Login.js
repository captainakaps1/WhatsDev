import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

function Login(props) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    errors: {},
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [props.auth.isAuthenticated]);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      email: state.email,
      password: state.password,
    };

    props.loginUser(userInfo);
  };

  const { email, password } = state;
  const errors = props.errors;

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Login to your What's DEV account</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                name="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
                error={errors.email}
              />
              <TextFieldGroup
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                error={errors.password}
              />
              <input
                type="submit"
                value="submit"
                className="btn btn-secondary btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
