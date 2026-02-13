// Analytics stubs - integrate your provider (Plausible, GA, etc.) here.
export function initAnalytics() {
  // Example: initialize analytics when running on client
  if (typeof window === 'undefined') return;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // If Plausible is configured
  if (plausibleDomain) {
    if (!(window as any).plausible) {
      const script = document.createElement('script');
      script.defer = true;
      script.setAttribute('data-domain', plausibleDomain);
      script.src = 'https://plausible.io/js/plausible.js';
      document.head.appendChild(script);
    }
    console.info('Plausible initialized for', plausibleDomain);
  }

  // If Google Analytics is configured (GA4)
  if (gaId) {
    if (!(window as any).gtag) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(gtagScript);

      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(){(window as any).dataLayer.push(arguments);} 
      (window as any).gtag = gtag;
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', gaId);
    }
    console.info('GA initialized for', gaId);
  }
}

export function trackEvent(name: string, payload?: any) {
  if (typeof window === 'undefined') return;
  // Plausible
  try {
    if ((window as any).plausible) {
      (window as any).plausible(name, { props: payload });
    }
  } catch (e) {
    /* ignore */
  }

  // GA
  try {
    if ((window as any).gtag) {
      (window as any).gtag('event', name, payload || {});
    }
  } catch (e) {
    /* ignore */
  }
}

export default { initAnalytics, trackEvent };
