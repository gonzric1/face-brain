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
      isSignedIn: false
    }
  };

  setRoute = ( route ) => {
    
    if (route === 'SIGN_OUT' ) {
      this.setState({isSignedIn: false})
    } else if ( route === 'HOME') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
    console.log('set_route:', route)
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

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.setBoundingBoxes(response))
      .catch(
      function(err) {
        console.log("there was an error:", err)
        // there was an error
      })

  };

  render(){
    return (
      <div className="App">
        <Navigation setRoute={this.setRoute} route={this.state.route}/>
        <Logo />
        {
          this.state.route ==='HOME' ? 
            <>
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit ={this.onButtonSubmit} />
              <FaceRecognition image={this.state.imageUrl} boundingBoxes={this.state.boundingBoxes}/>
            </>
          : this.state.route === 'SIGN_IN' ? <>
            <SignIn setRoute={this.setRoute}/> </>
          : this.state.route === 'REGISTER' ? 
            <>
            <Register setRoute={this.setRoute} />
            </>
          : null

        }
      </div>
    )};
}

export default App;
