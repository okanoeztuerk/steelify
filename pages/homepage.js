
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectItem, SelectContent } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import Image from 'next/image';

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // DEIN STRIPE PUBLIC KEY

export default function Homepage() {
  const [image, setImage] = useState(null);
  const [size, setSize] = useState('30');
  const [color, setColor] = useState('schwarz');
  const [price, setPrice] = useState(49);

  const handleSizeChange = (value) => {
    setSize(value);
    const basePrice = 49;
    const calculatedPrice = basePrice + (parseInt(value) - 30) * 10;
    setPrice(calculatedPrice);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        size,
        color,
        price,
        image
      })
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="min-h-screen bg-beige-100 text-gray-800">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <div className="flex items-center space-x-3">
          <Image src="/steelify-logo.png" ... />
          <h1 className="text-xl font-bold">Steelify</h1>
        </div>
        <div className="space-x-6 flex items-center">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#shop" className="hover:underline">Shop</a>
          <a href="#about" className="hover:underline">Über uns</a>
          <a href="#contact" className="hover:underline">Kontakt</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-semibold mb-4">Dein Foto als Metallsilhouette</h2>
        <p className="mb-6 text-lg">Lade dein Bild hoch und gestalte dein persönliches Metallwandbild</p>
        <Input type="file" accept="image/*" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
      </section>

      {/* Vorschau */}
      {image && (
        <section className="flex justify-center py-6">
          <Card className="max-w-md w-full">
            <CardContent className="p-4">
              <img src={image} alt="Vorschau" className="w-full h-auto object-contain" />
              <p className="text-center mt-2 text-sm text-gray-600">Dies ist eine Vorschau deines Metallwandbilds.</p>

              {/* Konfigurator */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium">Größe (cm)</label>
                  <Select value={size} onValueChange={handleSizeChange}>
                    <SelectContent>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="70">70</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Farbe der Metallbeschichtung</label>
                  <Select value={color} onValueChange={setColor}>
                    <SelectContent>
                      <SelectItem value="schwarz">Schwarz</SelectItem>
                      <SelectItem value="weiß">Weiß</SelectItem>
                      <SelectItem value="rostbraun">Rostbraun</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-lg font-semibold">Preis: {price} €</p>
                  <Button className="mt-2 w-full" onClick={handleCheckout}>Jetzt kaufen</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 p-4 border-t mt-12">
        &copy; {new Date().getFullYear()} Steelify. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
