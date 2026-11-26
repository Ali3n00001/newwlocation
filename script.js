const image = document.querySelector(".artwork");
const bottomArtwork = document.querySelector(".bottom-artwork");
const compassArtwork = document.querySelector(".compass-artwork");
const compassTrigger = document.querySelector(".clock-trigger");
const glassesTrigger = document.querySelector(".glasses-trigger");
const sceneTrigger = document.querySelector(".scene-trigger");
const pathTrigger = document.querySelector(".path-trigger");

image?.classList.remove("is-entering");
compassArtwork?.classList.remove("is-visible");
compassTrigger?.setAttribute("aria-pressed", "false");

const replayAnimation = (target) => {
  target.classList.remove("is-entering");
  void target.offsetWidth;
  target.classList.add("is-entering");
};

if (image && glassesTrigger) {
  glassesTrigger.addEventListener("click", () => replayAnimation(image));
}

if (compassArtwork && compassTrigger) {
  compassTrigger.addEventListener("click", () => {
    const isVisible = compassArtwork.classList.toggle("is-visible");
    compassTrigger.setAttribute("aria-pressed", String(isVisible));
  });
}

if (bottomArtwork) {
  const updateBottomArtwork = (event) => {
    const inBottomSection = event.clientY >= window.innerHeight * 0.75;
    bottomArtwork.classList.toggle("is-visible", inBottomSection);
  };

  window.addEventListener("pointermove", updateBottomArtwork);
  window.addEventListener("pointerleave", () => {
    bottomArtwork.classList.remove("is-visible");
  });
}

const transitionScene = (updateScene) => {
  if (document.body.classList.contains("scene-changing")) return;

  document.body.classList.add("scene-changing");
  const fadeDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
  window.setTimeout(() => {
    updateScene();
    document.body.classList.remove("scene-changing");
  }, fadeDuration);
};

if (sceneTrigger) {
  sceneTrigger.addEventListener("click", () => {
    transitionScene(() => document.body.classList.add("scene-rest"));
  });
}

if (pathTrigger) {
  pathTrigger.addEventListener("click", () => {
    transitionScene(() => document.body.classList.remove("scene-rest"));
  });
}
