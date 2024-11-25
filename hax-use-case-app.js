/**
 * Copyright 2024 izzabizz5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `hax-use-case-app`
 * 
 * @demo index.html
 * @element hax-use-case-app
 */
export class HaxUseCaseApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-use-case-app";
  }

  constructor() {
    super();
    this.headerDescription = "This will say something like pick type journey. And then mention like two use cases that they can search for.";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      headerDescription: {type: String},

    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="header">
      <p>HaxLogo</p>
      <p>Merlin</p>
      <p>Search Sites</p>
      <p>Login</p>
    </div>
    
    <div class="page-header">
      <h1>&lt; New Journey &lt;</h1>
      <p>"${this.headerDescription}"</p>
    </div>

    <div class="filter-section">
      <p>search bar</p>
      <h3>Template</h3>
      <button>Portfolio</button>
      <button>Course</button>
      <button>Resume</button>
      <button>Blog</button>
      <button>Research Website</button>
      <h3>Favorites</h3>
    </div>

    <div class="filtered-items">
      <a href="${this.memo}" target="_blank">
        <use-case-card>
          <img src="${this.imageURL}" alt="Image for ${this.title}">
          <h3>${this.title}</h3>
          <p><strong>Last Updated:</strong> ${this.updatedDate}</p>
          <p>${this.description}</p>
          <a href="${this.memo}" target="_blank">Memo --> </a>
        </use-case-card>
      </a>
    </div>
<`;
  }

  updateFilters() {
    const allTags = new Set();
    this.useCases.forEach((useCase) => {
      useCase.tags.forEach((tag) => allTags.add(tag));
    });
    this.filters = Array.from(allTags);
  }

  applyFilter(filter) {
    this.filteredUseCases = this.useCases.filter((useCase) =>
      useCase.tags.includes(filter)
    );
    this.activeUseCase = null;
  }

  resetFilters() {
    this.filteredUseCases = [...this.useCases];
    this.activeUseCase = null;
  }

  handleSearch(event) {
    this.searchQuery = event.target.value.toLowerCase();
    this.filteredUseCases = this.useCases.filter((useCase) =>
      useCase.title.toLowerCase().includes(this.searchQuery)
    );
  }

  selectUseCase(useCase) {
    if (this.activeUseCase === useCase) {
      this.activeUseCase = null;
    } else {
      this.activeUseCase = useCase;
    }
  }

  continue() {
    if (this.activeUseCase) {
      alert(`Selected Use Case: ${this.activeUseCase.title}`);
    }
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(HaxUseCaseApp.tag, HaxUseCaseApp);