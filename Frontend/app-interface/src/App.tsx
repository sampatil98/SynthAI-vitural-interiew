import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import  Homepage  from './components/Homepage';
import PostPage from './components/PostPage';
import Feedback from './components/Feedback';


function App() {
  return (
    <div className="App">
     <Navbar/>
     <Homepage/>
     <PostPage/>
     <Feedback/>
    </div>
  );
}

export default App;
