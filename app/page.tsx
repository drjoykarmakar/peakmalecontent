'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Upload, Heart, Users, Eye } from 'lucide-react';

// Types
interface Video {
  id: number;
  title: string;
  uploader: string;
  views: string;
  time: string;
  category: string;
  thumbnail: string;
  youtubeId?: string;
  duration: string;
  likes: number;
  description: string;
  comments: { user: string; text: string }[];
}

interface LiveStream {
  id: number;
  title: string;
  uploader: string;
  viewers: number;
  location: string;
  thumbnail: string;
  youtubeId?: string;
}

// Sample Data
const initialVideos: Video[] = [
  {
    id: 1,
    title: "JCB 220X Excavator Digging Massive Foundation - Insane Power",
    uploader: "DigMaster42",
    views: "892k",
    time: "3d ago",
    category: "Excavation",
    thumbnail: "https://picsum.photos/id/1016/400/225",
    youtubeId: "JXTfPlPFfTc",
    duration: "18:42",
    likes: 124800,
    description: "The new JCB NXT 225LC in action on a huge commercial foundation job.",
    comments: [
      { user: "SiteKing88", text: "This is actual peak male content. The sound of that engine..." }
    ]
  },
  {
    id: 2,
    title: "JCB 3CX Backhoe Perfect Loading - Dump Truck Masterclass",
    uploader: "YellowIronFan",
    views: "1.4M",
    time: "1w ago",
    category: "Backhoe",
    thumbnail: "https://picsum.photos/id/160/400/225",
    youtubeId: "y6e3mHBpV2A",
    duration: "9:17",
    likes: 287300,
    description: "Cleanest loading I've seen in months. This operator makes it look effortless.",
    comments: []
  }
];

const initialLiveStreams: LiveStream[] = [
  {
    id: 101,
    title: "LIVE: JCB 3CX Digging 12ft Deep Basement in Clay",
    uploader: "LiveFromSite",
    viewers: 14200,
    location: "Manchester, UK",
    thumbnail: "https://picsum.photos/id/160/400/225",
    youtubeId: "HXeD7mLEpSs"
  },
  {
    id: 102,
    title: "LIVE: 220X Loading Articulated Dump Trucks Non-Stop",
    uploader: "QuarryLife",
    viewers: 8700,
    location: "Texas, USA",
    thumbnail: "https://picsum.photos/id/1016/400/225",
    youtubeId: "JXTfPlPFfTc"
  }
];

