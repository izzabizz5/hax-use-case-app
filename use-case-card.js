import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { LitElement, html, css } from "lit";

export class UseCaseCard extends DDDSuper(LitElement) {

constructor() {
    super();
    this.title = "";
    this.description = "";
    this.imageURL = "";
    this.demo = "";
  }

  static get properties() {
    return {
        id: { type: String },
        tag: { type: String },
        title: { type: String },
        description: { type: String },
        imageURL: { type: String },
        demo: { type: String },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      .card {
        display: flex;
        flex-direction: column;
        border: var(--ddd-border-sm);
        border-radius: var(--ddd-radius-md);
        padding: var(--ddd-spacing-6);
        background-color: var(--ddd-accent-3); 
        color: var(--ddd-primary-4); 
        box-shadow: var(--ddd-boxShadow-sm);
        transition: transform 0.3s, box-shadow 0.3s;
        text-decoration: none;
      }
      .card:hover {
        transform: translateY(-5px);
        box-shadow: var(--ddd-boxShadow-md); 
      }
      .card h3 {
        font-size: var(--ddd-font-size-s);
        margin: 0 0 var(--ddd-spacing-2) 0;
        color: var(--ddd-primary-4);
      }
      .card p {
        font-size: var(--ddd-font-size-3xs);
        margin: var(--ddd-spacing-2) 0;
        line-height: var(--ddd-lh-150);
        color: var(--ddd-primary-5); 
      }
      .card img {
        max-width: 100%;
        height: auto;
        border-radius: var(--ddd-radius-sm);
        margin-bottom: var(--ddd-spacing-4);
      }
      .card a {
        color: var(--ddd-primary-8);
        margin-right: var(--ddd-spacing-2);
      }
      .card a:hover,
            a:focus {
        color: var(--ddd-primary-8); 
      }
    `];
  }

  render() {
    return html`
        <div class="card">
          <img src="${this.imageURL}" alt="Image for ${this.title}">
          <h3>${this.title}</h3>
          <p><strong>Last Updated:</strong> ${this.updatedDate}</p>
          <p>${this.description}</p>
          <a href="${this.memo}" target="_blank">Memo --> </a>
      </div>
    `;
  }

  static get tag() {
    return "use-case-card";
  }
}
customElements.define(UseCaseCard.tag, UseCaseCard);