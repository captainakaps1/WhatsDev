import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaField from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { addEducation } from "../../store/actions/profileActions";

function AddEducation(props) {
  const [state, setState] = React.useState({
    school: "",
    degree: "",
    fieldofstudy: "",
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

    const eduData = {
      school: state.school,
      degree: state.degree,
      fieldofstudy: state.fieldofstudy,
      from: state.from,
      to: state.to,
      current: state.current,
      description: state.description,
    };

    props.addEducation(eduData, props.history);
  };

  const { errors } = props;
  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              A school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* required field</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={state.school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree or certification"
                name="degree"
                value={state.degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* Field of study"
                name="fieldofstudy"
                value={state.fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
              />
              <h6>* From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={state.from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={state.to}
                onChange={onChange}
                error={errors.to}
                disabled={state.disabled ? "disabled" : ""}
              />
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
                  Current School
                </label>
              </div>

              <TextAreaField
                placeholder="Program Description"
                name="description"
                value={state.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us something about the program you read at the school"
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  addEducation: PropTypes.func.isRequired,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
