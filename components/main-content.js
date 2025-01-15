// @ts-check

class MainContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
      <div class="main-content-inner">
        <h2>Welcome to the Demo</h2>
        <p>This page demonstrates the use of Web Components with automatic loading.</p>
      </div>
    `;
  }
}

customElements.define("main-content", MainContent);
