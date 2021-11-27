import React from 'react';
import Button from 'react-bootstrap/Button';
const { useState, useRef } = React;



const Notice = () => {

  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const title = useRef(null);
  const content = useRef(null);

  if (posts.length === 0) {
    fetch('http://www.lazyboyindustries.com:3001/post',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        setPosts(jsonData);
      })
      .catch(err => {
        console.log('err');
      });
  }

  const onChangeTitle = (e) => {
    setNewPostTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setNewPostContent(e.target.value);
  };


  const onSubmitNewPost = (e) => {
    console.log(newPostTitle);
    fetch('http://www.lazyboyindustries.com:3001/post',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent 
        })
      }
    )
      .catch(err => {
        console.log('err');
      });
    window.location.href = window.location.href;
  }; 

  


  return (
    <div>
      <p className="mb-5">게시판</p>
      <p>글쓰기</p>
      <form className="d-flex flex-column b border border-dark p-5 bg-white w-80" onSubmit={onSubmitNewPost}>
        <label>Title</label>
        <input 
          type="text"
          ref={title}
          value={newPostTitle}
          onChange={onChangeTitle}
        />
        <label>Content</label>
        <input 
          type="text"
          ref={content}
          value={newPostContent}
          onChange={onChangeContent}
        />
        <Button variant="success" className="mt-5" type="submit">Submit</Button>
      </form>
      {posts.map((v) => {
        return (
          <div className="post-container" key={v.ID}>
            <div className="title-container">#{v.ID} {v.SUBJECT}</div>
            <div className="content-container">{v.CONTENT}</div>
          </div>
        );
      })}
    </div>
  );
};


export default Notice;

