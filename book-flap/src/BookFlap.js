// BookFlap.js

import { html, css, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
// import { mockContent } from './mock/PageContentMock.js';

const pages = [
  { page: 1, status: 'active' },
  { page: 2, status: 'passive' },
  { page: 3, status: 'passive' },
  { page: 4, status: 'passive' },
];

export class BookFlap extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--book-flap-text-color, #000);
    }

    .main-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-flow: column;
      gap: 1rem;
    }
    /* Book */
    .book {
      position: relative;
      width: 60vh;
      height: 80vh;
      transition: transform 1s;
    }

    .paper {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      perspective: 1500px;
    }

    .front,
    .back {
      display: flex;
      background-color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform-origin: left;
      transition: transform 1s;
    }

    .front {
      z-index: 1;
      backface-visibility: hidden;
      border-left: 3px solid powderblue;
    }

    .back {
      z-index: 0;
    }

    .content {
      margin: 1rem;
      font-size: 50%;
      max-width: 50%;
      height: fit-content;
    }

    .back .content {
      transform: rotateY(180deg);
    }

    /* Paper flip effect */
    .flipped .front,
    .flipped .back {
      transform: rotateY(-180deg);
    }

    .copyright {
      color: var(--book-flap-text-color, #000);
    }

    /* Controller Buttons */
    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
      margin: 10px;
      transition: transform 1s;
    }

    button:focus {
      outline: none;
    }

    button:hover i {
      color: #636363;
    }

    i {
      font-size: 50px;
      color: gray;
    }
  `;

  static properties = {
    pages: { type: Array },
    flipActive: { type: Boolean },
    navIndex: { type: Number },
    bookStyle: { type: Object },
  };

  constructor() {
    super();
    this.bookStyle = {};
    this.pages = pages;
    this.navIndex = 0;
    this.pages[this.navIndex].status = 'active';
  }

  openBook() {
    this.bookOpened = true;
    this.bookStyle = { transform: 'translateX(50%)' };
  }

  closeBook(lastPage) {
    this.bookOpened = false;
    if (!lastPage) {
      this.bookStyle = { transform: 'translateX(0%)' };
    } else {
      this.bookStyle = { transform: 'translateX(100%)' };
    }
  }

  navNext() {
    if (this.navIndex >= this.pages.length) {
      return;
    }
    if (this.navIndex === 0) {
      this.openBook();
    }
    this.pages[this.navIndex].status = 'flipped';
    this.navIndex += 1;
    if (this.navIndex < this.pages.length)
      this.pages[this.navIndex].status = 'active';
    else {
      this.closeBook(true);
    }
  }

  navPrev() {
    if (this.navIndex === this.pages.length) this.openBook();
    if (this.navIndex < this.pages.length)
      this.pages[this.navIndex].status = 'passive';
    this.navIndex -= 1;
    this.pages[this.navIndex].status = 'active';
    if (this.navIndex === 0) {
      this.closeBook(false);
    }
  }

  pageContainer({ status, page }) {
    const flipperStyle = { flipped: status === 'flipped' };
    const zIndex = status !== 'flipped' ? this.pages.length - page : page;
    const paperStyle = {
      'z-index': zIndex,
    };

    const contentStyle = {
      'background-image': `url(assets/images/pages/page${page}.jpg)`,
      'background-position': 'center' /* Center the image */,
      'background-repeat': 'no-repeat' /* Do not repeat the image */,
      'background-size':
        'cover' /* Resize the background image to cover the entire container */,
    };
    return html`
      <div
        class="paper ${classMap(flipperStyle)}"
        style="${styleMap(paperStyle)}"
      >
        <div class="front" style="${styleMap(contentStyle)}">
          <div class="content">Front Page ${page}</div>
        </div>
        <div class="back">
          <div class="content">Back Page ${page}</div>
        </div>
      </div>
    `;
  }

  get bookContainer() {
    return html` <div
      id="book"
      class="book"
      style="${styleMap(this.bookStyle)}"
    >
      ${pages.map(item => this.pageContainer(item))}
    </div>`;
  }

  get navigatorNext() {
    return html`
      <wired-icon-button @click=${this.navNext}>
        <mwc-icon>navigate_next</mwc-icon>
      </wired-icon-button>
    `;
  }

  get navigatorPrev() {
    return html`
      <wired-icon-button @click=${this.navPrev}>
        <mwc-icon>navigate_before</mwc-icon>
      </wired-icon-button>
    `;
  }

  render() {
    return html`<div class="main-container">
      ${this.bookContainer}
      <div class="nav-container">
        ${this.navigatorPrev} ${this.navigatorNext}
      </div>
    </div> `;
  }
}
