
import { Category, Product } from './types';

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=60';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Urban Glide X',
    price: 129,
    category: Category.Sneakers,
    gender: 'Men',
    description: 'The ultimate urban explorer. Lightweight breathable mesh meets a high-rebound sole for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.8,
    isNew: true
  },
  {
    id: '2',
    name: 'Summit Pro Runner',
    price: 159,
    category: Category.Sports,
    gender: 'Men',
    description: 'Engineered for peak performance. The Summit Pro features advanced cushioning and a carbon-fiber plate for maximum energy return.',
    image: 'https://images.unsplash.com/photo-1551107644-79bc00366c84?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551107644-79bc00366c84?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [8, 9, 10, 11],
    rating: 4.9
  },
  {
    id: '3',
    name: 'City Walker Classic',
    price: 89,
    category: Category.Casual,
    gender: 'Unisex',
    description: 'Elegance in every step. This classic leather walker is designed for the modern professional who values both style and durability.',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 10, 11],
    rating: 4.5
  },
  {
    id: '4',
    name: 'Neon Flash Racer',
    price: 110,
    oldPrice: 140,
    category: Category.Sneakers,
    gender: 'Women',
    description: 'Make a statement. The Neon Flash uses high-visibility materials and a futuristic silhouette to keep you standing out in the dark.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [6, 7, 8, 9, 10],
    rating: 4.7,
    isSale: true
  },
  {
    id: '5',
    name: 'Volt Impact Sport',
    price: 145,
    category: Category.Sports,
    gender: 'Men',
    description: 'Explosive power and control. Optimized for indoor court sports with non-marking soles and lateral stability supports.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.6
  },
  {
    id: '6',
    name: 'Breeze Slip-on',
    price: 55,
    oldPrice: 75,
    category: Category.Casual,
    gender: 'Women',
    description: 'Effortless cool. The Breeze is your go-to for weekend brunch or beach strolls. Easy on, easy off, always comfortable.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [5, 6, 7, 8, 9],
    rating: 4.4,
    isSale: true
  },
  {
    id: '7',
    name: 'AeroLift Elite',
    price: 199,
    category: Category.Sports,
    gender: 'Men',
    description: 'Reach new heights. Our flagship performance shoe, featuring patented AeroLift technology for unmatched vertical response.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [9, 10, 11, 12],
    rating: 5.0,
    isNew: true
  },
  {
    id: '8',
    name: 'Cloud Step Pink',
    price: 95,
    category: Category.Casual,
    gender: 'Women',
    description: 'Like walking on air. This casual everyday shoe pairs perfectly with leggings or jeans for a relaxed yet refined look.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [5, 6, 7, 8],
    rating: 4.3,
    isNew: true
  },
  {
    id: '9',
    name: 'Nova Glow Sneakers',
    price: 135,
    category: Category.Sneakers,
    gender: 'Women',
    description: 'Radiate confidence with the Nova Glow. Features reflective accents and a comfort-first interior for nighttime visibility.',
    image: 'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [5, 6, 7, 8],
    rating: 4.9,
    isNew: true
  },
  {
    id: '10',
    name: 'Terrain X Trail',
    price: 120,
    oldPrice: 150,
    category: Category.Sports,
    gender: 'Men',
    description: 'Dominate any trail. With aggressive tread and waterproof lining, the Terrain X is your best companion for the outdoors.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'
    ],
    sizes: [8, 9, 10, 11, 12],
    rating: 4.7,
    isSale: true
  }
];
