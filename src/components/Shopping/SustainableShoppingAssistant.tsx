import React, { useState } from 'react';
import { ShoppingCart, Scan, Star, Leaf, DollarSign, MapPin, Search, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  sustainabilityScore: number;
  price: number;
  ecoFriendlyPrice?: number;
  category: string;
  certifications: string[];
  carbonFootprint: number;
  alternatives?: Product[];
  image: string;
  description: string;
  nearbyStores: string[];
}

export const SustainableShoppingAssistant: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [scanMode, setScanMode] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'food', name: 'Food & Beverages' },
    { id: 'cleaning', name: 'Cleaning Products' },
    { id: 'personal', name: 'Personal Care' },
    { id: 'household', name: 'Household Items' }
  ];

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Organic Laundry Detergent',
      brand: 'EcoClean',
      sustainabilityScore: 92,
      price: 12.99,
      ecoFriendlyPrice: 12.99,
      category: 'cleaning',
      certifications: ['USDA Organic', 'EPA Safer Choice', 'Cruelty-Free'],
      carbonFootprint: 0.8,
      image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Plant-based formula that cleans effectively while being gentle on the environment',
      nearbyStores: ['Whole Foods', 'Target', 'Local Co-op'],
      alternatives: []
    },
    {
      id: '2',
      name: 'Conventional Detergent',
      brand: 'CleanMax',
      sustainabilityScore: 34,
      price: 8.99,
      ecoFriendlyPrice: 12.99,
      category: 'cleaning',
      certifications: [],
      carbonFootprint: 3.2,
      image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Traditional cleaning formula with synthetic ingredients',
      nearbyStores: ['Walmart', 'CVS', 'Kroger'],
      alternatives: [
        {
          id: '1',
          name: 'Organic Laundry Detergent',
          brand: 'EcoClean',
          sustainabilityScore: 92,
          price: 12.99,
          category: 'cleaning',
          certifications: ['USDA Organic'],
          carbonFootprint: 0.8,
          image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300',
          description: 'Eco-friendly alternative',
          nearbyStores: ['Whole Foods']
        }
      ]
    }
  ];

  const handleScan = () => {
    setScanMode(true);
    // Simulate barcode scanning
    setTimeout(() => {
      setScannedProduct(mockProducts[1]); // Show conventional product with alternatives
      setScanMode(false);
    }, 2000);
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSustainabilityGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center mb-4">
          <ShoppingCart className="h-6 w-6 mr-3" />
          <h2 className="text-2xl font-bold">Sustainable Shopping Assistant</h2>
        </div>
        <p className="text-green-100 mb-4">
          Scan products, compare sustainability scores, and find eco-friendly alternatives
        </p>
        
        <button
          onClick={handleScan}
          disabled={scanMode}
          className="flex items-center px-6 py-3 bg-white text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors disabled:opacity-50"
        >
          <Scan className="h-5 w-5 mr-2" />
          {scanMode ? 'Scanning...' : 'Scan Product Barcode'}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scanned Product Result */}
      {scannedProduct && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scanned Product Analysis</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img 
                  src={scannedProduct.image} 
                  alt={scannedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{scannedProduct.name}</h4>
                  <p className="text-gray-600">{scannedProduct.brand}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSustainabilityColor(scannedProduct.sustainabilityScore)}`}>
                      {getSustainabilityGrade(scannedProduct.sustainabilityScore)} Grade
                    </span>
                    <span className="text-lg font-bold text-gray-900">${scannedProduct.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <h5 className="font-medium text-gray-900 mb-2">Sustainability Metrics</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Overall Score</span>
                    <span className="font-medium">{scannedProduct.sustainabilityScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Carbon Footprint</span>
                    <span className="font-medium">{scannedProduct.carbonFootprint} kg CO₂</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Certifications</span>
                    <span className="font-medium">{scannedProduct.certifications.length || 'None'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternatives */}
            {scannedProduct.alternatives && scannedProduct.alternatives.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-4">Eco-Friendly Alternatives</h5>
                <div className="space-y-3">
                  {scannedProduct.alternatives.map((alternative) => (
                    <div key={alternative.id} className="border border-green-200 rounded-xl p-4 bg-green-50">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={alternative.image} 
                          alt={alternative.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h6 className="font-medium text-gray-900">{alternative.name}</h6>
                          <p className="text-sm text-gray-600">{alternative.brand}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getSustainabilityColor(alternative.sustainabilityScore)}`}>
                              {getSustainabilityGrade(alternative.sustainabilityScore)}
                            </span>
                            <span className="font-bold text-green-600">${alternative.price}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-green-700">
                          {((alternative.sustainabilityScore - scannedProduct.sustainabilityScore) / scannedProduct.sustainabilityScore * 100).toFixed(0)}% more sustainable
                        </span>
                        <button className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                          Find Nearby
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Comparison */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Comparison</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-gray-600">{product.brand}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSustainabilityColor(product.sustainabilityScore)}`}>
                      {getSustainabilityGrade(product.sustainabilityScore)}
                    </span>
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Sustainability Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          product.sustainabilityScore >= 80 ? 'bg-green-500' :
                          product.sustainabilityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${product.sustainabilityScore}%` }}
                      />
                    </div>
                    <span className="font-medium">{product.sustainabilityScore}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Carbon Footprint</span>
                  <span className="font-medium">{product.carbonFootprint} kg CO₂</span>
                </div>
                
                {product.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {product.certifications.slice(0, 2).map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {cert}
                      </span>
                    ))}
                    {product.certifications.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{product.certifications.length - 2} more
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{product.nearbyStores.length} nearby stores</span>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Your Sustainable Shopping Impact</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">$127</div>
            <div className="text-blue-100 text-sm">Monthly Savings</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">2.3 tons</div>
            <div className="text-blue-100 text-sm">CO₂ Avoided</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold mb-1">89%</div>
            <div className="text-blue-100 text-sm">Eco-Friendly Choices</div>
          </div>
        </div>
      </div>
    </div>
  );
};