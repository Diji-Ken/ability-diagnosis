import { Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { DiagnosisPage } from '@/pages/DiagnosisPage'
import { JobDetailPage } from '@/pages/JobDetailPage'
import { SharePage } from '@/pages/SharePage'
import { AnimalDetailPage } from '@/pages/AnimalDetailPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { ModeSelectPage } from '@/pages/ModeSelectPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { HistoryPage } from '@/pages/HistoryPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { PublicProfilePage } from '@/pages/PublicProfilePage'
import { JournalPage } from '@/pages/JournalPage'
import { GrowthPage } from '@/pages/GrowthPage'
import { ShareCardPage } from '@/pages/ShareCardPage'
import { CompatibilityPage } from '@/pages/CompatibilityPage'
import { AnalysisPage } from '@/pages/AnalysisPage'
import { WeeklyReportPage } from '@/pages/WeeklyReportPage'
import { RomanceAnalysisPage } from '@/pages/RomanceAnalysisPage'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { AppLayout } from '@/components/layout/AppLayout'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/diagnosis" element={<DiagnosisPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/share/:id" element={<SharePage />} />
      <Route path="/animals/:animal" element={<AnimalDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/u/:userId" element={<PublicProfilePage />} />
      <Route path="/mode-select" element={<ModeSelectPage />} />

      {/* Protected routes with bottom nav */}
      <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/growth" element={<GrowthPage />} />
        <Route path="/share-card" element={<ShareCardPage />} />
        <Route path="/compatibility" element={<CompatibilityPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/weekly-report" element={<WeeklyReportPage />} />
        <Route path="/romance-analysis" element={<RomanceAnalysisPage />} />
      </Route>
    </Routes>
  )
}

export default App
