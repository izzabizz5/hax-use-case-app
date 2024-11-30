/**
 * Copyright 2024 izzabizz5
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class HaxUseCaseApp extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "hax-use-case-app";
  }

  constructor() {
    super();
    this.headerDescription = "This will say something like pick type journey. And then mention like two use cases that they can search for.";
  }

  static get properties() {
    return {
      ...super.properties,
      headerDescription: { type: String },
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
        .header-icons {
          display: flex;
          gap: var(--ddd-spacing-4);
          align-items: center;
        }
        .header-icons svg {
          width: var(--ddd-icon-xxs);
          height: var(--ddd-icon-xxs);
          cursor: pointer;
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
          padding: var(--ddd-spacing-2);
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
  
        /* Card Grid */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--ddd-spacing-6);
          flex: 1;
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
        <div class="header-icons">
          <svg>🔔</svg>
          <svg>👤</svg>
        </div>
      </div>
  
      <!-- Page Header -->
      <div class="page-header">
        <h1>&lt; New Journey &gt;</h1>
        <p>Pick a type of journey and mention use cases to search for.</p>
      </div>
  
      <!-- Content -->
      <div class="content">
        <!-- Sidebar Filters -->
        <div class="filter-section">
          <input type="text" placeholder="Search" />
          <h3>Template</h3>
          <label><input type="checkbox" /> Portfolio</label>
          <label><input type="checkbox" /> Course</label>
          <label><input type="checkbox" /> Resume</label>
          <label><input type="checkbox" /> Blog</label>
          <label><input type="checkbox" /> Research Website</label>
          <h3>My Favorites</h3>
        </div>
  
        <!-- Cards -->
        <div class="card-grid">
          ${[...Array(6)].map(
            () => html`
              <div class="use-case-card">
                <div class="use-case-card-placeholder"></div> <!-- Placeholder for image -->
                <h3>Course</h3>
                <p>
                  Unlock your creativity and technical skills by designing a dynamic website for your
                  course.
                </p>
                <a class="demo-link" href="#">Demo &gt;</a>
                <button>Select</button>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
  
  updateResults() {
    this.loading = true;
    this.clearData();
    this.errorMessage = ""; // Reset error before fetching

    fetch('../lib/card.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Store the overview data
        if (data) {
          this.courseTitle = data.title;
          this.courseImage = data.description;
          this.courseDescription = data.description
          this.courseMemo = data.memo;
          this.courseDemo = data.demo;
          this.attributes = data.attributes;
        } else {
          this.errorMessage = 'Invalid data format';
        }

      // Map JSON data to component's items
      if (Array.isArray(data.courses)) {
        this.courses = data.course.map(course => ({
          title: course.title,
          imageURL: course.imageURL,
          description: course.description,
          demo: course.demo,
        }));
        this.filteredCourses = this.courses;
      } else {
        this.errorMessage = 'No Items';
      }
    })
    .catch(error => {
      this.errorMessage = `Failed to load data: ${error.message}`;
      this.clearData();
    })
    .finally(() => {
      this.loading = false;
    });
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