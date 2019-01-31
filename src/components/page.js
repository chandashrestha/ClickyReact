import React, { Component } from "react";
import Image from "./Image";
import Footer from "./Footer";
import images from "../images.json";

//Modals
import Instructions from "./modals/Instructions";

class Page extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      highScore: 0,
      images
    };
  }

  onClick = id => {
    let { images, score, highScore } = this.state;
    let newState = [];

    //Obtain the element of the clicked image
    let clickedImg = images.filter(image => image.id === id);

    if (clickedImg[0].clicked) {
      //Not unique, game over
      //Reset all clicked states to false
      newState = this.state.images.map(image => {
        image.clicked = false;
        return image;
      });
      score = 0;
      alert("Game over!");
    } else {
      //Unique click. +1
      newState = this.state.images.map(image => {
        if (image.id === id) {
          image.clicked = !image.clicked;
          //console.log("Id " + image.id + " is now " + image.clicked);
        }
        return image;
      });
      score++;
      if (score > highScore) highScore = score;
      if (score === 12) {
        alert("YOU'RE WINNER!");
        newState = this.state.images.map(image => {
          image.clicked = false;
          return image;
        });
        score = 0;
      }
    }
    this.setState({ images: newState, score, highScore });
    this.randomize();
  };

  componentDidMount() {
    this.randomize();
  }

  randomize = () => {
    let stateCopy = this.state.images;
    let newState = [];
    for (let i = 0; stateCopy.length > 0; i++) {
      //Yank a random image out of the state. Splice returns an array.
      let element = stateCopy.splice(
        Math.floor(Math.random() * stateCopy.length),
        1
      );
      newState[i] = element[0];
    }
    this.setState({ images: newState });
  };

  render() {
    const { images, score, highScore } = this.state;
    const images = images.map(image => (
      <Image
        key={image.id}
        id={image.id}
        src={require("../images/" + image.src)}
        onClick={this.onClick}
      />
    ));
    return (
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 id="title" className="navbar-brand mx-auto">
                    <i className="fab fa-react" style={{ color: "#00d8ff" }} />{" "}
                    React Clicky: Dank Memes Edition
                  </h1>
                </div>
                <div className="w-100" />
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    data-toggle="modal"
                    data-target="#instructions"
                  >
                    How to Play
                  </button>
                </div>
                <div className="col-6">
                  <a
                    href="https://github.com/misazander/shufflin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-primary btn-block">
                      GitHub Repo
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="container text-center">{images}</main>
        <div className="placeholder" />
        <footer className="footer">
          <Footer score={score} highScore={highScore} />
        </footer>
        <Instructions />
      </div>
    );
  }
}

export default Page;
