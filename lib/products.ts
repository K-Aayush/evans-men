import type { Product, Category } from '@/types';

const PX = (id: string, w = 940, h = 1250) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'evans-relaxed-shirt',
    name: 'Evans Relaxed Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    price: 4490,
    description: 'Relaxed-fit shirt in breathable cotton poplin. Designed for everyday movement.',
    details: 'Single chest pocket. Mother-of-pearl buttons. Curved hem.',
    material: '100% organic cotton poplin',
    fit: 'Relaxed fit — true to size',
    colors: ['Black', 'Off-White', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [PX('22441297'), PX('22441317')],
    featured: true,
    isNew: true,
  },
  {
    id: '2',
    slug: 'evans-heavyweight-tee',
    name: 'Evans Heavyweight Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 2490,
    description: 'Heavyweight cotton tee with a structured drape that holds its shape wash after wash.',
    details: 'Boxy silhouette. Ribbed crew neck. Garment-dyed.',
    material: '280 GSM heavyweight cotton',
    fit: 'Boxy fit — size down for slim',
    colors: ['Black', 'White', 'Stone'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [PX('8532611'), PX('11671964')],
    isNew: true,
  },
  {
    id: '3',
    slug: 'signature-pleated-trouser',
    name: 'Signature Pleated Trouser',
    category: 'trousers',
    categoryLabel: 'Trousers',
    price: 5990,
    description: 'Single-pleat trouser with a tapered leg. Tailored for comfort and movement.',
    details: 'Single pleat. Side adjusters. Half-lined.',
    material: 'Italian wool-blend twill',
    fit: 'Tapered fit — true to size',
    colors: ['Black', 'Charcoal', 'Stone'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [PX('9464625'), PX('35070984')],
    featured: true,
  },
  {
    id: '4',
    slug: 'relaxed-denim',
    name: 'Relaxed Denim',
    category: 'denim',
    categoryLabel: 'Denim',
    price: 5490,
    description: 'Relaxed straight-leg denim in Japanese selvedge. Raw and honest.',
    details: '14oz selvedge denim. Five-pocket construction. Chain-stitch hem.',
    material: '14 oz Japanese selvedge denim',
    fit: 'Relaxed straight — true to size',
    colors: ['Indigo', 'Washed Black', 'Raw'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [PX('10133274'), PX('7764611')],
    isNew: true,
  },
  {
    id: '5',
    slug: 'structured-overshirt',
    name: 'Structured Overshirt',
    category: 'jackets',
    categoryLabel: 'Jackets',
    price: 6490,
    description: 'A shirt-jacket hybrid in heavyweight twill. Layer it, wear it alone, live in it.',
    details: 'Twin chest pockets. Horn buttons. Reinforced seams.',
    material: 'Heavyweight cotton twill',
    fit: 'Oversized fit — size down for tailored',
    colors: ['Olive', 'Black', 'Stone'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [PX('18919292'), PX('15463481')],
    featured: true,
  },
  {
    id: '6',
    slug: 'harrington-jacket',
    name: 'Harrington Jacket',
    category: 'jackets',
    categoryLabel: 'Jackets',
    price: 8990,
    description: 'A modern take on the classic Harrington. Clean lines, effortless layering.',
    details: 'Tartan lining. Two-way zip. Button collar. Elasticated cuffs.',
    material: 'Water-resistant cotton sateen',
    fit: 'Regular fit — true to size',
    colors: ['Black', 'Navy', 'Stone'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [PX('3911274'), PX('15137845')],
  },
  {
    id: '7',
    slug: 'evans-01-sneaker',
    name: 'Evans 01 Sneaker',
    category: 'sneakers',
    categoryLabel: 'Sneakers',
    price: 7990,
    description: 'Minimal leather sneaker. Clean toe, premium leather, zero branding.',
    details: 'Full-grain leather upper. Margom rubber sole. Leather lining.',
    material: 'Full-grain leather',
    fit: 'True to size',
    colors: ['Black', 'White', 'Bone'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    images: [PX('9666620'), PX('11559288')],
    featured: true,
    isNew: true,
  },
  {
    id: '8',
    slug: 'essential-crew-tee',
    name: 'Essential Crew Tee',
    category: 'tshirts',
    categoryLabel: 'T-Shirts',
    price: 1990,
    description: 'Your everyday tee. Soft, structured, and built to last.',
    details: 'Pre-shrunk. Ribbed collar. Reinforced shoulders.',
    material: '200 GSM combed cotton',
    fit: 'Regular fit — true to size',
    colors: ['White', 'Black', 'Heather'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [PX('11671964'), PX('8532611')],
  },
  {
    id: '9',
    slug: 'evans-runner-sneaker',
    name: 'Evans Runner Sneaker',
    category: 'sneakers',
    categoryLabel: 'Sneakers',
    price: 6990,
    description: 'Lightweight runner with a chunky sole. Comfort meets minimal design.',
    details: 'Mesh and suede upper. EVA midsole. Rubber outsole.',
    material: 'Mesh, suede, EVA foam',
    fit: 'True to size',
    colors: ['Black', 'Bone', 'Grey'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    images: [PX('20755674'), PX('18972408')],
    isNew: true,
  },
  {
    id: '10',
    slug: 'oxford-shirt',
    name: 'Oxford Shirt',
    category: 'shirts',
    categoryLabel: 'Shirts',
    price: 3990,
    description: 'The essential oxford cloth button-down. Wears better with every wash.',
    details: 'Button-down collar. Box-pleat back. Locker loop.',
    material: 'Oxford cotton cloth',
    fit: 'Tailored fit — true to size',
    colors: ['White', 'Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [PX('22441317'), PX('22441297')],
  },
  {
    id: '11',
    slug: 'pleated-wool-trouser',
    name: 'Pleated Wool Trouser',
    category: 'trousers',
    categoryLabel: 'Trousers',
    price: 7490,
    description: 'Double-pleat wool trouser with a wide leg. Drapes beautifully.',
    details: 'Double pleat. Extended tab closure. Wide leg.',
    material: 'Tropical wool',
    fit: 'Wide fit — true to size',
    colors: ['Charcoal', 'Black', 'Stone'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [PX('35070984'), PX('9464625')],
  },
  {
    id: '12',
    slug: 'cargo-denim',
    name: 'Cargo Denim',
    category: 'denim',
    categoryLabel: 'Denim',
    price: 5990,
    description: 'Utility cargo denim with reinforced pockets. Workwear-inspired, city-ready.',
    details: 'Cargo pockets. Reinforced bartacks. Tapered leg.',
    material: '13 oz cotton denim',
    fit: 'Relaxed taper — true to size',
    colors: ['Washed Indigo', 'Black'],
    sizes: ['28', '30', '32', '34', '36'],
    images: [PX('6764124'), PX('17096040')],
    isNew: true,
  },
];

export function getProducts(): Product[] {
  return mockProducts;
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return mockProducts.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return mockProducts.filter((p) => p.isNew);
}

export function getRelatedProducts(slug: string, limit = 6): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return mockProducts.slice(0, limit);
  return mockProducts
    .filter((p) => p.category === product.category && p.slug !== slug)
    .concat(mockProducts.filter((p) => p.category !== product.category))
    .slice(0, limit);
}

export const categories: { id: Category; label: string; number: string; image: string }[] = [
  { id: 'shirts', label: 'Shirts', number: '01', image: PX('22441297') },
  { id: 'trousers', label: 'Trousers', number: '02', image: PX('9464625') },
  { id: 'jackets', label: 'Jackets', number: '03', image: PX('15463481') },
  { id: 'denim', label: 'Denim', number: '04', image: PX('10133274') },
  { id: 'sneakers', label: 'Shoes', number: '05', image: PX('9666620') },
];

export const formatPrice = (price: number): string =>
  `Rs. ${price.toLocaleString('en-IN')}`;
