import React, { Component } from "react";
import Image from "./Image";
import images from "../images.json";

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
    let reorderedImages = [];

    //find which picture id was clicked
    let clickedImg = images.filter(image => image.id === id);

    //check if the picture was clicked before
    if (clickedImg[0].clicked) {
      //this resets the game
      reorderedImages = this.state.images.map(image => {
        image.clicked = false;
        return image;
      });
      score = 0;
      alert("YOU LOST");
    } else {
      //score added by 1 and reorder the images
      reorderedImages = this.state.images.map(image => {
        if (image.id === id) {
          image.clicked = !image.clicked;
        }
        return image;
      });
      score++;
      if (score > highScore) highScore = score;
      if (score === 12) {
        alert("YOU WIN!");
        reorderedImages = this.state.images.map(image => {
          image.clicked = false;
          return image;
        });
        score = 0;
      }
    }
    this.setState({ images: reorderedImages, score, highScore });
    this.reorder();
  };

  componentDidMount() {
    this.reorder();
  }

  //reorders the images
  reorder = () => {
    let stateCopy = this.state.images;
    let reorderedImages = [];
    //the for function is going through all 12 pictures
    for (let i = 0; stateCopy.length > 0; i++) {
      //splice is going to take the one of the pictures out
      let element = stateCopy.splice(
        Math.floor(Math.random() * stateCopy.length),
        1
      );
      //after all the 12 pictures are taken out 
      reorderedImages[i] = element[0];
    }
    this.setState({ images: reorderedImages });
  };

  //
  render() {
    const { images, score } = this.state;
    const img = images.map(image => (
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
          <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 id="title" className="navbar-brand">
                    Click and remember what you clicked!!! Score: {score}
                  </h1>
                </div>
                <div className="w-100" />
                <div className="col-6" />
                <div className="col-6">
                  <a
                    href="https://github.com/chandashrestha/ClickyReact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="btn btn-danger">
                      Click to go to Github!!
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="container text-center">{img}</main>
        <div className="placeholder" />
      </div>
    );
  }
}

export default Page;
