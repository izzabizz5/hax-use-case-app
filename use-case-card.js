import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { LitElement, html, css } from "lit";

export class UseCaseCard extends DDDSuper(LitElement) {

constructor() {
    super();
    this.title = "";
    this.description = "";
    this.imageURL = "";
    this.demo = "";
    this.iconImage = [];
  }

  static get properties() {
    return {
        id: { type: String },
        tag: { type: String },
        title: { type: String },
        description: { type: String },
        imageURL: { type: String },
        demo: { type: String },
        iconImage: {type: Array }
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        /* Cards */
        .card {
        border: var(--ddd-border-xs) solid var(--ddd-primary-4);
        border-radius: var(--ddd-radius-md);
        box-shadow: var(--ddd-boxShadow-sm);
        max-width:375px;
        max-height:375px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: var(--ddd-spacing-4);
        gap: var(--ddd-spacing-3);
        position: relative; /* Enables absolute positioning inside the card */
      }
      .card img {
        max-width: 200px;
        max-height: 200px;
        object-fit: cover;
        background: var(--ddd-accent-2);
      }
      .card h3 {
        font-size: var(--ddd-font-size-xxs);
        font-weight: var(--ddd-font-weight-bold);
        color: var(--ddd-primary-4);
        margin: var(--ddd-spacing-2) 0 0 0;
      }
      .card p {
        font-size: var(--ddd-font-size-3xs);
        color: var(--ddd-primary-5);
        line-height: var(--ddd-lh-150);
        margin: 0 0 var(--ddd-spacing-4) 0;
      }
      .card #demo {
        position: absolute; /* Position the demo link */
        bottom: var(--ddd-spacing-2); /* Align to the bottom */
        right: var(--ddd-spacing-2); /* Align to the right */
        font-size: var(--ddd-font-size-3xs);
        text-decoration: none;
        color: var(--ddd-primary-8);
        padding: var(--ddd-spacing-1) var(--ddd-spacing-1);
        opacity: 0.8;
        gap: var(--ddd-spacing-3);
      }
      .card a:hover {
        text-decoration: none;
        opacity: 1;
      }
      .card button {
        background-color: var(--ddd-primary-8);
        color: var(--ddd-theme-default-white);
        border: none;
        border-radius: var(--ddd-radius-xs);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        font-size: var(--ddd-font-size-3xs);
        cursor: pointer;
      }
      .card button:hover {
        background-color: var(--ddd-primary-6);
      }
      .card #demo, #haxIcon {
        flex-wrap: wrap;
        flex-direction: horizontal;
      }
      #haxIcons {
        position: absolute; /* Position the demo link */
        bottom: var(--ddd-spacing-2); /* Align to the bottom */
        left: var(--ddd-spacing-2); /* Align to the right */
        padding: var(--ddd-spacing-1) var(--ddd-spacing-1);
        opacity: 0.8;
        gap: var(--ddd-spacing-3);
        color: var(--ddd-primary-8);
      }
      
      `,
    ];
  }

  render() {
    return html`
      <div class="card">
        <img src="${this.imageURL}">
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <a id="demo" href="https://hax.cloud?use-case-${this.title}" target="_blank">Demo -> </a>
        <div id="haxIcons">
        ${this.iconImage.map(
          (icon) => html`
            <simple-icon-lite
              icon="${icon.icon}" 
              title="${icon.tooltip || ''}" 
            ></simple-icon-lite>
          `
        )}
        </div>
      </div>
    `;
  }

  static get tag() {
    return "use-case-card";
  }
}
customElements.define(UseCaseCard.tag, UseCaseCard);