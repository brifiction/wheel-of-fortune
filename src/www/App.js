import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    items: [],
    history: [],
  };

  componentDidMount = async () => {
    const { items } = await window
      .fetch(`/api/items/get`)
      .then((res) => res.json());
    this.setState({ items });

    const wheel = document.querySelector(".wheel-of-fortune");
    const spinner = wheel.querySelector(".spinner");
    const trigger = wheel.querySelector(".btn-spin");
    const ticker = wheel.querySelector(".ticker");
    const pieSlice = 360 / this.state.items.length;
    const pieOffset = Math.floor(180 / this.state.items.length);
    const spinClass = "is-spinning";
    const selectedClass = "selected";
    const spinnerStyles = window.getComputedStyle(spinner);
    let tickerAnim;
    let rotation = 0;
    let currentSlice = 0;
    let pieNodes;

    const createPieNodes = () => {
      this.state.items.forEach(({ text, color, reaction }, i) => {
        const rotation = pieSlice * i * -1 - pieOffset;

        spinner.insertAdjacentHTML(
          "beforeend",
          `<li class="pie" data-reaction=${reaction} style="--rotate: ${rotation}deg">
            <span class="text">${text}</span>
          </li>`
        );
      });
    };

    const createConicGradient = () => {
      spinner.setAttribute(
        "style",
        `background: conic-gradient(
          from -90deg,
          ${this.state.items
            .map(
              ({ color }, i) =>
                `${color} 0 ${(100 / this.state.items.length) *
                  (this.state.items.length - i)}%`
            )
            .reverse()}
        );`
      );
    };

    const setupWheel = () => {
      createConicGradient();
      createPieNodes();
      pieNodes = wheel.querySelectorAll(".pie");
    };

    const spinInertia = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const runTickerAnimation = () => {
      const values = spinnerStyles.transform
        .split("(")[1]
        .split(")")[0]
        .split(",");
      const a = values[0];
      const b = values[1];
      let rad = Math.atan2(b, a);

      if (rad < 0) rad += 2 * Math.PI;

      const angle = Math.round(rad * (180 / Math.PI));
      const slice = Math.floor(angle / pieSlice);

      if (currentSlice !== slice) {
        ticker.style.animation = "none";
        setTimeout(() => (ticker.style.animation = null), 10);
        currentSlice = slice;
      }

      tickerAnim = requestAnimationFrame(runTickerAnimation);
    };

    const selectpie = () => {
      const selected = Math.floor(rotation / pieSlice);
      pieNodes[selected].classList.add(selectedClass);
      return pieNodes[selected].firstElementChild.textContent;
    };

    trigger.addEventListener("click", () => {
      const audioSpinning = document.getElementById("audio-spinning");
      audioSpinning.volume = 0.5;
      audioSpinning.play();
      trigger.disabled = true;
      rotation = Math.floor(Math.random() * 360 + spinInertia(2000, 5000)); // or fast = 1000, 2000
      pieNodes.forEach((pie) => pie.classList.remove(selectedClass));
      wheel.classList.add(spinClass);
      spinner.style.setProperty("--rotate", rotation);
      ticker.style.animation = "none";
      runTickerAnimation();
    });

    spinner.addEventListener("transitionend", () => {
      const audioSpinning = document.getElementById("audio-spinning");
      audioSpinning.pause();
      audioSpinning.currentTime = 0;
      var audioWow = document.getElementById("audio-wow");
      audioWow.play();
      cancelAnimationFrame(tickerAnim);
      trigger.disabled = false;
      trigger.focus();
      rotation %= 360;
      selectpie();
      this.setState({ history: [...this.state.history, selectpie()] });
      wheel.classList.remove(spinClass);
      spinner.style.setProperty("--rotate", rotation);
    });

    setupWheel();
  };

  render() {
    return (
      <div className="grid">
        <div className="wheel-of-fortune">
          <audio
            id="audio-spinning"
            src="https://d9olupt5igjta.cloudfront.net/samples/sample_files/53/080d520953fec9c90b6d789bf0c7883c2d8a67a8/mp3/Ueb_20HM_20gte125chords01_glamour_20a.mp3?1512765048"
          />
          <audio
            id="audio-wow"
            src="https://d9olupt5igjta.cloudfront.net/samples/sample_files/9737/791f8ddce7ca3d78d72f1228bc629d6034a45329/mp3/48981-wow_soundsmith-wav.mp3?1483116648"
          />
          <ul className="spinner"></ul>
          <div className="ticker"></div>
          <button className="btn-spin">Spin!</button>
        </div>
        <div className="wheel-of-fortune-history">
          <div className="container">
            <h2>History</h2>
            {this.state.history.length > 0 ? (
              <ol>
                {this.state.history.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            ) : (
              <iframe
                title={`where is the history?`}
                src="https://giphy.com/embed/6uGhT1O4sxpi8"
                width="480"
                height="240"
                frameBorder="0"
                className="giphy-embed"
                style={{ pointerEvents: "none" }}
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
