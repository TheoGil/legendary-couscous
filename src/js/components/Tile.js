import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Splitting from "splitting";
import TileBackground from "./TileBackground";
import prefersReducedMotion from "../helpers/prefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

class Tile {
  constructor(options) {
    this.containerEl = options.element;

    this.replay = this.replay.bind(this);

    this.init();
  }

  init() {
    // Store the various DOM references that we'll need later on
    this.titleEl = this.containerEl.querySelector(".js-title");
    this.subtitleEl = this.containerEl.querySelector(".js-subtitle");
    this.CTAEl = this.containerEl.querySelector(".js-cta");
    this.canEl = this.containerEl.querySelector(".js-can");
    this.labelEl = this.containerEl.querySelector(".js-can-label");
    this.particlesEls = this.containerEl.querySelectorAll(".js-particle");
    this.replayBtnEl = this.containerEl.querySelector(".js-replay-btn");

    // Helper wrapper that will handle the background blob animation
    this.blob = new TileBackground({
      path: this.containerEl.querySelector(".js-svg-path"),
    });

    // Split the title and subtiples into characters
    this.splitting = new Splitting({
      target: [this.titleEl, this.subtitleEl],
    });

    this.replayBtnEl.addEventListener("click", this.replay);

    this.initStartAnimation();
  }

  initStartAnimation() {
    // Define the various animations
    this.animation = new gsap.timeline({
      paused: true,
      defaults: {
        ease: "power2.out",
      },
      scrollTrigger: {
        trigger: this.containerEl,
        start: "center 80%",
        end: "center 20%",
        toggleActions: "play none none none",
      },
    });

    // Animate in the blob background
    this.animation.to(
      this.blob,
      {
        progress: 1,
        duration: 0.5,
        ease: "linear",
        onUpdate: this.blob.update,
      },
      "start"
    );

    // Animate in the can
    this.animation.fromTo(
      [this.canEl, this.labelEl],
      {
        x: (i, el) => (el.isSameNode(this.labelEl) ? "-50%" : "-100%"),
        opacity: 0,
      },
      {
        y: "+=0", // Prevent GSAP from overiding translateY defined in CSS on labelContainerEl
        x: (i, el) => (el.isSameNode(this.labelEl) ? "-10%" : "0%"),
        opacity: 1,
        ease: "power4.out",
        duration: 1.5,
      },
      "start"
    );
    // Animate title characters individually
    this.animation.fromTo(
      this.splitting[0].chars,
      {
        y: "100%",
      },
      {
        y: "0%",
        duration: 0.4,
        stagger: 0.05,
      },
      "start"
    );

    // Animate subtitle characters individually
    // Starts a tiny bit after the main title animation
    this.animation.fromTo(
      this.splitting[1].chars,
      {
        y: "100%",
      },
      {
        y: "0%",
        duration: 0.2,
        stagger: 0.025,
      },
      "start"
    );

    // Animate in the CTA
    this.animation.fromTo(
      this.CTAEl,
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 0.5,
      },
      "<.1" // Relative to the start of the most recently-added animation
    );

    // Animate in the "particles"
    this.animation.from(
      this.particlesEls,
      {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 0.2,
        ease: "power4.out",
        duration: 0.75,
        stagger: 0.05,
        // GSAP will translate our % based translation into px values.
        // This works fine but will break the positioning of the elements when resizing the window.
        // To fix this, we clear the inlined transform once animation is finished
        // note: "transform" (or any transform-related property) clears all transforms
        clearProps: "transform",
      },
      "start+=.25"
    );
    // Animate in the replay bouton
    this.animation.from(this.replayBtnEl, {
      opacity: "0",
      duration: 0.5,
    });
  }

  replay() {
    if (!prefersReducedMotion()) {
      this.animation
        .timeScale(2)
        .reverse()
        .then(() => {
          if (prefersReducedMotion()) {
            this.animation.progress(1);
          } else {
            this.animation.delay(0.5).timeScale(1).restart(true);
          }
        });
    }
  }
}

export default Tile;
