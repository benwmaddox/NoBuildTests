// @ts-check

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
            <header>
                <div class="container">
                    <nav>
                        <ul>
                            <li><strong><a href="./">Randomization Tools</a></strong></li>
                        </ul>
                        <ul>
                            <li><a href="./groups.html">Groups</a></li>
                            <li><a href="./pairs.html">Pairs</a></li>
                            <li><a href="./picker.html">Picker</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;
  }
}

customElements.define("app-header", AppHeader);
