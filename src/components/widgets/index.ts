import Faq from "./Faq";
import ClosingBand from "./ClosingBand";
import PageHero from "./PageHero";

/**
 * Widgets shared by pages through `Widgets.X`. Page-specific sections
 * (Home W1–W9, Security, Blog, Demo) are imported directly.
 */
const widgets = {
  Faq,
  ClosingBand,
  PageHero,
};
export default widgets;
