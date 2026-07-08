'use client';

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-x-6 mb-10">
        <div className="w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-zinc-800">
          <img src="https://picsum.photos/id/1005/96/96" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-5xl font-black">Mike "Digger" Torres</h1>
          <div className="text-emerald-400 text-xl">Pro Operator • 142,891 followers</div>
          <div className="text-sm text-zinc-400 mt-1">87 videos • 14.2M total views</div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
        <h3 className="font-bold text-xl mb-2">Your Earnings (Demo)</h3>
        <div className="text-7xl font-black text-orange-400 tracking-tighter">$4,872</div>
        <div className="text-sm text-zinc-400">This month from ad revenue share + tips</div>

        <button className="mt-8 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-extrabold text-lg">
          Withdraw to Bank Account
        </button>
      </div>
    </div>
  );
}
