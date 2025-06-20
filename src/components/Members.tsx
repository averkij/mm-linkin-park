import React, { useState, useEffect } from 'react';
import { Mic, Guitar, Music, Heart, Star } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  born: string;
  bio: string;
  status: 'current' | 'former' | 'tribute';
  image?: string;
}

const Members: React.FC = () => {
  const [membersData, setMembersData] = useState<string>('');

  useEffect(() => {
    fetch('/data/linkin_park_members.md')
      .then(response => response.text())
      .then(data => setMembersData(data))
      .catch(error => console.error('Error loading members data:', error));
  }, []);

  const currentMembers: Member[] = [
    {
      name: 'Mike Shinoda',
      role: 'Co-lead vocalist, rhythm guitarist, keyboardist, primary songwriter, and producer',
      born: 'February 11, 1977',
      bio: 'Michael Kenji Shinoda is a co-founder of Linkin Park. He is a rapper, singer, songwriter, record producer, and graphic designer. He is also known for his hip-hop side project Fort Minor and his solo work.',
      status: 'current',
      image: '/images/mike_shinoda_live.jpg'
    },
    {
      name: 'Brad Delson',
      role: 'Lead guitarist',
      born: 'December 1, 1977',
      bio: 'Bradford Philip Delson is the lead guitarist and one of the founding members of Linkin Park. He is known for his simple, yet effective guitar riffs.',
      status: 'current',
      image: '/images/brad_delson_guitar.jpg'
    },
    {
      name: 'Dave "Phoenix" Farrell',
      role: 'Bassist',
      born: 'February 8, 1977',
      bio: 'David Michael Farrell, also known by his stage name Phoenix, is the bassist for Linkin Park. He was also a member of the Christian ska punk band Tasty Snax.',
      status: 'current',
      image: '/images/band_equipment.jpg'
    },
    {
      name: 'Emily Armstrong',
      role: 'Co-lead vocalist',
      born: 'May 6, 1986',
      bio: 'Emily Armstrong is the new co-lead vocalist for Linkin Park, joining in 2023. She is also the lead vocalist for the band Dead Sara.',
      status: 'current',
      image: '/images/emily_armstrong.jpeg'
    },
    {
      name: 'Colin Brittain',
      role: 'Drummer',
      born: 'December 29, 1986',
      bio: 'Colin Brittain is the new drummer for Linkin Park, joining in 2023. He is also a songwriter and producer, having worked with bands like Papa Roach and 5 Seconds of Summer.',
      status: 'current',
      image: '/images/band_equipment.jpg'
    }
  ];

  const formerMembers: Member[] = [
    {
      name: 'Chester Bennington',
      role: 'Lead vocalist',
      born: 'March 20, 1976 - July 20, 2017',
      bio: 'Chester Charles Bennington was the lead vocalist of Linkin Park. He was known for his incredible vocal range and his raw, emotional performances. Bennington died by suicide in 2017.',
      status: 'tribute',
      image: '/images/chester_performing.jpg:large'
    },
    {
      name: 'Rob Bourdon',
      role: 'Drummer (on hiatus)',
      born: 'January 20, 1979',
      bio: 'Robert Gregory Bourdon is a founding member and the drummer of Linkin Park. He is known for his powerful and precise drumming. He is currently on hiatus from the band.',
      status: 'former'
    }
  ];

  const getRoleIcon = (role: string) => {
    if (role.includes('vocalist')) return <Mic className="text-red-500" size={24} />;
    if (role.includes('guitarist')) return <Guitar className="text-blue-500" size={24} />;
    if (role.includes('drummer')) return <Music className="text-green-500" size={24} />;
    return <Music className="text-purple-500" size={24} />;
  };

  const MemberCard: React.FC<{ member: Member; isLarge?: boolean }> = ({ member, isLarge = false }) => (
    <div className={`bg-zinc-800/50 rounded-lg overflow-hidden border border-zinc-700 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 ${isLarge ? 'md:col-span-2' : ''}`}>
      {member.image && (
        <div className={`relative ${isLarge ? 'h-80' : 'h-48'} overflow-hidden`}>
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          {member.status === 'tribute' && (
            <div className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1 rounded-full flex items-center space-x-1">
              <Heart size={16} />
              <span className="text-sm font-semibold">Tribute</span>
            </div>
          )}
          {member.status === 'current' && member.name === 'Emily Armstrong' && (
            <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full flex items-center space-x-1">
              <Star size={16} />
              <span className="text-sm font-semibold">New</span>
            </div>
          )}
          {member.status === 'current' && member.name === 'Colin Brittain' && (
            <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full flex items-center space-x-1">
              <Star size={16} />
              <span className="text-sm font-semibold">New</span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-bold text-white ${isLarge ? 'text-2xl' : 'text-xl'}`}>
            {member.name}
          </h3>
          {getRoleIcon(member.role)}
        </div>
        
        <p className="text-red-500 font-semibold mb-2">{member.role}</p>
        <p className="text-gray-400 text-sm mb-3">{member.born}</p>
        <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            THE <span className="text-red-500">BAND</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the talented individuals who bring Linkin Park's unique sound to life, 
            past and present members who shaped our musical journey.
          </p>
        </div>

        {/* Current Members */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Star className="mr-3 text-red-500" size={32} />
            Current Lineup
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMembers.map((member, index) => (
              <MemberCard 
                key={member.name} 
                member={member} 
                isLarge={index === 0} // Make Mike Shinoda's card larger as he's a founder
              />
            ))}
          </div>
        </div>

        {/* Chester Bennington Tribute Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Heart className="mr-3 text-red-500" size={32} />
            In Memory
          </h3>
          
          <div className="bg-gradient-to-r from-red-500/10 to-black/50 rounded-lg p-8 border border-red-500/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-3xl font-bold text-white mb-4">Chester Bennington</h4>
                <p className="text-red-500 font-semibold mb-4">Lead Vocalist (1999-2017)</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Chester's powerful voice and emotional depth defined Linkin Park's sound for nearly two decades. 
                  His incredible vocal range and raw, honest performances touched millions of fans worldwide. 
                  Though he's no longer with us, his legacy lives on in every song and every fan whose life was changed by his music.
                </p>
                <div className="text-gray-400 italic">
                  "Music has the power to connect us all. Chester's voice was that connection for millions." - Mike Shinoda
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src="/images/chester_performing.jpg:large" 
                  alt="Chester Bennington performing"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Former Members */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Music className="mr-3 text-red-500" size={32} />
            Former Members
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formerMembers.filter(member => member.status === 'former').map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="inline-block bg-zinc-800/50 rounded-lg p-6 border border-zinc-700">
              <p className="text-gray-300 text-lg">
                We also honor <span className="text-red-500 font-semibold">Mark Wakefield</span> and <span className="text-red-500 font-semibold">Kyle Christner</span>, 
                early members who contributed to our foundation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
