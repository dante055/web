import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HookEffectDataFetching() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [id, setId] = useState('1');
  const [idOnClick, setIdOnClick] = useState('1');

  useEffect(() => {
    console.log('Running the effect');
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${idOnClick}`)
      .then(response => {
        console.log(response);
        setPost(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [idOnClick]);

  //   useEffect(() => {
  //     console.log('Running the effect');
  //     axios
  //       .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  //       .then(response => {
  //         console.log(response);
  //         setPost(response.data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, [id]);

  //   useEffect(() => {
  //     console.log('Running the effect');
  //     axios
  //       .get('https://jsonplaceholder.typicode.com/posts')
  //       .then(response => {
  //         console.log(response);
  //         setPosts(response.data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, []);

  return (
    <div>
      <input type='number' value={id} onChange={e => setId(e.target.value)} />
      <button onClick={() => setIdOnClick(id)}>Fetch</button>
      <h2>{post.title}</h2>
      {/* <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default HookEffectDataFetching;
