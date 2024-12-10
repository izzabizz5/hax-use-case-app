/**
 * Copyright 2024 izzabizz5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

import { UseCaseCard } from "./use-case-card.js";

export class HaxUseCaseApp extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "hax-use-case-app";
  }

  constructor() {
    super();
    this.items = [];
    this.filteredItems = [];
    this.activeUseCase = null; 
    this.searchQuery = "";
    this.activeFilters = [];
    this.errorMessage = "";
    this.loading = false;
    this.filters = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateResults();
  }

  static get properties() {
    return {
      ...super.properties,
      items: { type: Array },
      filteredItems: { type: Array },
      activeUseCase: { type: Object },
      searchQuery: { type: String },
      activeFilters: { type: Array },
      errorMessage: { type: String },
      loading: { type: Boolean },
      filters: { type: Array }
    };
  }
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
          background-color: var(--ddd-theme-default-background);
          color: var(--ddd-primary-4);
        }
        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--ddd-primary-4);
          color: var(--ddd-theme-default-white);
          font-size: var(--ddd-font-size-3);
        }
        .header p {
          padding: var(--ddd-spacing-6);
          margin: var(--ddd-spacing-4);
        }

        /* Page Header */
        .page-header {
          text-align: left;
          padding: var(--ddd-spacing-8) var(--ddd-spacing-10);
          background-color: var(--ddd-theme-default-white);
          border-bottom: var(--ddd-border-xs);
        }
        .page-header h1 {
          margin: 0;
          font-size: var(--ddd-font-size-l);
          font-weight: var(--ddd-font-weight-bold);
          color: var(--ddd-primary-4);
        }
        .page-header p {
          margin-top: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-primary-5);
        }

        /* Content Layout */
        .content {
          display: flex;
          padding: var(--ddd-spacing-10);
          gap: var(--ddd-spacing-6);
        }

        /* Sidebar */
        .filter-section {
          width: 240px;
          background: var(--ddd-theme-default-white);
          padding: var(--ddd-spacing-6);
          border-radius: var(--ddd-radius-md);
          box-shadow: var(--ddd-boxShadow-sm);
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-4);
        }
        .filter-section h3 {
          margin: 0;
          font-size: var(--ddd-font-size-s);
          font-weight: var(--ddd-font-weight-bold);
          border-bottom: var(--ddd-border-xs);
          padding-bottom: var(--ddd-spacing-2);
        }
        .filter-section input[type="text"] {
          width: 100%;
          padding: var(--ddd-spacing-1);
          border: var(--ddd-border-xs);
          border-radius: var(--ddd-radius-xs);
          font-size: var(--ddd-font-size-3xs);
        }
        .filter-section label {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-primary-4);
        }
        .reset-button {
          background-color: var(--ddd-primary-8);
          color: var(--ddd-theme-default-white);
          border: none;
          border-radius: var(--ddd-radius-xs);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-3xs);
          cursor: pointer;
        }
  
        /* Card Grid */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--ddd-spacing-6);
          flex: 1;
        }
        .card-grid a {
          text-decoration: none;
        }
        .select-button {
          background-color: var(--ddd-primary-8);
          color: var(--ddd-theme-default-white);
          border: none;
          border-radius: var(--ddd-radius-xs);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-3xs);
          cursor: pointer;
        }
        .card-grid button:hover {
          background-color: var(--ddd-primary-6);
        }
        .active-card {
          border: var(--ddd-border-xs) solid var(--ddd-primary-6);
          border-color: var(--simple-colors-default-theme-amber-2);
          border-radius: var(--ddd-radius-md);
        }
        .button-row {
          display: flex;
          gap: var(--ddd-spacing-4);
          margin-top: var(--ddd-spacing-2);
        }
        .continue-button {
          background-color: var(--simple-colors-default-theme-amber-7);
          color: var(--ddd-theme-default-white);
          border: none;
          border-radius: var(--ddd-radius-xs);
          padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
          font-size: var(--ddd-font-size-3xs);
          cursor: pointer;
        }
        .continue-button:disabled {
          background-color: var(--ddd-primary-5);
          cursor: not-allowed;
        }
      `,
    ];
  }
  
  render() {
    return html`
      <!-- Header -->
      <div class="header">
            <p>HAX LOGO</p>
            <p>Merlin</p>
            <p>Search Sites</p>
          </div>

          <!-- Page Header -->
          <div class="page-header">
            <h1>&lt; New Journey &gt;</h1>
            <p>Pick a type of journey and mention templates to search for.</p>
          </div>

          <!-- Content -->
          <div class="content">
            <!-- Sidebar Filters -->
            <div class="filter-section">
              <input type="text" placeholder="Search" @input="${this.handleSearch}" />
              <h3>Template</h3>
              ${this.filters.length > 0
                ? this.filters.map(
                    (filter) => html`
                      <label>
                        <input
                          type="checkbox"
                          @change="${() => this.toggleFilter(filter)}"
                        />
                        ${filter}
                      </label>
                    `
                  )
                : ""}
              <button class="reset-button" @click="${this.resetFilters}">Reset Filters</button>
              <h3>My Favorites</h3>
            </div>

            <!-- Cards -->
            <div class="card-grid">
              ${this.filteredItems.length > 0
                ? this.filteredItems.map(
                    (item, index) => html`
                      <div
                        class=${item === this.activeUseCase ? "active-card" : ""}
                      >
                        <a href="${item.demoLink}" target="_blank">
                          <use-case-card
                            .imageURL=${item.useCaseImage || ""}
                            .title=${item.useCaseTitle || ""}
                            .description=${item.useCaseDescription || ""}
                            .demo=${item.demoLink || ""}
                            .useCaseAttributes=${item.useCaseAttributes || []}
                          ></use-case-card>
                        </a>
                        <div class="button-row">
                          <button
                            class="select-button"
                            @click="${() => this.toggleSelection(index)}"
                          >
                            ${item === this.activeUseCase ? "Selected" : "Select"}
                          </button>
                          ${item === this.activeUseCase
                            ? html`
                                <button
                                  class="continue-button"
                                  @click="${this.continueAction}"
                                >
                                  Continue
                                </button>
                              `
                            : ""}
                        </div>
                      </div>
                    `
                  )
                : html`<p>No templates match the filters specified.</p>`}
            </div>
          </div>
    `;
  }
  
  updateResults() {
    this.loading = true;
    this.errorMessage = ""; // Reset error before fetching

    fetch(new URL('./lib/use-case-data.json', import.meta.url).href)  
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON data
      })
      .then(data => {
      // Map JSON data to component's items
      
      if (Array.isArray(data.item)) {
        this.items = data.item.map(item => ({
          useCaseTitle: item.title,
          useCaseImage: item.image,
          useCaseDescription: item.description,
          demoLink: item.demo,
          useCaseAttributes: item.attributes,
          useCaseTag: item.tag
        }));
        this.filteredItems = this.items;
        this.filters = [];

        data.item.forEach(item => {
          if (Array.isArray(item.tag)) {
            item.tag.forEach(tag => {
              if (!this.filters.includes(tag)) {
                this.filters = [...this.filters, tag];
              }
            });
          }
        });
      } else {
        this.errorMessage = 'No Templates Found';
      }
    })
    .catch(error => {
      this.errorMessage = `Failed to load data: ${error.message}`;
      this.items = [];
      this.filteredItems = [];
    })
    .finally(() => {
      this.loading = false;
    });
  }

  updated(changedProperties) {
    if (
      changedProperties.has("searchQuery") ||
      changedProperties.has("activeFilters") ||
      changedProperties.has("item")
    ) {
      this.applyFilters();
    }
  }
  
  applyFilters() {
    const lowerCaseQuery = this.searchQuery.toLowerCase();
  
    this.filteredItems = this.items.filter((item) => {
      const matchesSearch = item.useCaseTitle.toLowerCase().includes(lowerCaseQuery);
  
      const matchesFilters =
        this.activeFilters.length === 0 || // No filters means match all
        this.activeFilters.some((filter) => item.useCaseTag.includes(filter));
  
      return matchesSearch && matchesFilters;
    }); 
  }
  
  handleSearch(event) {
    this.searchQuery = event.target.value.toLowerCase();
  }
  
  toggleFilter(filter) {
    if (this.activeFilters.includes(filter)) {
      this.activeFilters = this.activeFilters.filter((f) => f !== filter);
    } else {
      this.activeFilters = [...this.activeFilters, filter];
    }
  }

  selectItem(index) {
    this.filteredItems = this.filteredItems.map((item, i) => ({
      ...item,
      selected: i === index, // Mark only the clicked item as selected
    }));
    this.requestUpdate();
  }

  // Handle the "Continue" action
  continueAction(index) {
    const selectedItem = this.filteredItems[index];
    if (selectedItem) {
      console.log("Continuing with:", selectedItem);
      // Implement the logic for continuing with the selected item
    }
  }

  toggleSelection(index) {
    const selectedItem = this.filteredItems[index];
    if (this.activeUseCase === selectedItem) {
      // Deselect if already selected
      this.activeUseCase = null;
    } else {
      // Set the new active use case
      this.activeUseCase = selectedItem;
      console.log("Selected use case:", this.activeUseCase);
    }
    this.requestUpdate();
  }

  continueAction() {
    if (this.activeUseCase) {
      alert(`Continuing with use case: ${this.activeUseCase.useCaseTitle}`);
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