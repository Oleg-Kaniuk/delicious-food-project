import { addBackToTop } from 'vanilla-back-to-top'


addBackToTop({
  diameter: 60,
  backgroundColor: 'var(--additional-text-color)',
  textColor:' var(--main-dark-text-color)',
  showWhenScrollTopIs: 1000, 
  scrollDuration: 1200,
  zIndex: 101,
});