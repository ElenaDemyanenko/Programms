import { useState } from 'react';
import './SortableTable.css';

export const SortableTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ 
    key: null, 
    direction: 'asc'
  });

  if (!data || data.length === 0) {
    return <div className="no-data">Нет данных для отображения</div>;
  }

  const headers = Object.keys(data[0]);

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th 
                key={header}
                onClick={() => requestSort(header)}
                className={sortConfig.key === header ? 'active' : ''}
              >
                <div className="header-content">
                  {header}
                  <span className="sort-icon">{getSortIcon(header)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
              {headers.map((header) => (
                <td key={`${index}-${header}`}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};