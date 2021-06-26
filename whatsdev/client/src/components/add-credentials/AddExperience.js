import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaField from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { addExperience } from "../../store/actions/profileActions";

function AddExperience(props) {
  const [state, setState] = React.useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false,
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onCheck = (e) => {
    setState({
      ...state,
      disabled: !state.disabled,
      current: !state.current,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      company: state.company,
      title: state.title,
      location: state.location,
      from: state.from,
      to: state.to,
      current: state.current,
      description: state.description,
    };

    props.addExperience(expData, props.history);
  };

  const { errors } = props;
  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go back{" "}
            </Link>{" "}
            <h1 className="display-4 text-center"> Add Experience </h1>{" "}
            <p className="lead text-center">
              Add any job that you have had in the past or current{" "}
            </p>{" "}
            <small className="d-block pb-3"> * required field </small>{" "}
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={state.company}
                onChange={onChange}
                error={errors.company}
              />{" "}
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={state.title}
                onChange={onChange}
                error={errors.title}
              />{" "}
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={state.location}
                onChange={onChange}
                error={errors.location}
              />{" "}
              <h6> * From Date </h6>{" "}
              <TextFieldGroup
                name="from"
                type="date"
                value={state.from}
                onChange={onChange}
                error={errors.from}
              />{" "}
              <h6> To Date </h6>{" "}
              <TextFieldGroup
                name="to"
                type="date"
                value={state.to}
                onChange={onChange}
                error={errors.to}
                disabled={state.disabled ? "disabled" : ""}
              />{" "}
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="current"
                  value={state.current}
                  checked={state.current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job{" "}
                </label>{" "}
              </div>
              <TextAreaField
                placeholder="Job Description"
                name="description"
                value={state.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the position"
              />
              <input
                type="submit"
                value="submit"
                className="btn btn-secondary btn-block mt-4"
              />
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  addExperience: PropTypes.func.isRequired,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
