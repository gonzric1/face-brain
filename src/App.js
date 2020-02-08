import React, { Component } from 'react'
import './App.css';

import Logo from './components/logo/Logo'
import Navigation from './components/navigation/Navigation'   
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import Rank from './components/rank/Rank'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'
import Clarifai from 'clarifai'


const app = new Clarifai.App({
  apiKey: '9a5caaa2b67d40c3aa8bd913f67b8e2d'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '', 
      imageUrl: '',
      boundingBoxes: [],
      route: 'SIGNED_OUT', 
      isSignedIn: false,
      name: '',
      entries: null,
    }
  };

  setRoute = ( route ) => {
    
    if (route === 'SIGN_OUT' ) {
      this.setState({isSignedIn: false, name: '', entries: null})
    } else if ( route === 'HOME') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
    console.log('set_route:', route)
  }

  setUser = ( user ) => {
    this.setState({name: user.name, entries: user.entries})
    console.log("user is:", user)
  }

  onInputChange = (event) => {
    let url = event.target.value
    this.setState({input: url})

  };
  setBoundingBoxes = ( data ) => {
    const boxes = [];

    data.outputs[0].data.regions.forEach(element => {
      const box = element.region_info.bounding_box;
      const newbox = {
        top: parseInt(box.top_row * 100) + '%',
        bottom: parseInt(100 - box.bottom_row * 100) + '%',
        left: parseInt(box.left_col * 100) + '%',
        right: parseInt(100 - box.right_col * 100) + '%'
      }
      boxes.push(newbox)
    });
    this.setState({boundingBoxes: boxes})
  }
  
  onButtonSubmit = () => { 
    this.setState({imageUrl: this.state.input})
    const fetchParams = {
        headers: {"content-type":"application/json"}, 
        //body: JSON.stringify(this.state), 
        method: "PUT"
    }

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.setBoundingBoxes(response))
      .catch(
      function(err) {
        console.log("there was an error:", err)
        // there was an error
      })
    fetch('http://192.168.0.50:3001/image', fetchParams)
    .then((res) => {
      res.json().then(json => this.setState(json))
    })
    .catch((error) => {console.error('error:', error)})

  };

  render(){
    return (
      <div className="App">
        <Navigation setRoute={this.setRoute} route={this.state.route}/>
        <Logo />
        {
          this.state.route ==='HOME' ? 
            <>
              <Rank userName={this.state.name} entries={this.state.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit ={this.onButtonSubmit} />
              <FaceRecognition image={this.state.imageUrl} boundingBoxes={this.state.boundingBoxes}/>
            </>
          : this.state.route === 'SIGN_IN' ? <>
            <SignIn setRoute={this.setRoute} setUser={this.setUser}/> </>
          : this.state.route === 'REGISTER' ? 
            <>
            <Register setRoute={this.setRoute} setUser={this.setUser} />
            </>
          : null

        }
      </div>
    )};
}

export default App;
