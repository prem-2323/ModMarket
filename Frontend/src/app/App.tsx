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

export default function App() {
  const [page, setPage] = useState<Page>("login");

  const navigate = (p: string) => setPage(p as Page);

  if (page === "login") return <Login onNavigate={navigate} />;
  if (page === "register")
    return <Register onNavigate={navigate} />;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activePage={page} onNavigate={navigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {page === "dashboard" && (
            <Dashboard onNavigate={navigate} />
          )}
          {page === "my-mods" && (
            <MyMods onNavigate={navigate} />
          )}
          {page === "analytics" && <Analytics />}
          {page === "upload-mod" && <UploadMod />}
          {page === "my-library" && <MyLibrary />}
          {page === "storage" && <Storage />}
          {page === "subscription" && <Subscription />}
          {page === "profile" && <Profile />}
          {page === "sales" && <SalesEarnings />}
          {page === "reviews" && <Reviews />}
          {page === "payouts" && <Payouts />}
          {page === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}