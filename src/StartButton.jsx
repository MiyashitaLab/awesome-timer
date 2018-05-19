import React from "react";
import { inject, observer } from "mobx-react";

@inject("timerState")
@observer
class StartButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state={
      vmin:Math.min(window.innerWidth,window.innerHeight)
    }
    this.handleResize=this.handleResize.bind(this);
  }
  componentDidMount(){
    window.addEventListener("resize",this.handleResize);
  }
  componentWillUnmount(){
    window.removeEventListener("resize",this.handleResize);
  }
  handleResize(){
    this.setState({
      vmin:Math.min(window.innerWidth,window.innerHeight)
    })
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
      <button onClick={this.handleClick}>
        <svg className="ButtonDesign"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
         {(start=>{
           const vmin=this.state.vmin/500;
           return start ?
           <React.Fragment>
           <rect id="startButtonDesign1"/>
          <rect id="startButtonDesign2"/>
          </React.Fragment>
          :<polygon id="startButtonDesign3" points={35*vmin+","+25*vmin+" "+85*vmin+","+55*vmin+" "+35*vmin+","+85*vmin}/>
         })(this.props.timerState.start)}
        </svg>        
      </button>
    );
  }
}
export default StartButton;
