import React, { useMemo } from 'react';

const NODE_RADIUS = 25;
const LEVEL_HEIGHT = 80;

export default function TreeVisualizer({ root, highlightedNode, isDark }) {
    // Calculate coordinates for all nodes
    const nodesData = useMemo(() => {
        if (!root) return [];

        const nodes = [];
        const links = [];

        const calculatePositions = (node, depth, leftBound, rightBound) => {
            if (!node) return null;

            const x = (leftBound + rightBound) / 2;
            const y = (depth + 1) * LEVEL_HEIGHT;

            const currentNode = {
                id: node.id,
                value: node.value,
                x,
                y,
                isHighlighted: highlightedNode === node.value
            };

            nodes.push(currentNode);

            if (node.left) {
                const leftPos = calculatePositions(node.left, depth + 1, leftBound, x);
                if (leftPos) {
                    links.push({
                        id: `link-${node.id}-${node.left.id}`,
                        x1: x,
                        y1: y,
                        x2: leftPos.x,
                        y2: leftPos.y
                    });
                }
            }

            if (node.right) {
                const rightPos = calculatePositions(node.right, depth + 1, x, rightBound);
                if (rightPos) {
                    links.push({
                        id: `link-${node.id}-${node.right.id}`,
                        x1: x,
                        y1: y,
                        x2: rightPos.x,
                        y2: rightPos.y
                    });
                }
            }

            return currentNode;
        };

        // Width estimation based on height
        const height = root.height;
        const estimatedWidth = Math.max(800, Math.pow(2, height) * 60);

        calculatePositions(root, 0, 0, estimatedWidth);

        return { nodes, links, width: estimatedWidth, height: (height + 1) * LEVEL_HEIGHT + 50 };
    }, [root, highlightedNode]);

    if (!root) {
        return (
            <div className={`flex flex-col items-center justify-center h-64 italic transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Tree is empty. Insert a value to begin.
            </div>
        );
    }

    return (
        <div className={`w-full relative border rounded-3xl overflow-hidden transition-all duration-300 min-h-[400px] shadow-inner ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/50 border-slate-200'
            }`}>
            <div className="w-full h-full overflow-x-auto overflow-y-auto custom-scrollbar p-8">
                <svg
                    width={nodesData.width}
                    height={nodesData.height}
                    className="mx-auto"
                >
                    {/* Render Links First */}
                    <g>
                        {nodesData.links.map(link => (
                            <line
                                key={link.id}
                                x1={link.x1}
                                y1={link.y1}
                                x2={link.x2}
                                y2={link.y2}
                                stroke={isDark ? "#475569" : "#cbd5e1"}
                                strokeWidth="2"
                                className="tree-link"
                            />
                        ))}
                    </g>

                    {/* Render Nodes */}
                    <g>
                        {nodesData.nodes.map(node => (
                            <g key={node.id} className="tree-node">
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={NODE_RADIUS}
                                    fill={node.isHighlighted ? '#f59e0b' : '#3b82f6'}
                                    className={`transition-all duration-500 cursor-pointer hover:stroke-white hover:stroke-2 ${node.isHighlighted ? 'animate-pulse' : ''}`}
                                />
                                <text
                                    x={node.x}
                                    y={node.y}
                                    textAnchor="middle"
                                    dy=".35em"
                                    fill="white"
                                    className="text-sm font-bold pointer-events-none"
                                >
                                    {node.value}
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            {/* Overlay */}
            <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-xs border transition-colors pointer-events-none ${isDark ? 'bg-slate-800/80 border-slate-700 text-slate-400' : 'bg-white/80 border-slate-200 text-slate-500 shadow-sm'
                }`}>
                Auto-scaling Workspace
            </div>
        </div>
    );
}
