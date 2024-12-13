/**
 * Copyright 2024 izzabizz5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/simple-icon/simple-icon.js';

export class HaxUseCaseApp extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "hax-use-case-app";
  }

  constructor() {
    super();
    this.items = [];
    this.filteredItems = [];
    this.activeUseCase = false; 
    this.searchQuery = "";
    this.activeFilters = [];
    this.errorMessage = "";
    this.loading = false;
    this.filters = [];
    this.demoLink = "";
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
      activeUseCase: { type: Boolean },
      searchQuery: { type: String },
      activeFilters: { type: Array },
      errorMessage: { type: String },
      loading: { type: Boolean },
      filters: { type: Array },
      demoLink: { type: String}
    };
  }
  static get styles() {
    return [
      super.styles,
      css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, :host {
          overflow-x: hidden; /* Prevent horizontal scrolling */
        }
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
          background-color: var(--ddd-theme-default-background);
          color: var(--ddd-primary-4);
          display: block;
        }
        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: var(--ddd-primary-4);
          color: var(--ddd-theme-default-white);
          font-size: var(--ddd-font-size-3);
          padding: var(--ddd-spacing-6);
        }

        .header p {
          margin: 0; 
          padding: 0 var(--ddd-spacing-6); /* Horizontal padding only */
        }

        .header #hlogo {
          height: var(--simple-icon-height, 24px);
          width: var(--simple-icon-width, 24px);
          display: block;
          margin: 0 var(--ddd-spacing-6); 
          object-fit: contain; 
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
          color: var(--ddd-primary-4);
          font-size: var(--ddd-font-size-2);
        }

        /* Content Layout */
        .content {
          display: flex;
          padding: var(--ddd-spacing-10);
          gap: var(--ddd-spacing-6);
        }

        /* Sidebar for Vertical Section */
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
        /* Media Query for Small Screens */
        @media (max-width: 545px) {
          .content {
            flex-direction: column; 
          }
          .filter-section {
            width: 100%; 
            flex-direction: column; 
            flex-wrap: wrap;
            justify-content: space-between;
            padding: var(--ddd-spacing-4);
            gap: var(--ddd-spacing-2);
            overflow: hidden;
            box-sizing: border-box;
          }
          .filter-section h3 {
            font-size: var(--ddd-font-size-3xs);
            border: none;
            padding: 0;
          }
          .filter-section input[type="text"] {
            flex: 1; 
            margin-right: var(--ddd-spacing-2);
            align-items: right;
          }
          .filter-section label {
            font-size: var(--ddd-font-size-3xs); 
          }
          .reset-button {
            padding: var(--ddd-spacing-1) var(--ddd-spacing-2); 
          }
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
          background: var(--ddd-theme-default-white);
          border-radius: var(--ddd-radius-md);
          margin: 0;
          display: block;
          overflow: hidden;
          max-width: 375px;
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
          border: 2px solid var(--simple-colors-default-theme-amber-7)!important;
          background-color: var(--ddd-theme-default-skyMaxLight)!important;
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
        <simple-icon-lite id="hlogo" icon="hax:hax2022"></simple-icon-lite>
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
                  <div>
                    <a href="${item.demoLink}" target="_blank" 
                    class="${index === this.activeUseCase ? "active-card" : ""}">
                      <use-case-card
                        .imageURL=${item.useCaseImage || ""}
                        .title=${item.useCaseTitle || ""}
                        .description=${item.useCaseDescription || ""}
                        .demo=${item.demoLink || ""}
                        .iconImage=${item.useCaseIcon || []}
                      ></use-case-card>
                    </a>
                    <div class="button-row">
                      <button
                        class="select-button"
                        @click="${() => this.toggleSelection(index)}"
                      >
                        ${this.activeUseCase === index ? "Selected" : "Select"}
                      </button>
                      ${this.activeUseCase === index
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
          useCaseIcon: item.cardAttributes.map(attribute => ({
            icon: attribute.icon,
            tooltip: attribute.tooltip
          })),
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

  toggleSelection(index) {
    if (this.activeUseCase === index) {
      this.activeUseCase = false; // Deselect if the same card is clicked
    } else {
      this.activeUseCase = index; // Select the new card
    }
    this.requestUpdate();
  }

  continueAction() {
    if (this.activeUseCase !== false) {
      const selectedItem = this.filteredItems[this.activeUseCase];
      alert(`Continuing with the selected use case: ${selectedItem.useCaseTitle}`);
    }
  }

  resetFilters() {
    this.searchQuery = "";
    this.activeFilters = []; // Clear active filters
    this.filteredItems = this.items; // Reset to show all items
    this.requestUpdate(); // Trigger an update

    // Uncheck checkboxes
    const checkboxes = this.shadowRoot.querySelectorAll(
      '.filter-section input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => (checkbox.checked = false)); 

    // Clear search bar
    const searchInput = this.shadowRoot.querySelector('.filter-section input[type="text"]');
    if (searchInput) {
      searchInput.value = "";
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