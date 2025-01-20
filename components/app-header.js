// @ts-check

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <header>
                <div class="container">
                    <h1>My Web Components Demo</h1>
                </div>
            </header>
        `;
  }
}

customElements.define("app-header", AppHeader);
