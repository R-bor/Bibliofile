import React from "react";

export default class UserShelf extends React.Component {
  state = {
    loading: true,
    shelf: null,
  };

  async componentDidMount() {  
    let token = localStorage.getItem('token'); 
    console.log(token);

    const url = "http://localhost:5000/dashboard";
    const response = await fetch(url,{ 
      headers:{ 
        Authorization: token
      }
    });
    const data = response.json();
    this.setState({ shelf: data});
    this.setState({ loading: false }); 
  }

  render() { 
      return (
      <div>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <ul>
              <li></li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}
