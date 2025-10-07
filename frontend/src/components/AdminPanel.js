import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [form, setForm] = useState({ trackingId:'', sender:'', receiver:'', status:'Pending', location:'' });
  const [list, setList] = useState([]);
  const API = process.env.REACT_APP_API_URL || '';

  const fetchList = async () => {
    try {
      const res = await fetch(`${API}/api/parcels`);
      const data = await res.json();
      setList(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const submit = async () => {
    try {
      await fetch(`${API}/api/parcels`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ trackingId:'', sender:'', receiver:'', status:'Pending', location:'' });
      fetchList();
      alert('Parcel added/updated');
    } catch (e) { alert('Error'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete parcel?')) return;
    await fetch(`${API}/api/parcels/${id}`, { method:'DELETE' });
    fetchList();
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div style={{ marginBottom:12 }}>
        {['trackingId','sender','receiver','status','location'].map(f => (
          <input
            key={f}
            placeholder={f}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
            style={{ marginRight:6 }}
          />
        ))}
        <button onClick={submit}>Add Parcel</button>
      </div>

      <h3>Recent parcels</h3>
      <div>
        {list.map(p => (
          <div key={p._id} style={{ border:'1px solid #eee', padding:8, marginBottom:8 }}>
            <b>{p.trackingId}</b> — {p.status} — {p.location}
            <div style={{ marginTop:6 }}>
              <button onClick={() => { const newStatus = prompt('New status', p.status); if (newStatus) fetch(`${API}/api/parcels/${p.trackingId}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ status:newStatus }) }).then(()=>fetchList()); }}>Update Status</button>
              <button onClick={() => remove(p.trackingId)} style={{ marginLeft:8 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
