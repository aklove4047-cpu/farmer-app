import React, { useState } from 'react';
import { 
  Building2, ExternalLink, CheckCircle, FileText, 
  HelpCircle, ChevronDown, ChevronUp, CheckSquare, Sparkles 
} from 'lucide-react';
import { schemesData } from '../data/schemesData';

export default function SchemesPortal({ lang, t }) {
  const [expandedId, setExpandedId] = useState(schemesData[0].id);
  const [eligibilityChecked, setEligibilityChecked] = useState({});

  const toggleCheck = (schemeId, stepIdx) => {
    const key = `${schemeId}-${stepIdx}`;
    setEligibilityChecked(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏛️</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Yantramanav',sans-serif]">
                {t.schemesTitle}
              </h2>
            </div>
            <p className="text-blue-100 text-sm mt-1 max-w-xl">
              {t.schemesSubtitle}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-center self-start md:self-auto">
            <span className="text-xs text-blue-100 block">{lang === 'hi' ? 'सीधे डीबीटी (DBT)' : 'Direct DBT'}</span>
            <span className="text-base font-extrabold">100% पारदर्शी</span>
          </div>
        </div>
      </div>

      {/* Schemes List with Accordion Details */}
      <div className="space-y-4">
        {schemesData.map((scheme) => {
          const isExpanded = expandedId === scheme.id;

          return (
            <div
              key={scheme.id}
              className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                isExpanded ? 'border-indigo-400 shadow-md ring-2 ring-indigo-50' : 'border-slate-200/80 shadow-xs'
              }`}
            >
              {/* Header row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
                className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xl shrink-0">
                    🏛️
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        {lang === 'hi' ? scheme.nameHi : scheme.nameEn}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-indigo-100 text-indigo-800">
                        {scheme.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {scheme.category}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
                  {/* Description */}
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {lang === 'hi' ? scheme.descHi : scheme.descEn}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Eligibility Checklist */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{t.eligibility} (पात्रता जांच)</span>
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm">
                        {(lang === 'hi' ? scheme.eligibilityHi : scheme.eligibilityEn).map((item, idx) => {
                          const checked = !!eligibilityChecked[`${scheme.id}-${idx}`];
                          return (
                            <li 
                              key={idx}
                              onClick={() => toggleCheck(scheme.id, idx)}
                              className="flex items-start gap-2 cursor-pointer select-none text-slate-700"
                            >
                              <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border transition-colors ${
                                checked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {checked && <CheckSquare className="w-3.5 h-3.5" />}
                              </div>
                              <span className={checked ? 'line-through text-slate-400' : ''}>
                                {item}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Required Documents */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        <span>{t.documents}</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(lang === 'hi' ? scheme.documentsHi : scheme.documentsEn).map((doc, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-semibold px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-xl"
                          >
                            📄 {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Application Process & Link */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-indigo-950 font-medium">
                      <span className="font-bold block mb-0.5">
                        {lang === 'hi' ? 'आवेदन कैसे करें:' : 'How to apply:'}
                      </span>
                      {scheme.stepsHi}
                    </div>

                    <a
                      href={scheme.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
                    >
                      <span>{t.applyNow}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
