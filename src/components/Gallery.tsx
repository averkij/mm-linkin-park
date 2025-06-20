import React, { useState } from 'react';
import { X, ZoomIn, Calendar, Users, Music, Camera } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  description: string;
  category: 'live' | 'studio' | 'band' | 'album';
  year?: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const images: GalleryImage[] = [
    {
      src: '/images/concert_stage.jpg',
      title: 'Live Performance',
      description: 'Electrifying stage presence during a major concert tour',
      category: 'live',
      year: '2024'
    },
    {
      src: '/images/chester_performing.jpg:large',
      title: 'Chester Bennington Live',
      description: 'Chester\'s powerful vocals captivating the audience',
      category: 'live',
      year: '2017'
    },
    {
      src: '/images/mike_shinoda_live.jpg',
      title: 'Mike Shinoda Performing',
      description: 'Mike delivering his signature rap verses live on stage',
      category: 'live',
      year: '2024'
    },
    {
      src: '/images/linkin_park_band_photo.jpg',
      title: 'Band Portrait',
      description: 'Classic band portrait showcasing the iconic lineup',
      category: 'band',
      year: '2020'
    },
    {
      src: '/images/linkin_park_new_lineup_2024.jpg',
      title: 'New Era - 2024 Lineup',
      description: 'The revitalized band with Emily Armstrong and Colin Brittain',
      category: 'band',
      year: '2024'
    },
    {
      src: '/images/linkin_park_live_performance.jpg',
      title: 'Concert Energy',
      description: 'High-energy performance connecting with thousands of fans',
      category: 'live',
      year: '2024'
    },
    {
      src: '/images/brad_delson_guitar.jpg',
      title: 'Brad Delson Guitar Solo',
      description: 'Brad showcasing his guitar mastery during a live performance',
      category: 'live',
      year: '2024'
    },
    {
      src: '/images/emily_armstrong.jpeg',
      title: 'Emily Armstrong',
      description: 'New co-lead vocalist bringing fresh energy to the band',
      category: 'band',
      year: '2024'
    },
    {
      src: '/images/band_equipment.jpg',
      title: 'Studio Setup',
      description: 'Behind the scenes look at the band\'s recording equipment',
      category: 'studio',
      year: '2024'
    },
    {
      src: '/images/concert_crowd.jpg',
      title: 'Fan Connection',
      description: 'Thousands of fans united by the power of music',
      category: 'live',
      year: '2024'
    },
    {
      src: '/images/hybrid_theory_album_art.jpg',
      title: 'Hybrid Theory Cover',
      description: 'The iconic debut album that changed everything',
      category: 'album',
      year: '2000'
    },
    {
      src: '/images/meteora_album_art.jpg',
      title: 'Meteora Album Art',
      description: 'The follow-up masterpiece that solidified their legacy',
      category: 'album',
      year: '2003'
    },
    {
      src: '/images/from_zero_album_art.png',
      title: 'From Zero Cover',
      description: 'The latest chapter in Linkin Park\'s musical journey',
      category: 'album',
      year: '2024'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', icon: Camera },
    { id: 'live', label: 'Live Performances', icon: Music },
    { id: 'band', label: 'Band Photos', icon: Users },
    { id: 'studio', label: 'Studio Sessions', icon: Calendar },
    { id: 'album', label: 'Album Covers', icon: Music }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'live': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'band': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'studio': return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'album': return 'text-purple-500 bg-purple-500/10 border-purple-500/30';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            PHOTO <span className="text-red-500">GALLERY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visual journey through our history - from iconic performances to intimate moments, 
            capturing the essence of Linkin Park across the decades.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
                selectedCategory === id
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-zinc-800/50 text-gray-300 border-zinc-700 hover:border-red-500/50 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div 
              key={index}
              className="group relative bg-zinc-800/50 rounded-lg overflow-hidden border border-zinc-700 hover:border-red-500/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(image.category)}`}>
                  {image.category.toUpperCase()}
                </div>

                {/* Year Badge */}
                {image.year && (
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
                    {image.year}
                  </div>
                )}

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-500 text-white rounded-full p-3 transform transition-transform duration-300 group-hover:scale-110">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                <p className="text-gray-400 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">{images.filter(img => img.category === 'live').length}</div>
            <div className="text-gray-300">Live Photos</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">{images.filter(img => img.category === 'band').length}</div>
            <div className="text-gray-300">Band Photos</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">{images.filter(img => img.category === 'album').length}</div>
            <div className="text-gray-300">Album Covers</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">{images.length}</div>
            <div className="text-gray-300">Total Images</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-zinc-900 rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="relative">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border mb-3 ${getCategoryColor(selectedImage.category)}`}>
                  {selectedImage.category.toUpperCase()}
                </div>
                <h3 className="text-white font-bold text-2xl mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
                {selectedImage.year && (
                  <p className="text-red-500 font-semibold mt-2">{selectedImage.year}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
