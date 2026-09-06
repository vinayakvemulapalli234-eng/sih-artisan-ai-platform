import React, { useState } from 'react';
import { PlusCircle, Network, Layers, Edit } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { Table } from '../../components/primitives/Table';
import { Badge } from '../../components/primitives/Badge';
import { Button } from '../../components/primitives/Button';
import { Modal } from '../../components/primitives/Modal';
import { FormField } from '../../components/primitives/FormField';
import { Input } from '../../components/primitives/Input';
import { Select } from '../../components/primitives/Select';
import { useToast } from '../../hooks/useToast';

/**
 * Admin Dashboard: AdminCraftsPage
 * Living Craft Graph ontology management, craft traditions, and material nodes
 */
export function AdminCraftsPage() {
  const { addToast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [nodeType, setNodeType] = useState('Craft');
  const [nodeLabel, setNodeLabel] = useState('');

  const [graphNodes, setGraphNodes] = useState([
    { id: 'craft-101', name: 'Kalamkari Hand Painting', type: 'Craft', region: 'Andhra Pradesh', activeArtisans: 24, productsCount: 142, status: 'GI Tagged' },
    { id: 'craft-102', name: 'Jaipur Blue Pottery', type: 'Craft', region: 'Rajasthan', activeArtisans: 19, productsCount: 98, status: 'GI Tagged' },
    { id: 'craft-103', name: 'Pashmina & Sozni Weaving', type: 'Craft', region: 'Kashmir', activeArtisans: 31, productsCount: 110, status: 'GI Tagged' },
    { id: 'craft-104', name: 'Dhokra Lost-Wax Casting', type: 'Craft', region: 'Chhattisgarh & Odisha', activeArtisans: 15, productsCount: 76, status: 'Heritage Protected' },
    { id: 'craft-105', name: 'Bidriware Silver Inlay', type: 'Craft', region: 'Karnataka', activeArtisans: 12, productsCount: 54, status: 'GI Tagged' },
  ]);

  const handleAddNode = (e) => {
    e.preventDefault();
    if (!nodeLabel) return;
    const newNode = {
      id: `node-${Date.now()}`,
      name: nodeLabel,
      type: nodeType,
      region: 'National',
      activeArtisans: 1,
      productsCount: 0,
      status: 'Proposed Node',
    };
    setGraphNodes((prev) => [newNode, ...prev]);
    addToast({
      type: 'success',
      title: 'Craft Graph Node Created',
      message: `${nodeLabel} added to Living Craft Graph ontology.`,
    });
    setNodeLabel('');
    setIsAddModalOpen(false);
  };

  return (
    <PageContainer>
      <SectionHeader
        title="Living Craft Graph Taxonomy & Traditions"
        subtitle="Govern the core ontology: define craft categories, register ancestral techniques, and link regional origins."
        action={
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Register Craft Node
          </Button>
        }
      />

      <Table>
        <Table.Header>
          <Table.Row hover={false}>
            <Table.Head>Tradition / Node</Table.Head>
            <Table.Head>Ontology Type</Table.Head>
            <Table.Head>Primary Region</Table.Head>
            <Table.Head>Registered Artisans</Table.Head>
            <Table.Head>Connected Products</Table.Head>
            <Table.Head>Heritage Status</Table.Head>
            <Table.Head className="text-right">Action</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {graphNodes.map((node) => (
            <Table.Row key={node.id}>
              <Table.Cell className="font-semibold text-text-primary text-sm">
                {node.name}
              </Table.Cell>

              <Table.Cell>
                <Badge variant="primary" size="sm">
                  {node.type}
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-xs text-text-secondary">
                {node.region}
              </Table.Cell>

              <Table.Cell className="text-xs font-bold">
                {node.activeArtisans} masters
              </Table.Cell>

              <Table.Cell className="text-xs font-semibold text-text-primary">
                {node.productsCount} items
              </Table.Cell>

              <Table.Cell>
                <Badge variant="success" size="sm" dot>
                  {node.status}
                </Badge>
              </Table.Cell>

              <Table.Cell className="text-right">
                <Button variant="ghost" size="sm">
                  <Edit className="w-3.5 h-3.5" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Add Node Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Craft Graph Node"
        description="Expand the platform ontology with verified traditional techniques and crafts."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddNode}>
              Save to Graph
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <FormField label="Node Entity Type" htmlFor="node-type">
            <Select
              id="node-type"
              value={nodeType}
              onChange={(e) => setNodeType(e.target.value)}
              options={[
                { value: 'Craft', label: 'Craft Tradition' },
                { value: 'Technique', label: 'Technique / Method' },
                { value: 'Material', label: 'Raw Material / Mineral' },
                { value: 'Region', label: 'Geographical Origin' },
              ]}
            />
          </FormField>

          <FormField label="Node Label / Title" htmlFor="node-label" required>
            <Input
              id="node-label"
              placeholder="e.g. Sujani Kantha Hand Embroidery"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value)}
              required
            />
          </FormField>
        </div>
      </Modal>
    </PageContainer>
  );
}
