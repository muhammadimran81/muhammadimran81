const PRODUCTS = [
  {
    id: 'tee-blue-rocket',
    name: 'Blue Rocket Tee',
    category: 'tees',
    price: 14.99,
    compareAt: 19.99,
    tags: ['new', 'sale'],
    image: 'https://images.unsplash.com/photo-1618354691438-25bc04584fb2?q=80&w=800&auto=format&fit=crop',
    subtitle: 'Soft cotton graphic tee',
    sizes: ['3-4', '5-6', '7-8', '9-10', '11-12']
  },
  {
    id: 'hoodie-green-go',
    name: 'Go Green Hoodie',
    category: 'hoodies',
    price: 29.99,
    compareAt: null,
    tags: ['new'],
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop',
    subtitle: 'Cozy fleece pullover',
    sizes: ['5-6', '7-8', '9-10', '11-12']
  },
  {
    id: 'jeans-classic',
    name: 'Classic Stretch Jeans',
    category: 'jeans',
    price: 24.0,
    compareAt: 29.0,
    tags: ['sale'],
    image: 'https://images.unsplash.com/photo-1518131678670-44e5c42a1a4d?q=80&w=800&auto=format&fit=crop',
    subtitle: 'Durable slim fit',
    sizes: ['5-6', '7-8', '9-10', '11-12']
  },
  {
    id: 'sneaker-runner',
    name: 'Runner Sneaker',
    category: 'shoes',
    price: 34.5,
    compareAt: null,
    tags: ['new'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    subtitle: 'Lightweight everyday',
    sizes: ['28', '29', '30', '31', '32']
  },
  {
    id: 'tee-red-skate',
    name: 'Red Skate Tee',
    category: 'tees',
    price: 12.99,
    compareAt: null,
    tags: [],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    subtitle: 'Classic fit graphic',
    sizes: ['3-4', '5-6', '7-8', '9-10', '11-12']
  },
  {
    id: 'hoodie-navy-zip',
    name: 'Navy Zip Hoodie',
    category: 'hoodies',
    price: 31.0,
    compareAt: 39.0,
    tags: ['sale'],
    image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cce?q=80&w=800&auto=format&fit=crop',
    subtitle: 'Zip-up fleece',
    sizes: ['5-6', '7-8', '9-10', '11-12']
  }
];

function getFeaturedProducts() {
  return PRODUCTS.slice(0, 4);
}

function getNewArrivals() {
  return PRODUCTS.filter(p => p.tags.includes('new')).slice(0, 4);
}

function getSaleItems() {
  return PRODUCTS.filter(p => p.tags.includes('sale')).slice(0, 4);
}

function getProductsByCategory(category) {
  if (!category) return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

window.catalog = {
  getFeaturedProducts,
  getNewArrivals,
  getSaleItems,
  getProductsByCategory,
  getProductById,
  all: () => PRODUCTS
};