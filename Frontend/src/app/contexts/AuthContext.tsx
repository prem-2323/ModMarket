import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getProfile, UserProfile } from "../../services/userService";

interface AuthContextType {
  profile: Partial<UserProfile> | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Partial<UserProfile> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data.profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // If token is invalid or expired, clear it
      localStorage.removeItem("auth_token");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    setProfile(null);
    window.location.href = "/";
  };

  const value = {
    profile,
    loading,
    isAuthenticated: !!profile,
    refreshProfile: fetchProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
