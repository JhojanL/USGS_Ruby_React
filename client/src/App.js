// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeismicDataView from './components/SeismicData';
import SeismicDetailView from './components/SeismicDataDetails';
import { useEffect, useState } from 'react';

const url = 'http://localhost:3000/api/features';

function getSeismicData(magTypes, page) {
  const magTypeParams = magTypes.map(magType => `mag_type[]=${magType}`).join('&');
  const params = `page=${page}&${magTypeParams}`;
  return axios.get(`${url}?${params}`)
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMagTypes, setSelectedMagTypes] = useState([]);

  useEffect(() => {
    let mounted = true;
    getSeismicData(selectedMagTypes, currentPage).then(data => {
      if (mounted) {
        setSeismicData(data);
      }
    });
    return () => mounted = false;
  }, [selectedMagTypes, currentPage]);
  return (
    <Router>
      <div className="App">
        <h1>USGS Ruby React</h1>
        <Routes>
        <Route path="/" element={<SeismicDataView data={seismicData} setCurrentPage={setCurrentPage} setSelectedMagTypes={setSelectedMagTypes} />} />
          <Route path="/details/:id" element={<SeismicDetailView data={seismicData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
