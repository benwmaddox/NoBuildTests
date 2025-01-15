// @ts-check

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <header class="app-header">
                <h1>My Web Components Demo</h1>
            </header>
        `;
  }
}

customElements.define("app-header", AppHeader);
