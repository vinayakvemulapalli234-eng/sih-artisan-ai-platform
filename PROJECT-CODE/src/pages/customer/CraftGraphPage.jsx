import React, { useState } from 'react';
import { Network, Sparkles, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { GraphView } from '../../components/domain/GraphView';
import { Tag } from '../../components/primitives/Tag';
import { Card } from '../../components/primitives/Card';
import { Button } from '../../components/primitives/Button';

/**
 * Customer: CraftGraphPage
 * Dedicated showcase screen for the Living Craft Graph SVG Radial Diagram
 */
export function CraftGraphPage({ onNavigate }) {
  const craftPresets = {
    kalamkari: {
      centerEntity: {
        id: 'craft-kalamkari',
        type: 'Craft Tradition',
        label: 'Kalamkari Hand Painting',
        region: 'Srikalahasti, Andhra Pradesh',
        summary: 'A 3,000-year-old art form where temple narratives and cosmic epics are rendered by freehand bamboo pens using organic, mineral, and vegetable dyes.',
      },
      connectedNodes: [
        { id: 'art-1', type: 'Artisan', label: 'Govindappa V. (Master)', color: '#B5502E', details: '4th generation master artisan holding state cultural heritage honors.' },
        { id: 'tech-1', type: 'Technique', label: 'Bamboo Reed Pen (Kalam)', color: '#7A6A3F', details: 'Hand-carved tamarind reed pen wound with wool to control organic dye flow.' },
        { id: 'tech-2', type: 'Technique', label: 'Natural Mordant Dyeing', color: '#7A6A3F', details: 'Buffalo milk treatment preventing ink bleed, fixed with alum baths.' },
        { id: 'mat-1', type: 'Material', label: 'Organic Khadi Cotton', color: '#2F5D50', details: 'Unbleached handloom cotton washed in the Swarnamukhi river.' },
        { id: 'mat-2', type: 'Material', label: 'Vegetable & Iron Inks', color: '#2F5D50', details: 'Fermented molasses, crushed madder roots, and pomegranate peels.' },
        { id: 'reg-1', type: 'Region', label: 'Srikalahasti, Andhra Pradesh', color: '#2E5F8A', details: 'Sacred river delta providing mineral-rich clay and alkaline water.' },
        { id: 'story-1', type: 'Cultural Story', label: 'Kalpavriksha (Tree of Life)', color: '#C08A1E', details: 'Ancient folklore narrative representing cosmic shelter and eternal renewal.' },
        { id: 'season-1', type: 'Season', label: 'Autumn / Festival Cycle', color: '#3D7A4C', details: 'Peak post-monsoon river clarity optimal for 17-stage washing cycle.' },
      ],
    },
    bluepottery: {
      centerEntity: {
        id: 'craft-bluepottery',
        type: 'Craft Tradition',
        label: 'Jaipur Blue Pottery',
        region: 'Jaipur, Rajasthan',
        summary: 'Rare Persian-origin ceramic craft made entirely without clay, utilizing ground quartz stone, glass, and natural copper oxide glazes.',
      },
      connectedNodes: [
        { id: 'art-2', type: 'Artisan', label: 'Kripal Singh Kripal', color: '#B5502E', details: 'Descendant of revivalist master potters in Amber and Jaipur.' },
        { id: 'tech-3', type: 'Technique', label: 'Low-Fire Moulding & Glazing', color: '#7A6A3F', details: 'Cast in open wood kilns at 800°C to preserve turquoise hues.' },
        { id: 'mat-3', type: 'Material', label: 'Quartz Stone Powder', color: '#2F5D50', details: 'Crushed raw quartz stone combined with Fuller’s earth and natural gum.' },
        { id: 'mat-4', type: 'Material', label: 'Copper Oxide Pigment', color: '#2F5D50', details: 'Mineral pigment generating vivid turquoise and royal cobalt blue.' },
        { id: 'reg-2', type: 'Region', label: 'Jaipur, Rajasthan', color: '#2E5F8A', details: 'Desert climate providing dry atmospheric conditions for glaze curing.' },
        { id: 'story-2', type: 'Cultural Story', label: 'Turko-Persian Royal Courts', color: '#C08A1E', details: 'Brought by Sawai Ram Singh II after witnessing Delhi pottery exhibitions.' },
        { id: 'trend-2', type: 'Market Trend', label: 'Luxury Tableware (+38%)', color: '#B23A34', details: 'Rising international appreciation for lead-free artisan ceramics.' },
        { id: 'pref-2', type: 'Preference', label: 'Ceramic Collectors', color: '#3D7A4C', details: 'High repeat acquisition by cultural heritage enthusiasts.' },
      ],
    },
  };

  const [selectedKey, setSelectedKey] = useState('kalamkari');
  const currentPreset = craftPresets[selectedKey];

  return (
    <PageContainer>
      <SectionHeader
        title="Living Craft Graph Showcase"
        subtitle="Explore the multi-layered knowledge graph linking traditional artisans, techniques, raw materials, geography, and ancestral narratives."
        tag={
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/15 px-2.5 py-0.5 rounded-pill">
            <Sparkles className="w-3.5 h-3.5" />
            Core Innovation
          </span>
        }
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate?.('explore')}
          >
            Back to Explore
          </Button>
        }
      />

      {/* Preset Selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Select Craft Knowledge Hub:
        </span>
        <div className="flex gap-2">
          <Button
            variant={selectedKey === 'kalamkari' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedKey('kalamkari')}
          >
            Kalamkari (Andhra Pradesh)
          </Button>
          <Button
            variant={selectedKey === 'bluepottery' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedKey('bluepottery')}
          >
            Blue Pottery (Rajasthan)
          </Button>
        </div>
      </div>

      {/* Radial Graph Showcase Container */}
      <div className="mb-10">
        <GraphView
          centerEntity={currentPreset.centerEntity}
          connectedNodes={currentPreset.connectedNodes}
        />
      </div>

      {/* Relationship Sequence Documentation */}
      <Card variant="flat" padding="lg" className="bg-surface border-border">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          The Living Craft Graph Hierarchy
        </h3>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          Unlike ordinary e-commerce taxonomies, every handcrafted item is an active node connecting ten ontological dimensions:
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-text-primary bg-background p-4 rounded-md border border-border">
          <Tag variant="craft">Artisan</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="craft">Product</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="craft">Craft Tradition</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="technique">Technique</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="material">Material</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="region">Region</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="default">Cultural Story</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="default">Season</Tag>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Tag variant="default">Market Trend</Tag>
        </div>
      </Card>
    </PageContainer>
  );
}
