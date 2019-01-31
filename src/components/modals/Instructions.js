import React from "react";

const Instructions = () => {
  return (
    <div className="modal fade" id="instructions" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              How to Play
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Click each image on the screen exactly once. Each unique click
              earns you one point. If you click the same image twice, it's game
              over.
            </p>
            <p>It can't be that simple right? You'll see...</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
            >
              Okay, Got It!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
