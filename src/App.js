import React, { Component } from 'react';
import BeepSound from "./BeepSound.wav";

class App extends Component {
  state={
    break:5,
    session:25,
    countdown:1500,
    //intervalId:null,
    isActive:false,
    isSession:true,
  }

  componentDidUpdate(prevprops,prevstate){
    if (prevstate.countdown <= 0 ){
      let time = prevstate.isSession ? this.state.break*60 : this.state.session*60
      //clearInterval(prevstate.intervalId)
      clearInterval(this.timer)
      this.setState({
        countdown:time,
        //intervalId:null,
        isSession:!prevstate.isSession
      })
      document.getElementById("beep").play()
      this.start()
    }

  }
  reset = ()=>{
    document.getElementById("beep").pause()
    document.getElementById("beep").currentTime = 0
    this.setState({
      break:5,
      session:25,
      countdown:1500,
      isSession:true,
      isActive:false
    })
    //clearInterval(this.state.intervalId)
    clearInterval(this.timer)
  }

  start = () => {
    this.setState({
      isActive:true,
    })
    this.timer = setInterval(()=>{
      this.setState({
        countdown:this.state.countdown-1,
      },)
    },1000)
  }

  pause =() => {
    clearInterval(this.timer)
    this.setState({
      isActive:!this.state.isActive

    })
  }

  incrementValue = (e) =>{
    const name = e.target.title
    if (this.state[name] !==60){
      this.setState(prev => ({
        [name]: prev[name]+1,
        countdown: ((prev.isSession && name==="session" ) || (!prev.isSession && name==="break")) ? prev.countdown+60 : prev.countdown
      }))
    }
  }

  decrementValue = (e) =>{
    const element = e.target
    for (let index = 0; index < 6; index++) {
      setTimeout(()=>{
        let x =3 * (index %2===0 ? 1:-1)
        let y = 3
        element.style.transform=`translate(${x}px,${y}px)`
      },index*100)
      element.style.transform="translate(0px,0px)" 
    }
    const name = e.target.title
    if (this.state[name] !== 1) {
      this.setState(prev => ({
        [name]:prev[name]-1,
        countdown: ((prev.isSession && name==="session" ) || (!prev.isSession && name==="break")) ? prev.countdown-60 : prev.countdown
      }))
    }

  }

  render() {
    let min = Math.floor(this.state.countdown/60)
    let sec = this.state.countdown-min*60
    let time =(min<10 ? "0"+min:min)+":"+(sec<10 ? "0"+sec:sec)
    return (
      <>
        <div id="wrapper">
        <div id="break">
          <div id="break-label">Break length</div>
          <div id="break-length">{this.state.break}</div>
          <div title="break" id="break-decrement" onClick={this.decrementValue}>-</div>
          <div title="break" id="break-increment" onClick={this.incrementValue}>+</div>
        </div>
        
        <div id="session">
          <div id="session-label">Session length</div>
          <div id="session-length">{this.state.session}</div>
          <div title="session" id="session-decrement" onClick={this.decrementValue}>-</div>
          <div title="session" id="session-increment" onClick={this.incrementValue}>+</div>
        </div>
        </div>
        <div id="timer">
          <div id="timer-label" style={{color:this.state.isSession ? "red" : "inherit"}}>{this.state.isSession ? "Session" : "Break"}</div>
          <div id="time-left">{time}</div>
        </div>
        <div id="controls">
          <div id="start_stop" onClick={!this.state.isActive? this.start : this.pause}>PLAY/PAUSE</div>
          <div id="reset" onClick={this.reset}>REFRESH</div>
        </div>
        <audio id="beep" src={BeepSound}></audio>
      </>
    );
  }
}

export default App;
