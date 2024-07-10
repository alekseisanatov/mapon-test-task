import './App.scss';
import maponLogo from './assets/mapon-colour@2x.png';
import { VehicleForm } from './components/form/VehicleForm';

function App() {
  return (
    <div className="container">
      <img className='container__logo' src={maponLogo} alt='logo'/>
      <VehicleForm />
    </div>
  );
}

export default App;
