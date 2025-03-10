class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [
        {
          text:
            "The only limit to our realization of tomorrow is our doubts of today.",
          author: "Franklin D. Roosevelt"
        },
        {
          text: "Do what you can, with what you have, where you are.",
          author: "Theodore Roosevelt"
        },
        {
          text: "In the middle of every difficulty lies opportunity.",
          author: "Albert Einstein"
        },
        {
          text:
            "Life isn’t about getting and having, it’s about giving and being.",
          author: "Kevin Kruse"
        }
      ],
      currentQuote: {
        text:
          "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
      },
      backgroundColor: "#36454F"
    };

    this.handleNewQuote = this.handleNewQuote.bind(this);
  }

  handleNewQuote() {
    const randomQuote = this.state.quotes[
      Math.floor(Math.random() * this.state.quotes.length)
    ];

    const colors = [
      "#333333",
      "#33FF57",
      "#3357FF",
      "#FF33A8",
      "#FF8C33",
      "#8C33FF"
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    this.setState({
      currentQuote: randomQuote,
      backgroundColor: randomColor
    });
  }

  render() {
    const { currentQuote, backgroundColor } = this.state;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${currentQuote.text}" - ${currentQuote.author}`
    )}`;
    const styles = {
      container: {
        backgroundColor: backgroundColor,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.5s"
      },
      quoteBox: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        width: "50%",
        maxWidth: "500px"
      },
      text: {
        color: backgroundColor,
        fontSize: "40px",
        textAlign: "center"
      },
      buttonRow: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "20px"
      },
      button: {
        backgroundColor: backgroundColor,
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "0.3s"
      },
      socialIcon: {
        marginTop: "10px"
      },
      twitterLink: {
        color: "blue",
        fontSize: "24px",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        backgroundColor: backgroundColor,
        borderRadius: "50%",
        transition: "0.3s"
      }
    };

    return (
      <div style={styles.container}>
        <div id="quote-box" style={styles.quoteBox}>
          <p id="text" style={styles.text}>
            {currentQuote.text}
          </p>
          <p id="author" style={styles.text}>
            - {currentQuote.author}
          </p>
          <div style={styles.buttonRow}>
            <a
              id="tweet-quote"
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.twitterLink}
            >
              <i className="fab fa-twitter"></i>
            </a>
            <button
              id="new-quote"
              style={styles.button}
              onClick={this.handleNewQuote}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("quote");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<QuoteMachine />);
}

class JScriptCalcApp extends React.Component {
    constructor(props){
      super(props);
      
      this.state = {
        input: "",
        output: "0",
        lastResult: null,
        newCalculation: false
      }
      
      this.handleClick = this.handleClick.bind(this);
      this.handleCalc = this.handleCalc.bind(this);
      this.clearAC = this.clearAC.bind(this);
    }
    
      handleClick(value) {
    this.setState((prevState) => {
      let { input, lastResult, newCalculation } = prevState;
  
      if (newCalculation && /[0-9]/.test(value)) {
        input = "";
        newCalculation = false;
      }
  
      const isOperator = /[+\-*/]/;
      const lastChar = input.slice(-1);
  
      if (isOperator.test(lastChar) && isOperator.test(value)) {
    if (value === "-") {
      // Allow negative sign after an operator, but not multiple negatives
      if (lastChar !== "-") {
        return { input: input + value, newCalculation: false };
      }
      return null; // Ignore multiple negative signs
    }
    // Replace previous operator(s) with the new one
    return { input: input.replace(/[-+*/]+$/, value), newCalculation: false };
  }
  
      // Prevent multiple decimals in a single number
      if (value === ".") {
        const parts = input.split(/[-+*/]/);
        if (parts[parts.length - 1].includes(".")) {
          return null; // Ignore input if the current number already contains a decimal
        }
      }
  
      // Prevent numbers from starting with multiple zeros
      const parts = input.split(/[-+*/]/);
      const lastNum = parts[parts.length - 1];
  
      if (value === "0" && (lastNum === "0" || lastNum === "")) {
        return null; // Ignore multiple leading zeros
      }
  
      // If an operator is pressed after "=", start a new calculation using lastResult
      if (newCalculation && isOperator.test(value)) {
        input = lastResult.toString();
        newCalculation = false;
      }
  
      return {
        input: input + value,
        output: input + value,
        newCalculation: false,
      };
    });
  }
    
      handleCalc() {
      try {
        const result = new Function("return " + this.state.input)();
        this.setState({
          output: result.toString(),
          lastResult: result,
          input: result.toString(),
          newCalculation: true, 
        });
      } catch {
        this.setState({ output: "Error" });
      }
    }
    
      clearAC() {
       this.setState({ input: "", output: "0", lastResult: null, newCalculation: false }) 
      }
         
   render() {
      return(
        <div id="calculator" style={styles.container}>
           <div id="display" style={styles.display}>
             <input id="input" value={this.state.input} readOnly />
             <output>{this.state.output}</output>
           </div>
             <button id="clear" style={styles.clear} onClick={this.clearAC}>AC</button>
           <div id="numbers" style={styles.grid}>
             {[["7", "seven"], ["8", "eight"], ["9", "nine"], ["4", "four"], ["5", "five"], ["6", "six"], ["1", "one"], ["2", "two"], ["3", "three"], ["0", "zero"], [".", "decimal"]].map(([num, id]) => (
               <button key={num} id={id} onClick={() => this.handleClick(num)}>
                 {num}
               </button>
             ))}
           </div>
           <div id="operations" style={styles.grid}>
             {[["+", "add"], ["-", "subtract"], ["*", "multiply"], ["/","divide"]].map(([op,id]) => (<button key={id} id={id} onClick={() => this.handleClick(op)}>{op}</button>))}
           </div>
           <div>
             <button id="equals" style={styles.equals} onClick={this.handleCalc}>=</button>
           </div> 
      </div>  
      )
     }
    }
  
  const styles = {
    container: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#222",
      color: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "320px",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "10px"
    },
    display: {
      gridColumn: "span 4",
      backgroundColor: "#444",
      padding: "10px",
      fontSize: "20px",
      textAlign: "right",
      borderRadius: "5px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px"
    },
    clear: {
      gridColumn: "span 2",
      backgroundColor: "#d9534f",
      color: "#fff",
      padding: "10px",
      fontSize: "20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    },
    equals: {
      gridColumn: "span 2",
      backgroundColor: "#5bc0de",
      color: "#fff",
      padding: "10px",
      fontSize: "20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }
  };
  
  const calcElement = document.getElementById("calc");
  const root = ReactDOM.createRoot(calcElement);
  root.render(<JScriptCalcApp />);


class ClockApp extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: 1500,
        isRunning: false,
        timerLabel: "Session",
      };
      this.timer = null;
    }
    
    formatTime(time){
      const min = String(Math.floor(time / 60)).padStart(2, '0');
      const sec = String(time % 60).padStart(2, '0');
      return `${min}:${sec}`;
    }
    
    startStop = () => {
    if (this.state.isRunning) {
      clearInterval(this.timer);
      this.setState({ isRunning: false });
    } else {
      this.timer = setInterval(() => {
        this.setState((prevState) => {
          if (prevState.timeLeft === 0) {
            document.getElementById("beep").play(); // Play beep at 00:00
            return this.switchTimer();
          }
          return { timeLeft: prevState.timeLeft - 1 };
        });
      }, 1000);
      this.setState({ isRunning: true });
    }
  };
    // Switch between session and break
     switchTimer = () => {
    const isSession = this.state.timerLabel === "Session";
  
    this.setState({
      timeLeft: isSession ? this.state.breakLength * 60 : this.state.sessionLength * 60,
      timerLabel: isSession ? "Break" : "Session",
    });
  };
    
  reset = () => {
    clearInterval(this.timer);
    this.timer = null; // Ensure timer is fully cleared
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      isRunning: false,
      timerLabel: "Session",
    });
  
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0; // Rewind beep sound to the start
  };
     
    adjustLength = (type, amount) => {
      if (this.state.isRunning) return;
  
      this.setState((prevState) => {
        const newValue = prevState[type] + amount;
        if (newValue < 1 || newValue > 60) return null;
  
        return {
          [type]: newValue,
          timeLeft: type === "sessionLength" ? newValue * 60 : prevState.timeLeft,
        };
      });
    };
  
    
    render(){
      const styles = {
        container: {
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#282c36",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          padding: "20px",
        },
        clockBox: {
          backgroundColor: "#1e1f26",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          width: "350px",
        },
        title: {
          fontSize: "24px",
          marginBottom: "20px",
        },
        lengthControl: {
          marginBottom: "15px",
        },
        button: {
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px",
          margin: "5px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "0.3s",
        },
        decrementIncrement: {
          backgroundColor: "#f39c12",
        },
        timeDisplay: {
          fontSize: "32px",
          fontWeight: "bold",
          backgroundColor: "white",
          color: "#282c36",
          padding: "10px 20px",
          borderRadius: "8px",
          display: "inline-block",
          marginBottom: "15px",
        },
        startStop: {
          backgroundColor: "#3498db",
        },
        reset: {
          backgroundColor: "#e74c3c",
        },
      };
  
      return(
        <div style={styles.container}>
         <h1 style={styles.title}>25 + 5 Clock</h1>
          
          <div style={styles.lengthControl}>
            <h2 id="break-label">Break Length</h2>
            <button id="break-decrement" style={{ ...styles.button, ...styles.decrementIncrement }} onClick={() => this.adjustLength("breakLength", -1)}>-</button>
            <span id="break-length">{this.state.breakLength}</span>
            <button id="break-increment" style={{ ...styles.button, ...styles.decrementIncrement }} onClick={() => this.adjustLength("breakLength", 1)}>+</button>
          </div>
          
          <div style={styles.lengthControl}>
            <h2 id="session-label">Session Length</h2>
            <button id="session-decrement" style={{ ...styles.button, ...styles.decrementIncrement }} onClick={() => this.adjustLength("sessionLength", -1)}>-</button>
            <span id="session-length">{this.state.sessionLength}</span>
            <button id="session-increment" style={{ ...styles.button, ...styles.decrementIncrement }} onClick={() => this.adjustLength("sessionLength", 1)}>+</button>
          </div>
          
          <div>
            <h2 id="timer-label">{this.state.timerLabel}</h2>
            <div id="time-left" style={styles.timeDisplay}>{this.formatTime(this.state.timeLeft)}</div>
          </div>
          
         <button id="start_stop" style={{ ...styles.button, ...styles.startStop }} onClick={this.startStop}>{this.state.isRunning ? "Pause" : "Start"}
          </button>
          <button id="reset" style={{ ...styles.button, ...styles.reset }} onClick={this.reset}>Reset</button>
          <audio id="beep" src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"></audio>
       </div>   
      );
    }
  }
  
  const alarmElement = document.getElementById("alarm");
  const alarm = ReactDOM.createRoot(alarmElement);
  root.render(<ClockApp />);