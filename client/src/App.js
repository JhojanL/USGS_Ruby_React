// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeismicDataView from './components/SeismicData';
import SeismicDetailView from './components/SeismicDataDetails';
import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const url = 'http://localhost:3000/api/features';

function getSeismicData(magTypes, page) {
  const magTypeParams = magTypes.map(magType => `mag_type[]=${magType}`).join('&');
  const params = `page=${page}&${magTypeParams}`;
  return axios.get(`${url}?${params}`)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function App() {
  const [seismicData, setSeismicData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMagTypes, setSelectedMagTypes] = useState([]);

  const fetchData = useCallback((page) => {
    getSeismicData(selectedMagTypes, page).then(response => {
      setSeismicData(response.data);
      setPagination(response.pagination);
    });
  }, [selectedMagTypes]);
  
  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  return (
    <Router>
      <div className="App">
        <h1>USGS Ruby React</h1>
        <Routes>
          <Route path="/" element={<SeismicDataView data={seismicData} pagination={pagination} setCurrentPage={setCurrentPage} setSelectedMagTypes={setSelectedMagTypes} fetchData={fetchData} />} />
          <Route path="/details/:id" element={<SeismicDetailView data={seismicData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
