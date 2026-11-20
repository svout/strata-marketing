import ProductNav from "./ProductNav";
import ProductFlow from "./ProductFlow";
import ProductLayers from "./ProductLayers";
import Faq from "./Faq";
import DevQuickstart from "./DevQuickstart";
import DevSdks from "./DevSdks";
import DevReliability from "./DevReliability";
import ClosingBand from "./ClosingBand";
import PageHero from "./PageHero";

/**
 * Widgets shared by pages through `Widgets.X`. Page-specific sections
 * (Home W1–W9, Pricing, Security, Blog, Demo) are imported directly.
 */
const widgets = {
  ProductNav,
  ProductFlow,
  ProductLayers,
  Faq,
  DevQuickstart,
  DevSdks,
  DevReliability,
  ClosingBand,
  PageHero,
};
export default widgets;
