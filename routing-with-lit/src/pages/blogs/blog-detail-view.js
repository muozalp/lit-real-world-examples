import { LitElement, html, css } from 'lit';

export class BlogDetailView extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  static properties = {
    blogId: { type: Number },
  };

  firstUpdated() {
    super.firstUpdated();
    this.blogId = this.location.params?.blog;
  }

  render() {
    return html` <h1>Blog Detail</h1>
      <p>This is Blog ${this.blogId}</p>`;
  }
}
customElements.define('blog-detail-view', BlogDetailView);
