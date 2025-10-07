import React, { useState } from 'react';
import Tracker from './components/Tracker';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [view, setView] = useState('user');
  return (
    <div style={{ padding:20, fontFamily: 'Arial, sans-serif' }}>
      <h1>📦 Parcel Tracking System</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setView('user')} style={{ marginRight:8 }}>User View</button>
        <button onClick={() => setView('admin')}>Admin Panel</button>
      </div>
      {view === 'user' ? <Tracker /> : <AdminPanel />}
    </div>
  );
}
