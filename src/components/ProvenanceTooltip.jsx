import React, { useState, useRef, useEffect } from 'react';
import { Info, ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';

/**
 * Interactive Provenance Popover / Tooltip
 * Renders an info icon or wraps children. Clicking or hovering reveals:
 * - Full Title & Issuing Body
 * - Reference Document ID
 * - Direct Citation String / Link
 * - Methodological Note
 * - Provenance classification badge
 */
export default function ProvenanceTooltip({
  title,
  issuingBody,
  documentId,
  citation,
  methodologyNote,
  provenanceType = 'STATUTORY',
  citationUrl,
  children,
  iconOnly = false,
  align = 'center', // 'left', 'center', 'right'
  position = 'top' // 'top', 'bottom'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 250);
  };

  const handleCopyCitation = (e) => {
    e.stopPropagation();
    const textToCopy = `[Source Audit] ${issuingBody || ''} - ${documentId || ''}: "${citation || title}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center align-middle group/tooltip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`inline-flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-1 py-0.5 ${
          isOpen ? 'text-cyan-400 ring-1 ring-cyan-500/50 bg-cyan-950/40' : ''
        }`}
        aria-label="Inspect data provenance and citation"
      >
        {children}
        {iconOnly && (
          <Info className="w-3.5 h-3.5 text-cyan-400/80 group-hover/tooltip:text-cyan-300 transition-transform group-hover/tooltip:scale-110" />
        )}
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Citation Audit Card"
          className={`absolute z-50 w-80 sm:w-96 rounded-xl p-4 text-left shadow-2xl border bg-slate-950/95 border-cyan-500/30 backdrop-blur-xl text-slate-200 animate-fade-in ${
            position === 'top' ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
          } ${
            align === 'left'
              ? 'left-0'
              : align === 'right'
              ? 'right-0'
              : 'left-1/2 -translate-x-1/2'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Provenance Badge */}
          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="text-[11px] font-semibold tracking-wider text-cyan-300 uppercase">
                Audit Provenance Record
              </span>
            </div>
            <ProvenanceBadge type={provenanceType} size="xs" />
          </div>

          {/* Body details */}
          <div className="mt-3 space-y-2.5 text-xs">
            {title && (
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Title / Subject
                </div>
                <div className="font-semibold text-slate-100 text-xs mt-0.5 leading-snug">
                  {title}
                </div>
              </div>
            )}

            {issuingBody && (
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Issuing Body / Regulatory Authority
                </div>
                <div className="text-slate-200 mt-0.5 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {issuingBody}
                </div>
              </div>
            )}

            {documentId && (
              <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">
                    Document / Docket ID
                  </div>
                  <div className="font-mono text-cyan-300 font-semibold text-[11px] mt-0.5 truncate">
                    {documentId}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400">
                    Evidence Level
                  </div>
                  <div className="font-mono text-emerald-300 font-semibold text-[11px] mt-0.5">
                    {provenanceType === 'STATUTORY' ? 'Statutory Code' : provenanceType === 'CLINICAL' ? 'RCT Phase III' : provenanceType === 'EPIDEMIOLOGY' ? 'Registry / HES' : 'Calibrated Alg.'}
                  </div>
                </div>
              </div>
            )}

            {citation && (
              <div>
                <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider flex items-center justify-between">
                  <span>Source Citation String</span>
                  <button
                    onClick={handleCopyCitation}
                    className="text-[10px] text-cyan-400 hover:text-cyan-200 inline-flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3 h-3" />
                        <span>Copy Ref</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-slate-300 italic text-[11px] mt-0.5 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                  "{citation}"
                </div>
              </div>
            )}

            {methodologyNote && (
              <div>
                <div className="text-[10px] uppercase font-semibold text-amber-400/90 tracking-wider">
                  Methodological & Modeling Note
                </div>
                <div className="text-slate-300 text-[11px] mt-0.5 leading-relaxed bg-amber-950/20 p-2 rounded border border-amber-900/30">
                  {methodologyNote}
                </div>
              </div>
            )}
          </div>

          {/* Footer action */}
          {citationUrl && (
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Official Portal:</span>
              <a
                href={citationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline font-medium"
              >
                <span>Access Guideline Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Decorative Arrow */}
          <div
            className={`absolute w-2.5 h-2.5 rotate-45 bg-slate-950 border-cyan-500/30 ${
              position === 'top'
                ? 'bottom-[-6px] border-r border-b'
                : 'top-[-6px] border-l border-t'
            } ${
              align === 'left'
                ? 'left-6'
                : align === 'right'
                ? 'right-6'
                : 'left-1/2 -translate-x-1/2'
            }`}
          />
        </div>
      )}
    </div>
  );
}
