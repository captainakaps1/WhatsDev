import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

import {
  getCurrentProfile,
  deleteAccount,
} from "../../store/actions/profileActions";

function Dashboard(props) {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
  const onDeleteClick = () => {
    props.deleteAccount();
  };

  const { user } = props.auth;
  const { profile, loading } = props.profile;

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    //check if user has a profile or not
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link>{" "}
          </p>{" "}
          <ProfileActions />
          <Experience experience={profile.experience} />{" "}
          <Education education={profile.education} />{" "}
          <div style={{ marginBottom: "60px" }} />{" "}
          <button onClick={onDeleteClick} className="btn btn-danger">
            Delete My Account{" "}
          </button>{" "}
        </div>
      );
    } else {
      //user has no dashboard
      dashboardContent = (
        <div>
          <p className="lead text-muted"> Welcome {user.name} </p>{" "}
          <p> You have not set up a profile yet, please create one </p>{" "}
          <Link to="/create-profile" className="btn btn-lg btn-secondary">
            Create Profile{" "}
          </Link>{" "}
        </div>
      );
    }
  }
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4"> Dashboard </h1> {dashboardContent}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
