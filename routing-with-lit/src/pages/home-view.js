import { LitElement, html, css } from 'lit';

export class Home extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html` <h1>Home</h1>
      <p>This is the home page.</p>`;
  }
}
customElements.define('home-view', Home);
