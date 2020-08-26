import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatePlusEffect() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [id, setId] = useState('1');
  const [idOnClick, setIdOnClick] = useState('1');

  useEffect(() => {
    console.log('Running the effect');
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${idOnClick}`)
      .then(response => {
        console.log(response);
        setLoading(false);
        setPost(response.data);
        setError('');
      })
      .catch(err => {
        setLoading(false);
        setPost({});
        setError(`${err.name} : ${err.message}`);
      });
  }, [idOnClick]);

  const handleClick = () => {
    setLoading(true);
    setIdOnClick(id);
  };

  return (
    <div>
      <input type='number' value={id} onChange={e => setId(e.target.value)} />
      <button onClick={handleClick}>Fetch</button>
      {/* <button onClick={() => handleClick()}>Fetch</button> */}
      <h2>
        {loading ? 'Loading...' : post.title}
        {error ? error : null}
      </h2>
    </div>
  );
}

export default StatePlusEffect;
