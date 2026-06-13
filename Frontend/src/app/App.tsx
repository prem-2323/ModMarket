import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/pages/Dashboard";
import { MyMods } from "./components/pages/MyMods";
import { Analytics } from "./components/pages/Analytics";
import { UploadMod } from "./components/pages/UploadMod";
import { MyLibrary } from "./components/pages/MyLibrary";
import { Storage } from "./components/pages/Storage";
import { Subscription } from "./components/pages/Subscription";
import { Profile } from "./components/pages/Profile";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { SalesEarnings } from "./components/pages/SalesEarnings";
import { Reviews } from "./components/pages/Reviews";
import { Payouts } from "./components/pages/Payouts";
import { Settings } from "./components/pages/Settings";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Loader2 } from "lucide-react";

type Page =
  | "login"
  | "register"
  | "dashboard"
  | "my-mods"
  | "analytics"
  | "sales"
  | "reviews"
  | "payouts"
  | "upload-mod"
  | "my-library"
  | "profile"
  | "storage"
  | "subscription"
  | "settings";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [page, setPage] = useState<Page>("login");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  const navigate = (p: string) => setPage(p as Page);

  // Only show login/register when NOT loading and NOT authenticated
  if (!isAuthenticated) {
    if (page === "register") return <Register onNavigate={navigate} />;
    return <Login onNavigate={navigate} />;
  }

  // Authenticated — but if they navigated to login or register, go to dashboard
  const activePage = (page === "login" || page === "register") ? "dashboard" : page;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={navigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {activePage === "dashboard" && <Dashboard onNavigate={navigate} />}
          {activePage === "my-mods" && <MyMods onNavigate={navigate} />}
          {activePage === "analytics" && <Analytics />}
          {activePage === "upload-mod" && <UploadMod />}
          {activePage === "my-library" && <MyLibrary />}
          {activePage === "storage" && <Storage />}
          {activePage === "subscription" && <Subscription />}
          {activePage === "profile" && <Profile />}
          {activePage === "sales" && <SalesEarnings />}
          {activePage === "reviews" && <Reviews />}
          {activePage === "payouts" && <Payouts />}
          {activePage === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}