export default function PeakMaleContent() {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [liveStreams] = useState<LiveStream[]>(initialLiveStreams);
  const [currentFilter, setCurrentFilter] = useState<'all' | string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | LiveStream | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [uploadTitle, setUploadTitle] = useState("My Best JCB Dig of 2026");

  const filteredVideos = currentFilter === 'all' 
    ? videos 
    : videos.filter(v => v.category === currentFilter);

  const openVideo = (video: Video | LiveStream, live: boolean = false) => {
    setSelectedVideo(video);
    setIsLive(live);
    setComments((video as Video).comments || []);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsLive(false);
    setComments([]);
  };

  const likeVideo = () => {
    if (!selectedVideo || isLive) return;
    
    const updatedVideos = videos.map(v => 
      v.id === (selectedVideo as Video).id 
        ? { ...v, likes: v.likes + 1240 } 
        : v
    );
    setVideos(updatedVideos);
    
    // Update selected video
    const updatedSelected = { ...(selectedVideo as Video), likes: (selectedVideo as Video).likes + 1240 };
    setSelectedVideo(updatedSelected);
  };

  const postComment = () => {
    if (!newComment.trim() || !selectedVideo) return;

    const comment = { user: "MikeDigger", text: newComment.trim() };
    const newComments = [comment, ...comments];
    setComments(newComments);

    // Update video comments
    if (!isLive) {
      const updatedVideos = videos.map(v => 
        v.id === (selectedVideo as Video).id 
          ? { ...v, comments: newComments } 
          : v
      );
      setVideos(updatedVideos);
    }

    setNewComment('');
  };

  const handleUpload = () => {
    const newVideo: Video = {
      id: Date.now(),
      title: uploadTitle,
      uploader: "MikeDigger",
      views: "1.2k",
      time: "just now",
      category: "Excavation",
      thumbnail: "https://picsum.photos/id/160/400/225",
      duration: "—",
      likes: 1240,
      description: "Fresh upload from the community",
      comments: []
    };

    setVideos([newVideo, ...videos]);
    setShowUploadModal(false);
    setUploadTitle("My Best JCB Dig of 2026");

    // Auto open the new video
    setTimeout(() => {
      openVideo(newVideo, false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Navbar */}
      <nav className="bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-3xl">🚜</span>
              </div>
              <div>
                <span className="logo-font text-[27px] font-black tracking-[-1.5px]">PEAK MALE</span>
                <span className="logo-font text-[27px] font-black tracking-[-1.5px] text-orange-500">CONTENT</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-x-2 text-sm font-medium">
              <Link href="#discover" className="px-4 py-2 hover:bg-zinc-800 rounded-2xl transition-colors">Discover</Link>
              <Link href="/live" className="px-4 py-2 hover:bg-zinc-800 rounded-2xl transition-colors">Live</Link>
              <Link href="/upload" className="px-4 py-2 hover:bg-zinc-800 rounded-2xl transition-colors">Upload</Link>
              <Link href="/profile" className="px-4 py-2 hover:bg-zinc-800 rounded-2xl transition-colors">Profile</Link>
            </div>

            <div className="flex items-center gap-x-3">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-x-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-3xl text-sm font-bold"
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
              <Link href="/profile" className="flex items-center gap-x-2 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-3xl">
                <div className="w-8 h-8 rounded-2xl overflow-hidden">
                  <img src="https://picsum.photos/id/1005/32/32" className="w-full h-full object-cover" />
                </div>
                <span className="hidden sm:block text-sm font-semibold">Mike Digger</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-[620px] flex items-center justify-center machine-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1018/2000/1200')] bg-cover bg-center opacity-35"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/70 to-zinc-950"></div>
        
        <div className="relative text-center px-6">
          <div className="inline-flex items-center gap-x-2 px-4 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-3xl mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>18,742 watching right now</span>
          </div>
          
          <h1 className="text-7xl md:text-[86px] font-black tracking-[-4.5px] mb-4">
            PEAK MALE<br />CONTENT
          </h1>
          <p className="text-2xl text-zinc-300 mb-8 max-w-md mx-auto">The home of heavy machinery.<br />The most satisfying videos on earth.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/live" className="flex items-center justify-center gap-x-3 px-10 py-4 bg-white text-zinc-950 font-extrabold text-lg rounded-3xl">
              <Play className="w-5 h-5" /> WATCH LIVE
            </Link>
            <button onClick={() => setShowUploadModal(true)} className="flex items-center justify-center gap-x-3 px-10 py-4 bg-zinc-800 border border-zinc-600 font-bold text-lg rounded-3xl">
              <Upload className="w-5 h-5" /> UPLOAD YOUR WORK
            </button>
          </div>
        </div>
      </div>

      {/* Live Streams */}
      <div className="max-w-screen-2xl mx-auto px-6 pt-10">
        <div className="flex justify-between items-end mb-6">
          <div className="flex items-center gap-x-3">
            <div className="px-4 py-1.5 bg-red-500 text-xs font-black tracking-widest rounded-3xl flex items-center gap-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE RIGHT NOW
            </div>
            <h2 className="section-header">Live from the sites</h2>
          </div>
          <Link href="/live" className="text-orange-400 font-semibold">VIEW ALL →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {liveStreams.map(stream => (
            <div key={stream.id} onClick={() => openVideo(stream, true)} className="video-card bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden cursor-pointer group">
              <div className="relative aspect-video">
                <img src={stream.thumbnail} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-black rounded-2xl flex items-center gap-x-1.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
                <div className="absolute top-3 right-3 bg-black/70 px-2.5 py-1 rounded-2xl text-xs flex items-center gap-x-1">
                  <Eye className="w-3 h-3" /> {(stream.viewers / 1000).toFixed(1)}k
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold mb-1.5">{stream.title}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-400 font-semibold">{stream.uploader}</span>
                  <span className="text-zinc-500">{stream.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discover */}
      <div id="discover" className="max-w-screen-2xl mx-auto px-6 pt-10 pb-16">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="section-header">Community Uploads</h2>
            <p className="text-zinc-400">The most satisfying JCB content on the planet</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'Excavation', 'Backhoe', 'Tracked'].map(cat => (
            <button
              key={cat}
              onClick={() => setCurrentFilter(cat as any)}
              className={`category-pill px-5 py-1.5 text-sm font-semibold border border-zinc-700 rounded-3xl transition-all ${currentFilter === cat ? 'active border-orange-500' : ''}`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredVideos.map(video => (
            <div key={video.id} onClick={() => openVideo(video)} className="video-card bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden cursor-pointer group">
              <div className="relative aspect-video">
                <img src={video.thumbnail} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 px-2 py-px bg-black/80 text-white text-xs font-mono rounded">{video.duration}</div>
              </div>
              <div className="p-3.5">
                <div className="font-bold text-sm line-clamp-2 mb-2 group-hover:text-orange-400">{video.title}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-orange-400 font-semibold">{video.uploader}</span>
                  <span className="text-zinc-400">{video.views} • {video.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" onClick={closeVideo}>
          <div className="bg-zinc-900 w-full max-w-6xl rounded-3xl overflow-hidden border border-zinc-700" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-zinc-700 flex justify-between items-center bg-zinc-950">
              <div>
                <h3 className="font-extrabold text-2xl">{selectedVideo.title}</h3>
                <div className="text-sm text-orange-400 font-bold mt-1">{selectedVideo.uploader}</div>
              </div>
              <button onClick={closeVideo} className="text-3xl text-zinc-400 hover:text-white">×</button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Player */}
              <div className="lg:w-2/3 bg-black aspect-video">
                {selectedVideo.youtubeId ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} 
                    className="w-full h-full" 
                    allowFullScreen 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-400">Video would play here</div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 border-l border-zinc-700 p-6 flex flex-col">
                <button onClick={likeVideo} disabled={isLive} className="flex items-center gap-x-2 mb-6 px-5 py-3 border border-zinc-700 rounded-2xl w-fit">
                  <Heart className="text-red-400" /> 
                  <span className="font-bold">{'likes' in selectedVideo ? (selectedVideo.likes / 1000).toFixed(1) + 'k' : 'LIVE'}</span>
                </button>

                <div className="text-sm text-zinc-300 mb-6">
                  {'description' in selectedVideo ? selectedVideo.description : "Live from the job site"}
                </div>

                {/* Comments */}
                <div className="flex-1">
                  <div className="font-bold mb-3">COMMENTS</div>
                  <div className="space-y-4 text-sm max-h-64 overflow-auto pr-2">
                    {comments.length > 0 ? comments.map((c, i) => (
                      <div key={i} className="flex gap-x-3">
                        <div className="w-8 h-8 bg-zinc-700 rounded-2xl flex-shrink-0"><img src="https://picsum.photos/id/1005/32/32" /></div>
                        <div>
                          <div className="font-bold text-sm">{c.user}</div>
                          <div>{c.text}</div>
                        </div>
                      </div>
                    )) : <div className="text-zinc-500">Be the first to comment</div>}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <div className="flex gap-2">
                    <input 
                      value={newComment} 
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && postComment()}
                      placeholder="Drop a comment..." 
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-sm" 
                    />
                    <button onClick={postComment} className="px-6 bg-orange-500 rounded-2xl font-bold">POST</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center p-4" onClick={() => setShowUploadModal(false)}>
          <div className="bg-zinc-900 w-full max-w-lg rounded-3xl p-8" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-extrabold mb-6">Upload Your JCB Content</h2>
            
            <input 
              type="text" 
              value={uploadTitle} 
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 mb-4" 
            />
            
            <div className="border-2 border-dashed border-zinc-600 rounded-3xl p-10 text-center mb-6">
              <Upload className="mx-auto text-orange-400 mb-3" size={48} />
              <div className="font-bold">Drop video or click to upload</div>
            </div>

            <button onClick={handleUpload} className="w-full py-4 bg-orange-500 hover:bg-orange-600 font-extrabold rounded-2xl text-lg">
              UPLOAD TO PEAK MALE CONTENT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
