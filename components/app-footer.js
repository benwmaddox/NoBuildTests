// @ts-check

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <footer>
                <p>&copy; ${new Date().getFullYear()} Web Components Demo</p>
            </footer>
        `;
  }
}

customElements.define("app-footer", AppFooter);
