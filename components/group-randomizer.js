// @ts-check

class GroupRandomizer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <article>
                <header>
                    <h2>Group Randomizer</h2>
                </header>
                
                <div class="grid">
                    <div>
                        <label for="people">People (one per line)</label>
                        <textarea id="people" rows="10" placeholder="John Smith&#10;Jane Doe&#10;..."></textarea>
                    </div>
                    <div>
                        <label for="numGroups">Number of Groups</label>
                        <input type="number" id="numGroups" min="2" value="2">
                        <button id="randomize">Randomize Groups</button>
                    </div>
                </div>

                <div id="results" class="results">
                    <!-- Groups will be displayed here -->
                </div>
            </article>
        `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const button = this.querySelector("#randomize");
    button?.addEventListener("click", () => this.randomizeGroups());
  }

  randomizeGroups() {
    /** @type {HTMLTextAreaElement | null} */
    const textarea = this.querySelector("#people");
    /** @type {HTMLInputElement | null} */
    const numGroupsInput = this.querySelector("#numGroups");
    const resultsDiv = this.querySelector("#results");

    if (!textarea || !numGroupsInput || !resultsDiv) return;

    // Get people and shuffle them
    const people = textarea.value
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const numGroups = parseInt(numGroupsInput.value);
    if (numGroups < 2 || numGroups > people.length) {
      alert(
        "Please enter a valid number of groups (between 2 and the number of people)"
      );
      return;
    }

    // Shuffle array
    const shuffled = [...people].sort(() => Math.random() - 0.5);

    // Create groups
    /** @type {string[][]} */
    const groups = Array.from({ length: numGroups }, () => []);
    shuffled.forEach((person, index) => {
      groups[index % numGroups].push(person);
    });

    // Clear previous results
    resultsDiv.innerHTML = "";

    // Create and animate new groups
    groups.forEach((group, index) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "group";
      groupDiv.innerHTML = /* Html */ `
                <h3>Group ${index + 1}</h3>
                <ul>
                    ${group.map((person) => `<li>${person}</li>`).join("")}
                </ul>
            `;

      // Add animation
      groupDiv.style.animation = "slideIn 0.5s ease-out forwards";
      groupDiv.style.animationDelay = `${index * 0.2}s`;

      resultsDiv.appendChild(groupDiv);
    });
  }
}

customElements.define("group-randomizer", GroupRandomizer);
