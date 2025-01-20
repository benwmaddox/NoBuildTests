// @ts-check

class NumberPicker extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <article>
                <header>
                    <h2>Random Number Picker</h2>
                </header>
                
                <div class="grid">
                    <div>
                        <label for="min">Minimum Number</label>
                        <input type="number" id="min" value="1">
                    </div>
                    <div>
                        <label for="max">Maximum Number</label>
                        <input type="number" id="max" value="100">
                    </div>
                    <div>
                        <button id="randomize">Pick Number!</button>
                    </div>
                </div>

                <div id="results" class="results">
                    <!-- Number will be displayed here -->
                </div>
            </article>
        `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const button = this.querySelector("#randomize");
    button?.addEventListener("click", () => this.pickNumber());
  }

  async pickNumber() {
    /** @type {HTMLInputElement | null} */
    const minInput = this.querySelector("#min");
    /** @type {HTMLInputElement | null} */
    const maxInput = this.querySelector("#max");
    const resultsDiv = this.querySelector("#results");

    if (!minInput || !maxInput || !resultsDiv) return;

    const min = Math.floor(Number(minInput.value));
    const max = Math.floor(Number(maxInput.value));

    if (min >= max) {
      alert("Maximum number must be greater than minimum number");
      return;
    }

    // Clear previous results
    resultsDiv.innerHTML = '<div class="drum"></div>';
    /** @type {HTMLDivElement | null} */
    const drumDiv = resultsDiv.querySelector(".drum");
    if (!drumDiv) return;

    // Drum roll animation
    for (let i = 0; i < 20; i++) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      drumDiv.textContent = randomNum.toString();
      drumDiv.style.animation = "none";
      drumDiv.offsetHeight; // Trigger reflow
      drumDiv.style.animation = "pulse 0.1s ease-out";
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Pick the final number
    const finalNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Display the number with animation
    resultsDiv.innerHTML = /* Html */ `
            <div class="winner">
                <h3>🎲 Your Number 🎲</h3>
                <div class="winner-name">${finalNumber}</div>
            </div>
        `;
  }
}

customElements.define("number-picker", NumberPicker);
