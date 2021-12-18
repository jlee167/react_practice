import React from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'rc-pagination';
import Modal from 'react-modal';
import "rc-pagination/assets/index.css";
import useSWR from 'swr';
import fetch from 'unfetch';
const { useEffect, useState, useRef } = React;



const Notice = () => {

  const [posts, setPosts] = useState([]);
  const [activePosts, setActivePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const [modalActive, setModalActive] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const title = useRef(null);
  const content = useRef(null);

  const fetcher = async (url) => {
    const res = await fetch(url);
    console.log(res.ok);
    console.log(res.json());
    return res.json();
  };

  const {data, error} = 
    useSWR('http://www.lazyboyindustries.com:3001/post', fetcher);


  /*
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
        let head = jsonData.length - (currentPage - 1) * pageSize;
        let tail = head - pageSize;
        if (tail < 0)
          tail = 0;
        setActivePosts(jsonData.slice(tail, head).reverse());
        setTotalItems(jsonData.length);
      })
      .catch(err => {
        console.log(err);
      });
  }
  */

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

  const onPageChange = (current, pageSize) => {
    setCurrentPage(current);
    let head = posts.length - (current - 1) * pageSize;
    let tail = head - pageSize;
    if (tail < 0)
      tail = 0;
    setActivePosts(posts.slice(tail, head).reverse());
  };

  const onPostSelection = (post) => {
    setModalActive(true);
    setCurrentPost(post);
  };


  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 20, 20, 0.75)'
  };

  const modalContentStyle = {
    top: '200px',
    left: '50px',
    right: '50px',
    bottom: '50px',
    border: '1px solid #ccc',
    background: '#fff',
  };


  return (
    <>
      <Modal
        style={{
          overlay: modalOverlayStyle,
          content: modalContentStyle,
        }}
        onRequestClose={() => { setModalActive(false) }}
        isOpen={modalActive}
      >
        {currentPost &&
          <div className="post-container pl-5 pt-3 pb-3">
            <div> Post.No: {currentPost.ID}</div>
            <div className="mt-3"> Title: {currentPost.SUBJECT}</div>
            <div className="mt-5">{currentPost.CONTENT}</div>
          </div>
        }
      </Modal>

      
      <p className="mb-5 font-weight-bold">게시판</p>
      <p>글쓰기</p>
      <form
        className="d-flex flex-column b border border-dark p-5 bg-white w-80"
        onSubmit={onSubmitNewPost}
      >
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
      <table className="mt-5 mb-5 w-100">
        {data.map((v) => {
          return (
            <tr className="post-item" key={v.ID} onClick={() => onPostSelection(v)}>
              <div className="title-container">
                <section className="mr-3 d-inline-block"> #{v.ID} </section>
                <section className="d-inline-block"> {v.SUBJECT} </section>
              </div>
            </tr>
          );
        })}
      </table>

      <p>current page: {currentPage}</p>
      <p>total items: {totalItems}</p>
      <p>page size: {pageSize}</p>

      <Pagination
        current={currentPage}
        onChange={onPageChange}
        pageSize={pageSize}
        total={totalItems}
        disabled={false}
      />
    </>
  );
};


export default Notice;

