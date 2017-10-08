import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
  	super(props);
  	this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
  	e.preventDefault();
  	let username = this.refs.username.value.trim();
  	if (!username) {
  		alert("Please enter user name");
  		return;
  	}
  	this.props.onFormSubmit(username);
  	this.refs.username.value = "";
  }

  render() {
    return (
      <div>
      	<form onSubmit={this.onSubmit}>
      		<label>Search Github Users</label>
      		<input type="text" ref="username" className="form-control" />
      	</form>
      </div>
    );
  }
}

export default Search;