import Buttons from './components/Buttons';
import './App.css';

function App() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="mb-4">Интерактивные счетчики</h1>
        <p className="lead text-muted">Нажмите на кнопку, чтобы увеличить счетчик</p>
      </div>
      <Buttons count={4} />
    </div>
  );
}

export default App;