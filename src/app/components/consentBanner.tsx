'use client'

import { useEffect, useState } from 'react'
import { initAnalytics } from '@/lib/analytics'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent')
    if (consent === 'granted') {
      initAnalytics()
    } else if (consent === 'denied') {
      // do nothing
    } else {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('analytics_consent', 'granted')
    initAnalytics()
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('analytics_consent', 'denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-[90%] bg-white border border-(--color-neutral-cream) rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">We respect your privacy</p>
          <p className="text-sm text-(--color-neutral-grey)">We use analytics to improve the site. Do you consent to anonymous analytics?</p>
        </div>
        <div className="flex gap-2">
          <button onClick={decline} className="px-3 py-2 rounded bg-(--color-neutral-cream)">Decline</button>
          <button onClick={accept} className="px-3 py-2 rounded bg-(--color-accent-olive) text-white">Accept</button>
        </div>
      </div>
    </div>
  )
}
