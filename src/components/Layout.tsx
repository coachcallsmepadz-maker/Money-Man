import React from 'react';
import { LayoutDashboard, ArrowUpCircle, ArrowDownCircle, Wallet, Settings, LogOut } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="logo">
                    <Wallet size={32} />
                    <span>VAULT</span>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul className="nav-links">
                        <li className="nav-item">
                            <a href="#" className="nav-link active">
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <ArrowUpCircle size={20} />
                                <span>Income</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <ArrowDownCircle size={20} />
                                <span>Expenses</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <Settings size={20} />
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="nav-links">
                    <a href="#" className="nav-link" style={{ marginTop: 'auto' }}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </a>
                </div>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
