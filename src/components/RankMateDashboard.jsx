import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const GAME_DATA = {
  'Valorant': {
    themeColor: 'text-[#ff4655]',
    badgeColor: 'bg-[#ff4655]',
    bannerGradient: 'bg-gradient-to-b from-[#ff4655] to-transparent',
    logo: 'Valorant',
    ranks: [
      { name: 'Unranked', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/largeicon.png', shadow: 'rgba(255, 255, 255, 0.1)' },
      { name: 'Iron', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/5/largeicon.png', shadow: 'rgba(120, 120, 120, 0.6)' },
      { name: 'Bronze', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/8/largeicon.png', shadow: 'rgba(180, 110, 60, 0.7)' },
      { name: 'Silver', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/11/largeicon.png', shadow: 'rgba(200, 200, 200, 0.7)' },
      { name: 'Gold', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/14/largeicon.png', shadow: 'rgba(255, 210, 50, 0.8)' },
      { name: 'Platinum', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/17/largeicon.png', shadow: 'rgba(50, 180, 180, 0.8)' },
      { name: 'Diamond', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/20/largeicon.png', shadow: 'rgba(180, 100, 255, 0.8)' },
      { name: 'Ascendant', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/23/largeicon.png', shadow: 'rgba(50, 200, 120, 0.8)' },
      { name: 'Immortal', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/26/largeicon.png', shadow: 'rgba(255, 50, 50, 0.9)' },
      { name: 'Radiant', icon: 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/27/largeicon.png', shadow: 'rgba(255, 255, 100, 1)' },
    ],
    roles: [
      { name: 'Duelist', id: 'Duelist' },
      { name: 'Initiator', id: 'Initiator' },
      { name: 'Controller', id: 'Controller' },
      { name: 'Sentinel', id: 'Sentinel' }
    ]
  },
  'League of Legends': {
    themeColor: 'text-[#c89b3c]',
    badgeColor: 'bg-[#c89b3c]',
    bannerGradient: 'bg-gradient-to-b from-[#09839c] to-transparent',
    logo: 'League',
    ranks: [
      { name: 'Iron', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-iron.png', shadow: 'rgba(100, 100, 100, 0.6)' },
      { name: 'Bronze', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-bronze.png', shadow: 'rgba(165, 105, 80, 0.7)' },
      { name: 'Silver', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-silver.png', shadow: 'rgba(200, 200, 200, 0.7)' },
      { name: 'Gold', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-gold.png', shadow: 'rgba(255, 200, 50, 0.8)' },
      { name: 'Platinum', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-platinum.png', shadow: 'rgba(50, 190, 190, 0.8)' },
      { name: 'Emerald', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-emerald.png', shadow: 'rgba(40, 200, 90, 0.8)' },
      { name: 'Diamond', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-diamond.png', shadow: 'rgba(100, 100, 255, 0.8)' },
      { name: 'Master', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-master.png', shadow: 'rgba(200, 50, 255, 0.8)' },
      { name: 'Grandmaster', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-grandmaster.png', shadow: 'rgba(255, 50, 50, 0.9)' },
      { name: 'Challenger', icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-challenger.png', shadow: 'rgba(100, 200, 255, 0.9)' },
    ],
    roles: [
      { name: 'Top', id: 'Top', icon: 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ef/Top_icon.png' },
      { name: 'Jungle', id: 'Jungle', icon: 'https://static.wikia.nocookie.net/leagueoflegends/images/1/1b/Jungle_icon.png' },
      { name: 'Mid', id: 'Mid', icon: 'https://static.wikia.nocookie.net/leagueoflegends/images/9/98/Middle_icon.png' },
      { name: 'ADC', id: 'ADC', icon: 'https://static.wikia.nocookie.net/leagueoflegends/images/9/97/Bottom_icon.png' },
      { name: 'Support', id: 'Support', icon: 'https://static.wikia.nocookie.net/leagueoflegends/images/e/e0/Support_icon.png' }
    ]
  }
};

const STATUS_OPTIONS = [
  { id: 'online', label: 'Online', color: 'bg-green-500' },
  { id: 'idle', label: 'Idle', color: 'bg-yellow-500' },
  { id: 'dnd', label: 'Do Not Disturb', color: 'bg-red-500' },
  { id: 'offline', label: 'Invisible', color: 'bg-zinc-500' }
];

const ProfileCard = ({ data, valRoles }) => {
  const pGame = data.game || 'Valorant';
  const pGamertag = data.gamertag || '';
  const pDesc = data.description || '';
  const pAvatar = data.avatar || '';
  const pBanner = data.banner || '';
  
  const pRankObj = GAME_DATA[pGame].ranks.find(r => r.name === data.rank) || GAME_DATA[pGame].ranks[0];
  const pRoleObj = GAME_DATA[pGame].roles.find(r => r.name === data.role) || GAME_DATA[pGame].roles[0];
  const pRoleIconUrl = pGame === 'Valorant' ? valRoles[pRoleObj?.id] : pRoleObj?.icon;
  const pMains = data.mains || [];

  if (pGame === 'Valorant') {
    const bgColor = '#0f1923';
    return (
      <div className="w-[260px] h-[640px] shadow-[0_0_20px_rgba(255,70,85,0.15)] overflow-hidden text-[#ece8e1] border border-[#ff4655]/30 relative flex flex-col select-none transition-colors" style={{ backgroundColor: bgColor }}>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#ff4655] z-20 shrink-0" />
        <div className="h-[140px] w-full relative shrink-0">
          {pBanner && <img src={pBanner} className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale" draggable="false" />}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${bgColor})` }}></div>
        </div>
        
        <div className="relative px-3 pt-12 pb-5 flex flex-col items-center z-10 flex-1">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[90px] h-[90px] rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[24px] border-[1.5px] border-[#ff4655] p-0.5 shadow-[0_0_10px_rgba(255,70,85,0.2)]" style={{ backgroundColor: bgColor }}>
            {pAvatar ? <img src={pAvatar} className="w-full h-full object-cover rounded-tl-[2px] rounded-tr-[2px] rounded-bl-[2px] rounded-br-[20px]" draggable="false" /> : <i className="fa-solid fa-user text-[40px] text-[#ff4655] opacity-50 mx-auto mt-6 block text-center"></i>}
          </div>
          
          <h2 className="text-2xl font-black text-[#ece8e1] mt-2 tracking-widest uppercase truncate w-full text-center font-gaming">
            {pGamertag || 'Gamertag'}
          </h2>
          
          <div className="mt-3 flex items-center gap-1.5 border border-[#ff4655]/50 bg-[#ff4655]/10 px-3 py-1 rounded-sm">
            {pRoleIconUrl && <img src={pRoleIconUrl} className="w-4 h-4 object-contain opacity-90 drop-shadow-md" draggable="false" />}
            <span className="text-[11px] font-black text-[#ece8e1] uppercase tracking-widest">{pRoleObj.name}</span>
          </div>
          
          <div className="mt-6 w-24 h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0 flex items-center justify-center">
            <img src={pRankObj.icon} className="w-full h-full object-contain scale-[0.85]" draggable="false" />
          </div>
          <div className="font-black text-white text-xl uppercase tracking-[0.1em] mt-3 drop-shadow-md font-gaming">{pRankObj.name}</div>
          
          <div className="flex gap-1.5 mt-5 mb-4 shrink-0 h-8">
            {pMains.map((m, index) => <img key={`${m.id}-${index}`} src={m.icon} className="w-8 h-8 border border-[#ff4655]/30 rounded-sm bg-black/40" draggable="false" />)}
          </div>
          
          <div className="w-full mt-auto mb-2 text-center px-2">
            <p className="text-[11px] text-zinc-300 uppercase tracking-wide leading-relaxed border-l-2 border-[#ff4655] bg-black/20 p-2 break-words line-clamp-3 whitespace-pre-wrap shadow-inner min-h-[46px] flex items-center justify-center">
              {pDesc || 'No bio.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const bgColorLol = '#010a13';
  return (
    <div className="w-[260px] h-[640px] rounded-[3px] shadow-2xl overflow-hidden text-zinc-300 border border-[#c8aa6e]/30 relative flex flex-col select-none transition-colors" style={{ backgroundColor: bgColorLol }}>
      <div className="h-[140px] w-full relative shrink-0">
        {pBanner && <img src={pBanner} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" draggable="false" />}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${bgColorLol})` }}></div>
      </div>
      
      <div className="relative px-3 pt-12 pb-5 flex flex-col items-center z-10 flex-1">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[90px] h-[90px] rounded-full border-[1.5px] border-[#c8aa6e] p-0.5 shadow-xl" style={{ backgroundColor: bgColorLol }}>
          {pAvatar ? <img src={pAvatar} className="w-full h-full object-cover rounded-full" draggable="false" /> : <i className="fa-solid fa-user text-[40px] text-[#c8aa6e] opacity-50 mx-auto mt-6 block text-center"></i>}
        </div>
        
        <h2 className="text-2xl font-bold text-[#f0e6d2] mt-2 tracking-wide truncate w-full text-center font-gaming">
          {pGamertag || 'Gamertag'}
        </h2>
        
        <div className="mt-3 flex items-center gap-1.5 border border-[#c8aa6e]/50 bg-[#010a13]/80 px-3 py-1 rounded-full">
          {pRoleIconUrl && <img src={pRoleIconUrl} className="w-4 h-4 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" draggable="false" />}
          <span className="text-[10px] font-bold text-[#c8aa6e] uppercase tracking-widest">{pRoleObj.name}</span>
        </div>
        
        <div className="mt-6 w-24 h-24 drop-shadow-[0_0_15px_rgba(200,170,110,0.3)] shrink-0 flex items-center justify-center">
          <img src={pRankObj.icon} className="w-full h-full object-contain scale-[3.5]" draggable="false" />
        </div>
        <div className="font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c8aa6e] text-xl uppercase tracking-[0.1em] mt-3 drop-shadow-md font-gaming">{pRankObj.name}</div>
        
        <div className="flex gap-1.5 mt-5 mb-4 shrink-0 h-8">
          {pMains.map((m, index) => <img key={`${m.id}-${index}`} src={m.icon} className="w-8 h-8 border border-[#c8aa6e]/40 rounded-full bg-black/40" draggable="false" />)}
        </div>
        
        <div className="w-full mt-auto mb-2 text-center px-4">
          <p className="text-[12px] italic text-[#a09b8c] leading-relaxed relative inline-block break-words line-clamp-3 whitespace-pre-wrap min-h-[40px] flex items-center justify-center">
            <span className="text-2xl text-[#c8aa6e]/30 absolute -top-1 -left-2 font-serif leading-none">&quot;</span>
            {pDesc || 'No bio.'}
            <span className="text-2xl text-[#c8aa6e]/30 absolute -bottom-3 -right-2 font-serif leading-none">&quot;</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function RankMateDashboard({ session }) {
  const user = session?.user;
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const userMenuRef = useRef(null);

  const [activeTab, setActiveTab] = useState('editor');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [status, setStatus] = useState('online');
  const [prefs, setPrefs] = useState({ invites: true, publicRank: true, sounds: false });

  const [game, setGame] = useState('Valorant');
  const [avatar, setAvatar] = useState('');
  const [banner, setBanner] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [description, setDescription] = useState('');
  const [rank, setRank] = useState(GAME_DATA['Valorant'].ranks[0].name);
  const [role, setRole] = useState(GAME_DATA['Valorant'].roles[0].name);
  
  const [valData, setValData] = useState([]);
  const [lolData, setLolData] = useState([]);
  const [valRoles, setValRoles] = useState({});
  const [selectedMains, setSelectedMains] = useState([]);
  const [charSearch, setCharSearch] = useState('');
  const [showCharDropdown, setShowCharDropdown] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const [meetProfiles, setMeetProfiles] = useState([]);
  const [meetIndex, setMeetIndex] = useState(0);
  
  const [connections, setConnections] = useState([]);
  const [matchAnimation, setMatchAnimation] = useState(null);
  const [chatProfile, setChatProfile] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [profileToBlock, setProfileToBlock] = useState(null);
  
  const [connFilterGame, setConnFilterGame] = useState('All');
  const [connFilterRank, setConnFilterRank] = useState('All');
  const [connFilterRole, setConnFilterRole] = useState('All');

  const activeStatusColor = STATUS_OPTIONS.find(s => s.id === status)?.color || 'bg-green-500';

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        setGame(data.game || 'Valorant');
        setGamertag(data.gamertag || '');
        setDescription(data.description || '');
        setAvatar(data.avatar_url || ''); 
        setBanner(data.banner_url || ''); 
        setRank(data.rank || GAME_DATA[data.game || 'Valorant'].ranks[0].name);
        setRole(data.role || GAME_DATA[data.game || 'Valorant'].roles[0].name);
        setSelectedMains(data.mains || []);
      }
    };

    fetchProfile();
  }, [user]);

  useEffect(() => {
    fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
      .then(res => res.json())
      .then(data => {
        if (!data || !data.data) return;
        const sortedAgents = data.data
          .map(a => ({ id: a.uuid, name: a.displayName, icon: a.displayIcon }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        const extractedRoles = {};
        data.data.forEach(agent => {
          if (agent.role) extractedRoles[agent.role.displayName] = agent.role.displayIcon;
        });

        setValData(sortedAgents);
        setValRoles(extractedRoles);
      })
      .catch(err => console.error("Failed to load Valorant agents", err));

    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(res => res.json())
      .then(versions => {
        if (!versions || !versions.length) return;
        const latestVersion = versions[0];
        return fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`)
          .then(res => res.json())
          .then(data => {
            if (!data || !data.data) return;
            const champs = Object.values(data.data)
              .map(c => ({ id: c.id, name: c.name, icon: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${c.image.full}` }))
              .sort((a, b) => a.name.localeCompare(b.name));
            
            setLolData(champs);
          });
      })
      .catch(err => console.error("Failed to load LoL champs", err));
        
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowCharDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (!event.target.closest('.connection-menu-btn') && !event.target.closest('.connection-menu-content')) {
        setOpenMenuId(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGameChange = (e) => {
    const newGame = e.target.value;
    setGame(newGame);
    setGamertag('');
    setDescription('');
    setAvatar('');
    setBanner('');
    setRank(GAME_DATA[newGame].ranks[0].name);
    setRole(GAME_DATA[newGame].roles[0].name);
    setSelectedMains([]);
    setCharSearch('');
    setShowSaved(false);
  };

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const profileData = {
      id: user.id,
      updated_at: new Date().toISOString(),
      game: game,
      gamertag: gamertag,
      description: description,
      avatar_url: avatar, 
      banner_url: banner, 
      rank: rank,
      role: role,
      mains: selectedMains,
    };

    const { error } = await supabase
      .from('profiles')
      .upsert(profileData);

    if (error) {
      alert('Error saving profile: ' + error.message);
    } else {
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }
  };

  const toggleMainCharacter = (char) => {
    if (selectedMains.some(m => m.id === char.id)) {
      setSelectedMains(selectedMains.filter(m => m.id !== char.id));
    } else if (selectedMains.length < 4) {
      setSelectedMains([...selectedMains, char]);
      setCharSearch('');
      setShowCharDropdown(false);
    }
  };

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleFavorite = (id) => {
    setConnections(prev => prev.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
    setOpenMenuId(null);
  };

  const handleSeverConnection = (id) => {
    const profileToReturn = connections.find(c => c.id === id);
    setConnections(prev => prev.filter(c => c.id !== id));
    if (profileToReturn) {
      setMeetProfiles(prev => [profileToReturn, ...prev]);
    }
    setOpenMenuId(null);
  };

  const confirmBlock = () => {
    if (!profileToBlock) return;
    setConnections(prev => prev.filter(c => c.id !== profileToBlock.id));
    setBlockedUsers(prev => [profileToBlock, ...prev]);
    setProfileToBlock(null);
  };

  const handleUnblock = (id) => {
    const profileToUnblock = blockedUsers.find(c => c.id === id);
    setBlockedUsers(prev => prev.filter(c => c.id !== id));
    if (profileToUnblock) {
      setMeetProfiles(prev => [profileToUnblock, ...prev]);
    }
  };

  const handleMatch = (profile) => {
    setMatchAnimation(profile);
    if (!connections.some(c => c.id === profile.id)) {
      setConnections(prev => [profile, ...prev]);
      setMeetProfiles(prev => {
        const newProfiles = prev.filter(p => p.id !== profile.id);
        setMeetIndex(current => Math.max(0, Math.min(current, newProfiles.length - 1)));
        return newProfiles;
      });
    }
    setTimeout(() => {
      setMatchAnimation(null);
    }, 2500);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
  };

  const availableChars = game === 'Valorant' ? valData : lolData;
  const filteredChars = availableChars.filter(c => 
    c.name.toLowerCase().includes(charSearch.toLowerCase()) && 
    !selectedMains.some(m => m.id === c.id)
  );

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden transition-colors duration-300 bg-[#000000] text-zinc-300">
      <div className="w-full border-b py-3 px-6 flex items-center justify-between shrink-0 font-ui relative z-30 transition-colors bg-[#050505] border-zinc-900">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-gamepad text-[22px] text-white"></i>
            <span className="font-gaming font-bold text-xl text-white">RankMate</span>
          </div>
          
          <nav className="flex items-center gap-4">
            <button 
              onClick={() => { setActiveTab('meet'); setChatProfile(null); }}
              className={`px-2 py-1.5 text-sm font-semibold transition-colors tracking-wide ${activeTab === 'meet' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              Meet Players
            </button>
            <button 
              onClick={() => { setActiveTab('connections'); setChatProfile(null); }}
              className={`px-2 py-1.5 text-sm font-semibold transition-colors tracking-wide flex items-center gap-2 ${activeTab === 'connections' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              Connections {connections.length > 0 && <span className="bg-zinc-100 text-black text-[10px] px-1.5 py-0.5 rounded-full leading-none">{connections.length}</span>}
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 border flex items-center justify-center p-0.5 cursor-pointer relative transition-colors bg-[#0a0a0a] border-zinc-800 hover:border-zinc-500"
            >
              {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <i className="fa-solid fa-user text-[20px] text-zinc-500"></i>}
              <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 ${activeStatusColor} border-2 border-[#050505]`}></div>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-3 w-48 border shadow-2xl flex flex-col z-50 transition-colors bg-[#0a0a0a] border-zinc-900">
                <button onClick={() => { setActiveTab('editor'); setShowUserMenu(false); }} className="px-4 py-3 text-sm text-left font-semibold border-b flex items-center gap-2 transition-colors text-zinc-300 hover:text-white border-zinc-800 hover:bg-zinc-900">
                  <i className="fa-solid fa-user text-[16px] w-4 text-center"></i> Edit Profile
                </button>
                <button onClick={() => { setActiveTab('settings'); setShowUserMenu(false); }} className="px-4 py-3 text-sm text-left font-semibold border-b flex items-center gap-2 transition-colors text-zinc-300 hover:text-white border-zinc-800 hover:bg-zinc-900">
                  <i className="fa-solid fa-gear text-[16px] w-4 text-center"></i> Settings
                </button>
                <button onClick={() => { setActiveTab('blocklist'); setShowUserMenu(false); }} className="px-4 py-3 text-sm text-left font-semibold border-b flex items-center gap-2 transition-colors text-zinc-300 hover:text-white border-zinc-800 hover:bg-zinc-900">
                  <i className="fa-solid fa-ban text-[16px] w-4 text-center"></i> Block List
                </button>
                <button onClick={handleLogout} className="px-4 py-3 text-sm text-red-500 hover:text-red-400 text-left font-semibold flex items-center gap-2 transition-colors hover:bg-zinc-900">
                  <i className="fa-solid fa-right-from-bracket text-[16px] w-4 text-center"></i> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeTab === 'editor' && (
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 font-ui">
          <div className="lg:col-span-7 rounded-none p-5 border flex flex-col h-full overflow-y-auto custom-scroll transition-colors bg-[#0a0a0a] border-zinc-900">
            <h1 className="font-gaming text-2xl font-bold mb-5 text-white">Edit Profile</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block text-zinc-500">Game</label>
                <select value={game} onChange={handleGameChange} className="w-full text-sm border rounded-none p-2.5 outline-none cursor-pointer transition-colors bg-[#000000] text-white border-zinc-800 focus:border-zinc-500">
                  <option value="Valorant">Valorant</option>
                  <option value="League of Legends">League of Legends</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block text-zinc-500">Rank</label>
                <select value={rank} onChange={(e) => setRank(e.target.value)} className="w-full text-sm border rounded-none p-2.5 outline-none cursor-pointer transition-colors bg-[#000000] text-white border-zinc-800 focus:border-zinc-500">
                  {GAME_DATA[game].ranks.map((r, index) => <option key={`rank-${index}`} value={r.name}>{r.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block text-zinc-500">Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full text-sm border rounded-none p-2.5 outline-none cursor-pointer transition-colors bg-[#000000] text-white border-zinc-800 focus:border-zinc-500">
                  {GAME_DATA[game].roles.map((r, index) => <option key={`role-${index}`} value={r.name}>{r.name}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <button onClick={() => avatarInputRef.current.click()} className="w-full border p-2.5 text-sm transition-colors bg-[#000000] border-zinc-800 hover:border-zinc-500 text-white">Select Avatar</button>
              <button onClick={() => bannerInputRef.current.click()} className="w-full border p-2.5 text-sm transition-colors bg-[#000000] border-zinc-800 hover:border-zinc-500 text-white">Select Banner</button>
              <input type="file" accept="image/*" hidden ref={avatarInputRef} onChange={(e) => handleImageUpload(e, setAvatar)} />
              <input type="file" accept="image/*" hidden ref={bannerInputRef} onChange={(e) => handleImageUpload(e, setBanner)} />
            </div>
            
            <div className="mb-4">
              <label className="text-xs font-semibold mb-1.5 block text-zinc-500">Gamertag</label>
              <input type="text" value={gamertag} onChange={(e) => setGamertag(e.target.value)} className="w-full text-sm border rounded-none p-2.5 outline-none transition-colors bg-[#000000] text-white border-zinc-800 focus:border-zinc-500" />
            </div>
            
            <div className="mb-4" ref={searchContainerRef}>
              <label className="text-xs font-semibold mb-1.5 block text-zinc-500">Main Characters ({selectedMains.length}/4)</label>
              <input type="text" value={charSearch} onChange={(e) => setCharSearch(e.target.value)} onFocus={() => setShowCharDropdown(true)} placeholder="Search..." className="w-full border p-2.5 text-sm mb-2 outline-none transition-colors bg-[#000000] text-white border-zinc-800 focus:border-zinc-500" />
              {showCharDropdown && (
                <div className="absolute w-[calc(100%-40px)] max-w-[420px] border z-50 max-h-40 overflow-y-auto custom-scroll transition-colors bg-[#050505] border-zinc-900">
                  {filteredChars.map((c, index) => (
                    <div key={`${c.id}-${index}`} onMouseDown={() => toggleMainCharacter(c)} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-zinc-900">
                      <img src={c.icon} className="w-6 h-6 object-cover" />
                      <span className="text-xs text-white">{c.name}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2 h-10">
                {selectedMains.map((m, index) => (
                  <div key={`${m.id}-${index}`} onClick={() => toggleMainCharacter(m)} className="h-full aspect-square border cursor-pointer drop-shadow-[0_0_5px_rgba(255,255,255,0.15)] border-zinc-800">
                    <img src={m.icon} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1.5">
                <label className="text-xs font-semibold block text-zinc-500">Bio</label>
                <span className={`text-xs font-semibold ${description.length >= 50 ? 'text-red-500' : 'text-zinc-500'}`}>{description.length}/50</span>
              </div>
              <textarea maxLength={50} value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full text-sm border rounded-none p-2.5 outline-none resize-none transition-colors bg-[#000000] text-white border-zinc-800 focus:border-zinc-500" />
            </div>
            
            <button onClick={handleSave} className="w-full font-semibold py-2.5 mt-auto transition-colors flex items-center justify-center gap-2 bg-zinc-100 text-black hover:bg-white">
              {showSaved ? <><i className="fa-solid fa-check text-[18px]"></i> Saved!</> : 'Save Profile'}
            </button>
          </div>

          <div className="lg:col-span-5 flex justify-center items-center">
            <ProfileCard 
              data={{ game, gamertag, description, avatar, banner, rank, role, mains: selectedMains }} 
              valRoles={valRoles} 
            />
          </div>
        </div>
      )}

      {activeTab === 'meet' && !chatProfile && meetProfiles.length === 0 && (
        <div className="flex-1 w-full flex flex-col items-center justify-center bg-[#000000]">
          <i className="fa-solid fa-satellite-dish text-[64px] mb-4 text-zinc-800 animate-pulse"></i>
          <p className="text-zinc-500 font-bold text-lg">No more players in your area.</p>
          <p className="text-zinc-600 text-sm mt-1">You&apos;ve connected with everyone!</p>
        </div>
      )}

      {activeTab === 'meet' && !chatProfile && meetProfiles.length > 0 && (
        <div className="flex-1 w-full flex flex-col items-center justify-center relative overflow-hidden bg-black">
          <div className="relative w-full max-w-7xl flex flex-col items-center justify-center min-h-[750px]">
            <div className="relative w-full h-[650px] flex items-center justify-center z-10 perspective-[1000px]">
              {meetProfiles.map((profile, index) => {
                const offset = index - meetIndex;
                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;
                const isHidden = Math.abs(offset) > 1;

                let xTranslate = offset * 320;
                let zTranslate = isCenter ? 0 : -100;
                let scale = isCenter ? 1 : 0.8;
                
                if (isHidden) {
                  xTranslate = offset > 0 ? 800 : -800;
                  scale = 0.5;
                }

                return (
                  <div 
                    key={`carousel-${profile.id}`}
                    className={`absolute transition-all duration-500 ease-out flex items-center justify-center ${isCenter ? 'z-20 cursor-pointer' : isHidden ? 'z-0 opacity-0 pointer-events-none' : 'z-10 cursor-pointer group'}`}
                    style={{ 
                      transform: `translateX(${xTranslate}px) translateZ(${zTranslate}px) scale(${scale})`,
                      opacity: isHidden ? 0 : 1
                    }}
                    onDoubleClick={() => isCenter && handleMatch(profile)}
                    onClick={() => {
                      if (isLeft) setMeetIndex(index);
                      if (isRight) setMeetIndex(index);
                    }}
                    title={isCenter ? "Double-tap to connect" : ""}
                  >
                    <div className={`${!isCenter ? 'pointer-events-none opacity-40 blur-[3px]' : ''} transition-all duration-500 shadow-2xl`}>
                      <ProfileCard data={profile} valRoles={valRoles} />
                    </div>
                    
                    {!isCenter && !isHidden && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-2 text-white flex items-center justify-center group-hover:scale-125 transition-all shadow-2xl bg-[#0a0a0a] border-zinc-600 group-hover:border-white">
                          {isLeft ? <i className="fa-solid fa-chevron-left text-[40px]"></i> : <i className="fa-solid fa-chevron-right text-[40px]"></i>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 z-20 flex gap-6 sm:hidden">
              <button 
                onClick={() => setMeetIndex(Math.max(0, meetIndex - 1))}
                disabled={meetIndex === 0}
                className="w-16 h-16 rounded-none border flex items-center justify-center disabled:opacity-30 bg-[#0a0a0a] border-zinc-900 text-zinc-500"
              >
                <i className="fa-solid fa-chevron-left text-[32px]"></i>
              </button>

              <button 
                onClick={() => setMeetIndex(Math.min(meetProfiles.length - 1, meetIndex + 1))}
                disabled={meetIndex === meetProfiles.length - 1}
                className="w-16 h-16 rounded-none border flex items-center justify-center disabled:opacity-30 bg-[#0a0a0a] border-zinc-900 text-zinc-500"
              >
                <i className="fa-solid fa-chevron-right text-[32px]"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'connections' && !chatProfile && (
        <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col font-ui overflow-y-auto custom-scroll">
          <h1 className="font-gaming text-3xl font-bold mb-8 text-white">Your Connections</h1>
          
          {connections.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-900 bg-[#050505]">
              <i className="fa-solid fa-users text-[48px] mb-4 opacity-20 text-zinc-500"></i>
              <p className="text-zinc-500 font-semibold">You haven&apos;t connected with anyone yet.</p>
              <p className="text-sm text-zinc-600 mt-2">Double-tap a profile in the Meet tab to connect!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 p-4 border border-zinc-900 bg-[#050505]">
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Game</label>
                  <select value={connFilterGame} onChange={(e) => { setConnFilterGame(e.target.value); setConnFilterRank('All'); setConnFilterRole('All'); }} className="w-full bg-[#0a0a0a] border border-zinc-800 text-white p-2 text-sm outline-none focus:border-zinc-500">
                    <option value="All">All Games</option>
                    <option value="Valorant">Valorant</option>
                    <option value="League of Legends">League of Legends</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Rank</label>
                  <select value={connFilterRank} onChange={(e) => setConnFilterRank(e.target.value)} className="w-full bg-[#0a0a0a] border border-zinc-800 text-white p-2 text-sm outline-none focus:border-zinc-500">
                    <option value="All">All Ranks</option>
                    {[...new Set(connections.filter(c => connFilterGame === 'All' || c.game === connFilterGame).map(c => c.rank))].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-zinc-500 mb-1 block">Role</label>
                  <select value={connFilterRole} onChange={(e) => setConnFilterRole(e.target.value)} className="w-full bg-[#0a0a0a] border border-zinc-800 text-white p-2 text-sm outline-none focus:border-zinc-500">
                    <option value="All">All Roles</option>
                    {[...new Set(connections.filter(c => connFilterGame === 'All' || c.game === connFilterGame).map(c => c.role))].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {connections.filter(c => {
                  if (connFilterGame !== 'All' && c.game !== connFilterGame) return false;
                  if (connFilterRank !== 'All' && c.rank !== connFilterRank) return false;
                  if (connFilterRole !== 'All' && c.role !== connFilterRole) return false;
                  return true;
                }).map(c => {
                  const pRankObj = GAME_DATA[c.game].ranks.find(r => r.name === c.rank) || GAME_DATA[c.game].ranks[0];
                  const pRoleObj = GAME_DATA[c.game].roles.find(r => r.name === c.role) || GAME_DATA[c.game].roles[0];
                  const pRoleIconUrl = c.game === 'Valorant' ? valRoles[pRoleObj?.id] : pRoleObj?.icon;

                  if (c.game === 'Valorant') {
                    return (
                      <div key={`conn-${c.id}`} className="relative w-full flex flex-col sm:flex-row items-center justify-between bg-[#0f1923] border border-[#ff4655]/30 p-4 shadow-lg group gap-4 sm:gap-0">
                        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#ff4655] hidden sm:block" />
                        <div className="absolute left-0 top-0 w-full h-1.5 bg-[#ff4655] sm:hidden" />
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto sm:pl-4">
                          <div className="w-16 h-16 rounded-tl-[2px] rounded-tr-[2px] rounded-bl-[2px] rounded-br-[12px] border border-[#ff4655] p-0.5 relative shrink-0">
                            <img src={c.avatar} className="w-full h-full object-cover rounded-tl-[1px] rounded-tr-[1px] rounded-bl-[1px] rounded-br-[10px]" />
                          </div>
                          <div>
                            <h3 className="font-gaming font-black text-white text-xl uppercase tracking-widest flex items-center gap-2">
                              {c.gamertag.split('#')[0]}
                              {c.favorite && <i className="fa-solid fa-star text-yellow-400 text-[14px]"></i>}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1 border border-[#ff4655]/50 bg-[#ff4655]/10 px-2 py-0.5 rounded-sm w-max">
                              {pRoleIconUrl && <img src={pRoleIconUrl} className="w-3.5 h-3.5 object-contain opacity-90" />}
                              <span className="text-[10px] text-[#ece8e1] uppercase font-bold tracking-widest">{pRoleObj.name}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end pr-2">
                          <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end w-24">
                              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Rank</span>
                              <div className="font-gaming font-black text-white uppercase tracking-widest text-sm text-right">{c.rank}</div>
                            </div>
                            <div className="w-20 h-20 flex items-center justify-center shrink-0">
                              <img src={pRankObj.icon} className="w-full h-full object-contain scale-[0.85]" />
                            </div>
                          </div>
                          <button onClick={() => setChatProfile(c)} className="w-[110px] py-2.5 bg-[#ff4655] hover:bg-[#ff4655]/90 text-white font-black text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm shrink-0">
                            <i className="fa-solid fa-paper-plane"></i> Chat
                          </button>
                          
                          <div className="relative">
                            <button onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)} className="connection-menu-btn text-zinc-500 hover:text-white p-2 transition-colors">
                              <i className="fa-solid fa-ellipsis-vertical text-xl px-1"></i>
                            </button>
                            {openMenuId === c.id && (
                              <div className="connection-menu-content absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-zinc-800 shadow-2xl z-50 flex flex-col rounded-sm overflow-hidden">
                                <button onClick={() => handleToggleFavorite(c.id)} className="px-4 py-3 text-xs text-left hover:bg-zinc-900 text-white flex items-center gap-2">
                                  <i className={`fa-solid fa-star w-4 ${c.favorite ? 'text-yellow-400' : 'text-zinc-500'}`}></i> {c.favorite ? 'Remove Favorite' : 'Set as Favorite'}
                                </button>
                                <button onClick={() => handleSeverConnection(c.id)} className="px-4 py-3 text-xs text-left text-zinc-400 hover:bg-zinc-900 flex items-center gap-2 border-t border-zinc-800">
                                  <i className="fa-solid fa-user-minus w-4"></i> Sever Connection
                                </button>
                                <button onClick={() => { setProfileToBlock(c); setOpenMenuId(null); }} className="px-4 py-3 text-xs text-left text-red-500 hover:bg-zinc-900 flex items-center gap-2 border-t border-zinc-800">
                                  <i className="fa-solid fa-ban w-4"></i> Block
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={`conn-${c.id}`} className="relative w-full flex flex-col sm:flex-row items-center justify-between bg-[#010a13] border border-[#c8aa6e]/30 p-4 shadow-xl rounded-[3px] group gap-4 sm:gap-0">
                        <div className="flex items-center gap-4 w-full sm:w-auto z-10">
                          <div className="w-16 h-16 rounded-full border border-[#c8aa6e] p-0.5 relative shrink-0 shadow-[0_0_10px_rgba(200,170,110,0.2)]">
                            <img src={c.avatar} className="w-full h-full object-cover rounded-full" />
                          </div>
                          <div>
                            <h3 className="font-gaming font-bold text-[#f0e6d2] text-xl tracking-wide flex items-center gap-2">
                              {c.gamertag}
                              {c.favorite && <i className="fa-solid fa-star text-yellow-500 text-[14px]"></i>}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1 border border-[#c8aa6e]/50 bg-[#010a13]/80 px-2 py-0.5 rounded-full w-max">
                              {pRoleIconUrl && <img src={pRoleIconUrl} className="w-3.5 h-3.5 object-contain" />}
                              <span className="text-[9px] text-[#c8aa6e] uppercase font-bold tracking-widest">{pRoleObj.name}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end z-10 pr-2">
                          <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end w-24">
                              <span className="text-[9px] text-[#c8aa6e]/60 font-bold uppercase tracking-widest">Rank</span>
                              <div className="font-gaming font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f0e6d2] to-[#c8aa6e] uppercase tracking-widest text-sm text-right">{c.rank}</div>
                            </div>
                            <div className="w-20 h-20 flex items-center justify-center shrink-0">
                              <img src={pRankObj.icon} className="w-full h-full object-contain scale-[3.8]" />
                            </div>
                          </div>
                          <button onClick={() => setChatProfile(c)} className="w-[110px] py-2.5 rounded border border-[#c8aa6e] bg-[#c8aa6e]/10 hover:bg-[#c8aa6e]/20 text-[#f0e6d2] font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shrink-0">
                            <i className="fa-solid fa-message"></i> Message
                          </button>
                          
                          <div className="relative">
                            <button onClick={() => setOpenMenuId(openMenuId === c.id ? null : c.id)} className="connection-menu-btn text-[#c8aa6e]/60 hover:text-[#c8aa6e] p-2 transition-colors">
                              <i className="fa-solid fa-ellipsis-vertical text-xl px-1"></i>
                            </button>
                            {openMenuId === c.id && (
                              <div className="connection-menu-content absolute right-0 top-full mt-2 w-48 bg-[#010a13] border border-[#c8aa6e]/30 shadow-2xl z-50 flex flex-col rounded-[2px] overflow-hidden">
                                <button onClick={() => handleToggleFavorite(c.id)} className="px-4 py-3 text-xs text-left hover:bg-[#c8aa6e]/10 text-[#f0e6d2] flex items-center gap-2">
                                  <i className={`fa-solid fa-star w-4 ${c.favorite ? 'text-yellow-500' : 'text-[#c8aa6e]/50'}`}></i> {c.favorite ? 'Remove Favorite' : 'Set as Favorite'}
                                </button>
                                <button onClick={() => handleSeverConnection(c.id)} className="px-4 py-3 text-xs text-left text-[#c8aa6e]/80 hover:bg-[#c8aa6e]/10 flex items-center gap-2 border-t border-[#c8aa6e]/20">
                                  <i className="fa-solid fa-user-minus w-4"></i> Sever Connection
                                </button>
                                <button onClick={() => { setProfileToBlock(c); setOpenMenuId(null); }} className="px-4 py-3 text-xs text-left text-red-400 hover:bg-[#c8aa6e]/10 flex items-center gap-2 border-t border-[#c8aa6e]/20">
                                  <i className="fa-solid fa-ban w-4"></i> Block
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {chatProfile && (
        <div className="flex-1 w-full flex flex-col font-ui z-20 animate-expandChat origin-center bg-[#000000]">
          <div className="w-full border-b p-4 flex items-center gap-4 bg-[#0a0a0a] border-zinc-900">
            <button onClick={() => setChatProfile(null)} className="p-2 border bg-[#000000] border-zinc-800 text-zinc-500 hover:text-white flex items-center justify-center">
              <i className="fa-solid fa-arrow-left text-[20px]"></i>
            </button>
            <div className="w-10 h-10 border p-0.5 bg-[#000000] border-zinc-800">
              <img src={chatProfile.avatar} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold font-gaming text-white">{chatProfile.gamertag}</h3>
              <p className="text-xs text-zinc-500">{chatProfile.game} • {chatProfile.rank}</p>
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-zinc-500">
            <i className="fa-solid fa-message text-[48px] mb-4 opacity-20"></i>
            <p>You connected with {chatProfile.gamertag}!</p>
            <p className="text-sm mt-2">Send them a message to start playing.</p>
          </div>
          <div className="p-4 border-t bg-[#0a0a0a] border-zinc-900">
            <div className="flex gap-2">
              <input type="text" placeholder="Type a message..." disabled className="flex-1 border p-3 text-sm opacity-50 cursor-not-allowed bg-[#000000] border-zinc-800 text-white" />
              <button disabled className="px-6 py-3 font-semibold text-sm cursor-not-allowed bg-zinc-800 text-zinc-500">Send</button>
            </div>
          </div>
        </div>
      )}

      {matchAnimation && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center overflow-hidden animate-containerFade">
          <div className="flex items-center justify-center w-full max-w-4xl px-4 gap-2 md:gap-8">
            <div className="flex flex-col items-center animate-slideLeft z-10">
              <div className="w-24 h-24 md:w-40 md:h-40 border-2 border-zinc-700 bg-black p-1 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative rounded-full">
                {avatar ? <img src={avatar} className="w-full h-full object-cover rounded-full" /> : <div className="w-full h-full flex items-center justify-center rounded-full bg-zinc-900"><i className="fa-solid fa-user text-[40px] md:text-[60px] text-zinc-500"></i></div>}
              </div>
            </div>

            <div className="relative flex items-center justify-center px-2 w-32 md:w-64 z-10 h-16">
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 md:gap-3 animate-waveFadeOut">
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <div 
                    key={i} 
                    className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full animate-wave" 
                    style={{ animationDelay: `${i * 0.12}s` }}
                  ></div>
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center animate-checkPop">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl md:text-4xl shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  <i className="fa-solid fa-check"></i>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center animate-slideRight z-10">
              <div className="w-24 h-24 md:w-40 md:h-40 border-2 border-zinc-700 bg-black p-1 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative rounded-full">
                <img src={matchAnimation.avatar} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'blocklist' && (
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col font-ui overflow-y-auto custom-scroll">
          <h1 className="font-gaming text-3xl font-bold mb-8 text-red-500 flex items-center gap-3">
            <i className="fa-solid fa-ban"></i> Blocked Users
          </h1>
          
          {blockedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-900 bg-[#050505]">
              <i className="fa-solid fa-shield-halved text-[48px] mb-4 opacity-20 text-zinc-500"></i>
              <p className="text-zinc-500 font-semibold">Your block list is empty.</p>
              <p className="text-sm text-zinc-600 mt-2">Users you block will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {blockedUsers.map(c => (
                <div key={`blocked-${c.id}`} className="flex items-center justify-between p-4 border border-zinc-900 bg-[#050505]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 border border-zinc-800 p-0.5 bg-black">
                      <img src={c.avatar} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white font-gaming text-lg">{c.gamertag}</h3>
                      <p className="text-xs text-zinc-500">{c.game} • {c.rank}</p>
                    </div>
                  </div>
                  <button onClick={() => handleUnblock(c.id)} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors border border-zinc-700 flex items-center gap-2">
                    <i className="fa-solid fa-unlock"></i> Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {profileToBlock && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#050505] border border-zinc-800 p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-expandChat">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
              <i className="fa-solid fa-triangle-exclamation text-red-500 text-3xl"></i>
            </div>
            <h2 className="text-white font-bold text-xl font-gaming mb-2">Block {profileToBlock.gamertag.split('#')[0]}?</h2>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
              They will be removed from your connections and you won&apos;t see them in the Meet tab anymore.
            </p>
            <div className="flex gap-4 w-full">
              <button onClick={() => setProfileToBlock(null)} className="flex-1 py-3 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-bold uppercase tracking-wider">
                Cancel
              </button>
              <button onClick={confirmBlock} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white transition-colors text-sm font-bold uppercase tracking-wider">
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col font-ui overflow-y-auto custom-scroll">
          <h1 className="font-gaming text-3xl font-bold mb-8 text-white">Settings</h1>

          <div className="mb-6 p-6 border bg-[#050505] border-zinc-900">
            <h2 className="text-xl font-bold mb-4 font-gaming text-white">Activity Status</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {STATUS_OPTIONS.map(s => (
                <button 
                  key={s.id}
                  onClick={() => setStatus(s.id)}
                  className={`p-4 border flex items-center justify-start gap-3 transition-colors ${status === s.id ? 'border-zinc-500 bg-[#0a0a0a]' : 'border-zinc-800'}`}
                >
                  <div className={`w-3.5 h-3.5 ${s.color}`}></div>
                  <span className={`font-semibold ${status === s.id ? 'text-white' : 'text-zinc-500'}`}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 p-6 border bg-[#050505] border-zinc-900">
            <h2 className="text-xl font-bold mb-4 font-gaming text-white">Preferences</h2>
            <div className="flex flex-col gap-4">
              <button onClick={() => togglePref('invites')} className="flex items-center gap-4 group">
                <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${prefs.invites ? 'text-white' : 'text-transparent border-zinc-800'} hover:border-zinc-500`}>
                  <i className="fa-solid fa-check text-[16px]"></i>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Allow Direct Invites</span>
                  <span className="text-xs text-zinc-500">Receive match requests from non-friends.</span>
                </div>
              </button>

              <button onClick={() => togglePref('publicRank')} className="flex items-center gap-4 group mt-2">
                <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${prefs.publicRank ? 'text-white' : 'text-transparent border-zinc-800'} hover:border-zinc-500`}>
                  <i className="fa-solid fa-check text-[16px]"></i>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Public Profile Status</span>
                  <span className="text-xs text-zinc-500">Show your rank and profile in the Meet tab.</span>
                </div>
              </button>

              <button onClick={() => togglePref('sounds')} className="flex items-center gap-4 group mt-2">
                <div className={`w-6 h-6 border flex items-center justify-center transition-colors ${prefs.sounds ? 'text-white' : 'text-transparent border-zinc-800'} hover:border-zinc-500`}>
                  <i className="fa-solid fa-check text-[16px]"></i>
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Enable App Sounds</span>
                  <span className="text-xs text-zinc-500">Play sounds for incoming messages and matches.</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}