import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("is_authenticated");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (password: string) => {
        // Simple hardcoded password for demonstration
        if (password === "admin123") {
            localStorage.setItem("is_authenticated", "true");
            setIsAuthenticated(true);
            toast.success("Login berhasil");
            return true;
        } else {
            toast.error("Password salah");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("is_authenticated");
        setIsAuthenticated(false);
        navigate("/admin/login");
        toast.info("Logout berhasil");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
