
import './App.css';
import { Card } from './Componentes/Card';
import { ParOUImpar } from './Componentes/ParOUImpar';
import { PrimeiroCoponente } from './Componentes/PrimeirtoComponente';

function App() {

  return (
    <>
      <Card>
        <PrimeiroCoponente />
      </Card>
      <Card>
        <ParOUImpar numero={10} />

        <hr />
        <Notificacao mensagens={("Oi")} />
      </Card>
    </>
  );
}

export default App;
