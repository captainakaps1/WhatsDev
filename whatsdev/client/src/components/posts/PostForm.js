import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../store/actions/postActions";

function PostForm(props) {
  const [state, setState] = React.useState({
    text: "",
    errors: {},
  });

  const onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { user } = props.auth;
    const newPost = {
      text: state.text,
      name: user.name,
      avatar: user.avatar,
    };

    props.addPost(newPost);
    setState({
      text: "",
    });
  };

  const { errors } = props;
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-dark text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={state.text}
                onChange={onChange}
                error={errors.text}
              />
            </div>
            <button type="submit" value="submit" className="btn btn-secondary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addPost })(PostForm);
