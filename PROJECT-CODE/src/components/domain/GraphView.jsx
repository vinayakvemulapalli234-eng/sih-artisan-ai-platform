import React, { useState } from 'react';
import { Share2, Info, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';

/**
 * Living Craft Graph: GraphView Component
 * 
 * Hand-positioned SVG radial orbit diagram representing:
 * Center Node: Selected Craft/Product
 * Radial Orbit Nodes: Artisan, Technique, Material, Region, Cultural Story, Season, Preference, Market Trend
 * 
 * Completely isolated, static, lightweight, and responsive.
 * NO physics/force simulation library used.
 */
export function GraphView({
  centerEntity = {
    id: 'center-craft',
    type: 'Craft',
    label: 'Kalamkari Hand Painting',
    region: 'Andhra Pradesh',
    summary: 'Ancient natural dye and freehand pen tradition depicting temple folklore.',
  },
  connectedNodes = [
    { id: 'n1', type: 'Artisan', label: 'Govindappa V.', color: '#B5502E', details: 'Master craftsman with 32 years of ancestral lineage.' },
    { id: 'n2', type: 'Technique', label: 'Bamboo Reed Pen (Kalam)', color: '#7A6A3F', details: 'Sharp carved tamarind reed pen holding ink in felt wool.' },
    { id: 'n3', type: 'Material', label: 'Organic Khadi Cotton', color: '#2F5D50', details: 'Handspun cotton treated with buffalo milk and myrobalan.' },
    { id: 'n4', type: 'Material', label: 'Fermented Jaggery Dyes', color: '#2F5D50', details: 'Natural black ink created from rusted iron and sugar molasses.' },
    { id: 'n5', type: 'Region', label: 'Srikalahasti, AP', color: '#2E5F8A', details: 'Holy temple town along the banks of River Swarnamukhi.' },
    { id: 'n6', type: 'Cultural Story', label: 'Tree of Life (Kalpavriksha)', color: '#C08A1E', details: 'Mythological sacred tree uniting cosmos, earth, and underworld.' },
    { id: 'n7', type: 'Season', label: 'Autumn / Deepavali', color: '#3D7A4C', details: 'Peak festival production cycle and ceremonial gifts.' },
    { id: 'n8', type: 'Market Trend', label: 'Sustainable Home Decor (+42%)', color: '#B23A34', details: 'High urban demand for natural-dyed authentic wall art.' },
  ],
  onNodeSelect,
  className = '',
}) {
  const [activeNode, setActiveNode] = useState(connectedNodes[0]);

  const centerX = 300;
  const centerY = 300;
  const orbitRadius = 190;

  // Calculate coordinates for radial nodes evenly distributed in a circle
  const nodesWithPositions = connectedNodes.map((node, index) => {
    const angle = (index * 2 * Math.PI) / connectedNodes.length - Math.PI / 2;
    const x = centerX + orbitRadius * Math.cos(angle);
    const y = centerY + orbitRadius * Math.sin(angle);
    return { ...node, x, y, angle };
  });

  const handleSelect = (node) => {
    setActiveNode(node);
    onNodeSelect?.(node);
  };

  return (
    <div
      className={`flex flex-col lg:flex-row gap-6 items-center justify-between bg-surface border border-border rounded-lg p-4 sm:p-6 shadow-sm ${className}`}
    >
      {/* SVG Radial Diagram Canvas */}
      <div className="w-full max-w-[540px] aspect-square relative flex items-center justify-center">
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full select-none"
          aria-label="Living Craft Graph Radial Diagram"
        >
          {/* Subtle Orbit Guide Ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={orbitRadius}
            fill="none"
            stroke="#E4DCCF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Connection Lines from Center to Radial Nodes */}
          {nodesWithPositions.map((node) => {
            const isSelected = activeNode?.id === node.id;
            return (
              <line
                key={`line-${node.id}`}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                stroke={isSelected ? node.color : '#D7D2C7'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                strokeDasharray={isSelected ? 'none' : '2 2'}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Center Hub Node */}
          <g
            className="cursor-pointer group"
            onClick={() => setActiveNode(null)}
          >
            <circle
              cx={centerX}
              cy={centerY}
              r="62"
              fill="#B5502E"
              className="drop-shadow-md transition-transform group-hover:scale-105"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="68"
              fill="none"
              stroke="#B5502E"
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <text
              x={centerX}
              y={centerY - 10}
              textAnchor="middle"
              fill="#FFFFFF"
              className="font-heading font-bold text-[13px] pointer-events-none"
            >
              Craft Hub
            </text>
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              fill="#FFFFFF"
              className="font-sans font-medium text-[11px] pointer-events-none fill-neutral-100"
            >
              Kalamkari
            </text>
            <text
              x={centerX}
              y={centerY + 24}
              textAnchor="middle"
              fill="#FFFFFF"
              className="font-sans text-[9px] pointer-events-none fill-neutral-200"
            >
              Click to view all
            </text>
          </g>

          {/* Radial Orbit Nodes */}
          {nodesWithPositions.map((node) => {
            const isSelected = activeNode?.id === node.id;
            return (
              <g
                key={node.id}
                tabIndex={0}
                role="button"
                aria-label={`${node.type}: ${node.label}`}
                aria-pressed={isSelected}
                onClick={() => handleSelect(node)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(node);
                  }
                }}
                className="cursor-pointer focus-ring outline-none"
              >
                {/* Node Outer Halo for Selected State */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="34"
                    fill={node.color}
                    fillOpacity="0.15"
                    className="animate-pulse"
                  />
                )}

                {/* Node Main Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="26"
                  fill="#FFFFFF"
                  stroke={isSelected ? node.color : '#E4DCCF'}
                  strokeWidth={isSelected ? '3' : '2'}
                  className="shadow-sm transition-all hover:scale-110"
                />

                {/* Type Initial / Icon Indicator */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="10"
                  fill={node.color}
                />
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  className="font-sans font-bold text-[10px] pointer-events-none"
                >
                  {node.type[0]}
                </text>

                {/* Label text positioned around node */}
                <text
                  x={node.x}
                  y={node.y > centerY ? node.y + 40 : node.y - 34}
                  textAnchor="middle"
                  fill="#2B2420"
                  className={`text-[11px] font-medium pointer-events-none ${
                    isSelected ? 'font-bold fill-primary' : ''
                  }`}
                >
                  {node.label.length > 20 ? `${node.label.slice(0, 18)}...` : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Side Inspector / Relationship Details Panel */}
      <div className="w-full lg:w-80 flex flex-col justify-between bg-neutral-50 border border-border/80 rounded-lg p-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary">
              <Share2 className="w-4 h-4 text-primary" />
              Living Craft Graph Node
            </span>
            <span className="text-[11px] bg-neutral-200 text-text-primary px-2 py-0.5 rounded-pill font-mono">
              Active Relationship
            </span>
          </div>

          {activeNode ? (
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: activeNode.color }}
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {activeNode.type} Entity
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-text-primary leading-tight">
                {activeNode.label}
              </h3>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed bg-surface p-3 rounded-md border border-border/60">
                {activeNode.details}
              </p>

              <div className="text-xs text-text-secondary flex flex-col gap-1.5 mt-1">
                <div className="flex items-center justify-between">
                  <span>Graph Node ID:</span>
                  <span className="font-mono text-text-primary font-semibold">{activeNode.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Connected Root:</span>
                  <span className="text-primary font-semibold">Kalamkari Hand Painting</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <h3 className="font-heading text-base font-bold text-text-primary">
                {centerEntity.label}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {centerEntity.summary}
              </p>
              <p className="text-xs text-secondary mt-1">
                Select any connected satellite node in the orbit to explore how techniques, raw materials, stories, and regions intertwine.
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 mt-6 border-t border-border/70 flex flex-col gap-2">
          <p className="text-[11px] text-neutral-500 italic">
            "Artisan → Product → Craft → Technique → Material → Region → Story"
          </p>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between text-xs"
            onClick={() => alert(`Navigating into full graph cluster for ${activeNode ? activeNode.label : centerEntity.label}`)}
          >
            <span>Explore Related Crafts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
