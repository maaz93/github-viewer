import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Profile from "./github/Profile"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "hisivasankar",
      userData: {},
      userRepos: [],
      perPage: 5
    }
  }

  // Get user data from GitHub
  getUserdata() {
    $.ajax({
      url: `https://api.github.com/users/${this.state.username}?
      client_id=${this.props.clientId}&
      client_secret=${this.props.clientSecret}`,
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

  componentDidMount() {
    this.getUserdata();
  }

  render() {
    return (
      <div>
        <Profile userData = {this.state.userData}/>
      </div>
    );
  }
}

App.propTypes = {
  clientId: React.PropTypes.string,
  clientSecret: React.PropTypes.string
};

App.defaultProps = {
  clientId: "19adeb49617dbd4c1814",
  clientSecret: "b612259e3a76a059526ffb06a9186c07f619dc0f"
}

export default App;
