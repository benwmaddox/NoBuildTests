// @ts-check

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <footer>
                <div class="container">
                    <p>&copy; ${new Date().getFullYear()} Web Components Demo</p>
                </div>
            </footer>
        `;
  }
}

customElements.define("app-footer", AppFooter);
