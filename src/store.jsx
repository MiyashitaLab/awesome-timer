import { observable, computed, action } from "mobx";

class TimerState {
  @observable initTime = 180.0;
  @observable time = this.initTime;
  @observable minuteValue = "03";
  @observable minute = this.minuteValue;
  @observable secondsValue = "00";
  @observable seconds = this.secondsValue;
  @observable start = false;
  @observable animationId = 0;
  @action.bound
  startStop() {
    this.start = !this.start;
  }
  @action.bound
  startTimer() {
    const startTime = new Date().getTime();
    const tempTime = this.time;
    let soundStay = true;
    const animation = () => {
      this.animationId = requestAnimationFrame(animation);
      const time = (new Date().getTime() - startTime) / 1000;
      this.time = tempTime - time;
      if (Math.floor(this.time) == 0) {
        this.minute = "00";
        this.minuteValue = "00";
        this.seconds = "00";
        this.secondsValue = "00";
        if (soundStay) {
          const audio = document.createElement("audio");
          audio.src = "./Onmtp-Ding05-1.mp3";
          audio.play();
          soundStay = false;
        }
      } else if (Math.floor(this.time) < 0) {
        if (Math.floor(this.time) < -559) {
          this.stopTimer();
        }
        this.minute = "-" + Math.floor(Math.abs(this.time - 1) / 60.0) + 1;
        this.minuteValue = this.minute;
        this.seconds =
          Math.floor(Math.abs(this.time - 1) % 60.0) < 10
            ? "0" + Math.floor(Math.abs(this.time - 1) % 60.0)
            : Math.floor(Math.abs(this.time - 1) % 60.0);
        this.secondsValue = this.seconds;
      } else {
        //const time = (new Date().getTime() - startTime) / 1000;
        //this.time = tempTime - time;
        this.minute =
          Math.floor(this.time / 60.0) < 10
            ? "0" + Math.floor(this.time / 60.0)
            : Math.floor(this.time / 60.0);
        this.minuteValue = this.minute;
        this.seconds =
          Math.floor(this.time % 60.0) < 10
            ? "0" + Math.floor(this.time % 60.0)
            : Math.floor(this.time % 60.0);
        this.secondsValue = this.seconds;
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
    this.minuteValue = this.minute;
    this.seconds =
      Math.floor(this.time % 60.0) < 10
        ? "0" + Math.floor(this.time % 60.0)
        : Math.floor(this.time % 60.0);
    this.secondsValue = this.seconds;
    this.stopTimer();
    this.start = false;
  }
  @action.bound
  updateTime() {
    const minute = Number(this.minute);
    const seconds = Number(this.seconds);
    const time = minute * 60 + seconds;
    this.time = time;
  }
  @action.bound
  updateMinuteValue(minuteValue) {
    if (minuteValue < 100) {
      this.minuteValue = minuteValue;
      this.minute = this.minuteValue;
      this.initTime = Number(this.minuteValue) * 60 + Number(this.seconds);
    }
  }
  @action.bound
  updateMinute(minute) {
    if (minute < 10) {
      this.minute = "0" + minute;
    } else if (minute < 100) {
      this.minute = "" + minute;
    }
    this.minuteValue = this.minute;
  }
  @action.bound
  updateSecondsValue(secondsValue) {
    if (secondsValue < 60) {
      this.secondsValue = secondsValue;
      this.seconds = this.secondsValue;
      this.initTime = Number(this.minute) * 60 + Number(this.secondsValue);
    }
  }
  @action.bound
  updateSeconds(seconds) {
    if (seconds < 10) {
      this.seconds = "0" + seconds;
    } else if (seconds < 60) {
      this.seconds = "" + seconds;
    } else if (seconds < 6000) {
      let minute = Number(this.minute);
      this.minute =
        minute + Math.floor(seconds / 60) < 100
          ? "" + (minute + Math.floor(seconds / 60))
          : "" + 99;
      minute = Number(this.minute);
      this.seconds =
        minute == 99
          ? this.seconds
          : Math.floor(seconds % 60) < 10
            ? "0" + Math.floor(seconds % 60)
            : Math.floor(seconds % 60);
    } else {
      this.minute = "" + 99;
      this.seconds = "" + 59;
    }
    this.secondsValue = this.seconds;
  }
}

export default TimerState;
