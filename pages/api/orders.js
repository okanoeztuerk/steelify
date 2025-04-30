// pages/api/orders.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('orders');

  if (req.method === 'POST') {
    const { size, color, price, image, svg, dxf, status } = req.body;
    const result = await collection.insertOne({
      size,
      color,
      price,
      image,
      svg,
      dxf,
      status: status || 'offen',
      createdAt: new Date()
    });
    res.status(200).json(result);
  } else if (req.method === 'GET') {
    const orders = await collection
      .find({}, { projection: { _id: 1, size: 1, color: 1, price: 1, image: 1, svg: 1, dxf: 1, status: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(orders);
  } else if (req.method === 'PUT') {
    const { id, status } = req.body;
    const { ObjectId } = require('mongodb');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Bestellung nicht gefunden oder Status unverändert' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
