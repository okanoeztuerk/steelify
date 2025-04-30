// pages/admin.js
import React, { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (auth) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        });
    }
  }, [auth]);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuth(true);
    } else {
      alert('Falsches Passwort');
    }
  };

  const updateStatus = async (id, status) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h2 className="text-xl mb-4">Admin Login</h2>
        <input
          type="password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={handleLogin}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Bestellungen</h1>
      {loading ? (
        <p>Lade...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Größe</th>
              <th className="border p-2">SVG</th>
              <th className="border p-2">DXF</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Erstellt</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td className="border p-2">{order.size} cm</td>
                <td className="border p-2">
                  <a href={order.svg} target="_blank" className="text-blue-600 underline">SVG</a>
                </td>
                <td className="border p-2">
                  <a href={order.dxf} target="_blank" className="text-blue-600 underline">DXF</a>
                </td>
                <td className="border p-2 capitalize">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="offen">offen</option>
                    <option value="in produktion">in produktion</option>
                    <option value="versendet">versendet</option>
                  </select>
                </td>
                <td className="border p-2">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
