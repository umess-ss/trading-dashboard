export default function MainLayout() {
    return(
        <div className="h-screen w-full bg-[#0b0e11] text-white flex flex-col overflow-hidden">
            {/* top navigation bar */}
            <header className="h-14 border-b border-gray-800 flex items-center px-4 justify-between">
                <div className="flex gap-6 items-center">
                    <span className="font-bold text-xl text-yellow-500">X-TRADE</span>
                    <div className="flex flex-col">
                        <span className="text-sm font-mono text-green-400">$42,30</span>
                        <span className="text-[-10px] text-green-400">BTC/USDT</span>
                    </div>
                </div>
                <nav className="text-sm text-gray-400 flex gap-4">
                    <span>Wallet</span>
                    <span>Orders</span>
                </nav>
            </header>

            {/* main dashboard area */}
            <main className="flex-1 grid grid-cols-12 gap-1 p-1 overflow-hidden">
                <div className="col-span-9 flex flex-col gap-1">
                    <div className="flex-1 bg-[#161a1e] rounded-sm">
                        <div className="p-4 text-gray-500">Main Chart Area</div>
                    </div>
                    <div className="h-1/3 bg-[#161a1e] rounded-sm">
                    <div className="p-4 text-gray-500">Position & Orders</div>
                    </div>
                </div>

                {/* order book and trade form */}
                <div className="col-span-3 flex flex-col gap-1">
                    <div className="flex-1 bg-[#161a1e] rounded-sm">
                        {/* Buy sell form goes here */}
                        <div className="p-4 text-green-400">Trade Execution</div>
                    </div>
                </div>
            </main>

        </div>
    );
}