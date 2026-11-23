import { Platform } from 'react-native';

// Remove the browser focus ring on text fields in the web build only.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const el = document.createElement('style');
  el.textContent = 'input:focus,textarea:focus{outline:none}';
  document.head.appendChild(el);
}
