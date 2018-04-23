import React from "react";
import { inject, observer } from "mobx-react";

@inject("timerState")
@observer
class StartButton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    if (this.props.timerState.start) {
      this.props.timerState.stopTimer();
    } else {
      this.props.timerState.startTimer();
    }
    this.props.timerState.startStop();
  }
  render() {
    return (
      <button id="startButton" onClick={this.handleClick.bind(this)}>
        {(start => {          
          return start ? "▯▯":"▷";
        })(this.props.timerState.start)}
      </button>
    );
  }
}

export default StartButton;
