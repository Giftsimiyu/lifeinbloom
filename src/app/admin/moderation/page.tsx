'use client'

import React, { useEffect, useState } from 'react'

type Comment = {
  _id: string
  author: string
  email: string
  content: string
  postSlug: string
  timestamp: string
}

export default function ModerationPage() {
  const [token, setToken] = useState<string | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('admin_token')
    if (saved) setToken(saved)
  }, [])

  useEffect(() => {
    if (token) fetchComments()
  }, [token])

  async function fetchComments() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/comments/unapproved')
      const json = await res.json()
      if (json.success) setComments(json.comments)
      else setError('Failed to load comments')
    } catch (err) {
      setError('Failed to load comments')
    }
    setLoading(false)
  }

  async function moderate(commentId: string, action: 'approve' | 'reject') {
    if (!token) return setError('Admin token required')
    try {
      const res = await fetch('/api/comments/moderate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': token,
        },
        body: JSON.stringify({ action, commentId }),
      })
      const json = await res.json()
      if (json.success) {
        setComments((c) => c.filter((cm) => cm._id !== commentId))
      } else {
        setError(json.message || 'Moderation failed')
      }
    } catch (err) {
      setError('Moderation failed')
    }
  }

  function saveToken() {
    if (token) localStorage.setItem('admin_token', token)
    fetchComments()
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl mb-4">Comments Moderation</h1>

      <div className="mb-6">
        <p className="text-sm text-(--color-neutral-grey)">Enter admin token to moderate comments (store in `ADMIN_API_SECRET` on server).</p>
        <div className="flex gap-2 mt-2">
          <input value={token ?? ''} onChange={(e) => setToken(e.target.value)} className="border p-2 rounded flex-1" placeholder="Admin token" />
          <button onClick={saveToken} className="px-4 py-2 bg-(--color-accent-olive) text-white rounded">Save</button>
        </div>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : comments.length === 0 ? (
        <p>No comments awaiting moderation.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="p-4 border rounded">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{c.author} <span className="text-xs text-(--color-neutral-grey)">({c.email})</span></p>
                  <p className="text-sm text-(--color-neutral-grey)">On: {c.postSlug} — {new Date(c.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => moderate(c._id, 'reject')} className="px-3 py-1 rounded border">Reject</button>
                  <button onClick={() => moderate(c._id, 'approve')} className="px-3 py-1 rounded bg-(--color-accent-olive) text-white">Approve</button>
                </div>
              </div>
              <div className="mt-3 whitespace-pre-wrap">{c.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
