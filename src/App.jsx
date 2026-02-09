import React, { useState, useCallback, useReducer } from 'react';
import { AVLTree } from './logic/avl';
import Controls from './components/Controls';
import TreeVisualizer from './components/TreeVisualizer';
import { Github, Info, RefreshCw, Sun, Moon } from 'lucide-react';

export default function App() {
    const [tree, setTree] = useState(new AVLTree());
    const [highlighted, setHighlighted] = useState(null);
    const [message, setMessage] = useState('Welcome to AVL Visualizer');
    const [isDark, setIsDark] = useState(true);

    // Force re-render as AVLTree is modified in-place or we need new instance
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const updateTree = useCallback(() => {
        setTree(Object.assign(Object.create(Object.getPrototypeOf(tree)), tree));
        forceUpdate();
    }, [tree]);

    const handleInsert = (val) => {
        if (tree.search(val)) {
            setMessage(`Value ${val} already exists!`);
            return;
        }
        tree.insert(val);
        setMessage(`Inserted ${val}`);
        updateTree();
        setHighlighted(val);
        setTimeout(() => setHighlighted(null), 2000);
    };

    const handleDelete = (val) => {
        if (!tree.search(val)) {
            setMessage(`Value ${val} not found!`);
            return;
        }
        tree.delete(val);
        setMessage(`Deleted ${val}`);
        updateTree();
    };

    const handleSearch = (val) => {
        const found = tree.search(val);
        if (found) {
            setMessage(`Value ${val} found!`);
            setHighlighted(val);
            setTimeout(() => setHighlighted(null), 3000);
        } else {
            setMessage(`Value ${val} not found!`);
            setHighlighted(null);
        }
    };

    const handleInsertBatch = (numbers) => {
        numbers.forEach(n => {
            if (!tree.search(n)) {
                tree.insert(n);
            }
        });
        setMessage(`Inserted ${numbers.length} elements`);
        updateTree();
    };

    const handleReset = () => {
        setTree(new AVLTree());
        setMessage('Tree reset');
        setHighlighted(null);
        forceUpdate();
    };

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-900'} selection:bg-blue-500/30`}>
            {/* Navbar */}
            <nav className={`border-b transition-colors duration-300 ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/70'} backdrop-blur-xl sticky top-0 z-50`}>
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <RefreshCw className="w-6 h-6 text-white animate-spin-slow" />
                        </div>
                        <div>
                            <h1 className={`text-xl font-bold transition-colors ${isDark ? 'bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
                                AVL Tree
                            </h1>
                            <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Visualization Engine</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-xl border transition-all ${isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-amber-400' : 'bg-white hover:bg-slate-100 border-slate-200 text-blue-600 shadow-sm'}`}
                            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-16 md:space-y-24">
                {/* Hero Section */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                            Visualization Engine v1.0
                        </span>
                    </div>
                    <h2 className={`text-5xl md:text-7xl font-black tracking-tight leading-[1.1] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        AVL Tree <br />
                        <span className="text-blue-600 drop-shadow-[0_0_30px_rgba(37,99,235,0.2)]">Auto-Balance</span>
                    </h2>
                    <p className={`text-lg md:text-xl font-medium leading-relaxed transition-colors ${isDark ? 'text-slate-400/80' : 'text-slate-500'}`}>
                        Watch rotations happen in real-time as the algorithm maintains
                        perfect equilibrium for logarithmic search performance.
                    </p>
                </div>

                {/* Controls */}
                <Controls
                    onInsert={handleInsert}
                    onDelete={handleDelete}
                    onSearch={handleSearch}
                    onInsertBatch={handleInsertBatch}
                    onReset={handleReset}
                    isDark={isDark}
                />

                {/* Feedback Message */}
                <div className="flex justify-center -translate-y-4">
                    <div className={`px-8 py-3 rounded-2xl border-2 transition-all duration-500 shadow-xl ${message.includes('not found') || message.includes('already')
                        ? 'bg-red-500/10 border-red-500/20 text-red-400 shadow-red-900/10'
                        : 'bg-green-500/10 border-green-500/30 text-green-400 shadow-green-900/10'
                        }`}>
                        <span className="flex items-center gap-3 text-sm font-bold tracking-wide">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${message.includes('not found') || message.includes('already') ? 'bg-red-500' : 'bg-green-500'}`} />
                            {message.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Visualization area */}
                <div className="space-y-6">
                    <div className="flex items-end justify-between px-4">
                        <div>
                            <h3 className={`text-2xl font-black tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Workspace
                            </h3>
                            <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.2em] mt-1">Live Logic Graph</p>
                        </div>
                        <div className="flex gap-4 text-[10px] font-bold tracking-widest text-slate-500 pb-1">
                            <div className="flex items-center gap-2 uppercase"><div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div> Node</div>
                            <div className="flex items-center gap-2 uppercase"><div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div> Active</div>
                        </div>
                    </div>
                    <TreeVisualizer root={tree.root} highlightedNode={highlighted} isDark={isDark} />
                </div>

                {/* Mobile Scrolling Tip */}
                <div className={`md:hidden p-4 rounded-xl border transition-colors text-xs flex items-start gap-3 ${isDark ? 'bg-slate-800/30 border-slate-700/50 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'}`}>
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <p>The tree will automatically scale. If it becomes too large, you can scroll horizontally within the visualization box.</p>
                </div>
            </main>

            <footer className={`border-t py-12 mt-12 overflow-hidden relative transition-colors ${isDark ? 'border-slate-800' : 'border-slate-200 bg-slate-100/50'}`}>
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                    <div className="text-slate-500 text-sm">
                        Built for AVL Tree Visualization Complexity
                    </div>
                    <div className="flex gap-6 text-slate-400">
                        <a href="#" className="hover:text-blue-500 transition-colors"><Github className="w-5 h-5" /></a>
                    </div>
                </div>
                {/* Glow Effects */}
                {isDark && (
                    <>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full"></div>
                    </>
                )}
            </footer>
        </div>
    );
}
