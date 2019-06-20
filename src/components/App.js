import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.searchPosts = this.searchPosts.bind(this)
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then(res => {
      toast.success('Posts have been retrieved');
      this.setState({ posts: res.data})
      
    })
    .catch(err => toast.error('Could not get posts!'))
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then(res => {
      this.setState({posts: res.data})
    })
  
  }

  deletePost(id) {
    console.log('ran delete function')
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(res => {
      this.setState({posts: res.data})
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(res => {
      this.setState({posts: res.data})
    })
  }

  searchPosts(value){
    axios.get(`https://practiceapi.devmountain.com/api/posts/filter?text=${value}`).then(res =>{ 
      this.setState({posts: res.data})
    })
    .catch(err => {console.log('could not retrieve because of', err)})
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchPosts={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostfn={this.createPost}/>
          {posts.map(post  => {
          return <Post key={post.id} 
                      text={post.text} 
                      date={post.date} 
                      id={post.id} 
                      updatePostfn={this.updatePost}
                      deletePostfn={this.deletePost}/>})}
        </section>
      </div>
    );
  }
}

export default App;
