import React, { Component } from 'react';


const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-248px',
};


const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};


const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};


class RSP extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 1000);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;

    if (imgCoord === rspCoords.바위) {
      this.setState({
        imgCoord: rspCoords.가위,
      });
    }
    else if (imgCoord === rspCoords.가위) {
      this.setState({
        imgCoord: rspCoords.보,
      })
    }
    else if (imgCoord === rspCoords.보) {
      this.setState({
        imgCoord: rspCoords.바위,
      })
    }
  };

  onClickBtn(choice) {
    const { imgCoord } = this.state;

    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];

    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "draw",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: 'won',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: 'lost',
          score: prevState.score - 1,
        };
      });
    }
    this.interval = setInterval(this.changeHand, 1000);
  }

  render() {
    const { result, score, imgCoord } = this.state;

    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
        <p>{scores[computerChoice(this.state.imgCoord)]}</p>
        <div>
          <button id="rock" className="" onClick={() => this.onClickBtn('바위')}> 바위 </button>
          <button id="scissor" className="" onClick={() => this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="" onClick={() => this.onClickBtn('보')}>보</button>
        </div>
        <p>Result: {this.state.result}</p>
      </>
    );
  }
}

export default RSP;