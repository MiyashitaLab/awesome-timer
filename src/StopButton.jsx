import React from "react";
import { inject, observer } from "mobx-react";

@inject("timerState")
@observer
class StopButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.timerState.initTimer();
  }
  render() {
    return (
      <button id="stopButton" onClick={this.handleClick}>
        <svg
          className="ButtonDesign"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect id="stopButtonDesign" />          
        </svg>
      </button>
    );
  }
}

export default StopButton;
