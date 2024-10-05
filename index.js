(async function Latte(root) {
  const queue = [];
  const onlyQueue = [];
  const CHAI_CDN_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/chai/5.1.1/chai.js";

  const only = {
    it(description, callback) {
      onlyQueue.push(createTestCase(description, callback));
    },
  };

  function describe(description, callback) {
    function addHeader() {
      const header = document.createElement("h3");
      header.textContent = description;
      document.body.append(header);
    }
    queue.push(addHeader);
    callback();
  }

  function it(description, callback) {
    queue.push(createTestCase(description, callback));
  }

  function createTestCase(description, callback) {
    return function () {
      try {
        callback();
        pushMessage(`[✅] ${description}`, "success");
      } catch (error) {
        pushMessage(`[❌] ${description};\n ${error.message}`, "error");
      }
    };
  }

  // Global styles.
  document.body.style.fontFamily = "monospace";

  // Expose global API.
  root.it = it;
  root.only = only;
  root.describe = describe;

  // This is a workaround to fix bug with script minification where variables declaration are mixed up
  const { chaiConfig, latteTests } = getScriptAttributes();

  if (!chaiConfig) {
    const chai = await import(CHAI_CDN_URL);
    window.chai = chai;
    window.expect = chai.expect;
  } else if (chaiConfig.startsWith("http")) {
    const chai = await import(chaiConfig);
    window.chai = chai;
    window.expect = chai.expect;
  }

  if (latteTests) {
    await includeScriptTag(latteTests);
  } else {
    throw new Error(
      "LatteError: Cannot find script tag with data-latte-tests attribute"
    );
  }

  // Run tests.
  setTimeout(
    () =>
      (onlyQueue.length ? onlyQueue : queue).forEach((callback) => callback()),
    100
  );
})(window);

// ---- Helpers ----------------

function getScriptAttributes() {
  // Load Chai.js and script witch tests.
  const scriptTag = document.querySelector("script[data-latte-tests]");

  if (!scriptTag) {
    throw new Error(
      "LatteError: Cannot find script tag with data-latte-tests attribute"
    );
  }

  // If [data-chai] attribute is present it should contains URL to Chai.js,
  // otherwise Chai.js will be loaded from CDN.
  const chaiConfig = scriptTag.dataset.chai;

  // Get URL for test to load.
  const latteTests = scriptTag.dataset.latteTests;

  return {
    chaiConfig,
    latteTests,
  };
}

function pushMessage(message, type) {
  const prompt = document.createElement("div");
  prompt.textContent = message;
  prompt.style.color = type === "error" ? "#e21743" : "#639043";
  prompt.style.marginLeft = "1em";
  document.body.append(prompt);
}

function includeScriptTag(path) {
  return new Promise((resolve, reject) => {
    if (!path) reject("Cannot find path to test file");
    const script = document.createElement("script");
    script.setAttribute("src", path);
    script.setAttribute("type", "module");
    script.addEventListener("load", resolve);
    script.addEventListener("error", reject);
    document.head.appendChild(script);
  });
}
