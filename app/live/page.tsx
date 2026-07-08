'use client';

import Link from 'next/link';

export default function LivePage() {
  const liveStreams = [
    { id: 101, title: "LIVE: JCB 3CX Digging 12ft Deep Basement", uploader: "LiveFromSite", viewers: 14200, location: "Manchester, UK" },
    { id: 102, title: "LIVE: 220X Loading Articulated Dump Trucks", uploader: "QuarryLife", viewers: 8700, location: "Texas, USA" }
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12">
      <h1 className="text-6xl font-black mb-4">Live Streams</h1>
      <p className="text-xl text-zinc-400 mb-10">Real-time JCB action from job sites around the world.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {liveStreams.map(stream => (
          <div key={stream.id} className="bg-zinc-900 border border-zinc-700 rounded-3xl p-6">
            <div className="flex justify-between">
              <div>
                <div className="px-3 py-1 bg-red-500 text-xs font-black inline-block rounded-2xl mb-4">LIVE</div>
                <h3 className="font-bold text-2xl mb-2">{stream.title}</h3>
              </div>
            </div>
            <div className="text-sm text-zinc-400 mb-6">{stream.uploader} • {stream.location}</div>
            <div className="text-emerald-400 font-mono text-lg mb-6">{(stream.viewers / 1000).toFixed(1)}k watching</div>
            
            <Link href="/" className="block w-full text-center py-4 bg-orange-500 rounded-2xl font-bold">
              Watch Live Stream
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
