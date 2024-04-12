// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import SeismicData from './components/SeismicData';
import { useEffect, useState } from 'react';

const url = 'http://localhost:3000/api/features';

function getSeismicData() {
  return axios.get(url)
    .then(response => {
      console.log(response.data);
      return response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function App() {
  const [seismicData, setSeismicData] = useState([]);

  useEffect(() => {
    let mounted = true;
    getSeismicData().then(data => {
      if (mounted) {
        setSeismicData(data);
      }
    });
    return () => mounted = false;
  }, []);
  return (
    <div className="App">
      <h1>USGS Ruby React</h1>
      <SeismicData data={seismicData}/>
    </div>
  );
}

export default App;
