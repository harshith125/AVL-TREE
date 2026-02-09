import React, { useState } from 'react';
import { Plus, Trash2, Search, ArrowRight, RefreshCw } from 'lucide-react';

export default function Controls({ onInsert, onDelete, onSearch, onInsertBatch, onReset, isDark }) {
    const [val, setVal] = useState('');
    const [batch, setBatch] = useState('');

    const handleInsert = (e) => {
        e.preventDefault();
        if (val !== '') {
            onInsert(parseInt(val));
            setVal('');
        }
    };

    const handleDelete = () => {
        if (val !== '') {
            onDelete(parseInt(val));
            setVal('');
        }
    };

    const handleSearch = () => {
        if (val !== '') {
            onSearch(parseInt(val));
        }
    };

    const handleBatchInsert = (e) => {
        e.preventDefault();
        const numbers = batch.split(/[\s,]+/).map(n => parseInt(n)).filter(n => !isNaN(n));
        if (numbers.length > 0) {
            onInsertBatch(numbers);
            setBatch('');
        }
    };

    const inputClasses = `w-full transition-all outline-none rounded-xl px-4 h-12 border ${isDark
        ? 'bg-slate-900 border-slate-700 text-white focus:ring-blue-500/50'
        : 'bg-white border-slate-200 text-slate-900 focus:ring-blue-500/20 shadow-sm'
        } focus:ring-2`;

    const buttonBase = "h-12 flex items-center justify-center rounded-xl transition-all active:scale-95 shadow-sm shrink-0 border";

    const labelClasses = `text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'
        } block mb-2 px-1`;

    return (
        <div className={`w-full max-w-4xl mx-auto p-6 md:p-10 rounded-[2.5rem] border transition-all duration-500 shadow-2xl ${isDark
            ? 'bg-slate-800/10 backdrop-blur-2xl border-white/5'
            : 'bg-white border-slate-200'
            }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Single Operation */}
                <div className="lg:col-span-7 space-y-1">
                    <label className={labelClasses}>Node Operations</label>
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                        <div className="relative flex-1 min-w-[140px]">
                            <input
                                type="number"
                                value={val}
                                onChange={(e) => setVal(e.target.value)}
                                placeholder="Value..."
                                className={inputClasses}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleInsert}
                                className={`${buttonBase} px-4 gap-2 bg-blue-600 hover:bg-blue-500 text-white border-blue-400/50 shadow-lg shadow-blue-900/20`}
                                title="Insert Node"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="text-xs font-black tracking-widest">ADD</span>
                            </button>
                            <button
                                onClick={handleDelete}
                                className={`${buttonBase} w-12 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border-red-500/20 hover:border-red-500 active:bg-red-700`}
                                title="Delete Node"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleSearch}
                                className={`${buttonBase} w-12 ${isDark ? 'bg-slate-700/30 hover:bg-slate-700 text-slate-400 hover:text-white border-slate-700/50' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'}`}
                                title="Search Node"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Batch Operation */}
                <div className="lg:col-span-5 space-y-1">
                    <label className={labelClasses}>Bulk Import</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={batch}
                            onChange={(e) => setBatch(e.target.value)}
                            placeholder="1, 2, 3..."
                            className={inputClasses}
                        />
                        <button
                            onClick={handleBatchInsert}
                            className={`${buttonBase} px-4 gap-2 bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/50 shadow-lg shadow-indigo-900/20`}
                            title="Batch Insert"
                        >
                            <ArrowRight className="w-4 h-4" />
                            <span className="text-xs font-black tracking-widest">BATCH</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`flex flex-col sm:flex-row justify-between items-center gap-6 border-t mt-12 pt-8 transition-colors ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <button
                    onClick={onReset}
                    className={`flex items-center gap-2.5 transition-all px-6 py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] ${isDark ? 'text-slate-500 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 shadow-sm'}`}
                >
                    <RefreshCw className="w-4 h-4" /> RESET WORKSPACE
                </button>
                <div className={`text-[9px] font-black tracking-[0.3em] px-6 py-2.5 rounded-full border shadow-inner ${isDark ? 'bg-black/20 border-white/5 text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-400 uppercase'}`}>
                    Real-time Optimization Active
                </div>
            </div>
        </div>
    );
}
