'use client'

import React, { useEffect, useState } from 'react'

type Announcement = { message: string; url?: string }

export default function AnnouncementStrip() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [paused, setPaused] = useState(false)

  // Duration in seconds; allow override via NEXT_PUBLIC_ANNOUNCEMENT_SPEED
  const defaultDuration = Number(process.env.NEXT_PUBLIC_ANNOUNCEMENT_SPEED) || 18

  useEffect(() => {
    let mounted = true
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((json) => {
        if (!mounted) return
        if (json.success && Array.isArray(json.announcements)) {
          setAnnouncements(json.announcements)
        }
      })
      .catch((err) => console.warn('Announcement fetch failed', err))

    return () => {
      mounted = false
    }
  }, [])

  if (!announcements || announcements.length === 0) return null

  // Render individual announcements separated by em dash; when url present render as link
  const renderedParts: React.ReactNode[] = []
  announcements.forEach((a, idx) => {
    const sep = idx > 0 ? <span key={`sep-${idx}`} className="mx-4">—</span> : null
    if (sep) renderedParts.push(sep)
    if (a.url) {
      renderedParts.push(
        <a key={`a-${idx}`} href={a.url} target="_blank" rel="noopener noreferrer" className="underline">
          {a.message}
        </a>
      )
    } else {
      renderedParts.push(<span key={`a-${idx}`}>{a.message}</span>)
    }
  })

  // Duplicate the rendered parts for a seamless loop
  const duplicated = [...renderedParts, <span key="gap" className="mx-6" />, ...renderedParts]

  return (
    <div
      className="w-full bg-(--color-accent-olive) text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative whitespace-nowrap">
        <div
          className="inline-block py-2 px-4"
          style={{
            display: 'inline-block',
            paddingLeft: '100%',
            animation: `announcementScroll ${defaultDuration}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          <span className="mr-6 flex items-center gap-2">{duplicated}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes announcementScroll {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  )
}
