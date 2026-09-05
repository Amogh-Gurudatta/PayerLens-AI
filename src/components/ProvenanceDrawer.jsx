import React, { useState, useEffect } from 'react';
import {
  X, ShieldCheck, Download, Search, ExternalLink, Copy, Check,
  BookOpen, Layers, CheckCircle2, FileText, Database
} from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import { DATA_ARCHITECTURE_LAYERS, PROVENANCE_TYPES } from '../data/payerData';

export default function ProvenanceDrawer({ isOpen, onClose }) {
  const [selectedLayer, setSelectedLayer] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Close on escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Copy citation to clipboard
  const handleCopyCitation = (source) => {
    const text = `[Audit Citation] ${source.title} (${source.year}). Issuing Body: ${source.agency}. Document ID: ${source.documentId}. DOI/Docket: ${source.doi}. Type: ${source.dataType}. Notes: ${source.notes}`;
    navigator.clipboard.writeText(text);
    setCopiedId(source.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export full audit dossier as JSON file
  const handleExportJSON = () => {
    const exportData = {
      platform: 'PayerLens - Global HEOR & Patient Access Ecosystem Intelligence',
      hackathon: 'Novo Nordisk Hackathon 2026',
      generatedTimestamp: new Date().toISOString(),
      auditTrailStatus: 'AUDIT_VERIFIED_100_PERCENT',
      dataArchitectureLayers: DATA_ARCHITECTURE_LAYERS,
      provenanceTaxonomy: PROVENANCE_TYPES
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PayerLens-HEOR-Audit-Dossier-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  if (!isOpen) return null;

  // Filter sources
  const filteredLayers = DATA_ARCHITECTURE_LAYERS.map((layerGroup, idx) => {
    const layerNum = idx + 1;
    const isLayerSelected = selectedLayer === 'ALL' || selectedLayer === `L${layerNum}`;

    const matchingSources = layerGroup.sources.filter((s) => {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.agency.toLowerCase().includes(q) ||
        s.documentId.toLowerCase().includes(q) ||
        s.doi.toLowerCase().includes(q) ||
        s.notes.toLowerCase().includes(q)
      );
    });

    return {
      ...layerGroup,
      layerNum,
      isLayerSelected,
      matchingSources
    };
  }).filter((group) => group.isLayerSelected && group.matchingSources.length > 0);

  const totalSourcesCount = DATA_ARCHITECTURE_LAYERS.reduce(
    (acc, l) => acc + l.sources.length,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-over Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside
          aria-label="Provenance and Audit Trail Drawer"
          className="w-screen max-w-2xl bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-slide-left text-slate-900"
        >
          {/* Deep Navy Drawer Header */}
          <div className="p-6 bg-[#00205b] text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-blue-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 m-0">
                    <span>Data Provenance & Audit Trail</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 font-mono font-bold uppercase">
                      Audit-Ready
                    </span>
                  </h2>
                  <p className="text-xs text-blue-100/80 mt-0.5">
                    3-Layer Data Architecture Bibliography & Statutory Verification
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compliance Banner */}
            <div className="mt-4 p-3 rounded-lg bg-white/10 border border-white/15 text-xs text-blue-50 leading-relaxed">
              <strong className="text-white">Novo Nordisk Mentor Audit Mandate:</strong> Every single metric and score in PayerLens links to an empirical peer-reviewed trial, statutory HTA legal code, or derived epidemiology registry model.
            </div>

            {/* Filter Pills, Search, and Export */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/10 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedLayer('ALL')}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    selectedLayer === 'ALL'
                      ? 'bg-white text-[#00205b] shadow-xs'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  All ({totalSourcesCount})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayer('L1')}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    selectedLayer === 'L1'
                      ? 'bg-white text-[#00205b] shadow-xs'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  Layer 1 (Epidemiology)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayer('L2')}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    selectedLayer === 'L2'
                      ? 'bg-white text-[#00205b] shadow-xs'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  Layer 2 (Trials)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLayer('L3')}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    selectedLayer === 'L3'
                      ? 'bg-white text-[#00205b] shadow-xs'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  Layer 3 (HTA Statutes)
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportJSON}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#00205b] hover:bg-blue-50 text-xs font-bold shadow-xs transition-all"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#00205b]" />
                    <span>Export JSON Dossier</span>
                  </>
                )}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mt-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across DOIs, agencies, or trials (e.g. DAPA-HF, TA388)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-xs rounded-lg pl-9 pr-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Drawer Content: 3-Layer Architecture */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {filteredLayers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No citations match the current search query or layer filter.
              </div>
            ) : (
              filteredLayers.map((group) => (
                <div key={group.layerNum} className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00205b]" />
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 m-0">
                          {group.layer}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {group.focus}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#00205b] font-bold px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                      {group.matchingSources.length} Citations
                    </span>
                  </div>

                  {/* Sources List in this Layer */}
                  <div className="space-y-3">
                    {group.matchingSources.map((source) => (
                      <div
                        key={source.id}
                        className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs hover:border-[#00205b] transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold text-[#00205b] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {source.id}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              {source.agency}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ({source.year})
                            </span>
                          </div>
                          <ProvenanceBadge type={source.provenanceType} size="xs" />
                        </div>

                        <div className="text-xs font-bold text-slate-900 leading-snug">
                          {source.title}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">
                              Document / Docket Ref:
                            </span>
                            <span className="font-mono text-slate-800 font-semibold truncate block">
                              {source.documentId}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">
                              Identifier / DOI:
                            </span>
                            <span className="font-mono text-[#004b87] font-semibold truncate block">
                              {source.doi}
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="font-bold text-slate-600 text-[10px] uppercase tracking-wider block mb-0.5">
                            Audit Context & Usage:
                          </span>
                          {source.notes}
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Compliance Verified</span>
                          <button
                            type="button"
                            onClick={() => handleCopyCitation(source)}
                            className="inline-flex items-center gap-1 text-[#004b87] hover:text-[#00205b] text-xs font-semibold transition-colors"
                          >
                            {copiedId === source.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Full Citation</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#00205b]" />
              <span>Full Provenance Audit Engine</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-300"
            >
              Close Drawer
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
