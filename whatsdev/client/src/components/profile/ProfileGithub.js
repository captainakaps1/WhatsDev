import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ProfileGithub(props) {
  const [state, setState] = React.useState({
    clientID: "fbd83b17327e76da409c",
    clientSecret: "94d641b215fa76020175983d8ccba85793682863",
    count: 5,
    sort: "created: asc",
    repos: [],
  });

  useEffect(() => {
    const { username } = this.props;
    const { count, sort, clientID, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.myRef) {
          this.setState({
            repos: data,
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const { repos } = this.state;

  const repoItems = repos.map((repo) => (
    <div key={repo.id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <a
              href={repo.html_url}
              className="text-info"
              target="_blank noreferrer noopener"
            >
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repo.watchers_count}
          </span>
          <span className="badge badge-success">Forks: {repo.forks_count}</span>
        </div>
      </div>
    </div>
  ));
  return (
    <div ref="myRef">
      <hr />
      <h3>Latest Github Repos</h3>
      {repoItems}
    </div>
  );
}
ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;
