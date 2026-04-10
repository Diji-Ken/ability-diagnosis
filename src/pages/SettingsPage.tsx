import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { useTrack } from '@/providers/TrackProvider'
import { getProfile, updateProfile } from '@/lib/api/profile'
import type { UserProfile } from '@/lib/api/profile'
import { PageHeader } from '@/components/layout/PageHeader'
import {
  ArrowLeft, Save, LogOut, Loader2, Check, AlertCircle,
} from 'lucide-react'

export function SettingsPage() {
  const { user, signOut } = useAuth()
  const { basePath } = useTrack()
  const navigate = useNavigate()
  const [, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!user) return

    getProfile(user.id).then(({ data }) => {
      if (data) {
        setProfile(data)
        setDisplayName(data.display_name || '')
        setBio(data.bio || '')
        setIsPublic(data.is_public)
      }
      setLoading(false)
    })
  }, [user])

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSaveProfile = async () => {
    if (!user) return
    setSaving(true)

    const { data, error } = await updateProfile(user.id, {
      display_name: displayName || null,
      bio: bio || null,
      is_public: isPublic,
    })

    if (error) {
      showMessage('error', '\u4fdd\u5b58\u306b\u5931\u6557\u3057\u307e\u3057\u305f')
    } else {
      if (data) setProfile(data)
      showMessage('success', '\u4fdd\u5b58\u3057\u307e\u3057\u305f')
    }
    setSaving(false)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const memberSince = user?.created_at
    ? (() => {
        const d = new Date(user.created_at)
        return `${d.getFullYear()}\u5e74${d.getMonth() + 1}\u6708${d.getDate()}\u65e5`
      })()
    : null

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold mx-auto mb-4 animate-spin" />
          <p className="text-text-secondary">{'\u8a2d\u5b9a\u3092\u8aad\u307f\u8fbc\u307f\u4e2d...'}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <PageHeader>
        <div className="flex items-center gap-3">
          <Link to={`${basePath}/profile`} className="text-text-secondary hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-gold font-bold text-xl">{'\u8a2d\u5b9a'}</h1>
        </div>
      </PageHeader>

      {/* Toast Message */}
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
              message.type === 'success'
                ? 'bg-emerald-900/90 text-emerald-300 border border-emerald-700'
                : 'bg-red-900/90 text-red-300 border border-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <div className="rpg-frame p-6 space-y-5">
          <h2 className="text-gold font-bold">{'\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u8a2d\u5b9a'}</h2>

          <div>
            <label htmlFor="displayName" className="block text-text-secondary text-sm mb-1">
              {'\u8868\u793a\u540d'}
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={'\u5192\u967a\u8005\u306e\u540d\u524d\u3092\u5165\u529b'}
              className="w-full bg-bg-secondary border border-border-rpg rounded-lg px-4 py-2 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-text-secondary text-sm mb-1">
              {'\u81ea\u5df1\u7d39\u4ecb'}
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={'\u3042\u306a\u305f\u306b\u3064\u3044\u3066\u6559\u3048\u3066\u304f\u3060\u3055\u3044'}
              rows={3}
              className="w-full bg-bg-secondary border border-border-rpg rounded-lg px-4 py-2 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-foreground text-sm font-medium">{'\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u516c\u958b'}</span>
              <p className="text-text-secondary text-xs mt-0.5">
                {'\u4ed6\u306e\u30e6\u30fc\u30b6\u30fc\u304c\u3042\u306a\u305f\u306e\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u95b2\u89a7\u3067\u304d\u307e\u3059'}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isPublic}
              onClick={() => setIsPublic(!isPublic)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isPublic ? 'bg-gold' : 'bg-bg-secondary border border-border-rpg'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  isPublic ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="rpg-button w-full py-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? '\u4fdd\u5b58\u4e2d...' : '\u4fdd\u5b58\u3059\u308b'}</span>
          </button>
        </div>

        {/* Account Info Section */}
        <div className="rpg-frame p-6 space-y-4">
          <h2 className="text-gold font-bold">{'\u30a2\u30ab\u30a6\u30f3\u30c8\u60c5\u5831'}</h2>

          <div>
            <span className="block text-text-secondary text-sm mb-1">{'\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9'}</span>
            <p className="text-foreground bg-bg-secondary rounded-lg px-4 py-2 border border-border-rpg/50">
              {user?.email || '-'}
            </p>
          </div>

          {memberSince && (
            <div>
              <span className="block text-text-secondary text-sm mb-1">{'\u767b\u9332\u65e5'}</span>
              <p className="text-foreground bg-bg-secondary rounded-lg px-4 py-2 border border-border-rpg/50">
                {memberSince}
              </p>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="rpg-frame p-6 border-red-900/50">
          <h2 className="text-red-400 font-bold mb-4">{'\u30c7\u30f3\u30b8\u30e3\u30fc\u30be\u30fc\u30f3'}</h2>
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 rounded-lg bg-red-900/30 border border-red-800 text-red-400 font-medium hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{'\u30ed\u30b0\u30a2\u30a6\u30c8'}</span>
          </button>
        </div>
      </main>
    </>
  )
}
