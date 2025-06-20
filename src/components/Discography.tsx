import React, { useState, useEffect } from 'react';
import { Play, Calendar, Trophy, TrendingUp } from 'lucide-react';

interface Album {
  title: string;
  year: string;
  description: string;
  cover: string;
  status: 'classic' | 'evolution' | 'latest';
  achievements?: string[];
}

const Discography: React.FC = () => {
  const [discographyData, setDiscographyData] = useState<string>('');

  useEffect(() => {
    fetch('/data/linkin_park_discography.md')
      .then(response => response.text())
      .then(data => setDiscographyData(data))
      .catch(error => console.error('Error loading discography data:', error));
  }, []);

  const albums: Album[] = [
    {
      title: 'Hybrid Theory',
      year: '2000',
      description: 'The debut album that launched the band to international fame. It peaked at number two on the US Billboard 200 and was the seventh best-selling album of the 2000s.',
      cover: '/images/hybrid_theory_album_art.jpg',
      status: 'classic',
      achievements: ['Diamond Certification', '#2 Billboard 200', 'Best-selling debut of 2000s']
    },
    {
      title: 'Meteora',
      year: '2003',
      description: 'The band\'s second studio album, which debuted at number one on the Billboard 200. It was the third-best-selling album of the year.',
      cover: '/images/meteora_album_art.jpg',
      status: 'classic',
      achievements: ['#1 Billboard 200', '3rd best-selling album of 2003', 'Multi-platinum']
    },
    {
      title: 'Minutes to Midnight',
      year: '2007',
      description: 'The third studio album, which also debuted at number-one on the Billboard 200.',
      cover: '/images/minutes_to_midnight_album_art.jpg',
      status: 'evolution',
      achievements: ['#1 Billboard 200', 'Musical evolution', 'Mainstream breakthrough']
    },
    {
      title: 'A Thousand Suns',
      year: '2010',
      description: 'This became Linkin Park\'s third studio album to debut at the top of the Billboard 200.',
      cover: '/images/a_thousand_suns_album_art.jpg',
      status: 'evolution',
      achievements: ['#1 Billboard 200', 'Electronic experimentation', 'Concept album']
    },
    {
      title: 'Living Things',
      year: '2012',
      description: 'The band\'s fourth studio album to debut at number one.',
      cover: '/images/hybrid_theory_album_art.jpg', // Placeholder
      status: 'evolution',
      achievements: ['#1 Billboard 200', 'Electronic-rock fusion']
    },
    {
      title: 'The Hunting Party',
      year: '2014',
      description: 'This album debuted at number three, being their first since Meteora not to debut at number one.',
      cover: '/images/meteora_album_art.jpg', // Placeholder
      status: 'evolution',
      achievements: ['#3 Billboard 200', 'Return to rock roots']
    },
    {
      title: 'One More Light',
      year: '2017',
      description: 'This album peaked atop the chart and was the last album to be released before frontman Chester Bennington\'s death in July 2017.',
      cover: '/images/a_thousand_suns_album_art.jpg', // Placeholder
      status: 'classic',
      achievements: ['#1 Billboard 200', 'Chester\'s final album', 'Pop experimentation']
    },
    {
      title: 'From Zero',
      year: '2024',
      description: 'The band\'s eighth studio album, featuring new vocalist Emily Armstrong and drummer Colin Brittain.',
      cover: '/images/from_zero_album_art.png',
      status: 'latest',
      achievements: ['New era begins', 'Emily Armstrong debut', 'Return after hiatus']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'classic':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'evolution':
        return 'border-blue-500 bg-blue-500/10';
      case 'latest':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'classic':
        return <Trophy className="text-yellow-500" size={20} />;
      case 'evolution':
        return <TrendingUp className="text-blue-500" size={20} />;
      case 'latest':
        return <Play className="text-red-500" size={20} />;
      default:
        return <Calendar className="text-gray-500" size={20} />;
    }
  };

  const AlbumCard: React.FC<{ album: Album; index: number }> = ({ album, index }) => (
    <div className={`group bg-zinc-800/50 rounded-lg overflow-hidden border ${getStatusColor(album.status)} hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 ${
      album.status === 'latest' ? 'lg:col-span-2' : ''
    }`}>
      <div className="relative overflow-hidden">
        <img 
          src={album.cover} 
          alt={`${album.title} album cover`}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            album.status === 'latest' ? 'h-64 md:h-80' : 'h-48 md:h-64'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1">
          {getStatusIcon(album.status)}
          <span className="text-white text-sm font-semibold capitalize">{album.status}</span>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 transform transition-transform duration-300 hover:scale-110">
            <Play size={32} fill="currentColor" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-bold text-white ${album.status === 'latest' ? 'text-2xl' : 'text-xl'}`}>
            {album.title}
          </h3>
          <span className="text-red-500 font-bold text-lg">{album.year}</span>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{album.description}</p>
        
        {album.achievements && (
          <div className="space-y-2">
            <h4 className="text-red-500 font-semibold text-sm">Key Achievements:</h4>
            <div className="flex flex-wrap gap-2">
              {album.achievements.map((achievement, i) => (
                <span 
                  key={i}
                  className="bg-zinc-700/50 text-gray-300 px-2 py-1 rounded text-xs border border-zinc-600"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            OUR <span className="text-red-500">MUSIC</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Eight studio albums spanning over two decades of musical evolution, 
            from nu-metal pioneers to genre-defying innovators.
          </p>
        </div>

        {/* Album Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">8</div>
            <div className="text-gray-300">Studio Albums</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">6</div>
            <div className="text-gray-300">#1 Albums</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">100M+</div>
            <div className="text-gray-300">Records Sold</div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-6 text-center border border-zinc-700">
            <div className="text-3xl font-bold text-red-500 mb-2">24</div>
            <div className="text-gray-300">Years Span</div>
          </div>
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album, index) => (
            <AlbumCard key={album.title} album={album} index={index} />
          ))}
        </div>

        {/* Evolution Story */}
        <div className="mt-16 bg-gradient-to-r from-red-500/10 to-black/50 rounded-lg p-8 border border-red-500/30">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">Musical Evolution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-yellow-500" size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Classic Era</h4>
              <p className="text-gray-300 text-sm">
                Nu-metal pioneers with Hybrid Theory and Meteora defining a generation's sound.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-500" size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Evolution Phase</h4>
              <p className="text-gray-300 text-sm">
                Experimental journey through electronic, pop, and alternative rock territories.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Play className="text-red-500" size={32} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">New Chapter</h4>
              <p className="text-gray-300 text-sm">
                From Zero marks a fresh beginning with new voices while honoring our legacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discography;
