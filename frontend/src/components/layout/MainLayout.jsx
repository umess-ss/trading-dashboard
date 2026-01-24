import OrderBook from "../dashboard/OrderBook";
import TradingChart from "../dashboard/TradingChart";
import TradingForm from "../dashboard/TradingForm";

export default function MainLayout({onLogout}) {
    return(
        <div className="h-screen w-full bg-[#0b0e11] text-white flex flex-col overflow-hidden">
            {/* top navigation bar */}
            <header className="h-14 border-b border-gray-800 flex items-center px-4 justify-between">
                <div className="flex gap-6 items-center">
                    <span className="font-bold text-xl text-yellow-500">X-TRADE</span>
                    <div className="flex flex-col">
                        <span className="text-sm font-mono text-green-400">7228732</span>
                        <span className="text-[-10px] text-green-400">NEPSE/RS</span>
                    </div>
                </div>
                <nav className="text-sm text-gray-400 flex gap-4 items-center">
                    <span>Wallet</span>
                    <span>Orders</span>
                    <button onClick={onLogout} 
                    className="ml-2 px-2 py-1 bg-red-900/30 text-red-500 rounded hover:bg-red-900/50 transition-colors">
                        Logout
                    </button>
                </nav>
            </header>

            {/* main dashboard area */}
            <main className="flex-1 grid grid-cols-12 gap-1 p-1 overflow-hidden">
                <div className="col-span-9 flex flex-col gap-1">
                    <div className="flex-1 bg-[#161a1e] rounded-sm">
                        <div className="p-4 text-gray-500">Main Chart Area</div>
                        <TradingChart />
                    </div>
                    <div className="h-1/3 bg-[#161a1e] rounded-sm">
                    <div className="p-4 text-gray-500">Position & Orders</div>
                    <OrderBook/>
                    </div>
                </div>

                {/* order book and trade form */}
                <div className="col-span-3 flex flex-col gap-1">
                    <div className="flex-1 bg-[#161a1e] rounded-sm">
                        {/* Buy sell form goes here */}
                        <TradingForm />
                        <div className="p-4 text-green-400">Trade Execution</div>
                    </div>
                </div>
            </main>

        </div>
    );
}