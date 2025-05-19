import { useState } from 'react';
import { SortableTable } from './components/SortableTable';
import './App.css';

function App() {
  const [tableData] = useState([
    { id: 10, firstName: 'Yessenia', lastName: 'Rogahn', jobTitle: 'Legacy Implementation Supervisor', email: 'Jadeek08@yahoo.com' },
    { id: 9, firstName: 'Susanna', lastName: 'Kuhn', jobTitle: 'Forward Accountability Executive', email: 'Assunta_Klein14@hotmail.com' },
    { id: 8, firstName: 'Joyce', lastName: 'Torphy', jobTitle: 'National Research Consultant', email: 'LoyPolitch80@yahoo.com' },
    { id: 7, firstName: 'Brooks', lastName: 'Breitenberg', jobTitle: 'Internal Assurance Analyst', email: 'Willite43@gmail.com' },
    { id: 6, firstName: 'Webster', lastName: 'Okamera', jobTitle: 'Direct Identity Agent', email: 'Hayhe_ukubovek86@yahoo.com' },
    { id: 5, firstName: 'Jadden', lastName: 'Denešik', jobTitle: 'Lead Implementation Planner', email: 'Annetta_Heitinger43@yahoo.com' },
    { id: 4, firstName: 'Axel', lastName: 'Grant', jobTitle: 'Regional Functionality Technician', email: 'Kevin_Guigonvski@hotmail.com' },
    { id: 3, firstName: 'Emmitt', lastName: 'Schiller', jobTitle: 'Legacy Tactics Assistant', email: 'Meda_Romaguen2@hotmail.com' },
    { id: 2, firstName: 'Annette', lastName: 'Kling', jobTitle: 'Future Marketing Agent', email: 'Cale_Runte@yahoo.com' },
    { id: 1, firstName: 'Javier', lastName: 'Jenkins', jobTitle: 'Investor Integration Listion', email: 'Geo_McCutrough55@hotmail.com' }
  ]);

  return (
    <div className="app-container">
      <h1>Сортировка</h1>
      <SortableTable data={tableData} />
    </div>
  );
}

export default App;