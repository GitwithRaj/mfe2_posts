import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [editPost, setEditPost] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://test-api-1-zbvp.onrender.com/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    axios.get('https://test-api-1-zbvp.onrender.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreate = () => {
    axios.post('https://test-api-1-zbvp.onrender.com/posts', newPost)
      .then(response => {
        setPosts([...posts, response.data]);
        setNewPost({ title: '', content: '' });
      })
      .catch(error => console.error(error));
  };

  const handleUpdate = () => {
    axios.put(`https://test-api-1-zbvp.onrender.com/posts/${editPost.id}`, editPost)
      .then(response => {
        setPosts(posts.map(post => (post.id === editPost.id ? response.data : post)));
        setEditPost(null);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`https://test-api-1-zbvp.onrender.com/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content}
            <button onClick={() => setEditPost(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>{editPost ? 'Edit Post' : 'Add New Post'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={editPost ? editPost.title : newPost.title}
        onChange={e => editPost ? setEditPost({ ...editPost, title: e.target.value }) : setNewPost({ ...newPost, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={editPost ? editPost.content : newPost.content}
        onChange={e => editPost ? setEditPost({ ...editPost, content: e.target.value }) : setNewPost({ ...newPost, content: e.target.value })}
      />
      <button onClick={editPost ? handleUpdate : handleCreate}>
        {editPost ? 'Update Post' : 'Create Post'}
      </button>
      <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
    <a href='http://localhost:3000/'>Users</a>
    </div>
  );
};

export default App;
