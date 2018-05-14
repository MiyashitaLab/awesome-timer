import "./style.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { inject, observer } from "mobx-react";
import TimerState from "./store.jsx";
import StartButton from "./StartButton.jsx";
import StopButton from "./StopButton.jsx";

@inject("timerState")
@observer
class Minute extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.timerState.updateMinuteValue(e.target.value);
  }
  render() {
    return (
      <div
        id="minuteFrame"
        style={(() => {
          if (!this.props.timerState.start) {
            return {
              animation: "Flash 0.8s infinite"
            };
          }
        })()}
      >
        <input
          type="text"
          id="minute"
          value={
            this.props.timerState.start
              ? this.props.timerState.minute
              : this.props.timerState.minuteValue
          }
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

@inject("timerState")
@observer
class Seconds extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.timerState.updateSecondsValue(e.target.value);
  }
  render() {
    return (
      <div
        id="secondFrame"
        style={(() => {
          if (!this.props.timerState.start) {
            return {
              animation: "Flash 0.8s infinite"
            };
          }
        })()}
      >      
        <input
          type="text"
          id="second"
          value={
            this.props.timerState.start
              ? this.props.timerState.seconds
              : this.props.timerState.secondsValue
          }
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="timerFrame">
        <Minute />
        <div id="colon">:</div>
        <Seconds />
      </div>
    );
  }
}

@inject("timerState")
@observer
class TimeFlow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <svg
        id="timeFlow"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      />
    );
  }
}

const stores = {
  timerState: new TimerState()
};

ReactDOM.render(
  <Provider {...stores}>
    <React.Fragment>      
      <TimeFlow />
      <Timer />
      <StartButton />
      <StopButton />
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);
