/**
 * Utility function to split text into animated words
 * Returns an array of words and spaces with appropriate classes
 */
export function createAnimatedWords(text: string) {
  if (!text) return [];

  // Split text into words and preserve spaces
  const words = text.split(" ").filter((word) => word.length > 0);
  const result: Array<{ text: string; class: string }> = [];

  words.forEach((word, index) => {
    // Add the word with animation class
    result.push({
      text: word,
      class: "word",
    });

    // Add space after word (except for the last word)
    if (index < words.length - 1) {
      result.push({
        text: " ",
        class: "space",
      });
    }
  });

  return result;
}

/**
 * Utility function to create HTML string with animated words
 * This can be used in Svelte components with {@html} directive
 */
export function createAnimatedTextHTML(
  text: string,
  containerClass: string = "words-pull-up"
) {
  const animatedWords = createAnimatedWords(text);

  const wordsHTML = animatedWords
    .map((item) => `<span class="${item.class}">${item.text}</span>`)
    .join("");

  return `<div class="${containerClass}">${wordsHTML}</div>`;
}

/**
 * Utility function to initialize animation on elements
 * This can be called after component mount
 */
export function initializeAnimatedText(selector: string = ".words-pull-up") {
  if (typeof document === "undefined") return;

  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => {
      element.classList.add("animated");
    }, 100);
  });
}
