import './blog-detail-view.js';
import './blogs-view.js';

export const routes = [
  { path: '/', component: 'blogs-view' },
  { path: '/:blog', component: 'blog-detail-view' },
];
