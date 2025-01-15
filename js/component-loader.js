// @ts-check

/**
 * Loads the CSS file for a component
 * @param {string} componentName The name of the component
 */
function loadComponentCSS(componentName) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `/components/${componentName}.css`;
  document.head.appendChild(link);
}

/**
 * Automatically loads web components that haven't been registered yet
 * @param {Element} element The element to check for unregistered components
 */
function loadUnregisteredComponents(element) {
  // Get all elements in the document
  const allElements = element.getElementsByTagName("*");

  // Create a Set to track unique component names that need to be loaded
  const componentsToLoad = new Set();

  // Check each element
  for (const el of allElements) {
    const tagName = el.tagName.toLowerCase();

    // If it contains a hyphen and isn't already defined as a custom element
    if (tagName.includes("-") && !customElements.get(tagName)) {
      componentsToLoad.add(tagName);
    }
  }

  // Import each component and its CSS
  for (const componentName of componentsToLoad) {
    // Load the CSS file
    loadComponentCSS(componentName);

    // Load the JS component
    import(`/components/${componentName}.js`).catch((error) =>
      console.error(`Failed to load component ${componentName}:`, error)
    );
  }
}

// Initial check when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadUnregisteredComponents(document.body);
});

// Watch for dynamic changes in the DOM
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) {
          loadUnregisteredComponents(node);
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
