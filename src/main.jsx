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
    this.state = {
      backgroundColor: "#fff",
      mouseEnter: false
    };
  }
  handleMouseEnter() {
    this.setState({
      backgroundColor: "#eee"
    });
  }
  handleMouseLeave() {
    this.setState({
      backgroundColor: "#fff"
    });
  }
  handleClick() {
    this.setState({
      mouseEnter: true
    });
    console.log(this.refs.minuteOptions);
    
  }
  handleTimeClick(e) {
    this.props.timerState.updateInitTime(
      Number(e.nativeEvent.target.innerHTML) * 60 +
        Number(this.props.timerState.seconds)
    );
    this.props.timerState.updateMinute(e.nativeEvent.target.innerHTML);
    this.setState({
      mouseEnter: false
    });
  }

  render() {
    let states = new Array(10);
    for (let i = 0; i < 60; i++) {
      states[i] = i < 10 ? "0" + i : "" + i;
    }
    return (
      <React.Fragment>
        {(start => {
          if (start) {
            return <div id="minute">{this.props.timerState.minute}</div>;
          } else {
            return (
              <React.Fragment>
                <div
                  id="minuteSelect"
                  onMouseEnter={this.handleMouseEnter.bind(this)}
                  onMouseLeave={this.handleMouseLeave.bind(this)}
                  onClick={this.handleClick.bind(this)}
                  style={{
                    backgroundColor: this.state.backgroundColor
                  }}
                >
                  {(mouseEnter => {
                    if (!mouseEnter) {
                      return this.props.timerState.minute;
                    }
                  })(this.state.mouseEnter)}
                </div>
                {(() => {
                  if (this.state.mouseEnter) {
                    return (
                      <div ref="minuteOptions" id="minuteOptions">
                        <ul
                          style={{
                            margin: 0,
                            padding: 0
                          }}
                        >
                          {states.map(e => {
                            return (
                              <li key={e}>
                                <p
                                  className="minuteOption"
                                  onClick={this.handleTimeClick.bind(this)}
                                >
                                  {e}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }
                })()}
              </React.Fragment>
            );
          }
        })(this.props.timerState.start)}
      </React.Fragment>
    );
  }
}

@inject("timerState")
@observer
class Seconds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "#fff",
      mouseEnter: false
    };
  }
  handleMouseEnter() {
    this.setState({
      backgroundColor: "#eee"
    });
  }
  handleMouseLeave() {
    this.setState({
      backgroundColor: "#fff"
    });
  }
  handleClick() {
    this.setState({
      mouseEnter: true
    });
  }

  handleTimeClick(e) {
    this.props.timerState.updateInitTime(
      Number(this.props.timerState.minute) * 60 +
        Number(e.nativeEvent.target.innerHTML)
    );
    this.props.timerState.updateSeconds(e.nativeEvent.target.innerHTML);
    this.setState({
      mouseEnter: false
    });
  }
  render() {
    let states = ["00", "15", "30", "45"];

    return (
      <React.Fragment>
        {(start => {
          if (start) {
            return <div id="seconds">{this.props.timerState.seconds}</div>;
          } else {
            return (
              <React.Fragment>
                <div
                  style={{
                    backgroundColor: this.state.backgroundColor
                  }}
                  id="secondsSelect"
                  onMouseEnter={this.handleMouseEnter.bind(this)}
                  onMouseLeave={this.handleMouseLeave.bind(this)}
                  onClick={this.handleClick.bind(this)}
                >
                  {(mouseEnter => {
                    if (!mouseEnter) {
                      return this.props.timerState.seconds;
                    }
                  })(this.state.mouseEnter)}
                </div>
                {(() => {
                  if (this.state.mouseEnter) {
                    return (
                      <div id="secondsOptions">
                        <ul
                          style={{
                            margin: 0,
                            padding: 0
                          }}
                        >
                          {states.map(e => {
                            return (
                              <li key={e}>
                                <p
                                  className="secondsOption"
                                  onClick={this.handleTimeClick.bind(this)}
                                >
                                  {e}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }
                })()}
              </React.Fragment>
            );
          }
        })(this.props.timerState.start)}
      </React.Fragment>
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
