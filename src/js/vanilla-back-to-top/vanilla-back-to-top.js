import { addBackToTop } from 'vanilla-back-to-top'


addBackToTop({
  diameter: 60,
  backgroundColor: 'var(--filters-select-color--primary-bg-color)',
    textColor:'var(--additional-text-color)',
   showWhenScrollTopIs: 1000, 
  scrollDuration: 1200,
});