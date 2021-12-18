const React = require('react');
const mysql = require('mysql2');
const {Component} = React;

class WordRelay extends Component {
  state = {
    subject: "",
    content: "",
  };

  connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: ''
  });

  onSubmitForm = (e) => {
    connection.query(
      "INSERT INTO " + table + " (subject, content) VALUES ('"
      + this.state.subject  + "', '"
      + this.state.content + "')"
    );
  };

  onChangeSubject = (e) => {
    this.setState({subject: e.target.value});
  };

  onChangeContent = (e) => {
    this.setState({content: e.target.value});
  };

  onRefInput = () => {};

  render() {
    return (
      <div>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input 
            ref={this.onRefInput} 
            value={this.state.value} 
            onChange={this.onChangeSubject} 
          />
          <input 
            ref={this.onRefInput} 
            value={this.state.value} 
            onChange={this.onChangeContent} 
          />
          <button>입력</button>
        </form>
      </div>
    );
  }
}


module.exports = WordRelay;