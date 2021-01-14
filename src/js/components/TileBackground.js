import gsap from "gsap";

const SVG_VIEWBOX_HEIGHT = 100;
const SVG_VIEWBOX_WIDTH = 100;

class TileBackground {
  constructor(options) {
    this.update = this.update.bind(this);

    this.pathEl = options.path;
    this.progress = 0;
    this.update();
  }

  update() {
    const easePower2In = gsap.parseEase("power2.in");
    const easePower2Out = gsap.parseEase("power2.out");

    const bezierHandleY =
      SVG_VIEWBOX_HEIGHT - easePower2Out(this.progress) * SVG_VIEWBOX_HEIGHT;
    const y =
      SVG_VIEWBOX_HEIGHT - easePower2In(this.progress) * SVG_VIEWBOX_HEIGHT;

    this.pathEl.setAttribute(
      "d",
      `M0 ${y}
      Q ${SVG_VIEWBOX_HEIGHT / 2} ${bezierHandleY} ${SVG_VIEWBOX_WIDTH} ${y}
      v${SVG_VIEWBOX_HEIGHT}
      H0
      v-${SVG_VIEWBOX_WIDTH}
      Z`
    );
  }
}

export default TileBackground;
