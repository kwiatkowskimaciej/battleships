function displayText(text) {
  const textElement = document.querySelector('h1');

  function typeWriter(text) {
    let i = 0;
    return new Promise((resolve) => {
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          textElement.innerHTML =
            text.substring(0, i + 1) +
            '<span aria-hidden="true" class="cursor"></span>';
          i++;
        } else {
          clearInterval(typingInterval);
          resolve();
        }
      }, 100);
    });
  }

  async function startTextAnimation() {
    await typeWriter(text);
  }

  return startTextAnimation();
}

export default displayText;
