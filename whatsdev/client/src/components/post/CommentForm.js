import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../store/actions/postActions";

function CommentForm(props) {
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
    const { postID } = props;
    const newComment = {
      text: state.text,
      name: user.name,
      avatar: user.avatar,
    };

    props.addComment(postID, newComment);
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
                placeholder="Add a comment"
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

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
