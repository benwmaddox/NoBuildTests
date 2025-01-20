// @ts-check

class PairMatcher extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <article>
                <header>
                    <h2>Pair Matcher</h2>
                </header>
                
                <div class="grid">
                    <div>
                        <label for="people">People to pair (one per line)</label>
                        <textarea id="people" rows="10" placeholder="John Smith&#10;Jane Doe&#10;..."></textarea>
                    </div>
                    <div>
                        <button id="randomize">Create Random Pairs</button>
                    </div>
                </div>

                <div id="results" class="results">
                    <!-- Pairs will be displayed here -->
                </div>
            </article>
        `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const button = this.querySelector("#randomize");
    button?.addEventListener("click", () => this.createPairs());
  }

  createPairs() {
    /** @type {HTMLTextAreaElement | null} */
    const textarea = this.querySelector("#people");
    const resultsDiv = this.querySelector("#results");

    if (!textarea || !resultsDiv) return;

    // Get people and shuffle them
    const people = textarea.value
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (people.length < 2) {
      alert("Please enter at least 2 people to create pairs");
      return;
    }

    // Shuffle array
    const shuffled = [...people].sort(() => Math.random() - 0.5);

    // Create pairs
    /** @type {string[][]} */
    const pairs = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        pairs.push([shuffled[i], shuffled[i + 1]]);
      } else {
        // Handle odd number of people
        pairs.push([shuffled[i]]);
      }
    }

    // Clear previous results
    resultsDiv.innerHTML = "";

    // Create and animate new pairs
    pairs.forEach((pair, index) => {
      const pairDiv = document.createElement("div");
      pairDiv.className = "pair";
      pairDiv.innerHTML = /* Html */ `
                <h3>Pair ${index + 1}</h3>
                <div class="pair-members">
                    ${pair
                      .map((person) => `<div class="member">${person}</div>`)
                      .join("")}
                </div>
            `;

      // Add animation
      pairDiv.style.animation = "slideIn 0.5s ease-out forwards";
      pairDiv.style.animationDelay = `${index * 0.2}s`;

      resultsDiv.appendChild(pairDiv);
    });
  }
}

customElements.define("pair-matcher", PairMatcher);
