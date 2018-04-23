import React from "react";
import { inject, observer } from "mobx-react";

@inject("timerState")
@observer
class StopButton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(){
      this.props.timerState.initTimer();
  }
  render() {
    return <button id="stopButton" onClick={this.handleClick.bind(this)}>□</button>;
  }
}

export default StopButton;
