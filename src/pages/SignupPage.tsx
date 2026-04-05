import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUpWithEmail, signInWithGoogle } from '@/lib/api/auth'
import { Swords, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

export function SignupPage() {
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('パスワードは6文字以上にしてください')
      return
    }

    setLoading(true)
    const { error: err } = await signUpWithEmail(email, password, displayName)

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setError('')
    const { error: err } = await signInWithGoogle()
    if (err) setError(err.message)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <Swords className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gold mb-4">登録完了!</h1>
          <p className="text-text-secondary mb-6">
            確認メールを送信しました。メール内のリンクをクリックしてアカウントを有効化してください。
          </p>
          <Link to="/login" className="rpg-button inline-block px-8 py-3">
            ログインへ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Swords className="w-12 h-12 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-black text-gold text-glow">冒険者登録</h1>
          <p className="text-text-secondary mt-2">新たな冒険を始めよう</p>
        </div>

        <div className="rpg-frame p-6">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-text-secondary text-sm mb-1">冒険者名</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-bg-secondary border border-border-primary rounded-lg pl-10 pr-4 py-3 text-text-primary focus:border-gold focus:outline-none transition-colors"
                  placeholder="表示名"
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-1">メールアドレス</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-secondary border border-border-primary rounded-lg pl-10 pr-4 py-3 text-text-primary focus:border-gold focus:outline-none transition-colors"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-sm mb-1">パスワード（6文字以上）</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-secondary border border-border-primary rounded-lg pl-10 pr-12 py-3 text-text-primary focus:border-gold focus:outline-none transition-colors"
                  placeholder="パスワード"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rpg-button w-full py-3 text-lg font-bold disabled:opacity-50"
            >
              {loading ? '登録中...' : '冒険者登録'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-primary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-bg-card text-text-secondary">または</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Googleで登録
          </button>
        </div>

        <p className="text-center text-text-secondary mt-6">
          既にアカウントをお持ちの方は{' '}
          <Link to="/login" className="text-gold hover:underline">ログイン</Link>
        </p>
        <p className="text-center mt-3">
          <Link to="/" className="text-text-secondary hover:text-gold text-sm">← トップに戻る</Link>
        </p>
      </div>
    </div>
  )
}
