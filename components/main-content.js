// @ts-check

class MainContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* Html */ `
      <div class="main-content-inner">
        <hgroup>
          <h2>Welcome to the Demo</h2>
          <h3>A showcase of Web Components with Pico CSS. Enjoy.
    </h3>
        </hgroup>
        
        <article>
          <p>This page demonstrates the use of Web Components with automatic loading and Pico CSS for beautiful styling.</p>
          
          <details>
            <summary>Features</summary>
            <ul>
              <li>Automatic component loading</li>
              <li>CSS per component</li>
              <li>Beautiful Pico CSS styling</li>
              <li>Semantic HTML structure</li>
            </ul>
          </details>
        </article>
      </div>
    `;
  }
}

customElements.define("main-content", MainContent);
