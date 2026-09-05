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
        className={`inline-flex items-center gap-1 text-slate-400 hover:text-[#00205b] transition-colors focus:outline-none rounded px-1 py-0.5 ${
          isOpen ? 'text-[#00205b] bg-blue-50' : ''
        }`}
        aria-label="Inspect data provenance and citation"
      >
        {children}
        {iconOnly && (
          <Info className="w-3.5 h-3.5 text-slate-400 hover:text-[#00205b] transition-transform group-hover/tooltip:scale-110" />
        )}
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Citation Audit Card"
          className={`absolute z-50 w-80 sm:w-96 rounded-xl p-4 text-left shadow-2xl border bg-white border-slate-200 text-slate-800 animate-fade-in ${
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
          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00205b] flex-shrink-0" />
              <span className="text-[11px] font-bold tracking-wider text-[#00205b] uppercase">
                Audit Provenance Record
              </span>
            </div>
            <ProvenanceBadge type={provenanceType} size="xs" />
          </div>

          {/* Body details */}
          <div className="mt-3 space-y-2.5 text-xs">
            {title && (
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Title / Subject
                </div>
                <div className="font-bold text-slate-900 text-xs mt-0.5 leading-snug">
                  {title}
                </div>
              </div>
            )}

            {issuingBody && (
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Issuing Body / Regulatory Authority
                </div>
                <div className="text-slate-800 mt-0.5 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#004b87]"></span>
                  {issuingBody}
                </div>
              </div>
            )}

            {documentId && (
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Document / Docket ID
                  </div>
                  <div className="font-mono text-[#00205b] font-bold text-[11px] mt-0.5 truncate">
                    {documentId}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Evidence Level
                  </div>
                  <div className="font-mono text-emerald-800 font-semibold text-[11px] mt-0.5">
                    {provenanceType === 'STATUTORY' ? 'Statutory Code' : provenanceType === 'CLINICAL' ? 'RCT Phase III' : provenanceType === 'EPIDEMIOLOGY' ? 'Registry / HES' : 'Calibrated Alg.'}
                  </div>
                </div>
              </div>
            )}

            {citation && (
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                  <span>Source Citation String</span>
                  <button
                    type="button"
                    onClick={handleCopyCitation}
                    className="text-[10px] text-[#004b87] hover:text-[#00205b] inline-flex items-center gap-1 font-semibold"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3 h-3" />
                        <span>Copy Ref</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-slate-700 italic text-[11px] mt-0.5 bg-slate-50 p-2 rounded border border-slate-200">
                  "{citation}"
                </div>
              </div>
            )}

            {methodologyNote && (
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  Methodological & Modeling Note
                </div>
                <div className="text-slate-700 text-[11px] mt-0.5 leading-relaxed bg-amber-50 p-2 rounded border border-amber-200">
                  {methodologyNote}
                </div>
              </div>
            )}
          </div>

          {/* Footer action with direct link */}
          {citationUrl && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Official Portal:</span>
              <a
                href={citationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#004b87] hover:text-[#00205b] hover:underline font-semibold"
              >
                <span>Access Guideline Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Decorative Arrow */}
          <div
            className={`absolute w-2.5 h-2.5 rotate-45 bg-white border-slate-200 ${
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
