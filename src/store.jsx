import { observable, computed, action } from "mobx";

class TimerState {
  @observable initTime = 180.0;
  @observable time = this.initTime;
  @observable minute = "03";
  @observable seconds = "00";
  @observable start = false;
  @observable animationId = 0.0;
  @action.bound
  startStop() {
    this.start = !this.start;
  }
  @action.bound
  startTimer() {
    const startTime = new Date().getTime();
    const tempTime = this.time;
    const animation = () => {
      this.animationId = requestAnimationFrame(animation);
      if (Math.floor(this.time)==0) {
        this.stopTimer();
      } else {
        const time = (new Date().getTime() - startTime) / 1000;
        this.time = tempTime - time;
        this.minute =
          Math.floor(this.time / 60.0) < 10
            ? "0" + Math.floor(this.time / 60.0)
            : Math.floor(this.time / 60.0);
        this.seconds =
          Math.floor(this.time % 60.0) < 10
            ? "0" + Math.floor(this.time % 60.0)
            : Math.floor(this.time % 60.0);
      }
    };
    animation();
  }
  @action.bound
  stopTimer() {
    cancelAnimationFrame(this.animationId);
  }
  @action.bound
  initTimer() {
    this.time = this.initTime;
    this.minute =
      Math.floor(this.time / 60.0) < 10
        ? "0" + Math.floor(this.time / 60.0)
        : Math.floor(this.time / 60.0);
    this.seconds =
      Math.floor(this.time % 60.0) < 10
        ? "0" + Math.floor(this.time % 60.0)
        : Math.floor(this.time % 60.0);
    this.stopTimer();
    this.start = false;
  }
  @action.bound
  updateInitTime(time) {
    this.initTime = time;
    this.time = time;
  }
  @action.bound
  updateMinute(minute) {
    this.minute = minute;
  }
  @action.bound
  updateSeconds(seconds) {
    this.seconds = seconds;
  }
}

export default TimerState;
