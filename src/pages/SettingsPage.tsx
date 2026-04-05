import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { useMode } from '@/providers/ModeProvider'
import { getProfile, updateProfile } from '@/lib/api/profile'
import type { UserProfile } from '@/lib/api/profile'
import {
  ArrowLeft, Save, LogOut, Loader2, Check, AlertCircle, Swords, Heart,
} from 'lucide-react'

export function SettingsPage() {
  const { user, signOut } = useAuth()
  const { mode, setMode } = useMode()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile | null>(null)
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
      showMessage('error', '保存に失敗しました')
    } else {
      if (data) setProfile(data)
      showMessage('success', '保存しました')
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
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
      })()
    : null

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold mx-auto mb-4 animate-spin" />
          <p className="text-text-secondary">設定を読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <header className="border-b border-border-rpg/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link to="/profile" className="text-text-secondary hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-gold font-bold text-xl">設定</h1>
        </div>
      </header>

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
          <h2 className="text-gold font-bold">プロフィール設定</h2>

          <div>
            <label htmlFor="displayName" className="block text-text-secondary text-sm mb-1">
              表示名
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="冒険者の名前を入力"
              className="w-full bg-bg-secondary border border-border-rpg rounded-lg px-4 py-2 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-text-secondary text-sm mb-1">
              自己紹介
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="あなたについて教えてください"
              rows={3}
              className="w-full bg-bg-secondary border border-border-rpg rounded-lg px-4 py-2 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-foreground text-sm font-medium">プロフィールを公開</span>
              <p className="text-text-secondary text-xs mt-0.5">
                他のユーザーがあなたのプロフィールを閲覧できます
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
            <span>{saving ? '保存中...' : '保存する'}</span>
          </button>
        </div>

        {/* Account Info Section */}
        <div className="rpg-frame p-6 space-y-4">
          <h2 className="text-gold font-bold">アカウント情報</h2>

          <div>
            <span className="block text-text-secondary text-sm mb-1">メールアドレス</span>
            <p className="text-foreground bg-bg-secondary rounded-lg px-4 py-2 border border-border-rpg/50">
              {user?.email || '-'}
            </p>
          </div>

          {memberSince && (
            <div>
              <span className="block text-text-secondary text-sm mb-1">登録日</span>
              <p className="text-foreground bg-bg-secondary rounded-lg px-4 py-2 border border-border-rpg/50">
                {memberSince}
              </p>
            </div>
          )}
        </div>

        {/* Mode Settings */}
        <div className="rpg-frame p-6 space-y-4">
          <h2 className="text-gold font-bold">Quest Mode</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('business')}
              className={`rpg-frame p-4 text-center transition-colors ${
                mode === 'business' ? 'border-gold bg-gold/10' : 'hover:border-gold/50'
              }`}
            >
              <Swords className={`w-8 h-8 mx-auto mb-2 ${mode === 'business' ? 'text-gold' : 'text-text-secondary'}`} />
              <span className={`text-sm font-bold ${mode === 'business' ? 'text-gold' : 'text-text-secondary'}`}>
                Business
              </span>
            </button>
            <button
              onClick={() => setMode('romance')}
              className={`rpg-frame p-4 text-center transition-colors ${
                mode === 'romance' ? 'border-fire bg-fire/10' : 'hover:border-fire/50'
              }`}
            >
              <Heart className={`w-8 h-8 mx-auto mb-2 ${mode === 'romance' ? 'text-fire' : 'text-text-secondary'}`} />
              <span className={`text-sm font-bold ${mode === 'romance' ? 'text-fire' : 'text-text-secondary'}`}>
                Romance
              </span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rpg-frame p-6 border-red-900/50">
          <h2 className="text-red-400 font-bold mb-4">デンジャーゾーン</h2>
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 rounded-lg bg-red-900/30 border border-red-800 text-red-400 font-medium hover:bg-red-900/50 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>ログアウト</span>
          </button>
        </div>
      </main>
    </>
  )
}
