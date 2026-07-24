// src/components/layout/PortalLayout.jsx — Shared layout shell
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header  from './Header';
import styles  from './PortalLayout.module.css';

export default function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={styles.main}>
        <Header onMenuClick={() => setSidebarOpen(p => !p)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
