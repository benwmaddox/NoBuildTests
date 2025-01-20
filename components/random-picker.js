// @ts-check

class RandomPicker extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <article>
                <header>
                    <h2>Random Picker</h2>
                </header>
                
                <div class="grid">
                    <div>
                        <label for="people">People to choose from (one per line)</label>
                        <textarea id="people" rows="10" placeholder="John Smith&#10;Jane Doe&#10;..."></textarea>
                    </div>
                    <div>
                        <button id="randomize">Pick Someone!</button>
                    </div>
                </div>

                <div id="results" class="results">
                    <!-- Winner will be displayed here -->
                </div>
            </article>
        `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const button = this.querySelector("#randomize");
    button?.addEventListener("click", () => this.pickRandom());
  }

  async pickRandom() {
    /** @type {HTMLTextAreaElement | null} */
    const textarea = this.querySelector("#people");
    const resultsDiv = this.querySelector("#results");

    if (!textarea || !resultsDiv) return;

    // Get people list
    const people = textarea.value
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (people.length < 1) {
      alert("Please enter at least one person");
      return;
    }

    // Clear previous results
    resultsDiv.innerHTML = '<div class="drum"></div>';
    /** @type {HTMLDivElement | null} */
    const drumDiv = resultsDiv.querySelector(".drum");
    if (!drumDiv) return;

    // Drum roll animation
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * people.length);
      drumDiv.textContent = people[randomIndex];
      drumDiv.style.animation = "none";
      drumDiv.offsetHeight; // Trigger reflow
      drumDiv.style.animation = "pulse 0.1s ease-out";
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Pick the winner
    const winner = people[Math.floor(Math.random() * people.length)];

    // Display the winner with animation
    resultsDiv.innerHTML = /* Html */ `
            <div class="winner">
                <h3>🎉 Winner 🎉</h3>
                <div class="winner-name">${winner}</div>
            </div>
        `;
  }
}

customElements.define("random-picker", RandomPicker);
