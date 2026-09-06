import React from 'react';

/**
 * Tabs Primitive
 * Accessible tab navigation with keyboard support (arrow keys, space, enter)
 */
export function Tabs({
  tabs = [],
  activeTab,
  onChange,
  variant = 'underline',
  className = '',
}) {
  const handleKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      onChange(tabs[nextIndex].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={`flex items-center gap-2 overflow-x-auto no-scrollbar select-none ${
        variant === 'underline' ? 'border-b border-border pb-px' : 'bg-neutral-100 p-1 rounded-md'
      } ${className}`}
    >
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;

        if (variant === 'pill') {
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap focus-ring ${
                isActive
                  ? 'bg-surface text-text-primary shadow-xs font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
              }`}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="ml-1 px-1.5 py-0.2 rounded-pill text-[10px] bg-neutral-200 text-text-primary">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap focus-ring ${
              isActive
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-neutral-300'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.2 rounded-pill text-[10px] bg-neutral-200 text-text-primary">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({ id, activeTab, children, className = '' }) {
  if (activeTab !== id) return null;
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      className={`py-4 focus-visible:outline-none ${className}`}
    >
      {children}
    </div>
  );
}
