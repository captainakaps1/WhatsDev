import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../store/actions/postActions";
import PostFeed from "./PostFeed";

function Posts(props) {
  useEffect(() => {
    props.getPosts();
  }, []);

  const { posts, loading } = props.post;
  let postContent;

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
