import React from "react";

export default class UserShelf extends React.Component {
  state = {
    loading: true,
    shelf: null,
  };

  async componentDidMount() {  
    //let token = localStorage.getItem('token'); 
    //console.log(token);

    const url = "http://localhost:5000/dashboard";  
    const response = await fetch(url,{ 
          method: 'GET', 
          credentials: 'include'
      });
    const resData = await response.json(); 
    console.log(response);
    const dataItems = resData.map((resData)=>  
    <div className="book-item">
      <p>{resData.title}</p> 
      <p>Author: {resData.books[0].author}</p>
    </div>); 
    //console.log(resData);
    this.setState({ shelf: dataItems});
    this.setState({ loading: false }); 
  }
  
  render() {   

      return (
      <div>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          <div className="book-list"> 
          <h2 className="centered-header">My Reading List</h2>
              {this.state.shelf}
          </div>
        )}
      </div>
    );
  }
}
