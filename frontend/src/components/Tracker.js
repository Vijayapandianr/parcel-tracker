import React, { useState } from 'react';

export default function Tracker() {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState('');

  const API = process.env.REACT_APP_API_URL || '';

  const track = async () => {
    setError('');
    setParcel(null);
    if (!trackingId) { setError('Enter tracking ID'); return; }
    try {
      const res = await fetch(`${API}/api/parcels/${trackingId}`);
      if (res.ok) {
        const data = await res.json();
        setParcel(data);
      } else {
        const err = await res.json();
        setError(err.message || 'Not found');
      }
    } catch (e) {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Track Your Parcel</h2>
      <input value={trackingId} onChange={e => setTrackingId(e.target.value)} placeholder="Enter Tracking ID" />
      <button onClick={track} style={{ marginLeft:8 }}>Track</button>
      {error && <p style={{ color:'red' }}>{error}</p>}
      {parcel && (
        <div style={{ marginTop:12, border:'1px solid #ddd', padding:12, display:'inline-block' }}>
          <p><b>Tracking ID:</b> {parcel.trackingId}</p>
          <p><b>Status:</b> {parcel.status}</p>
          <p><b>Location:</b> {parcel.location}</p>
          <p><b>Sender:</b> {parcel.sender}</p>
          <p><b>Receiver:</b> {parcel.receiver}</p>
        </div>
      )}
    </div>
  );
}
