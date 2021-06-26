import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

function CommentFeed(props) {
  const { comments, postID } = props;
  return comments.map((comment) => (
    <CommentItem key={comment._id} comment={comment} postID={postID} />
  ));
}
CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postID: PropTypes.string.isRequired,
};

export default CommentFeed;
