import React, { Component } from "react";
import $ from "jquery";
import PropTypes from "prop-types";

import "./App.css";

import Profile from "./github/Profile";
import Search from "./github/Search";

class App extends Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      username: "maaz93",
      userData: {},
      userRepos: [],
      perPage: 10
    }
  }

  // Get user data from GitHub
  getUserdata() {
    $.ajax({
      url: `https://api.github.com/users/${this.state.username}?client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}`,
      dataType: "json",
      cache: false,
      success: data => {
        this.setState({
          userData: data,
        })
      },
      error: (xhr, status, error) => {
        this.setState({username: null});
        console.log(error);
      }
    });
  }

  // Get user repos from GitHub
  getUserRepos() {
    $.ajax({
      url: `https://api.github.com/users/${this.state.username}/repos?per_page=${this.state.perPage}&client_id=${this.props.clientId}&client_secret=${this.props.clientSecret}&sort=created`,
      dataType: "json",
      cache: false,
      success: data => {
        this.setState({
          userRepos: data,
        })
      },
      error: (xhr, status, error) => {
        this.setState({username: null});
        console.log(error);
      }
    });
  }

  handleFormSubmit(username) {
    this.setState({username: username}, this.fetchDetails);
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails() {
    this.getUserdata();
    this.getUserRepos();
  }

  render() {
    return (
      <div>
        <Search onFormSubmit={this.handleFormSubmit}/>
        <Profile {...this.state} />
      </div>
    );
  }
}

App.propTypes = {
  clientId: PropTypes.string,
  clientSecret: PropTypes.string
};

App.defaultProps = {
  clientId: "19adeb49617dbd4c1814",
  clientSecret: "b612259e3a76a059526ffb06a9186c07f619dc0f"
}

export default App;
