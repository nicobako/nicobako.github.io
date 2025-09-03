"use strict";

import { InternalLinkNavigator } from "./internal-link-navigator.js";
import { ReadingPractice } from "./reading-practice.js";
import { ToggleVisibility } from "./toggle-visibility.js";
import { MyArticle } from "./my-article.js";
import { ModifyCssProperty } from "./modify-css-property.js";

customElements.define("internal-link-navigator", InternalLinkNavigator);
customElements.define("reading-practice", ReadingPractice);
customElements.define("toggle-visibility", ToggleVisibility);
customElements.define("my-article", MyArticle);
customElements.define("modify-css-property", ModifyCssProperty);
