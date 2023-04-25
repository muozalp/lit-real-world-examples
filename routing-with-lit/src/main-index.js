// main-index.js

import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './pages/home-view.js';
import './pages/about-view.js';

export class RoutingWithLit extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-real-world-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  firstUpdated() {
    super.firstUpdated();

    const router = new Router(this.shadowRoot.querySelector('#outlet'));
    router.setRoutes([
      { path: '/', component: 'home-view' },
      { path: '/about', component: 'about-view' },
      {
        path: '/blogs',
        children: () =>
          import('./pages/blogs/index.js').then(module =>
            module.routes.map(route => ({ ...route }))
          ),
      },
      { path: '(.*)', redirect: '/' },
    ]);
  }

  render() {
    return html`
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blogs">Blog</a>
      </nav>
      <main>
        <div id="outlet"></div>
      </main>
    `;
  }
}
