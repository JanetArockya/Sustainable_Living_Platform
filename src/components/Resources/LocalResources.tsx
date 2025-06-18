import React, { useState } from 'react';
import { MapPin, Star, Clock, Phone, Navigation, Filter, ExternalLink } from 'lucide-react';
import { mockResources } from '../../data/mockData';
import { LocalResource } from '../../types';

export const LocalResources: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');

  const resourceTypes = [
    { id: 'all', name: 'All Resources', icon: '🌍' },
    { id: 'recycling', name: 'Recycling', icon: '♻️' },
    { id: 'garden', name: 'Gardens', icon: '🌱' },
    { id: 'business', name: 'Eco Businesses', icon: '🏪' },
    { id: 'event', name: 'Events', icon: '📅' }
  ];

  const filteredAndSortedResources = mockResources
    .filter(resource => selectedType === 'all' || resource.type === selectedType)
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      return b.rating - a.rating;
    });

  const getTypeColor = (type: string) => {
    const colors = {
      recycling: 'bg-green-100 text-green-700',
      garden: 'bg-emerald-100 text-emerald-700',
      business: 'bg-blue-100 text-blue-700',
      event: 'bg-purple-100 text-purple-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const handleGetDirections = (resource: LocalResource) => {
    // Encode the address for URL
    const encodedAddress = encodeURIComponent(resource.address);
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try to open native maps app first
      const mapsUrl = `maps://maps.google.com/maps?daddr=${encodedAddress}`;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
      
      // Create a temporary link to test if maps:// protocol is supported
      const tempLink = document.createElement('a');
      tempLink.href = mapsUrl;
      
      // Try native maps app, fallback to Google Maps web
      try {
        window.location.href = mapsUrl;
        // If native app doesn't open within 2 seconds, open web version
        setTimeout(() => {
          window.open(googleMapsUrl, '_blank');
        }, 2000);
      } catch (error) {
        window.open(googleMapsUrl, '_blank');
      }
    } else {
      // Desktop: Open Google Maps in new tab
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  const handleCall = (resource: LocalResource) => {
    // In a real app, phone numbers would be stored in the resource data
    // For demo purposes, we'll generate a placeholder number or show a message
    const phoneNumber = resource.phone || generatePlaceholderPhone(resource.id);
    
    if (phoneNumber) {
      // Check if device supports tel: protocol (mobile devices)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // On mobile, initiate phone call
        window.location.href = `tel:${phoneNumber}`;
      } else {
        // On desktop, copy number to clipboard and show notification
        navigator.clipboard.writeText(phoneNumber).then(() => {
          alert(`Phone number copied to clipboard: ${phoneNumber}`);
        }).catch(() => {
          // Fallback if clipboard API is not available
          prompt('Phone number:', phoneNumber);
        });
      }
    } else {
      alert('Phone number not available for this location.');
    }
  };

  // Generate placeholder phone numbers for demo (in real app, this would come from API)
  const generatePlaceholderPhone = (resourceId: string): string => {
    const phoneNumbers: { [key: string]: string } = {
      '1': '(555) 123-4567',
      '2': '(555) 234-5678',
      '3': '(555) 345-6789'
    };
    return phoneNumbers[resourceId] || '(555) 000-0000';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <MapPin className="h-6 w-6 text-emerald-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Local Resources</h2>
        </div>
        <p className="text-gray-600">
          Find nearby recycling centers, community gardens, and eco-friendly businesses in your area.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Resource Type Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Filter by Type</h3>
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === type.id
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Sort by</h3>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="distance">Distance</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="bg-gradient-to-br from-emerald-100 to-green-200 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <p className="text-emerald-800 font-medium">Interactive Map View</p>
            <p className="text-emerald-600 text-sm">Shows all nearby resources with directions</p>
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="space-y-4">
        {filteredAndSortedResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.name}</h3>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Navigation className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{resource.distance} miles away</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-3">{resource.address}</p>
                
                {resource.description && (
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                )}

                {resource.hours && (
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{resource.hours}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:ml-6">
                <button 
                  onClick={() => handleGetDirections(resource)}
                  className="flex items-center justify-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  title="Get directions to this location"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  <span>Directions</span>
                </button>
                <button 
                  onClick={() => handleCall(resource)}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  title="Call this location"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>Call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource CTA */}
      <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-emerald-900 mb-2">
            Know of a great local resource?
          </h3>
          <p className="text-emerald-700 mb-4">
            Help others in your community by suggesting new recycling centers, gardens, or eco-friendly businesses.
          </p>
          <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
            Suggest a Resource
          </button>
        </div>
      </div>
    </div>
  );
};