import React, { Component } from 'react';
import './App.css';
var timer = null
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      sessionLeft: 1500,
      breakLeft: 300,
      clockStarted: false,
      currentMode: "session",
    }
  }
  // time calculate and display
  timeConvert = () => {
    const { sessionLeft,
      breakLeft } = this.state
    let min = 0
    let sec = 0
    if (sessionLeft > 0) {
      min = sessionLeft / 60
      sec = sessionLeft % 60
      min = Math.floor(min)
      sec = sec >= 10 ? sec : "0" + sec
    } else if (breakLeft >= 0) {
      min = breakLeft / 60
      sec = breakLeft % 60
      min = Math.floor(min)
      sec = sec >= 10 ? sec : "0" + sec
    }
    return min + ":" + sec
  }

  setBtnClicked = (value) => {
    const { sessionLength, breakLength, clockStarted } = this.state
    if (!clockStarted) {
      if (value === "break-dec") {
        this.setState({
          breakLength: breakLength > 1 ? breakLength - 1 : breakLength,
          breakLeft: breakLength > 1 ? (breakLength - 1) * 60 : 60
        })
      } else if (value === "break-inc") {
        this.setState({
          breakLength: breakLength < 60 ? breakLength + 1 : breakLength,
          breakLeft: breakLength < 60 ? (breakLength + 1) * 60 : 3600
        })
      } else if (value === "sess-dec") {
        this.setState({
          sessionLength: sessionLength > 1 ? sessionLength - 1 : sessionLength,
          sessionLeft: sessionLength > 1 ? (sessionLength - 1) * 60 : 60
        })
      } else if (value === "sess-inc") {
        this.setState({
          sessionLength: sessionLength < 60 ? sessionLength + 1 : sessionLength,
          sessionLeft: sessionLength < 60 ? (sessionLength + 1) * 60 : 3600
        })
      }
    }
  }
  // clock control
  countInterval = () => {
    const {
      currentMode,
      sessionLeft,
      sessionLength,
      breakLeft,
      breakLength } = this.state
    if (currentMode === "session") {
      if (sessionLeft === 0) {
        this.setState({
          currentMode: "break",
          breakLeft: breakLength * 60
        })
      } else {
        this.setState({ sessionLeft: sessionLeft - 1 })
      }
    } else if (currentMode === "break") {
      if (breakLeft === 0) {
        this.setState({
          currentMode: "session",
          sessionLeft: sessionLength * 60
        })
      } else {
        this.setState({ breakLeft: breakLeft - 1 })
      }
    }
  }

  startStopClicked = () => {
    const { clockStarted } = this.state
    if (timer === null) {
      timer =
        setInterval(() => {
          this.countInterval()
        }, 1000)
    }
    if (timer !== null && clockStarted) {
      this.setState({ clockStarted: false })
      clearInterval(timer)
      timer = null
    } else {
      this.setState({
        clockStarted: true
      })
    }
  }
  resetClicked = () => {
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      sessionLeft: 1500,
      breakLeft: 300,
      clockStarted: false,
      currentMode: "session",
    })
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }
  clockClass() {
    const { currentMode, sessionLeft, breakLeft } = this.state
    if (currentMode === "session" && sessionLeft < 60) {
      return "clock-container-red"
    } else if (currentMode === "break" && breakLeft < 60) {
      return "clock-container-red"
    } else {
      return "clock-container-white"
    }
  }
  render() {
    const { sessionLength, breakLength } = this.state
    return (
      <React.Fragment>
        <div className="App">
          <audio id="beep" src=""></audio>
          <div className="app-container">
            <div className="title">Pomodoro Clock</div>
            <div className="setting-control-container">
              <div id="break-label">Break Length</div>
              <div id="break-decrement" onClick={() => this.setBtnClicked("break-dec")}>
                <i className="fas fa-angle-double-down"></i>
              </div>
              <div id="break-length">{breakLength}</div>
              <div id="break-increment" onClick={() => this.setBtnClicked("break-inc")}>
                <i className="fas fa-angle-double-up"></i>
              </div>
              <div id="session-label">Session Length</div>
              <div id="session-decrement" onClick={() => this.setBtnClicked("sess-dec")}>
                <i className="fas fa-angle-double-down"></i>
              </div>
              <div id="session-length">{sessionLength}</div>
              <div id="session-increment" onClick={() => this.setBtnClicked("sess-inc")}>
                <i className="fas fa-angle-double-up"></i>
              </div>
            </div>
            <div className={this.clockClass()}>
              {this.state.currentMode === "session" ?
                <p id="timer-label">Session</p> :
                <p id="timer-label">Break</p>
              }
              <p id="time-left">{this.timeConvert()}</p>
            </div>
            <div className="clock-control-container">
              <div className="clock-control-btns">
                <p id="start_stop" onClick={this.startStopClicked}>
                  <i className="fas fa-play"></i><i className="fas fa-stop"></i>
                </p>
                <p id="reset" onClick={this.resetClicked}><i className="fas fa-retweet"></i></p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
