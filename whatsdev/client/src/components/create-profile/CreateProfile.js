import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaField from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../store/actions/profileActions";

function CreateProfile(props) {
  const [state, setState] = React.useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubUsername: "",
    bio: "",
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
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

    const profileData = {
      handle: state.handle,
      company: state.company,
      website: state.website,
      location: state.location,
      status: state.status,
      skills: state.skills,
      githubUsername: state.githubUsername,
      bio: state.bio,
      facebook: state.facebook,
      twitter: state.twitter,
      instagram: state.instagram,
      youtube: state.youtube,
      linkedin: state.linkedin,
    };

    props.createProfile(profileData, props.history);
  };

  const hideOrShowSocialLinks = (e) => {
    setState((prevState) => ({
      displaySocialInputs: !prevState.displaySocialInputs,
    }));
  };

  const { displaySocialInputs } = state;
  const errors = props.errors;

  let socialInputs;
  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={state.twitter}
          onChange={onChange}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={state.facebook}
          onChange={onChange}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={state.instagram}
          onChange={onChange}
          error={errors.instagram}
        />
        <InputGroup
          placeholder="LinkedIn Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={state.linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />
        <InputGroup
          placeholder="Youtube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={state.youtube}
          onChange={onChange}
          error={errors.youtube}
        />
      </div>
    );
  }

  //select options for status
  const options = [
    { label: "* Select professional status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Intern", value: "Intern" },
    { label: "Student", value: "Student" },
    { label: "Instructor", value: "Instructor" },
    { label: "Other", value: "Other" },
  ];
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create your profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile handle"
                name="handle"
                value={state.handle}
                onChange={onChange}
                error={errors.handle}
                info="Your unique handle, this cannot be changed"
              />
              <SelectListGroup
                placeholder="* Status"
                name="status"
                value={state.status}
                onChange={onChange}
                error={errors.status}
                options={options}
                info="Your current work status"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={state.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={state.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your company's website or one you own"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={state.location}
                onChange={onChange}
                error={errors.location}
                info="City or City and State"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={state.skills}
                onChange={onChange}
                error={errors.skills}
                info="Must be comma separated values without space, eg PHP,HTMl,css,java"
              />
              <TextFieldGroup
                placeholder="Github username"
                name="githubUsername"
                value={state.githubUsername}
                onChange={onChange}
                error={errors.githubUsername}
                info="Include if you want to add your latest github repos to your profile"
              />
              <TextAreaField
                placeholder="Short Bio"
                name="bio"
                value={state.bio}
                onChange={onChange}
                error={errors.bio}
                info="Say something small about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={hideOrShowSocialLinks}
                  className="btn btn-light mr-2"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-secondary btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
