import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Plus, Minus, Sparkles, Home, ArrowUp, Phone, Mail, Menu, X, Truck, Leaf, Tag } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';

const CrackerShop = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [crackers, setCrackers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const navigate = useNavigate();

  const products = [

    {
      "id": 1,
      "name": "7 CM Bobby Gold Sparklers",
      "price": 30.4,
      "image": assets.stdbobby,
      "category": "sparklers-7cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 2,
      "name": "9 CM Standard Gold Sparklers",
      "price": 34.2,
      "image": assets.stdbobby,
      "category": "sparklers-10cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 3,
      "name": "9 CM Chavi Gold Sparklers",
      "price": 34.2,
      "image": assets.stdgold30,
      "category": "sparklers-10cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 4,
      "name": "9 CM Export Gold Sparklers",
      "price": 32.3,
      "image": assets.stdgold30,
      "category": "sparklers-10cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 5,
      "name": "12 CM Jimmy Gold Sparklers",
      "price": 79.8,
      "image": assets.stdgold30,
      "category": "sparklers-12cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 6,
      "name": "15 CM Gold Sparklers",
      "price": 129.2,
      "image": assets.stdgold15,
      "category": "sparklers-15cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 7,
      "name": "20 CM Export Gold Sparklers",
      "price": 108.3,
      "image": assets.stdgold15,
      "category": "sparklers-30cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 8,
      "name": "30 CM Gold Sparklers",
      "price": 129.2,
      "image": assets.stdgold30,
      "category": "sparklers-30cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 9,
      "name": "7 CM Bobby Crackling Sparklers",
      "price": 34.2,
      "image": assets.stdcrack30,
      "category": "sparklers-7cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 10,
      "name": "9 CM Crackling Sparklers",
      "price": 39.9,
      "image": assets.crackling7cm,
      "category": "sparklers-10cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 11,
      "name": "9 CM Export Crackling Sparklers",
      "price": 39.9,
      "image": assets.crackling7cm,
      "category": "sparklers-10cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 12,
      "name": "12 CM Jimmy Crackling Sparklers",
      "price": 83.6,
      "image": assets.crackling12cm,
      "category": "sparklers-12cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 13,
      "name": "15 CM Crackling Sparklers",
      "price": 144.4,
      "image": assets.crackling15cm,
      "category": "sparklers-15cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 14,
      "name": "20 CM Export Crackling Sparklers",
      "price": 136.8,
      "image": assets.crackling15cm,
      "category": "sparklers-30cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 15,
      "name": "30 CM Crackling Sparklers",
      "price": 144.4,
      "image": assets.stdcrack30,
      "category": "sparklers-30cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 16,
      "name": "12 CM Red Colour Sparklers",
      "price": 77.9,
      "image": assets.stdred12,
      "category": "sparklers-12cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 17,
      "name": "12 CM 4 Colour Sparklers",
      "price": 72.2,
      "image": assets.stdcolour12,
      "category": "sparklers-12cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 18,
      "name": "15 CM Red Colour Sparklers",
      "price": 121.6,
      "image": assets.stdred12,
      "category": "sparklers-15cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 19,
      "name": "15 CM Tri Color Sparklers",
      "price": 381.9,
      "image": assets.stdcolour12,
      "category": "sparklers-15cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "30 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 20,
      "name": "15 CM Lemon Tree Sparklers",
      "price": 108.3,
      "image": assets.stdlemon15,
      "category": "sparklers-15cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 21,
      "name": "15 CM Lavender Sparklers",
      "price": 152.0,
      "image": assets.stdlav15,
      "category": "sparklers-15cm",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 22,
      "name": "6.5 Cm Sparrow",
      "price": 26.6,
      "image": assets.sparrow,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 23,
      "name": "9 Cm Lakshmi",
      "price": 43.7,
      "image": assets.lakshmi9cm,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 24,
      "name": "9 Cm Peacock",
      "price": 43.7,
      "image": assets.peacock9cm,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 25,
      "name": "10 Cm Krishna",
      "price": 60.8,
      "image": assets.krishna10cm,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 26,
      "name": "10 Cm Lakshmi",
      "price": 60.8,
      "image": assets.lakshmi9cm,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 27,
      "name": "500/5 Hitler - 10 C.M.",
      "price": 60.8,
      "image": assets.hitler,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 28,
      "name": "10 cm Peacock",
      "price": 60.8,
      "image": assets.peacock9cm,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 29,
      "name": "10 Cm Hercules Deluxe",
      "price": 79.8,
      "image": assets.hercules,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 30,
      "name": "9 cm Two Sound",
      "price": 64.6,
      "image": assets.twosound1,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 31,
      "name": "Two Sound Giant",
      "price": 87.4,
      "image": assets.twosoundgaint,
      "category": "sound-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 32,
      "name": "Bijili Crackers Red 50's",
      "price": 55.1,
      "image": assets.stdbijili,
      "category": "bijili-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "50 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 33,
      "name": "Bijili Crackers Red 100's",
      "price": 106.4,
      "image": assets.stdredbijili,
      "category": "bijili-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "100 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 34,
      "name": "Bijili Crackers Stripped 50’s",
      "price": 72.2,
      "image": assets.stdstripped,
      "category": "bijili-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "50 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 35,
      "name": "Bijili Crackers Stripped 100's",
      "price": 123.5,
      "image": assets.stdstripped,
      "category": "bijili-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "100 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 36,
      "name": "Cowboy Bijili Crackers",
      "price": 76.0,
      "image": assets.stdbijili,
      "category": "bijili-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "50 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 37,
      "name": "Giant Bijili",
      "price": 104.5,
      "image": assets.stdgaint,
      "category": "bijili-crackers",
      "brand": "standard",
      "rating": 4.2,
      "description": "50 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 38,
      "name": "Standard Atom Bombs",
      "price": 184.3,
      "image": assets.stdatom,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 39,
      "name": "Hydrogen Bombs Green",
      "price": 167.2,
      "image": assets.stdhydro,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 40,
      "name": "Hydrogen Bombs Foils",
      "price": 190.0,
      "image": assets.stdhydro,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 41,
      "name": "Thunder Bomb Green",
      "price": 235.6,
      "image": assets.stdthunder,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 42,
      "name": "Thunder Bomb Foils",
      "price": 273.6,
      "image": assets.stdthunder,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 43,
      "name": "Silver Bomb",
      "price": 176.7,
      "image": assets.stdsilver,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 44,
      "name": "Boom",
      "price": 317.3,
      "image": assets.stdboom,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 45,
      "name": "Kargil Self Re.Kill.Bullet",
      "price": 299.2,
      "image": assets.stdkargil,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 46,
      "name": "Colour Burst",
      "price": 260.3,
      "image": assets.stdcolour,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 47,
      "name": "Bullet Bombs Medium",
      "price": 81.7,
      "image": assets.stdbullet,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 48,
      "name": "Flower Pots Big - Gold",
      "price": 254.6,
      "image": assets.stdbig,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 49,
      "name": "Flower Pots Special - Gold",
      "price": 342.0,
      "image": assets.stdspecial,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 50,
      "name": "Flower Pots Giant - Gold",
      "price": 695.4,
      "image": assets.stdgaint1,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 51,
      "name": "Flower Pots Deluxe - Gold",
      "price": 454.1,
      "image": assets.stddeluxe,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 52,
      "name": "Tri Colour Fountain - Gold",
      "price": 699.2,
      "image": assets.stdtri,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 53,
      "name": "Flower Pots Small",
      "price": 140.6,
      "image": assets.stdsmall,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 54,
      "name": "Flower Pots Big",
      "price": 245.1,
      "image": assets.stdbig,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 55,
      "name": "Flower Pots Special",
      "price": 326.8,
      "image": assets.stdspecial,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 56,
      "name": "Flower Pots Giant",
      "price": 678.3,
      "image": assets.stdgaint1,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 57,
      "name": "Flower Pots Deluxe",
      "price": 440.8,
      "image": assets.stddeluxe,
      "category": "flower-pots",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 58,
      "name": "Tri Colour Fountain",
      "price": 689.7,
      "image": assets.stdtri,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 59,
      "name": "Tri Color Fountains(Millennium)",
      "price": 805.6,
      "image": assets.stdtrim,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 60,
      "name": "Red Cinderella",
      "price": 828.4,
      "image": assets.stdcyn,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 61,
      "name": "Lavender Fountain",
      "price": 640.3,
      "image": assets.stdfountain,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 62,
      "name": "Colour world",
      "price": 817.0,
      "image": assets.stdfountain,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 63,
      "name": "Crackling King",
      "price": 731.5,
      "image": assets.stdtower,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 64,
      "name": "The Great Splendour",
      "price": 125.4,
      "image": assets.stdgreat,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 65,
      "name": "Mini Fountain - Red",
      "price": 110.2,
      "image": assets.stdfoun,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "6 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 66,
      "name": "Mini Fountain - Gold",
      "price": 110.2,
      "image": assets.stdfoun,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "6 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 67,
      "name": "Mini Fountain - Silver",
      "price": 114.0,
      "image": assets.stdfoun,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "6 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 68,
      "name": "Mini Fountain - Purple",
      "price": 125.4,
      "image": assets.stdfoun,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "6 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 69,
      "name": "Happiness",
      "price": 488.3,
      "image": assets.stdfoun,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 70,
      "name": "Color Fountains",
      "price": 735.3,
      "image": assets.stdfountain,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "4 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 71,
      "name": "Cheers",
      "price": 347.7,
      "image": assets.stdcheers,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 72,
      "name": "Jade Flowers",
      "price": 484.5,
      "image": assets.stdjade,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 73,
      "name": "Jet Fountain (10 PCS)",
      "price": 294.5,
      "image": assets.stdjet,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 74,
      "name": "Jet Fountain",
      "price": 155.8,
      "image": assets.stdjet,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 75,
      "name": "Jewel Pots",
      "price": 473.1,
      "image": assets.stdjet,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 76,
      "name": "Tower Pots - Gold",
      "price": 1261.6,
      "image": assets.stdtower,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 77,
      "name": "Little Flower",
      "price": 108.3,
      "image": assets.stdlittle,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 78,
      "name": "Pop Corn",
      "price": 547.2,
      "image": assets.stdpop,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 79,
      "name": "Sundrops",
      "price": 494.0,
      "image": assets.stdsun,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 80,
      "name": "Money Penny",
      "price": 494.0,
      "image": assets.stdmoney,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 81,
      "name": "Wire Chakkars Big (10 Pcs)",
      "price": 108.3,
      "image": assets.stdchakk,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 82,
      "name": "Wire Chakkars Asoka",
      "price": 201.4,
      "image": assets.stdaso,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 83,
      "name": "Wire Chakkars Deluxe",
      "price": 402.8,
      "image": assets.stdchakkd,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 84,
      "name": "Zamin Chakkars Big",
      "price": 218.5,
      "image": assets.stdchakk,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "25 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 85,
      "name": "Zamin Chakkars Big (10 Pcs)",
      "price": 96.9,
      "image": assets.stdchakk,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 86,
      "name": "Zamin Chakkars Asoka",
      "price": 161.5,
      "image": assets.stdaso,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 87,
      "name": "Zamin Chakkar Special",
      "price": 273.6,
      "image": assets.stdsplc,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 88,
      "name": "Zamin Chakkars Deluxe",
      "price": 353.4,
      "image": assets.stdchakk,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 89,
      "name": "Zamin Chakkars Super Deluxe",
      "price": 391.4,
      "image": assets.stdchakksu,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 90,
      "name": "Red & White Chakkars (10 Pcs)",
      "price": 108.3,
      "image": assets.stdrw,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 91,
      "name": "Mega Twister",
      "price": 250.8,
      "image": assets.stdmega,
      "category": "ground-chakkar",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 92,
      "name": "Scarlet Saucer",
      "price": 171.0,
      "image": assets.stdscary,
      "category": "fancy-items,",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 93,
      "name": "Twin Spin",
      "price": 171.0,
      "image": assets.stdtwin,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 94,
      "name": "Scary Scream",
      "price": 357.2,
      "image": assets.stdscary,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "4 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 95,
      "name": "Scary Scream Mini",
      "price": 235.6,
      "image": assets.stdscary,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "4 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 96,
      "name": "Whizz Wheel",
      "price": 248.9,
      "image": assets.stdwizz,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 97,
      "name": "Twinkling Star - 45 CM",
      "price": 83.6,
      "image": assets.star,
      "category": "pencil",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 98,
      "name": "Silver Twinklings - 60 CM",
      "price": 133.0,
      "image": assets.stdsilverstar,
      "category": "pencil",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 99,
      "name": "Silver Twinklings Deluxe - 120 CM",
      "price": 281.2,
      "image": assets.stdstard,
      "category": "pencil",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 100,
      "name": "Fire Pencils",
      "price": 119.7,
      "image": assets.stdpencil,
      "category": "pencil",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 101,
      "name": "Magnetic Torches",
      "price": 117.8,
      "image": assets.stdmagnet,
      "category": "pencil",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 102,
      "name": "Multi Colour Candles",
      "price": 180.5,
      "image": assets.stdmulti,
      "category": "pencil",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 103,
      "name": "4 Colour Torches",
      "price": 362.9,
      "image": assets.stdfour,
      "category": "pencil",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 104,
      "name": "Surveyor Rockets",
      "price": 144.4,
      "image": assets.stdrocket,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 105,
      "name": "Rainbow Rockets",
      "price": 237.5,
      "image": assets.stdrocket1,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 106,
      "name": "Bomb Rockets",
      "price": 262.2,
      "image": assets.stdrocket2,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 107,
      "name": "Rohini Rockets",
      "price": 414.2,
      "image": assets.stdrocket3,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 108,
      "name": "Silver Jet Rockets",
      "price": 414.2,
      "image": assets.stdrocket4,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 109,
      "name": "Parachute Rocket",
      "price": 1052.6,
      "image": assets.stdrocket5,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 110,
      "name": "Prize (16 Item)",
      "price": 872.1,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "16 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 111,
      "name": "God’s Gift ( 18 Item)",
      "price": 1166.6,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "18 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 112,
      "name": "Super (23 Item)",
      "price": 1252.1,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "23 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 113,
      "name": "Great (28 Item)",
      "price": 1548.5,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "28 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 114,
      "name": "Wonderful (31 Item)",
      "price": 1833.5,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "31 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 115,
      "name": "Fantastic ( 34 Item)",
      "price": 2091.9,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "34 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 116,
      "name": "Khushi (36 Item)",
      "price": 2550.0,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "36 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 117,
      "name": "Jubilee (38 item)",
      "price": 2751.2,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "38 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 118,
      "name": "Diamond (43 Item)",
      "price": 3186.3,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "43 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 119,
      "name": "Titan (46 Item)",
      "price": 3769.6,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "46 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 120,
      "name": "New Paradise (50 Items)",
      "price": 6726.0,
      "image": assets.stdgift,
      "category": "giftbox",
      "brand": "standard",
      "rating": 4.2,
      "description": "50 Items in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 121,
      "name": "Cluster Blaster",
      "price": 286.9,
      "image": assets.stdcluster,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 122,
      "name": "Happy Dreams",
      "price": 252.7,
      "image": assets.stdhappy1,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 123,
      "name": "Snow Valley",
      "price": 237.5,
      "image": assets.stdsnow,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 124,
      "name": "Wise Siren",
      "price": 516.8,
      "image": assets.stdwise,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 125,
      "name": "Chat Chat",
      "price": 121.6,
      "image": assets.stdchat,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 PCS in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 126,
      "name": "Yahoo",
      "price": 454.1,
      "image": assets.stdyah,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 127,
      "name": "Rainbow Rain Barrage",
      "price": 507.3,
      "image": assets.stdrain,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1PS in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 128,
      "name": "Fat Boy",
      "price": 81.7,
      "image": assets.stdfat,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pt in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 129,
      "name": "Signal Lights",
      "price": 188.1,
      "image": assets.stdrain,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 130,
      "name": "Mine of Stars",
      "price": 326.8,
      "image": assets.stdmine,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 131,
      "name": "Colour Changing Butterfly (10 pcs)",
      "price": 361.0,
      "image": assets.stdchange,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 132,
      "name": "Colour Changing Butterfly (5pcs)",
      "price": 188.1,
      "image": assets.stdchange,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 133,
      "name": "Golden Whistle - Small",
      "price": 302.1,
      "image": assets.stdgold,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 134,
      "name": "Swastik Wheel",
      "price": 518.7,
      "image": assets.stdswa,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 135,
      "name": "Gold Rush",
      "price": 533.9,
      "image": assets.stdrush,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 136,
      "name": "Mine of Shots",
      "price": 435.1,
      "image": assets.stdshot,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 137,
      "name": "Meteor",
      "price": 492.1,
      "image": assets.stdmet,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 138,
      "name": "Aerial Outs",
      "price": 543.4,
      "image": assets.stdaer,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 139,
      "name": "Seven Shots",
      "price": 326.8,
      "image": assets.stdseven,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 140,
      "name": "Seven Shots - Red",
      "price": 427.5,
      "image": assets.stdseven,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 141,
      "name": "Seven Shots - Violet",
      "price": 427.5,
      "image": assets.stdseven,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 142,
      "name": "Seven Shots",
      "price": 1183.7,
      "image": assets.stdseven,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "15 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 143,
      "name": "Golden Drops",
      "price": 657.4,
      "image": assets.stdgold,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 144,
      "name": "Roman Candles (6 Balls)",
      "price": 429.4,
      "image": assets.stdrom,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 145,
      "name": "Golden Whistle - Giant",
      "price": 552.9,
      "image": assets.stdwise,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 146,
      "name": "Magic Tree",
      "price": 961.4,
      "image": assets.stdmagictree,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 147,
      "name": "T.V. Tower",
      "price": 433.2,
      "image": assets.stdtv,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 148,
      "name": "Magic Whip",
      "price": 163.4,
      "image": assets.stdwhip,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 149,
      "name": "Disco Flash",
      "price": 148.2,
      "image": assets.stddisco,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "6 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 150,
      "name": "Electric Stones (10PCS)",
      "price": 51.3,
      "image": assets.stdstone,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 151,
      "name": "Electric Stones",
      "price": 165.3,
      "image": assets.stdstone,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "25 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 152,
      "name": "Jumping Frog",
      "price": 197.6,
      "image": assets.stdfrog,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "6 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 153,
      "name": "Rang Goli",
      "price": 1278.7,
      "image": assets.stdrang,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "50 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 154,
      "name": "Treasure box",
      "price": 549.1,
      "image": assets.stdtreasure,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 155,
      "name": "Assorted Cartoons",
      "price": 146.3,
      "image": assets.stdtreasure,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 156,
      "name": "Tug of War",
      "price": 222.3,
      "image": assets.stdtug,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 157,
      "name": "Krak Jack",
      "price": 771.4,
      "image": assets.stdjack,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 158,
      "name": "Dollar Wheel",
      "price": 507.3,
      "image": assets.stddollar,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 159,
      "name": "Poker Wheel",
      "price": 507.3,
      "image": assets.stdpoker,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 160,
      "name": "Cuckoo",
      "price": 507.3,
      "image": assets.stdcuk,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 161,
      "name": "Laser Show",
      "price": 630.8,
      "image": assets.stdlaser,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 162,
      "name": "Matrix KavithaCrackers",
      "price": 513.0,
      "image": assets.stdmatrix,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 163,
      "name": "Jill Junk Juk",
      "price": 513.0,
      "image": assets.stdjil,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 164,
      "name": "Diamond Mine",
      "price": 427.5,
      "image": assets.stddiamond,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 165,
      "name": "Five Star",
      "price": 364.8,
      "image": assets.stdfive,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 166,
      "name": "Crackling Candy",
      "price": 507.3,
      "image": assets.stdcandy,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 167,
      "name": "Magical wand",
      "price": 507.3,
      "image": assets.stdwand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 168,
      "name": "Rainbow Fog (2pcs)",
      "price": 359.1,
      "image": assets.stdfog1,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 169,
      "name": "Rainbow Fog (5pcs)",
      "price": 834.1,
      "image": assets.stdfog1,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 170,
      "name": "Colour Fog Fountain",
      "price": 148.2,
      "image": assets.stdfogc,
      "category": "fountains",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 171,
      "name": "Olympic Torch",
      "price": 549.1,
      "image": assets.stdtorch,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 172,
      "name": "Vibgyor",
      "price": 741.0,
      "image": assets.stdv,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 173,
      "name": "Little Dragon",
      "price": 482.6,
      "image": assets.stdlittle1,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 174,
      "name": "Rangela Mist",
      "price": 112.1,
      "image": assets.stdfog1,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "50 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 175,
      "name": "Confetti",
      "price": 475.0,
      "image": assets.stdcon,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 176,
      "name": "Happy Spray Cannon",
      "price": 649.8,
      "image": assets.stdspray,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 177,
      "name": "Magic Spray - Confetti",
      "price": 321.1,
      "image": assets.stdspraym,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "S Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 178,
      "name": "Valentines Day - 16 Shots - 1 1/4\"",
      "price": 2732.2,
      "image": assets.stdval,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 179,
      "name": "Colour Magic -16 shots - 3/4\"",
      "price": 570.0,
      "image": assets.stdcolormagic,
      "category": "colour-magic",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 180,
      "name": "Grape Garden",
      "price": 461.7,
      "image": assets.stdgrape,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 181,
      "name": "Rose Garden",
      "price": 461.7,
      "image": assets.stdrose,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 182,
      "name": "Music Party",
      "price": 488.3,
      "image": assets.stdparty,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 183,
      "name": "Jet Mix (8 Variants)",
      "price": 461.7,
      "image": assets.stdrose,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 184,
      "name": "Blue Thunder - 56 Shots",
      "price": 2373.1,
      "image": assets.stdthunder1,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 185,
      "name": "Electronic Bombs - 56 Shots",
      "price": 2373.1,
      "image": assets.stde,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 186,
      "name": "Sensation - 100 Shots",
      "price": 4651.2,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 187,
      "name": "Sun Flower - 100 Shots",
      "price": 4295.9,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 188,
      "name": "Express 100 - 100 Shots",
      "price": 5441.6,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 189,
      "name": "Gold Bonanza - 125 Shots",
      "price": 5711.4,
      "image": assets.std125,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 190,
      "name": "Red Roses - 125 Shots",
      "price": 5711.4,
      "image": assets.std125,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 191,
      "name": "Speed 200 - 200 Shots",
      "price": 8141.5,
      "image": assets.std200,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 192,
      "name": "Paradise - 250 - 250 Shots",
      "price": 9519.0,
      "image": assets.std250,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 193,
      "name": "Panorama - 500 Shots",
      "price": 22756.3,
      "image": assets.std500,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 194,
      "name": "Oh! Kolkata! - 500 Shots",
      "price": 19851.2,
      "image": assets.std500,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 195,
      "name": "Power Play - 56 Shots (3 Variants)",
      "price": 2730.3,
      "image": assets.stdthunder1,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 196,
      "name": "Fruit Punch - 100 Shots (4 Variants)",
      "price": 5244.0,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 197,
      "name": "Crushers - 125 Shots (4 Variants)",
      "price": 6175.0,
      "image": assets.std125,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 198,
      "name": "Nemo - 100 Shots",
      "price": 11740.1,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 199,
      "name": "Fig - 100 Shots",
      "price": 9557.0,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 200,
      "name": "Middle Mist - 100 Shots",
      "price": 10391.1,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 201,
      "name": "Double Coconut - 100 Shots",
      "price": 10736.9,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 202,
      "name": "Butter Cup - 100 Shots",
      "price": 10754.0,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 203,
      "name": "Aaditya 72 - 72 Shots",
      "price": 18834.7,
      "image": assets.stde,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 204,
      "name": "Thrishul - 80 Shots",
      "price": 24420.7,
      "image": assets.std80,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 205,
      "name": "Selfy - 100 Shots",
      "price": 24724.7,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 206,
      "name": "Ganganam - 120 Shots",
      "price": 35685.8,
      "image": assets.std120,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 207,
      "name": "Susy - 100 Shots",
      "price": 43054.0,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 208,
      "name": "Ulta Seedha - 100 Shots",
      "price": 22279.4,
      "image": assets.std100,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 209,
      "name": "Magic crackers 28",
      "price": 49.4,
      "image": assets.d28,
      "category": "Walla",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pkt in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 210,
      "name": "Magic crackers - 56",
      "price": 87.4,
      "image": assets.std56,
      "category": "Walla",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pkt in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 211,
      "name": "Magic Crackers - 100",
      "price": 155.8,
      "image": assets.std1001,
      "category": "Walla",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Box in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 212,
      "name": "Magic Crackers - 1000",
      "price": 948.1,
      "image": assets.std1000,
      "category": "Walla",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Box in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 213,
      "name": "Magic Crackers - 2000",
      "price": 1805.0,
      "image": assets.std2000,
      "category": "Walla",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Box in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 214,
      "name": "Magic Crackers - 5000",
      "price": 4229.4,
      "image": assets.std5000,
      "category": "Walla",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Box in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 215,
      "name": "Magic Crackers - 10000",
      "price": 8432.2,
      "image": assets.std10000,
      "category": "Walla",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Box in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 216,
      "name": "Peacock Roll Caps",
      "price": 146.3,
      "image": assets.stdcap,
      "category": "paper-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "100 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 217,
      "name": "Chavi Roll Caps",
      "price": 146.3,
      "image": assets.stdcap,
      "category": "paper-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "100 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 218,
      "name": "SSS Bomb Foils (555 Bomb)",
      "price": 222.3,
      "image": assets.stdsss,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "6 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 219,
      "name": "CoIour Flash(HoIi Special)",
      "price": 186.2,
      "image": assets.stdcolour,
      "category": "flash-light",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 220,
      "name": "Flying Balloon",
      "price": 1151.4,
      "image": assets.stdballoon,
      "category": "flying-toys",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 221,
      "name": "Happy Birthday",
      "price": 613.7,
      "image": assets.stdballoon,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 222,
      "name": "Sci-fi",
      "price": 1212.2,
      "image": assets.stdballoon,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 223,
      "name": "Smiley",
      "price": 703.0,
      "image": assets.stdballoon,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 224,
      "name": "Flower Bomb (Ganga Jamuna)",
      "price": 247.0,
      "image": assets.stdganga,
      "category": "bombs",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 225,
      "name": "Rotor",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 226,
      "name": "Delta",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 227,
      "name": "Stiletto",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 228,
      "name": "Proton",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 229,
      "name": "Jericho",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 230,
      "name": "Pioneer",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 231,
      "name": "Cyclone",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 232,
      "name": "Viking",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 233,
      "name": "Arora",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 234,
      "name": "SkyMix",
      "price": 611.8,
      "image": assets.stdbrand,
      "category": "rockets",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 235,
      "name": "Super Star - Red",
      "price": 112.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 236,
      "name": "Super Star - Blue & White",
      "price": 112.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 237,
      "name": "Super Star - Purple & Gold",
      "price": 112.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 238,
      "name": "Mix Masala (10 Variants)",
      "price": 121.6,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 239,
      "name": "Pandav",
      "price": 267.9,
      "image": assets.stdpan,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 240,
      "name": "High Five",
      "price": 374.3,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 241,
      "name": "Starfire - Purple",
      "price": 152.0,
      "image": assets.stdstarfire,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 242,
      "name": "Starfire - Gold Rain",
      "price": 152.0,
      "image": assets.stdstarfire,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 243,
      "name": "Starfire - Red & White",
      "price": 152.0,
      "image": assets.stdstarfire,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 244,
      "name": "Starfire Comets (10 Pcs)",
      "price": 1677.7,
      "image": assets.stdstarfire,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 245,
      "name": "Jack Pot (10 Variants)",
      "price": 152.0,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 246,
      "name": "Avengers Special",
      "price": 222.3,
      "image": assets.stdavenger,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 247,
      "name": "Peony",
      "price": 258.4,
      "image": assets.stdpo,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 248,
      "name": "Leafy Light Show",
      "price": 2473.8,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "10 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 249,
      "name": "Starry Symphony",
      "price": 3005.8,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "5 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 250,
      "name": "Magic Box",
      "price": 248.9,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 251,
      "name": "Joker",
      "price": 248.9,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 252,
      "name": "Friendly Fire (12 Variants)",
      "price": 248.9,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 253,
      "name": "Silky",
      "price": 307.8,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 254,
      "name": "Fusion",
      "price": 307.8,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 255,
      "name": "Team Captain (12 Variants)",
      "price": 307.8,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 256,
      "name": "I Comet (3 Pcs)",
      "price": 923.4,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pce in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 257,
      "name": "Space Race (12",
      "price": 923.4,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pce in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 258,
      "name": "Colour Th.Bolt Gold(3 Pcs)",
      "price": 1000.0,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 259,
      "name": "Jasmine Drops",
      "price": 1000.0,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "3 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 260,
      "name": "Snow Balls",
      "price": 385.7,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 261,
      "name": "Royal Gems",
      "price": 385.7,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 262,
      "name": "Red Coral",
      "price": 385.7,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 263,
      "name": "Sun Flower",
      "price": 385.7,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 264,
      "name": "Garden of Eden",
      "price": 385.7,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 265,
      "name": "Crackling Delight",
      "price": 532.0,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 266,
      "name": "Asmaan Guru (11 Variants)",
      "price": 385.7,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 267,
      "name": "Rock ’n' Roll (11",
      "price": 811.3,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 268,
      "name": "Peanut (Double shot)",
      "price": 723.9,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 269,
      "name": "Peacock Beauty",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 270,
      "name": "Blue Diamonds",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 271,
      "name": "Violet Falls",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 272,
      "name": "King of Kings",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 273,
      "name": "Red in the Sky",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 274,
      "name": "Golden Octopus",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 275,
      "name": "Dancing Flowers",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 276,
      "name": "Colour Changing Balls",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 277,
      "name": "1000 Gems inthe Sky",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 278,
      "name": "Crackling Diamonds",
      "price": 1045.0,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 279,
      "name": "Moon Modi (13 Variants)",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 280,
      "name": "Kya Baath Hai (13 Variants)",
      "price": 718.2,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 281,
      "name": "Cosmic Rain (9 Variants)",
      "price": 1434.5,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 282,
      "name": "Fantasy",
      "price": 1580.8,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 283,
      "name": "Star Dust (9 Variants)",
      "price": 1580.8,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 284,
      "name": "Splash",
      "price": 1024.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 285,
      "name": "Outswing",
      "price": 1024.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 286,
      "name": "Candle Light",
      "price": 1024.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 287,
      "name": "Up N Away",
      "price": 1024.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 288,
      "name": "Scorpio",
      "price": 1024.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 289,
      "name": "Captain'schoice",
      "price": 1024.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 290,
      "name": "Twitter Glitter (7 Variants)",
      "price": 1024.1,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Pc in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 291,
      "name": "Hollywood Dreams",
      "price": 2103.3,
      "image": assets.stdbrand,
      "category": "fancy-items",
      "brand": "standard",
      "rating": 4.2,
      "description": "2 Pcs in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 292,
      "name": "Twist and Turn - 56 Shots",
      "price": 2300.9,
      "image": assets.stdturn,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 293,
      "name": "7 Wonder - 56 Shots",
      "price": 2413.0,
      "image": assets.stdwonder,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 294,
      "name": "Parrots Prattle - 56 Shots",
      "price": 2838.6,
      "image": assets.stdparr,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 295,
      "name": "Singing Birds - 100 Shots",
      "price": 4837.4,
      "image": assets.stdsing,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 296,
      "name": "Flipper - 12 Shots",
      "price": 349.6,
      "image": assets.std12,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 297,
      "name": "Sky Wash - 12 Shots",
      "price": 349.6,
      "image": assets.std12,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 298,
      "name": "Mighty M - 20 Shots",
      "price": 1265.4,
      "image": assets.std20,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 299,
      "name": "Pick n Shoot - 20 Shots",
      "price": 1265.4,
      "image": assets.std20,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 300,
      "name": "ROV - 25 Shots",
      "price": 1328.1,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 301,
      "name": "RMS - 25 - 25 Shots",
      "price": 1328.1,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 302,
      "name": "DTH 30 Shots",
      "price": 1444.0,
      "image": assets.std30,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 303,
      "name": "Howizit - 30 Shots",
      "price": 1444.0,
      "image": assets.std30,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 304,
      "name": "Mariner 40 - 40 Shots",
      "price": 1814.5,
      "image": assets.std40,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 305,
      "name": "Black Ghost - 40 Shots",
      "price": 1814.5,
      "image": assets.std40,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 306,
      "name": "Clipper 60 60 Shots",
      "price": 2401.6,
      "image": assets.std60,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 307,
      "name": "Packabot - 60 Shots",
      "price": 2401.6,
      "image": assets.std60,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 308,
      "name": "Cyborg - 80 Shots",
      "price": 3146.4,
      "image": assets.std80,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 309,
      "name": "Speed Metro - 100 Shots",
      "price": 3678.4,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 310,
      "name": "Eat R 100 - 100 Shots",
      "price": 3511.2,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 311,
      "name": "Matrix - 100 Shots",
      "price": 3511.2,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 312,
      "name": "Saffire 120 - 120 Shots",
      "price": 4077.4,
      "image": assets.std120,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 313,
      "name": "Meet Spot 120 shots",
      "price": 4077.4,
      "image": assets.std120,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 314,
      "name": "Rainbow Dance - 240 shots",
      "price": 9876.2,
      "image": assets.std240,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 315,
      "name": "Fly All(5 Variants) -12 Shots",
      "price": 349.6,
      "image": assets.std12,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 316,
      "name": "T20 Champ(5 Variants) -20 Shots",
      "price": 1265.4,
      "image": assets.std20,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 317,
      "name": "Touch Sky(3Variants) -25 Shots",
      "price": 1328.1,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 318,
      "name": "Orange Sky(3 Variants) -30 shots",
      "price": 1444.0,
      "image": assets.std30,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 319,
      "name": "Grand Finale(S Variants) -40 shots",
      "price": 1814.5,
      "image": assets.std40,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 320,
      "name": "FlyBoss(4Variants) -60Shots",
      "price": 2401.6,
      "image": assets.std60,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 321,
      "name": "80’S HITS(3 Variants) -80Shots",
      "price": 3146.4,
      "image": assets.std80,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 322,
      "name": "Moon Light(4 Variants) - 100 Shots",
      "price": 3511.2,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 323,
      "name": "BIuefly(4Variants) -120Shots",
      "price": 4077.4,
      "image": assets.std120,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 324,
      "name": "Peacock Dance 25 Shots",
      "price": 2952.6,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 325,
      "name": "Happy Day - 25 Shots",
      "price": 2680.9,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 326,
      "name": "Blue wonder - 25 Shots",
      "price": 3074.2,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 327,
      "name": "Mystical Night - 25 Shots",
      "price": 3024.8,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 328,
      "name": "Jewel of India - 25 Shots",
      "price": 3720.2,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 329,
      "name": "Beauty - 50 Shots",
      "price": 5067.3,
      "image": assets.std60,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 330,
      "name": "Kaliedoscope -100 Shots",
      "price": 11040.9,
      "image": assets.std100,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 331,
      "name": "Screaming Bats - 25 Shots",
      "price": 2614.4,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 332,
      "name": "Dolphin Dive - 25 Shots",
      "price": 3446.6,
      "image": assets.std25,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },
    {
      "id": 333,
      "name": "Radiance Mix (6 Variants)",
      "price": 2680.9,
      "image": assets.stdbrand,
      "category": "multi-shot",
      "brand": "standard",
      "rating": 4.2,
      "description": "1 Cake in one packet",
      "color": "from-green-500 to-emerald-500"
    },





    // FLASH LIGHT CRACKERS (1-6)
    {
      id: 1,
      name: "2% x 1000 Bird Crackers",
      price: 38, // 24 + 40%
      image: assets.birdCrackers,
      category: "flash-light",
      brand: "pothys",
      rating: 4.2,
      description: "1000 bird crackers in one packet",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-orange-500"
    },
    {
      id: 2,
      name: "4 x 5 x 500 Laxmi Crackers",
      price: 67, // 48 + 40%
      image: assets.lakshmi,
      category: "flash-light",
      brand: "pothys",
      rating: 4.3,
      description: "Premium Laxmi brand crackers",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-amber-500"
    },
    {
      id: 3,
      name: "4 x 5 x 250  DeluxeLakshmi Crackers",
      price: 81,
      image: assets.lakshmi,
      category: "flash-light",
      brand: "pothys",
      rating: 4.3,
      description: "Traditional parrot design crackers",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "3 1/2 x 5 x 750 Lakshmi Crackers",
      price: 50,
      image: assets.lakshmi,
      category: "flash-light",
      brand: "pothys",
      rating: 4.3,
      description: "Jocker brand flash crackers",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      name: "3 1/2 x 5 x 500 Two Sound Cracker",
      price: 87, // 58 + 40%
      image: assets.twosound,
      category: "flash-light",
      brand: "pothys",
      rating: 4.4,
      description: "Deluxe version Laxmi crackers",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-cyan-500"
    },
    {
      id: 6,
      name: "4 x 5 x 250 Two Sound Green Flies Crackers",
      price: 92, // 66 + 40%
      image: assets.twosound,
      category: "flash-light",
      brand: "pothys",
      rating: 4.5,
      description: "Special green flies with double sound",
      color: "from-green-500 to-emerald-500" // "from-indigo-500 to-purple-500"
    },

    // GROUND CHAKKARS (7-10)
    {
      id: 7,
      name: "Ground Chakkar Asoka",
      price: 108, // 77 + 40%
      image: assets.chakkaraso,
      category: "ground-chakkar",
      brand: "pothys",
      rating: 4.6,
      description: "Classic Asoka spinning chakkar",
      color: "from-green-500 to-emerald-500" // "from-pink-500 to-red-500"
    },
    {
      id: 8,
      name: "Ground Chakkar Special",
      price: 146, // 104 + 40%
      image: assets.chakkarspl,
      category: "ground-chakkar",
      brand: "pothys",
      rating: 4.7,
      description: "Special edition ground spinner",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 9,
      name: "Ground Chakkar Deluxe",
      price: 199, // 142 + 40%
      image: assets.chakkardlx,
      category: "ground-chakkar",
      brand: "pothys",
      rating: 4.8,
      description: "Deluxe version with enhanced effects",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-pink-500"
    },
    {
      id: 10,
      name: "Jolly Wheel",
      price: 398, // 284 + 40%
      image: assets.wheel,
      category: "ground-chakkar",
      brand: "pothys",
      rating: 4.9,
      description: "Premium jolly wheel spinner",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },

    // FLOWER POTS (11-13)
    {
      id: 11,
      name: "Flower Pots Big",
      price: 245, // 175 + 40%
      image: assets.big,
      category: "flower-pots",
      brand: "pothys",
      rating: 4.5,
      description: "Large flower pot fireworks",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-indigo-500"
    },
    {
      id: 12,
      name: "Flower Pots Special",
      price: 329, // 235 + 40%
      image: assets.special,
      category: "flower-pots",
      brand: "pothys",
      rating: 4.6,
      description: "Special edition flower pots",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-pink-500"
    },
    {
      id: 13,
      name: "Flower Pots Asoka",
      price: 476, // 340 + 40%
      image: assets.asoka,
      category: "flower-pots",
      brand: "pothys",
      rating: 4.7,
      description: "Asoka brand flower pots",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-amber-500"
    },

    // FOUNTAINS (14-16)
    {
      id: 14,
      name: "Colour Cone (10 Pcs)",
      price: 609, // 435 + 40%
      image: assets.cone,
      category: "fountains",
      brand: "pothys",
      rating: 4.7,
      description: "Colorful cone shaped fountains",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-orange-500"
    },
    {
      id: 15,
      name: "Colour Koti",
      price: 609,
      image: assets.koti,
      category: "fountains",
      brand: "pothys",
      rating: 4.7,
      description: "Vibrant color fountain display",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-emerald-500"
    },
    {
      id: 16,
      name: "Colour Koti DELUXE Sizzling",
      price: 1960, // 1400 + 40%
      image: assets.kotidlx,
      category: "fountains",
      brand: "pothys",
      rating: 4.9,
      description: "Deluxe sizzling fountain effect",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-cyan-500"
    },

    // BOMBS (17-27)
    {
      id: 17,
      name: "Hydro Bomb Green (Micro Cord)",
      price: 199, // 142 + 40%
      image: assets.hydro,
      category: "bombs",
      brand: "pothys",
      rating: 4.5,
      description: "Hydro bomb with green effects",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-pink-500"
    },
    {
      id: 18,
      name: "King Bomb Green (Micro Cord)",
      price: 298, // 213 + 40%
      image: assets.king,
      category: "bombs",
      brand: "pothys",
      rating: 4.6,
      description: "King size green bomb",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 19,
      name: "Classic Bomb Green (Micro Cord)",
      price: 397,
      image: assets.classic,
      category: "bombs",
      brand: "pothys",
      rating: 4.6,
      description: "Classic size green bomb",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 20,
      name: "Bullet Bomb",
      price: 75,
      image: assets.bullet,
      category: "bombs",
      brand: "pothys",
      rating: 4.6,
      description: "Bullet bomb",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 21,
      name: "Ganga Jamuna",
      price: 169,
      image: assets.ganga,
      category: "bombs",
      brand: "pothys",
      rating: 4.6,
      description: "Classic bomb",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 22,
      name: "Ganga Jamuna Deluxe",
      price: 203,
      image: assets.ganga,
      category: "bombs",
      brand: "pothys",
      rating: 4.6,
      description: "Classic size  bomb",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 23,
      name: "Colour Rocket",
      price: 235, // 168 + 40%
      image: assets.color,
      category: "rockets",
      brand: "pothys",
      rating: 4.6,
      description: "Colorful aerial rocket",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-pink-500"
    },
    {
      id: 24,
      name: "Rocket Bomb",
      price: 250,
      image: assets.rocketbomb,
      category: "rockets",
      brand: "pothys",
      rating: 4.6,
      description: "Colorful aerial rocket",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 25,
      name: "Lunik Rocket",
      price: 434,
      image: assets.rocket,
      category: "rockets",
      brand: "pothys",
      rating: 4.6,
      description: "Colorful aerial rocket",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 26,
      name: "Agni Rocket",
      price: 343,
      image: assets.rocket,
      category: "rockets",
      brand: "pothys",
      rating: 4.6,
      description: "Colorful aerial rocket",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 27,
      name: "Two Sound Rocket",
      price: 455,
      image: assets.two,
      category: "rockets",
      brand: "pothys",
      rating: 4.6,
      description: "Colorful aerial rocket",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 28,
      name: "Three Sound Rocket",
      price: 511,
      image: assets.three,
      category: "rockets",
      brand: "pothys",
      rating: 4.6,
      description: "Colorful aerial rocket",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-pink-500"
    },

    //sliver shower
    {
      id: 29,
      name: "Silver Twinkling Star (1½\")",
      price: 90, // 64 + 40%
      image: assets.star,
      category: "sliver-showers",
      brand: "pothys",
      rating: 4.4,
      description: "Twinkling silver star effect",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },
    {
      id: 30,
      name: "Dlx Twinkling Star (4\")",
      price: 257,
      image: assets.star,
      category: "sliver-showers",
      brand: "pothys",
      rating: 4.5,
      description: "Twinkling silver star effect",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },
    {
      id: 31,
      name: "(7\")Pencil",
      price: 140,
      image: assets.pencil,
      category: "sliver-showers",
      brand: "pothys",
      rating: 4.4,
      description: "Twinkling silver star effect",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },
    {
      id: 32,
      name: "(10\")Deluxe Pencil",
      price: 252,
      image: assets.pencil,
      category: "sliver-showers",
      brand: "pothys",
      rating: 4.6,
      description: "Twinkling silver star effect",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },
    {
      id: 33,
      name: "Electric Stone",
      price: 77,
      image: assets.stone,
      category: "sliver-showers",
      brand: "pothys",
      rating: 4.7,
      description: "Twinkling silver star effect",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },

    // BIJILI CRACKERS (42-43)
    {
      id: 34,
      name: "Red Bijilli",
      price: 98, // 70 + 40%
      image: assets.red,
      category: "bijili-crackers",
      brand: "pothys",
      rating: 4.3,
      description: "Traditional red bijili crackers",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-indigo-500"
    },
    {
      id: 35,
      name: "Stripped Bijilli",
      price: 105,
      image: assets.stripped,
      category: "bijili-crackers",
      brand: "pothys",
      rating: 4.6,
      description: "Traditional red bijili crackers",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-indigo-500"
    },

    {
      id: 36,
      name: "7 Colour Shot (10 Pcs)",
      price: 532, // 380 + 40%
      image: assets.shot,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.5,
      description: "Vibrant multi-color aerial shots",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-pink-500"
    },
    {
      id: 37,
      name: "12 Star Aerial Colour Bomb (Square)",
      price: 448, // 320 + 40%
      image: assets.star12,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.3,
      description: "Stunning star-shaped aerial explosions",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-indigo-500"
    },
    {
      id: 38,
      name: "12 Shot Aerial Colour Bomb (Mega Size)",
      price: 448, // 320 + 40%
      image: assets.star12,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.4,
      description: "Large aerial bursts with 12 colorful shots",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-orange-500"
    },
    {
      id: 39,
      name: "Kargil War (12 Shot)",
      price: 616, // 440 + 40%
      image: assets.shot12,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.7,
      description: "Dramatic multi-shot aerial display",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },
    {
      id: 40,
      name: "Triple CoCo (Gold, Silver, Green)",
      price: 602, // 430 + 40%
      image: assets.triple,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.6,
      description: "Elegant gold, silver, and green effects",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-gray-500"
    },
    {
      id: 41,
      name: "Thaiya Thaiya (Golden Jamki Paper) (2 Pcs)",
      price: 392, // 280 + 40%
      image: assets.paper,
      category: "paper-items",
      brand: "pothys",
      rating: 4.1,
      description: "Golden sparkler paper for handheld fun",
      color: "from-green-500 to-emerald-500" // "from-amber-500 to-yellow-500"
    },
    {
      id: 42,
      name: "1 1/4\" Chotta Fancy",
      price: 154, // 110 + 40%
      image: assets.pipe,
      category: "chotta-fancy-items",
      brand: "pothys",
      rating: 4.0,
      description: "Small but vibrant fancy firework",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-pink-500"
    },
    {
      id: 43,
      name: "2\" Pipe 3 Pcs Packing",
      price: 728, // 520 + 40%
      image: assets.pipe,
      category: "aerial-fancy",
      brand: "pothys",
      rating: 4.8,
      description: "Powerful aerial pipes with triple effects",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-purple-500"
    },
    {
      id: 44,
      name: "2\" Pipe Single Pieces",
      price: 364, // 260 + 40%
      image: assets.pipe,
      category: "double-effect-fancy",
      brand: "pothys",
      rating: 4.2,
      description: "Single-piece aerial pipe with double effects",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-blue-500"
    },
    {
      id: 45,
      name: "2½\" Pipe Two Piece Packing",
      price: 868, // 620 + 40%
      image: assets.pipe,
      category: "mega-flash-fancy",
      brand: "pothys",
      rating: 4.9,
      description: "High-intensity mega flash pipes",
      color: "from-green-500 to-emerald-500" // "from-orange-500 to-red-500"
    },

    //

    {
      id: 46,
      name: "Thriller 3\" Pipe",
      price: 728, // 520 + 40%
      image: assets.pipel,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.7,
      description: "High-altitude 3-inch pipe with thrilling effects",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-indigo-500"
    },
    {
      id: 47,
      name: "Mega Pipe Sens II Pipe",
      price: 1680, // 1200 + 40%
      image: assets.pipem,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.9,
      description: "Premium mega pipe with sensational multi-color bursts",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-yellow-500"
    },
    {
      id: 48,
      name: "100 Deluxe 1 PKT",
      price: 672, // 480 + 40%
      image: assets.d100,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.3,
      description: "Deluxe sparkler pack for extended celebrations",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-cyan-500"
    },
    {
      id: 49,
      name: "Ultra Candle",
      price: 210, // 150 + 40%
      image: assets.candle,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.1,
      description: "Long-lasting fountain candle with bright sparks",
      color: "from-green-500 to-emerald-500" // "from-white-500 to-silver-500"
    },
    {
      id: 50,
      name: "Flying Drone",
      price: 560, // 400 + 40%
      image: assets.drone,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.6,
      description: "Drone-shaped firework with aerial spins",
      color: "from-green-500 to-emerald-500" // "from-gray-500 to-black-500"
    },
    {
      id: 51,
      name: "Flying Helicopter",
      price: 364, // 260 + 40%
      image: assets.drone,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.4,
      description: "Helicopter-shaped spinner with colorful trails",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-lime-500"
    },
    {
      id: 52,
      name: "Flying Chakkar",
      price: 672, // 480 + 40%
      image: assets.butterfly,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.5,
      description: "Whirling aerial disk with sparkling effects",
      color: "from-green-500 to-emerald-500" // "from-orange-500 to-red-500"
    },
    {
      id: 53,
      name: "Music Mela",
      price: 1064, // 760 + 40%
      image: assets.music,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.8,
      description: "Musical firework with synchronized light effects",
      color: "from-green-500 to-emerald-500" // "from-pink-500 to-rose-500"
    },
    {
      id: 54,
      name: "Mix Max",
      price: 224, // 160 + 40%
      image: assets.minmax,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.0,
      description: "Assorted mini sparklers for variety",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-amber-500"
    },
    {
      id: 55,
      name: "One Hit Wonder",
      price: 392, // 280 + 40%
      image: assets.onehit,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.3,
      description: "Single explosive burst with dazzling colors",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-teal-500"
    },
    {
      id: 56,
      name: "MidNight Vibes (3 Pcs)",
      price: 476, // 340 + 40%
      image: assets.mid,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.5,
      description: "Night-themed fountain with serene effects",
      color: "from-green-500 to-emerald-500" // "from-indigo-500 to-violet-500"
    },
    {
      id: 57,
      name: "Tin Beer Fountain",
      price: 420, // 300 + 40%
      image: assets.tin,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.2,
      description: "Mini beer-shaped fountain with foamy sparks",
      color: "from-green-500 to-emerald-500" // "from-amber-500 to-brown-500"
    },
    {
      id: 58,
      name: "24 Deluxe",
      price: 203, // 145 + 40%
      image: assets.d24,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.1,
      description: "Classic deluxe sparkler pack",
      color: "from-green-500 to-emerald-500" // "from-white-500 to-gray-500"
    },
    {
      id: 59,
      name: "28 Deluxe",
      price: 224, // 160 + 40%
      image: assets.d28,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.2,
      description: "Longer-lasting deluxe sparklers",
      color: "from-green-500 to-emerald-500" // "from-silver-500 to-gray-500"
    },
    {
      id: 60,
      name: "28 Goa",
      price: 56, // 40 + 40%
      image: assets.g28,
      category: "colour-magic",
      brand: "pothys",
      rating: 3.9,
      description: "Budget-friendly sparklers for casual use",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 61,
      name: "28 Chorsa",
      price: 56, // 40 + 40%
      image: assets.d28,
      category: "colour-magic",
      brand: "pothys",
      rating: 3.8,
      description: "Traditional short sparklers",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-pink-500"
    },
    {
      id: 62,
      name: "28 Giant",
      price: 98, // 70 + 40%
      image: assets.g28,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.0,
      description: "Thicker sparklers with brighter flames",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-emerald-500"
    },
    {
      id: 63,
      name: "56 Giant",
      price: 196, // 140 + 40%
      image: assets.gaint56,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.3,
      description: "Double-length giant sparklers",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-cyan-500"
    },
    {
      id: 64,
      name: "Ganga G1",
      price: 910, // 650 + 40%
      image: assets.g1g2g5g10,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.8,
      description: "Premium aerial firework with waterfall effects",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-indigo-500"
    },
    {
      id: 65,
      name: "Yamuna G2",
      price: 1820, // 1300 + 40%
      image: assets.g1g2g5g10,
      category: "colour-magic",
      brand: "pothys",
      rating: 4.9,
      description: "Grand multi-shot aerial display",
      color: "from-green-500 to-emerald-500" // "from-teal-500 to-emerald-500"
    },
    {
      id: 66,
      name: "Saraswathi G5",
      price: 4550, // 3250 + 40%
      image: assets.g1g2g5g10,
      category: "colour-magic",
      brand: "pothys",
      rating: 5.0,
      description: "Luxury firework with synchronized patterns",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-pink-500"
    },
    {
      id: 67,
      name: "Kaveri G10",
      price: 8820, // 6300 + 40%
      image: assets.g1g2g5g10,
      category: "colour-magic",
      brand: "pothys",
      rating: 5.0,
      description: "Ultimate showstopper with 10-minute spectacle",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-gold-500"
    },


    {
      id: 68,
      name: "15 Shot (Sky Boom)",
      price: 784, // 560 + 40%
      image: assets.shot12,
      category: "multi-shot",
      brand: "pothys",
      rating: 4.6,
      description: "Rapid-fire 15-shot aerial barrage with thunderous bursts",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-indigo-500"
    },
    {
      id: 69,
      name: "25 Shot (Green, Silver)",
      price: 714, // 510 + 40%
      image: assets.shot25,
      category: "multi-shot",
      brand: "pothys",
      rating: 4.7,
      description: "Elegant green and silver aerial sequences",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-silver-500"
    },
    {
      id: 70,
      name: "Dil Pasaad (25 Shot)",
      price: 966, // 690 + 40%
      image: assets.shot25,
      category: "multi-shot",
      brand: "pothys",
      rating: 4.8,
      description: "Romantic 25-shot display with heart-shaped effects",
      color: "from-green-500 to-emerald-500" // "from-pink-500 to-red-500"
    },
    {
      id: 71,
      name: "Spark 25 Shot (Multicolour)",
      price: 980, // 700 + 40%
      image: assets.shot25,
      category: "multi-shot",
      brand: "pothys",
      rating: 4.9,
      description: "Vibrant multicolor 25-shot aerial extravaganza",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-purple-500"
    },
    {
      id: 72,
      name: "30 Shot (Multi Colour)",
      price: 1442, // 1030 + 40%
      image: assets.shot30,
      category: "multi-shot",
      brand: "pothys",
      rating: 4.9,
      description: "Dazzling 30-shot display with rainbow effects",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-blue-500"
    },
    {
      id: 73,
      name: "50 Shot Pearl (Silver, Gold, Green)",
      price: 1680, // 1200 + 40%
      image: assets.shot50,
      category: "multi-shot",
      brand: "pothys",
      rating: 5.0,
      description: "Luxurious pearl-like bursts in silver, gold, and green",
      color: "from-green-500 to-emerald-500" // "from-silver-500 to-gold-500"
    },
    {
      id: 74,
      name: "Italia 50 Shot",
      price: 1820, // 1300 + 40%
      image: assets.shot50,
      category: "multi-shot",
      brand: "pothys",
      rating: 5.0,
      description: "Italian-style 50-shot artistic aerial display",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-white-500"
    },
    {
      id: 75,
      name: "60 Shot",
      price: 2534, // 1810 + 40%
      image: assets.shot60,
      category: "multi-shot",
      brand: "pothys",
      rating: 5.0,
      description: "High-capacity 60-shot aerial spectacle",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-purple-500"
    },
    {
      id: 76,
      name: "Meri Janeman (100 Shot)",
      price: 4270, // 3050 + 40%
      image: assets.shot100,
      category: "multi-shot",
      brand: "pothys",
      rating: 5.0,
      description: "Epic 100-shot grand finale masterpiece",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-gold-500"
    },
    {
      id: 77,
      name: "Classic 120 Shot",
      price: 4900, // 3500 + 40%
      image: assets.shot120,
      category: "multi-shot",
      brand: "pothys",
      rating: 5.0,
      description: "Timeless 120-shot professional-grade display",
      color: "from-green-500 to-emerald-500" // "from-indigo-500 to-violet-500"
    },
    {
      id: 78,
      name: "Challenger 240 Shot",
      price: 9660, // 6900 + 40%
      image: assets.shot600,
      category: "multi-shot",
      brand: "pothys",
      rating: 5.0,
      description: "Ultimate 240-shot championship-level fireworks",
      color: "from-green-500 to-emerald-500" // "from-orange-500 to-yellow-500"
    },
    {
      id: 79,
      name: "Royal Challenge 600 Shot",
      price: 24150, // 17250 + 40%
      image: assets.shot600,
      category: "multi-shot",
      brand: "pothys",
      rating: 5.0,
      description: "Regal 600-shot world-class pyrotechnic experience",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-gold-500"
    },
    {
      id: 80,
      name: "4\" Chotta Bheem",
      price: 97, // 69 + 40%
      image: assets.bheem,
      category: "kids-crackers",
      brand: "pothys",
      rating: 4.2,
      description: "Kid-friendly Chotta Bheem themed cracker",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 81,
      name: "4\" Ben Ten",
      price: 109, // 78 + 40%
      image: assets.ben,
      category: "kids-crackers",
      brand: "pothys",
      rating: 4.3,
      description: "Ben Ten cartoon-themed fun cracker",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-black-500"
    },
    {
      id: 82,
      name: "Red Bijilli (50 Pcs)",
      price: 49, // 35 + 40%
      image: assets.redbijili,
      category: "bijili-crackers",
      brand: "pothys",
      rating: 4.1,
      description: "Budget pack of 50 red bijili crackers",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-pink-500"
    },
    {
      id: 83,
      name: "Assorted Cartoon",
      price: 81, // 58 + 40%
      image: assets.cartoon,
      category: "kids-crackers",
      brand: "pothys",
      rating: 4.0,
      description: "Mixed cartoon-themed crackers for children",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-green-500"
    },
    {
      id: 84,
      name: "Magic Fountain (4 Pcs)",
      price: 563, // 402 + 40%
      image: assets.magic,
      category: "fountains",
      brand: "pothys",
      rating: 4.5,
      description: "Four magical fountains with color-changing sparks",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-blue-500"
    },
    {
      id: 85,
      name: "Single Fountain",
      price: 200, // 143 + 40%
      image: assets.single,
      category: "fountains",
      brand: "pothys",
      rating: 4.2,
      description: "Classic single fountain with golden sparks",
      color: "from-green-500 to-emerald-500" // "from-amber-500 to-yellow-500"
    },
    {
      id: 86,
      name: "Butterfly (10 Pcs)",
      price: 306, // 218 + 40%
      image: assets.butterfly,
      category: "flying-toys",
      brand: "pothys",
      rating: 4.4,
      description: "Butterfly-shaped fliers with gentle spins",
      color: "from-green-500 to-emerald-500" // "from-pink-500 to-red-500"
    },
    {
      id: 87,
      name: "Photo Flash (5 Pcs)",
      price: 241, // 172 + 40%
      image: assets.photo,
      category: "camera-crackers",
      brand: "pothys",
      rating: 4.3,
      description: "Bright flash crackers for photography effects",
      color: "from-green-500 to-emerald-500" // "from-white-500 to-blue-500"
    },
    {
      id: 88,
      name: "Peacock",
      price: 548, // 391 + 40%
      image: assets.peacock,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.6,
      description: "Peacock-themed fountain with feather-like sparks",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-blue-500"
    },
    {
      id: 89,
      name: "Colour Bullet",
      price: 112, // 80 + 40%
      image: assets.colorbullet,
      category: "small-bombs",
      brand: "pothys",
      rating: 4.1,
      description: "Mini color bullet with loud report",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-orange-500"
    },
    {
      id: 90,
      name: "Five Star Chotta Fancy (5 Pcs)",
      price: 525, // 375 + 40%
      image: assets.chota5,
      category: "chotta-fancy",
      brand: "pothys",
      rating: 4.4,
      description: "Five-star shaped mini fancy fireworks",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-red-500"
    },
    {
      id: 91,
      name: "Rocking",
      price: 649, // 463 + 40%
      image: assets.notimage,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.5,
      description: "Ground spinner with rocking motion and sparks",
      color: "from-green-500 to-emerald-500" // "from-orange-500 to-red-500"
    },
    {
      id: 92,
      name: "Testala",
      price: 563, // 402 + 40%
      image: assets.notimage,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.3,
      description: "Unique crackling and color effects",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-green-500"
    },
    {
      id: 93,
      name: "Asrafi Koti (5 Pcs)",
      price: 258, // 184 + 40%
      image: assets.asrafi,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.2,
      description: "Golden coin-shaped sparklers",
      color: "from-green-500 to-emerald-500" // "from-gold-500 to-yellow-500"
    },
    {
      id: 94,
      name: "Siren (2 Pcs)",
      price: 402, // 287 + 40%
      image: assets.siren,
      category: "sound-crackers",
      brand: "pothys",
      rating: 4.4,
      description: "Loud siren sound effect crackers",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-black-500"
    },
    {
      id: 95,
      name: "Topten",
      price: 1050, // 750 + 40%
      image: assets.topten,
      category: "fancy-items",
      brand: "pothys",
      rating: 4.7,
      description: "Premium top-tier fountain with ten effects",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-silver-500"
    },
    {
      id: 96,
      name: "Rang Chakkar",
      price: 868, // 620 + 40%
      image: assets.ranga,
      category: "spinners",
      brand: "pothys",
      rating: 4.6,
      description: "Colorful whirling ground spinner",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-blue-500"
    },

    {
      id: 97,
      name: "Electric (7cm)",
      price: 40, // 28 + 40%
      image: assets.electric7cm,
      category: "sparklers-7cm",
      brand: "pothys",
      rating: 4.0,
      description: "Classic 7cm electric sparklers for handheld fun",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-white-500"
    },
    {
      id: 98,
      name: "Crackling (7cm)",
      price: 47, // 33 + 40%
      image: assets.crackling7cm,
      category: "sparklers-7cm",
      brand: "pothys",
      rating: 4.1,
      description: "7cm sparklers with crackling sound effects",
      color: "from-green-500 to-emerald-500" // "from-gray-500 to-black-500"
    },
    {
      id: 99,
      name: "Green (7cm)",
      price: 54, // 38 + 40%
      image: assets.green7cm,
      category: "sparklers-7cm",
      brand: "pothys",
      rating: 4.2,
      description: "Vibrant green-colored 7cm sparklers",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-lime-500"
    },
    {
      id: 100,
      name: "Red (7cm)",
      price: 58, // 41 + 40%
      image: assets.red7cm,
      category: "sparklers-7cm",
      brand: "pothys",
      rating: 4.2,
      description: "Bright red 7cm sparklers for festive glow",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-pink-500"
    },
    {
      id: 101,
      name: "50-50 (7cm)",
      price: 58, // 41 + 40%
      image: assets.crackling7cm,
      category: "sparklers-7cm",
      brand: "pothys",
      rating: 4.3,
      description: "Dual-color 7cm sparklers (red and green)",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-green-500"
    },
    {
      id: 102,
      name: "Electric (10cm)",
      price: 61, // 43 + 40%
      image: assets.electric10cm,
      category: "sparklers-10cm",
      brand: "pothys",
      rating: 4.3,
      description: "Longer 10cm electric sparklers",
      color: "from-green-500 to-emerald-500" // "from-white-500 to-blue-500"
    },
    {
      id: 103,
      name: "Crackling (10cm)",
      price: 63, // 45 + 40%
      image: assets.crackling10cm,
      category: "sparklers-10cm",
      brand: "pothys",
      rating: 4.4,
      description: "10cm sparklers with loud crackling sounds",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-orange-500"
    },
    {
      id: 104,
      name: "Flora Green (10cm)",
      price: 69, // 49 + 40%
      image: assets.green10cm,
      category: "sparklers-10cm",
      brand: "pothys",
      rating: 4.5,
      description: "Eco-friendly green sparklers with floral patterns",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },
    {
      id: 105,
      name: "Red Rounds (10cm)",
      price: 73, // 52 + 40%
      image: assets.red10cm,
      category: "sparklers-10cm",
      brand: "pothys",
      rating: 4.4,
      description: "10cm round-tip red sparklers",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-rose-500"
    },
    {
      id: 106,
      name: "Maska Chaska (10cm)",
      price: 73, // 52 + 40%
      image: assets.crackling10cm,
      category: "sparklers-10cm",
      brand: "pothys",
      rating: 4.5,
      description: "10cm sparklers with alternating color effects",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-red-500"
    },
    {
      id: 107,
      name: "Five in One (10cm)",
      price: 322, // 230 + 40%
      image: assets.fiveinone,
      category: "sparklers-10cm",
      brand: "pothys",
      rating: 4.8,
      description: "10cm sparklers with five sequential color changes",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-blue-500"
    },
    {
      id: 108,
      name: "Electric (12cm)",
      price: 83, // 59 + 40%
      image: assets.electric12cm,
      category: "sparklers-12cm",
      brand: "pothys",
      rating: 4.5,
      description: "Extra-long 12cm electric sparklers",
      color: "from-green-500 to-emerald-500" // "from-white-500 to-silver-500"
    },
    {
      id: 109,
      name: "Crackling (12cm)",
      price: 93, // 66 + 40%
      image: assets.crackling12cm,
      category: "sparklers-12cm",
      brand: "pothys",
      rating: 4.6,
      description: "12cm sparklers with intense crackling effects",
      color: "from-green-500 to-emerald-500" // "from-gray-500 to-black-500"
    },
    {
      id: 110,
      name: "Green Tree (12cm)",
      price: 94, // 67 + 40%
      image: assets.green12cm,
      category: "sparklers-12cm",
      brand: "pothys",
      rating: 4.6,
      description: "12cm sparklers shaped like tiny trees",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-emerald-500"
    },
    {
      id: 111,
      name: "Sun Red (12cm)",
      price: 97, // 69 + 40%
      image: assets.red12cm,
      category: "sparklers-12cm",
      brand: "pothys",
      rating: 4.7,
      description: "12cm sparklers with sun-like red bursts",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-orange-500"
    },
    {
      id: 112,
      name: "50-50 (12cm)",
      price: 97, // 69 + 40%
      image: assets.crackling12cm,
      category: "sparklers-12cm",
      brand: "pothys",
      rating: 4.7,
      description: "12cm dual-color sparklers (gold and silver)",
      color: "from-green-500 to-emerald-500" // "from-gold-500 to-silver-500"
    },
    {
      id: 113,
      name: "Electric (15cm)",
      price: 126, // 90 + 40%
      image: assets.electric15cm,
      category: "sparklers-15cm",
      brand: "pothys",
      rating: 4.8,
      description: "Super-long 15cm electric sparklers",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-white-500"
    },
    {
      id: 114,
      name: "Crackling (15cm)",
      price: 129, // 92 + 40%
      image: assets.crackling15cm,
      category: "sparklers-15cm",
      brand: "pothys",
      rating: 4.8,
      description: "15cm sparklers with thunderous crackles",
      color: "from-green-500 to-emerald-500" // "from-yellow-500 to-red-500"
    },
    {
      id: 115,
      name: "Green (15cm)",
      price: 154, // 110 + 40%
      image: assets.green15cm,
      category: "sparklers-15cm",
      brand: "pothys",
      rating: 4.9,
      description: "15cm bright green sparklers",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-lime-500"
    },
    {
      id: 116,
      name: "Red (15cm)",
      price: 161, // 115 + 40%
      image: assets.red15cm,
      category: "sparklers-15cm",
      brand: "pothys",
      rating: 4.9,
      description: "15cm deep red sparklers",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-crimson-500"
    },
    {
      id: 117,
      name: "50-50 (15cm)",
      price: 161, // 115 + 40%
      image: assets.red15cm,
      category: "sparklers-15cm",
      brand: "pothys",
      rating: 4.9,
      description: "15cm half-red, half-green sparklers",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-green-500"
    },
    {
      id: 118,
      name: "Five in One (15cm)",
      price: 644, // 460 + 40%
      image: assets.fiveinone15cm,
      category: "sparklers-15cm",
      brand: "pothys",
      rating: 5.0,
      description: "15cm sparklers with five dazzling color phases",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-gold-500"
    },
    {
      id: 119,
      name: "Electric (30cm, 5 Piece)",
      price: 126, // 90 + 40%
      image: assets.electric30cm,
      category: "sparklers-30cm",
      brand: "pothys",
      rating: 4.8,
      description: "Giant 30cm electric sparklers (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-white-500 to-blue-500"
    },
    {
      id: 120,
      name: "Crackling (30cm, 5 Piece)",
      price: 133, // 95 + 40%
      image: assets.crackling30cm,
      category: "sparklers-30cm",
      brand: "pothys",
      rating: 4.9,
      description: "30cm crackling sparklers (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-gray-500 to-black-500"
    },
    {
      id: 121,
      name: "Green (30cm, 5 Piece)",
      price: 154, // 110 + 40%
      image: assets.green30cm,
      category: "sparklers-30cm",
      brand: "pothys",
      rating: 4.9,
      description: "30cm green sparklers (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-green-500 to-teal-500"
    },
    {
      id: 122,
      name: "Red (30cm, 5 Piece)",
      price: 154, // 110 + 40%
      image: assets.red30cm,
      category: "sparklers-30cm",
      brand: "pothys",
      rating: 4.9,
      description: "30cm red sparklers (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-rose-500"
    },
    {
      id: 123,
      name: "50-50 (30cm, 5 Piece)",
      price: 161, // 115 + 40%
      image: assets.red30cm,
      category: "sparklers-30cm",
      brand: "pothys",
      rating: 5.0,
      description: "30cm dual-color sparklers (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-red-500"
    },
    {
      id: 124,
      name: "Electric (50cm, 5 Piece)",
      price: 387, // 276 + 40%
      image: assets.electric50cm,
      category: "sparklers-50cm",
      brand: "pothys",
      rating: 5.0,
      description: "Extra-long 50cm electric sparklers (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-white-500 to-silver-500"
    },
    {
      id: 125,
      name: "Five in One (50cm, 5 Piece)",
      price: 629, // 449 + 40%
      image: assets.crackling50cm,
      category: "sparklers-50cm",
      brand: "pothys",
      rating: 5.0,
      description: "50cm sparklers with five color phases (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-purple-500 to-gold-500"
    },
    {
      id: 126,
      name: "75cm Electric (5 Piece)",
      price: 629, // 449 + 40%
      image: assets.electric50cm,
      category: "sparklers-50cm",
      brand: "pothys",
      rating: 5.0,
      description: "Giant 75cm electric sparklers (5 per box)",
      color: "from-green-500 to-emerald-500" // "from-blue-500 to-white-500"
    },
    {
      id: 127,
      name: "50cm Colour",
      price: 500, // 357 + 40%
      image: assets.redgreen50cm,
      category: "sparklers-50cm",
      brand: "pothys",
      rating: 5.0,
      description: "50cm multi-color rotating sparklers",
      color: "from-green-500 to-emerald-500" // "from-red-500 to-blue-500"
    },
    {
      id: 128,
      name: "Rotating Sparklers",
      price: 868, // 620 + 40%
      image: assets.umbrella,
      category: "sparklers-50cm",
      brand: "pothys",
      rating: 5.0,
      description: "Advanced rotating sparklers with 360° effects",
      color: "from-green-500 to-emerald-500" // "from-gold-500 to-silver-500"
    }


  ];


  const categories = [
    { id: 'all', name: 'All' },
    { id: 'giftbox', name: 'Giftbox' },
    { id: 'Walla', name: 'Walla' },
    { id: 'flash-light', name: 'Flash Light Crackers' },
    { id: 'ground-chakkar', name: 'Ground Chakkar' },
    { id: 'flower-pots', name: 'Flower Pots' },
    { id: 'fountains', name: 'Fountains' },
    { id: 'bombs', name: 'Bombs' },
    { id: 'pencil', name: 'Pencil' },
    { id: 'rockets', name: 'Rockets' },
    { id: 'sliver-showers', name: 'Sliver Showers' },
    { id: 'bijili-crackers', name: 'Bijili Crackers' },
    { id: 'fancy-items', name: 'Fancy Items' },
    { id: 'paper-items', name: 'Paper Items' },
    { id: 'chotta-fancy-items', name: 'Chotta Fancy Items' },
    { id: 'aerial-fancy', name: 'Aerial Fancy' },
    { id: 'double-effect-fancy', name: 'Double Effect Fancy' },
    { id: 'mega-flash-fancy', name: 'Mega Flash Fancy' },
    { id: 'colour-magic', name: 'Colour Magic' },
    { id: 'multi-shot', name: 'Multi Shot' },
    { id: 'kids-crackers', name: 'Kids Crackers' },
    { id: 'flying-toys', name: 'Flying Toys' },
    { id: 'camera-crackers', name: 'Camera Crackers' },
    { id: 'spinners', name: 'Spinners' },
    { id: 'sound-crackers', name: 'Sound Crackers' },
    { id: 'sparklers-7cm', name: '7cm Sparklers' },
    { id: 'sparklers-10cm', name: '10cm Sparklers' },
    { id: 'sparklers-12cm', name: '12cm Sparklers' },
    { id: 'sparklers-15cm', name: '15cm Sparklers' },
    { id: 'sparklers-30cm', name: '30cm Sparklers' },
    { id: 'sparklers-50cm', name: '50cm Sparklers' },

  ];

  const brands = [
    {
      id: 'standard',
      name: 'Standard Crackers',
      description: 'Premium quality crackers with traditional designs',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'pothys',
      name: 'Pothys Crackers',
      description: 'Innovative designs with spectacular effects',
      color: 'from-red-500 to-orange-500'
    }
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Create cracker animation effect
  useEffect(() => {
    const createCracker = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];
      const newCracker = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: (Math.random() - 0.5) * 4,
        life: 100
      };
      return newCracker;
    };

    const maxCrackers = isMobile ? 8 : 15;
    const interval = setInterval(() => {
      setCrackers(prev => {
        const newCrackers = prev
          .map(cracker => ({
            ...cracker,
            x: cracker.x + cracker.speedX,
            y: cracker.y + cracker.speedY,
            life: cracker.life - 1
          }))
          .filter(cracker => cracker.life > 0);

        if (newCrackers.length < maxCrackers) {
          newCrackers.push(createCracker());
        }

        return newCrackers;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set smooth scrolling behavior
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.style.scrollBehavior = 'smooth';
    }
    return () => {
      if (html) {
        html.style.scrollBehavior = 'auto';
      }
    };
  }, []);

  const handleBrandSelect = (brandId) => {
    setSelectedBrand(brandId);
    setActiveCategory('all'); // Reset category to 'all'

    // Use setTimeout to allow the state to update before scrolling
    setTimeout(() => {
      scrollToProducts();
    }, 50);
  };

  const getAvailableCategories = () => {
    if (!selectedBrand) return [];

    const availableCategories = new Set();

    products.forEach(product => {
      if (product.brand === selectedBrand) {
        availableCategories.add(product.category);
      }
    });

    return [
      { id: 'all', name: 'All' },
      ...categories.filter(category => availableCategories.has(category.id))
    ];
  };

  const getUniqueProductCount = () => {
    return cart.length; // Simply returns the number of unique products
  };

  const addToCart = (product) => {
    // Check if cart is not empty and the new product's brand doesn't match existing items
    if (cart.length > 0 && cart[0].brand !== product.brand) {
      toast.error(
        `You can only purchase items from one brand at a time. 
            Your cart contains ${brands.find(b => b.id === cart[0].brand)?.name} items.`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        ...product,
        quantity: 1,
        brand: product.brand
      }]);
    }
  };
  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = selectedBrand
    ? (activeCategory === 'all'
      ? products.filter(product => product.brand === selectedBrand)
      : products.filter(product => product.brand === selectedBrand && product.category === activeCategory))
    : [];

  const scrollToProducts = () => {
    const scroll = () => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({
          top: productsSection.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    };

    // Try immediately, then try again after a short delay if needed
    scroll();
    setTimeout(scroll, 100);
  };
  const scrollToBrands = () => {
    const brandsSection = document.getElementById('brands');
    if (brandsSection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      window.scrollTo({
        top: brandsSection.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      window.scrollTo({
        top: footer.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleProductsClick = () => {
    if (!selectedBrand) {
      scrollToBrands();
    } else {
      scrollToProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 relative overflow-hidden">
      {/* Animated Cracker Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {crackers.map(cracker => (
          <div
            key={cracker.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${cracker.x}px`,
              top: `${cracker.y}px`,
              width: `${cracker.size}px`,
              height: `${cracker.size}px`,
              backgroundColor: cracker.color,
              opacity: cracker.life / 100,
              boxShadow: `0 0 ${cracker.size * 2}px ${cracker.color}`,
              transition: 'all 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(isMobile ? 10 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="h-2 w-2 xs:h-3 xs:w-3 sm:h-4 sm:w-4 text-yellow-400 opacity-70" />
          </div>
        ))}
      </div>

      {/* Header - Fixed at top */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/20 fixed top-0 left-0 right-0 z-50">
        <div className="w-full max-w-none px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-2 xs:py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-2 xs:space-x-3 flex-shrink-0">
              <div className="relative">
                <Sparkles className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 animate-spin" />
                <div className="absolute inset-0 h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-400 animate-ping opacity-25">
                  <Sparkles className="h-full w-full" />
                </div>
              </div>
              <div className="text-[20px] xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent whitespace-nowrap">
                KavithaCrackers
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex xl:space-x-8 lg:space-x-6 flex-1 justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm lg:text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={handleProductsClick}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm lg:text-base font-medium"
              >
                Products
              </button>
              <button
                onClick={scrollToFooter}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm lg:text-base font-medium"
              >
                Contact
              </button>
            </nav>

            {/* Right Side - Cart & Menu */}
            <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4 flex-shrink-0">
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black p-2 xs:px-3 xs:py-2 md:px-4 md:py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ShoppingCart className="h-5 w-5 xs:h-4 xs:w-4 sm:h-4 sm:w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 xs:-top-1.5 xs:-right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] xs:text-xs rounded-full h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 flex items-center justify-center animate-pulse font-bold">
                    {getUniqueProductCount()}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white p-1.5 xs:p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 pt-4' : 'max-h-0 opacity-0'}`}>
            <div className="py-2 xs:py-4 border-t border-white/20 mt-3 xs:mt-4">
              <nav className="flex flex-col space-y-2 xs:space-y-3">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 py-1.5 xs:py-2 px-2 rounded-lg hover:bg-white/10 text-xs xs:text-sm sm:text-base text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    handleProductsClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 py-1.5 xs:py-2 px-2 rounded-lg hover:bg-white/10 text-xs xs:text-sm sm:text-base text-left"
                >
                  Products
                </button>
                <button
                  onClick={() => {
                    scrollToFooter();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white hover:text-yellow-400 transition-colors duration-300 py-1.5 xs:py-2 px-2 rounded-lg hover:bg-white/10 text-xs xs:text-sm sm:text-base text-left"
                >
                  Contact
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-8 xs:py-10 sm:py-16 md:py-20 overflow-hidden pt-[70px]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 animate-pulse"></div>
        <div className="container mx-auto px-4 text-center relative z-20">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Light up your
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse">
              {" "}Celebration
            </span>
          </h2>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Premium quality crackers for all your festive occasions. Safe, colorful, and spectacular!
          </p>

          {/* Special Offers Section */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 xs:gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Minimum Order Offer */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-xl xs:rounded-2xl px-3 py-2 xs:px-4 xs:py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 flex items-center space-x-2 xs:space-x-3 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs sm:max-w-none relative overflow-hidden">


              <div className="flex-shrink-0">
                <div className="relative">
                  <Tag className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-purple-400/30 animate-ping">
                    <Tag className="h-full w-full" />
                  </div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-purple-400 font-bold text-xs xs:text-sm sm:text-base">MINIMUM ORDER ₹5000</p>
                <p className="text-purple-300 text-[10px] xs:text-xs sm:text-sm">
                  To ensure the best quality service, we maintain a minimum order value of ₹5000.
                  This helps us deliver premium products with proper packaging and safe handling.
                </p>
              </div>
            </div>


            {/* Free Delivery Offer */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-400/30 rounded-xl xs:rounded-2xl px-3 py-2 xs:px-4 xs:py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 flex items-center space-x-2 xs:space-x-3 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs sm:max-w-none">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Truck className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-green-400 animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 xs:w-2.5 xs:h-2.5 bg-green-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-green-400 font-bold text-xs xs:text-sm sm:text-base">FREE DELIVERY</p>
                <p className="text-green-300 text-[10px] xs:text-xs sm:text-sm">
                  Enjoy doorstep delivery at no extra cost! Place your order before
                  <span className="font-semibold"> October 1st</span> and get your crackers delivered safely and fast — absolutely free.
                </p>
              </div>
            </div>

            {/* Eco-Friendly Badge */}
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-400/30 rounded-xl xs:rounded-2xl px-3 py-2 xs:px-4 xs:py-3 sm:px-5 sm:py-3 md:px-6 md:py-4 flex items-center space-x-2 xs:space-x-3 hover:scale-105 transition-all duration-300 shadow-lg max-w-xs sm:max-w-none">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Leaf className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-blue-400 animate-pulse" />
                  <div className="absolute inset-0 h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-blue-400/30 animate-ping">
                    <Leaf className="h-full w-full" />
                  </div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-blue-400 font-bold text-xs xs:text-sm sm:text-base">ECO-FRIENDLY</p>
                <p className="text-blue-300 text-[10px] xs:text-xs sm:text-sm">
                  We care about the environment. Our crackers are made without harmful chemicals like Barium, Aluminum, or Chromium.
                  Instead, we follow government-approved green formulas to ensure a safe and eco-friendly celebration.
                  100% certified Green Crackers—burst with joy, not guilt!
                </p>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg xs:rounded-xl px-2 py-2 xs:px-3 xs:py-3 sm:px-4 sm:py-3 border border-white/20 hover:border-yellow-400/50 transition-all duration-300">
              <div className="flex items-center justify-center space-x-1 xs:space-x-2">
                <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-white text-[10px] xs:text-xs sm:text-sm font-medium">No Pollution</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg xs:rounded-xl px-2 py-2 xs:px-3 xs:py-3 sm:px-4 sm:py-3 border border-white/20 hover:border-yellow-400/50 transition-all duration-300">
              <div className="flex items-center justify-center space-x-1 xs:space-x-2">
                <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-[10px] xs:text-xs sm:text-sm font-medium">100% Safe</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg xs:rounded-xl px-2 py-2 xs:px-3 xs:py-3 sm:px-4 sm:py-3 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 xs:col-span-2 sm:col-span-1">
              <div className="flex items-center justify-center space-x-1 xs:space-x-2">
                <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-white text-[10px] xs:text-xs sm:text-sm font-medium">Premium Quality</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (!selectedBrand) {
                scrollToBrands();
              } else {
                scrollToProducts();
              }
            }}
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black px-4 py-2 xs:px-5 xs:py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-xs xs:text-sm sm:text-base md:text-lg font-semibold hover:from-yellow-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-bounce"
          >
            Shop Now
          </button>

          {/* Bulk Order Message */}
          <div className="flex flex-col items-center mt-4">
            <p className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 text-black px-5 py-2 rounded-full text-sm sm:text-base font-semibold shadow-lg animate-pulse">
              📢 <span className="text-red-700">Bulk orders special discount available</span> - Contact:
              <a href="tel:+918903623517" className="text-blue-700 hover:text-blue-900 ml-1">+91 8903623517</a>
              or
              <a href="mailto:seshakavitha30@gmail.com" className="text-blue-700 hover:text-blue-900 ml-1">seshakavitha30@gmail.com</a>
            </p>
          </div>


        </div>
      </section>

      {/* Brand Selection Section */}
      <section id="brands" className="py-8 xs:py-10 sm:py-12 md:py-16 relative z-20">
        <div className="container mx-auto px-3 xs:px-4">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
            Select a Brand
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 max-w-3xl mx-auto">
            {brands.map(brand => (
              <div
                key={brand.id}
                onClick={() => handleBrandSelect(brand.id)}
                className={`bg-gradient-to-r ${brand.color} rounded-xl xs:rounded-2xl overflow-hidden shadow-lg xs:shadow-xl md:shadow-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 cursor-pointer group relative`}
              >
                {/* Discount Ribbon */}
                <div className="absolute top-4 right-[-30px] bg-red-600 text-white text-xs sm:text-sm font-bold py-1 px-10 transform rotate-45 shadow-lg">
                  50% OFF
                </div>

                <div className="relative overflow-hidden h-48 xs:h-56 sm:h-64">
                  <div className="absolute inset-0 bg-black/30 opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white">
                      {brand.name}
                    </h3>
                    <p className="text-white/90 mt-2 text-sm xs:text-base">
                      {brand.description}
                    </p>
                  </div>
                </div>
                <div className="p-4 xs:p-5 sm:p-6 text-center bg-black/20">
                  <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-white/90 transition-all duration-300">
                    View Products
                  </button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* Products Section - Only shown when a brand is selected */}
      {selectedBrand && (
        <>
          {/* Back to Brands Button */}
          <div className="container mx-auto px-3 xs:px-4 mt-6 sm:mt-8">
            <button
              onClick={() => {
                setSelectedBrand(null);
                setActiveCategory('all');
              }}
              className="flex items-center text-white hover:text-yellow-400 transition-colors text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Brands
            </button>
          </div>


          {/* Category Filter */}
          <section id="category-section" className="py-4 xs:py-5 sm:py-6 md:py-8 bg-black/30 backdrop-blur-md">
            <div className="container mx-auto px-3 xs:px-4">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
                {brands.find(b => b.id === selectedBrand)?.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4">
                {getAvailableCategories().map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-2 py-1 xs:px-3 xs:py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-full transition-all duration-300 ${activeCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold shadow-lg transform scale-105'
                      : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section id="products" className="py-8 xs:py-10 sm:py-12 md:py-16 relative z-20">
            <div className="container mx-auto px-3 xs:px-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <div key={product.id} className="bg-white/10 backdrop-blur-lg rounded-xl xs:rounded-2xl overflow-hidden shadow-lg xs:shadow-xl md:shadow-2xl border border-white/20 hover:border-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group">

                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-36 xs:h-40 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-3 xs:top-4 right-3 xs:right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 xs:px-3 py-0.5 xs:py-1 flex items-center space-x-1">
                          <Star className="h-3 w-3 xs:h-4 xs:w-4 text-yellow-400 fill-current animate-pulse" />
                          <span className="text-white text-xs xs:text-sm">{product.rating}</span>
                        </div>
                        <div className={`absolute bottom-3 xs:bottom-4 left-3 xs:left-4 right-3 xs:right-4 h-1.5 xs:h-2 bg-gradient-to-r ${product.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}></div>
                      </div>
                      <div className="p-3 xs:p-4 sm:p-5 md:p-6">
                        <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white mb-1 xs:mb-2">{product.name}</h3>
                        <p className="text-gray-300 text-xs xs:text-sm mb-3 xs:mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-base xs:text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                            ₹{Math.round(product.price)}
                          </span>

                          {/* Check if item is in cart */}
                          {(() => {
                            const cartItem = cart.find(item => item.id === product.id);
                            const isDisabled = cart.length > 0 && cart[0].brand !== product.brand;

                            if (cartItem) {
                              // Show quantity selector if item is in cart
                              return (
                                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full border border-white/30 overflow-hidden">
                                  <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="w-8 h-8 xs:w-9 xs:h-9 bg-red-500 hover:bg-red-600 text-white font-bold flex items-center justify-center transition-all duration-300 hover:scale-105"
                                    disabled={isDisabled}
                                  >
                                    <Minus className="w-3 h-3 xs:w-4 xs:h-4 stroke-2" />
                                  </button>

                                  <span className="px-3 xs:px-4 py-2 text-white font-semibold text-sm xs:text-base min-w-[2rem] text-center">
                                    {cartItem.quantity}
                                  </span>

                                  <button
                                    onClick={() => addToCart(product)}
                                    className="w-8 h-8 xs:w-9 xs:h-9 bg-green-500 hover:bg-green-600 text-white font-bold flex items-center justify-center transition-all duration-300 hover:scale-105"
                                    disabled={isDisabled}
                                  >
                                    <Plus className="w-3 h-3 xs:w-4 xs:h-4 stroke-2" />
                                  </button>
                                </div>
                              );
                            } else {
                              // Show Add button if item is not in cart
                              return (
                                <button
                                  onClick={() => addToCart(product)}
                                  disabled={isDisabled}
                                  className={`bg-gradient-to-r ${product.color} text-black px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 xs:space-x-2 text-xs xs:text-sm sm:text-base ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  <Plus className="h-3 w-3 xs:h-4 xs:w-4" />
                                  <span className="hidden xs:inline">Add to Cart</span>
                                  <span className="xs:hidden">Add</span>
                                </button>
                              );
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-white text-lg">No products found in this category</p>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-2 rounded-full font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                    >
                      View All Products
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-6 xs:py-8 sm:py-10 md:py-12 relative z-20">
        <div className="container mx-auto px-3 xs:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 xs:space-x-3 mb-3 xs:mb-4">
                <Sparkles className="h-5 w-5 xs:h-6 xs:w-6 text-yellow-400 animate-pulse" />
                <h3 className="text-sm xs:text-base sm:text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  KavithaCrackers Palace
                </h3>
              </div>
              <p className="text-gray-300 text-xs xs:text-sm sm:text-base">Your trusted partner for safe and spectacular celebrations.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base sm:text-lg">Quick Links</h4>
              <ul className="space-y-1 xs:space-y-2 text-gray-300 text-xs xs:text-sm sm:text-base">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-yellow-400 transition-colors">Home</button></li>
                <li><button onClick={handleProductsClick} className="hover:text-yellow-400 transition-colors">Products</button></li>
                <li><button onClick={scrollToFooter} className="hover:text-yellow-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 xs:mb-3 sm:mb-4 text-sm xs:text-base sm:text-lg">Contact Info</h4>
              <div className="space-y-1 xs:space-y-2 text-gray-300 text-xs xs:text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                  <span>+91 8903623517</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                  <span>seshakavitha30@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="h-3 w-3 xs:h-4 xs:w-4 flex-shrink-0" />
                  <span>Sivakasi - 626123</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-5 xs:mt-6 sm:mt-8 pt-5 xs:pt-6 sm:pt-8 text-center text-gray-400 text-xs xs:text-sm sm:text-base">
            <p>&copy; 2025 KavithaCrackers Palace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full xs:w-80 sm:w-96 bg-black/95 backdrop-blur-lg border-l border-white/20 transform transition-transform duration-300 z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 xs:mb-5 sm:mb-6">
            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white">Shopping Cart</h3>
            {cart.length > 0 && (
              <div className="text-xs xs:text-sm text-yellow-400">
                Brand: {brands.find(b => b.id === cart[0]?.brand)?.name}
              </div>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white hover:text-yellow-400 bg-white/10 hover:bg-white/20 p-1 rounded-full transition-all duration-300 text-xl xs:text-2xl flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-6 xs:py-8">Your cart is empty</p>
            ) : (
              <div className="space-y-3 xs:space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white/10 rounded-lg p-3 xs:p-4 flex items-center space-x-3 xs:space-x-4">
                    <img src={item.image} alt={item.name} className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-xs xs:text-sm sm:text-base">{item.name}</h4>
                      <p className="text-yellow-400 text-xs xs:text-sm sm:text-base">₹{Math.round(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-1.5 xs:space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 sm:w-7 sm:h-7 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full flex items-center justify-center shadow-md shadow-yellow-500/30 transition-all"
                      >
                        <Minus className="w-3 h-3 stroke-2" />
                      </button>

                      <span className="text-white w-5 xs:w-6 sm:w-7 text-center text-xs xs:text-sm sm:text-base">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        className="w-6 h-6 sm:w-7 sm:h-7 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full flex items-center justify-center shadow-md shadow-yellow-500/30 transition-all"
                      >
                        <Plus className="w-3 h-3 stroke-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-white/20 pt-4 xs:pt-5 sm:pt-6">
              <div className="flex justify-between items-center mb-3 xs:mb-4">
                <span className="text-white text-sm xs:text-base sm:text-lg">Total:</span>
                <span className="text-yellow-400 text-base xs:text-lg sm:text-xl md:text-2xl font-bold">₹{Math.round(getTotalPrice())}</span>
              </div>
              <button
                onClick={() => {
                  // Additional check (though this shouldn't be needed if addToCart is properly implemented)
                  const brandsInCart = [...new Set(cart.map(item => item.brand))];
                  if (brandsInCart.length > 1) {
                    alert("Your cart contains items from multiple brands. Please only select items from one brand.");
                    return;
                  }
                  setIsCartOpen(false);
                  navigate('/checkout', { state: { cart } });
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black py-2 xs:py-2.5 sm:py-3 rounded-full font-medium xs:font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm xs:text-base"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for cart */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
      {/* Floating Arrow Button */}
      <div
        className="fixed right-5 bottom-5 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
        onClick={() => {
          const categorySection = document.getElementById('category-section');
          if (categorySection) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            window.scrollTo({
              top: categorySection.offsetTop - headerHeight - 20,
              behavior: 'smooth'
            });
          }
        }}
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </div>

    </div>
  );
};

export default CrackerShop;