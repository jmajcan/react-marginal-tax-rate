import logo from '../logo.svg';
import '../style/App.css';

function App() {
  return (
    <div className="App">
      <form>
        <label>annual income: <input type="number" name="income" /></label><br />
        <label>tax year: <input type="number" name="income" /></label><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
