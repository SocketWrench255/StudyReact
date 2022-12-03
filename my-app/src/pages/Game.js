import React from 'react'

class Game extends React.Component {
  constructor(props) {
    super(props);
    //画面で表示する変数を作る
    this.state = this.getInitialState();
  }
  renderCard(i) {
    return (
      <Card key={i}
        number={this.state.cards[i]}
        ready={this.state.status[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    const cards = [];
    for (let i = 0; i < 10; i++) {
      cards.push(this.renderCard(i));
    }
    /* for (let i = 0; i < 26; i++) {
      cards.push(this.renderCard(i));
    } */
    return (
      <div>
        <button className="start-button" onClick={this.gameStart}>スタート</button>
        <div className="count-number">残り：{this.state.count}秒</div>
        <div className="table">
          {cards}
        </div>
        <div className="status">{this.state.message}</div>
        <div className={this.state.overlay}><p className="title">{this.state.title}</p></div>
      </div>
    )
  }

  gameStart = () => {
    if (this.state.run) {
      return;
    }
    this.setState(this.getInitialState());
    const timer = setInterval(() => this.countDown(), 1000);
    this.setState({
      timer: timer,
      run: true,
      overlay: ''
    });
  }

  countDown = () => {
    let nextCount = this.state.count - 1;
    if (nextCount < 1) {
      this.setState({
        message: '',
        count: 0,
        run: false,
        title: 'ゲームオーバー',
        overlay: 'overlay overlay-end'
      });
      clearInterval(this.state.timer);
    } else {
      this.setState({
        count: nextCount
      });
    }
  }

  handleClick(i) {
    const sts = this.state.status.slice();
    //未選択以外をクリックされた時は無視
    if (this.state.status[i] != 0) {
      return;
    }
    //ゲームスタートしてなければ無視
    let run = this.state.run;
    if (!run) {
      return;
    }
    let ready = -1;
    let message = "";
    let title = "";
    let overlay = "";
    if (this.state.ready == -2) {
      return;
    } else if (this.state.ready == -1) {
      //1枚目をクリックした時の処理
      sts[i] = 1;
      ready = i;
    } else if (this.state.ready != i) {
      //2枚目をクリックした時の処理
      sts[i] = 1;
      //2枚揃ったかどうかを判定
      if (this.state.cards[this.state.ready] == this.state.cards[i]) {
        //2枚揃った！
        message = "あたり";
        sts[this.state.ready] = 2;
        sts[i] = 2;
        if (!this.isFinish(sts)) {
          setTimeout(() => {
            this.cardClear();
          }, 800);
        } else {
          message = '';
          run = false;
          title = "おめでとうございます。卒業です！";
          overlay = 'overlay overlay-end';
          clearInterval(this.state.timer);
        }
      } else {
        //揃ってなかった!
        message = "はずれ";
        ready = -2;
        sts[this.state.ready] = 3;
        sts[i] = 3;
        //少し経過後に元に戻す
        const rollbacksts = this.state.status.slice();
        rollbacksts[this.state.ready] = 0;
        rollbacksts[i] = 0;
        setTimeout(() => {
          this.cardClear();
          this.cardReset(rollbacksts);
        }, 800);
      }
    }
    this.setState({
      status: sts,
      ready: ready,
      message: message,
      run: run,
      title: title,
      overlay: overlay
    });
  }

  cardReset = (sts) => {
    this.setState({
      status: sts,
      ready: -1
    });
  }

  cardClear = () => {
    this.setState({
      message: ""
    });
  }

  isFinish = (sts) => {
    let flg = true;
    for (let i = 0; i < sts.length; i++) {
      if (sts[i] != 2) {
        flg = false;
        break;
      }
    }
    return flg;
  }

  getInitialState = () => {
    let tranpNo=[];
    for (let number = 1; number <= 13; number++) {
      // トランプナンバーが13枚振り分けられる。
      tranpNo.push(number);
    }
    tranpNo = this.shuffle(tranpNo);
    let arr = [];
    for (let useNumber = 0; useNumber <= 4; useNumber++) {
      // 13枚のトランプから5種類のトランプを選ぶ。
      arr.push(tranpNo[useNumber]);
      arr.push(tranpNo[useNumber]);
    }

    //let arr = Array("♡", "♡", "♢", "♢", "♤", "♤", "♧", "♧", "♥", "♥");
    //let sts = Array(10).fill(0);
    let sts = Array(10).fill(0);
    arr = this.shuffle(arr);
    return {
      cards: arr,
      status: sts,
      ready: -1,
      message: '',
      count: 30,
      timer: null,
      title: '',
      run: false,
      overlay: 'overlay'
    }
  }
  shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

function Card(props) {
  let cardStyle = 'card card-ura';
  let numStyle = 'omote';
  switch (props.ready) {
    case 1:
      numStyle = 'ura';
      break;
    case 2:
      numStyle = "ura atari";
      break;
    case 3:
      numStyle = "ura hazure";
      break;
    default:
      cardStyle = 'card card-omote';
      break;
  }
  return (
    <button className={cardStyle} onClick={props.onClick}>
      <div className={numStyle}><span>{props.number}</span></div>
    </button>
  );
}

export default Game;