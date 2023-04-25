import { LitElement, html, css } from 'lit';

export class BlogsView extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html` <h1>Blog</h1>
      <p>This is where you can see all blogs.</p>`;
  }
}
customElements.define('blogs-view', BlogsView);
