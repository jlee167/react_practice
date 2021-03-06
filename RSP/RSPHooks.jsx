import React, { useState, useRef, useEffect } from 'react';


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


const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);

  const interval = useRef();

  useEffect(() => { //didmount, didupdate
    interval.current = setInterval(changeHand, 1000);

    return () => { //unmount
      clearInterval(interval.current);
    }
  }, [imgCoord]);


  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    }
    else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    }
    else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };



  const onClickBtn = (choice) => {

    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    console.log(myScore);
    console.log(cpuScore);
    const diff = myScore - cpuScore;

    if (diff === 0) {
      setResult("draw");
    } else if ([-1, 2].includes(diff)) {
      setResult("won");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("lost");
      setScore((prevScore) => prevScore - 1);
    }
    interval.current = setInterval(changeHand, 1000);
  }

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
      <div>
        <button id="rock" className="" onClick={() => onClickBtn('바위')}> 바위 </button>
        <button id="scissor" className="" onClick={() => onClickBtn('가위')}>가위</button>
        <button id="paper" className="" onClick={() => onClickBtn('보')}>보</button>
      </div>
      <p>Result: {result}</p>
    </>
  );
}

export default RSP;