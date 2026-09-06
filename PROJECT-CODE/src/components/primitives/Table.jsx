import React from 'react';

/**
 * Table Primitive
 * Semantic and accessible responsive table component
 */
export function Table({ children, striped = false, className = '' }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-surface">
      <table className={`w-full text-left border-collapse text-sm ${className}`}>
        {children}
      </table>
    </div>
  );
}

Table.Header = function TableHeader({ children, className = '' }) {
  return (
    <thead className={`bg-neutral-50 border-b border-border ${className}`}>
      {children}
    </thead>
  );
};

Table.Body = function TableBody({ children, className = '' }) {
  return <tbody className={`divide-y divide-border ${className}`}>{children}</tbody>;
};

Table.Row = function TableRow({ children, className = '', hover = true }) {
  return (
    <tr
      className={`transition-colors ${
        hover ? 'hover:bg-neutral-50/75' : ''
      } ${className}`}
    >
      {children}
    </tr>
  );
};

Table.Head = function TableHead({ children, className = '' }) {
  return (
    <th
      scope="col"
      className={`py-3 px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

Table.Cell = function TableCell({ children, className = '' }) {
  return (
    <td className={`py-3.5 px-4 text-sm text-text-primary ${className}`}>
      {children}
    </td>
  );
};
