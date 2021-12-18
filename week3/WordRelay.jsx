const React = require('react');
const {Component} = React;

class WordRelay extends Component {
  state = {
    word: '첫단어',
    value: '',
    result: '',
    posts: ['사과', '바나나', '포도']
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.word[this.state.word.length-1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: ''
      });
    }
  };

  onChangeInput = (e) => {
    this.setState({value: e.target.value});
  };

  input;

  onRefInput = () => {

  };

  getPosts = () => {
    window.alert('alert');
    fetch('http://www.lazyboyindustries.com:3001/post',
      {
        method: 'get',
        headers: {
        }
      }
    )
    .then(response => {
      console.log('response');
      return response.json();
    })
    .then(jsonData => {
      console.log(jsonData);
      //let newPosts = this.state.posts;
      //newPosts.push({
      //  id: jsonData.ID
      //});
      //console.log(newPosts);
      this.setState({
        posts: jsonData 
      });
    }) 
    .catch(err => {
      console.log('err');
      console.log(err);
    });
  };




  submitPost = () => {
    window.alert('alert');
    fetch('http://www.lazyboyindustries.com:3001/post',
      {
        method: 'post',
        headers: {
        },
        //body: JSON.stringify();
      }
    )
    .then(response => {
      console.log('response');
      return response.json();
    })
    .catch(err => {
      console.log('err');
      console.log(err);
    });  
  };

  postContent;

  render() {
    return (
      <div>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input 
            ref={this.onRefInput} 
            value={this.state.value} 
            onChange={this.onChangeInput} 
          />
          <button>입력</button>
        </form>

        <input ref={(ref) => {this.postContent = ref;}} />
        <button onClick={this.submitPost}>글 올리기</button>
        
        <div>
          <button onClick={this.getPosts}>게시판 보기</button>
        </div>
        {this.state.posts.map((v) => {
          return (
            <div key={v.ID}>
              <span>{v.ID}</span>
              <span>{v.SUBJECT}</span>
              <div>{v.CONTENT}</div>
            </div>
          );
        })}
      </div>
    );
  }
}


module.exports = WordRelay;