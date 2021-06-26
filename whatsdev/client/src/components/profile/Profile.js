import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileGitHub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../store/actions/profileActions";

function Profile(props) {
  useEffect(() => {
    if (props.match.params.handle) {
      props.getProfileByHandle(props.match.params.handle);
    }
  }, []);

  useEffect(() => {
    if (props.profile.profile === null && props.profile.loading) {
      props.history.push("/not-found");
    }
  }, [props.profile]);

  const { profile, loading } = props.profile;
  let profileContent;

  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    profileContent = (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
            </Link>
          </div>
          <div className="col-md-6" />
        </div>
        <ProfileHeader profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileCreds
          education={profile.education}
          experience={profile.experience}
        />
        {profile.githubUsername ? (
          <ProfileGitHub username={profile.githubUsername} />
        ) : null}
      </div>
    );
  }
  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(
  withRouter(Profile)
);
