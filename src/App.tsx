import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { EntryDiagnosisPage } from '@/pages/EntryDiagnosisPage'
import { TrackChoicePage } from '@/pages/TrackChoicePage'
import { JobDiagnosisPage } from '@/pages/job/JobDiagnosisPage'
import { LoveDiagnosisPage } from '@/pages/love/LoveDiagnosisPage'
import { JobDetailPage } from '@/pages/JobDetailPage'
import { SharePage } from '@/pages/SharePage'
import { AnimalDetailPage } from '@/pages/AnimalDetailPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
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
import { TermsPage } from '@/pages/legal/TermsPage'
import { PrivacyPage } from '@/pages/legal/PrivacyPage'
import { CommercialPage } from '@/pages/legal/CommercialPage'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { JobLayout } from '@/components/layout/JobLayout'
import { LoveLayout } from '@/components/layout/LoveLayout'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/diagnosis" element={<EntryDiagnosisPage />} />
      <Route path="/choose" element={<TrackChoicePage />} />
      <Route path="/share/:track/:id" element={<SharePage />} />
      <Route path="/animals/:animal" element={<AnimalDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/u/:userId" element={<PublicProfilePage />} />

      {/* Legal pages */}
      <Route path="/legal/terms" element={<TermsPage />} />
      <Route path="/legal/privacy" element={<PrivacyPage />} />
      <Route path="/legal/commercial" element={<CommercialPage />} />

      {/* Legacy redirects */}
      <Route path="/dashboard" element={<Navigate to="/job/dashboard" replace />} />
      <Route path="/profile" element={<Navigate to="/job/profile" replace />} />
      <Route path="/history" element={<Navigate to="/job/history" replace />} />
      <Route path="/settings" element={<Navigate to="/job/settings" replace />} />
      <Route path="/journal" element={<Navigate to="/job/journal" replace />} />
      <Route path="/growth" element={<Navigate to="/job/growth" replace />} />
      <Route path="/analysis" element={<Navigate to="/job/analysis" replace />} />
      <Route path="/weekly-report" element={<Navigate to="/job/weekly-report" replace />} />
      <Route path="/share-card" element={<Navigate to="/job/share-card" replace />} />
      <Route path="/compatibility" element={<Navigate to="/love/compatibility" replace />} />
      <Route path="/jobs/:id" element={<Navigate to="/job/dashboard" replace />} />
      <Route path="/mode-select" element={<Navigate to="/choose" replace />} />
      <Route path="/romance-analysis" element={<Navigate to="/love/analysis" replace />} />

      {/* JOB Track */}
      <Route path="/job" element={<AuthGuard><JobLayout /></AuthGuard>}>
        <Route index element={<Navigate to="/job/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="diagnosis" element={<JobDiagnosisPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="growth" element={<GrowthPage />} />
        <Route path="share-card" element={<ShareCardPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="weekly-report" element={<WeeklyReportPage />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
      </Route>

      {/* LOVE Track */}
      <Route path="/love" element={<AuthGuard><LoveLayout /></AuthGuard>}>
        <Route index element={<Navigate to="/love/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="diagnosis" element={<LoveDiagnosisPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="journal" element={<JournalPage />} />
        <Route path="growth" element={<GrowthPage />} />
        <Route path="share-card" element={<ShareCardPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="weekly-report" element={<WeeklyReportPage />} />
        <Route path="compatibility" element={<CompatibilityPage />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
