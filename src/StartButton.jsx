import React from "react";
import { inject, observer } from "mobx-react";

@inject("timerState")
@observer
class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.props.timerState.start) {
      this.props.timerState.stopTimer();
    } else {
      const minute = Number(this.props.timerState.minuteValue);
      const seconds = Number(this.props.timerState.secondsValue);      
      this.props.timerState.updateMinute(minute);
      this.props.timerState.updateSeconds(seconds);
      this.props.timerState.updateTime();
      this.props.timerState.startTimer();
    }
    this.props.timerState.startStop();
  }
  render() {
    return (
      <button id="startButton" onClick={this.handleClick}>
        {(start => {
          return start ? "▯▯" : "▷";
        })(this.props.timerState.start)}
      </button>
    );
  }
}
export default StartButton;
