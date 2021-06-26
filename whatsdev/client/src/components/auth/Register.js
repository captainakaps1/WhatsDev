import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

function Register(props) {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };
    props.registerUser(newUser, props.history);
  };

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  }, [props.auth.isAuthenticated]);

  const { name, email, password, password2 } = state;
  const errors = props.errors;
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your What's DEV account</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                name="name"
                placeholder="Name"
                value={name}
                onChange={onChange}
                error={errors.name}
              />
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email,
                  })}
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email. Learn from{" "}
                  <a
                    href="https://en.gravatar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                </small>
              </div>
              <TextFieldGroup
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                error={errors.password}
              />
              <TextFieldGroup
                name="password2"
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={onChange}
                error={errors.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
