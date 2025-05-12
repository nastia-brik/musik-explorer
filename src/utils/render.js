import { state } from './state.js';
import { navigateTo } from '../router/router.js';

export function render() {
  if (window.location.pathname === '/') {
    navigateTo('/');
  } else {
    
    const trackId = window.location.pathname.split('/track/')[1];
    
  }
}