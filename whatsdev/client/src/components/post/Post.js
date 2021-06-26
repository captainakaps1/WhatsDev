import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getPost } from "../../store/actions/postActions";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

function Post(props) {
  useEffect(() => {
    props.getPost(props.match.params.id);
  }, []);

  const { post, loading } = props.post;
  let postContent;

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />{" "}
        <CommentForm postID={post._id} />{" "}
        <CommentFeed postID={post._id} comments={post.comments} />{" "}
      </div>
    );
  }

  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back to Feed{" "}
            </Link>{" "}
            {postContent}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
