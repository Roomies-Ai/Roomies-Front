import { Coins } from 'lucide-react';
import type { PointsSelectorProps } from './AddTaskModal.types';

const PointsSelector = ({ points, setPoints }: PointsSelectorProps) => (
    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-[1.5rem] border-2 border-transparent">
        <div className="flex items-center gap-3 ml-1">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-600 flex items-center justify-center">
                <Coins size={20} />
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points Reward</p>
                <p className="text-xs font-bold text-slate-900">Value for completing</p>
            </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <button onClick={() => setPoints(Math.max(1, points - 1))} className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center font-black hover:bg-slate-100">-</button>
            <input type="number" value={points} onChange={(e) => setPoints(Math.max(0, parseInt(e.target.value) || 0))} className="font-black text-slate-900 w-12 text-center bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            <button onClick={() => setPoints(points + 1)} className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black hover:bg-slate-800">+</button>
        </div>
    </div>
);

export default PointsSelector;
