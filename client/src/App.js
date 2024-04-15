// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SeismicDataView from './components/SeismicData';
import SeismicDetailView from './components/SeismicDataDetails';
import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';

const url = 'http://localhost:3000/api/features';

function getSeismicData(magTypes, page, perPage) {
  const magTypeParams = magTypes.map(magType => `mag_type[]=${magType}`).join('&');
  const params = `page=${page}&per_page=${perPage}&${magTypeParams}`;
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
  const [perPage, setPerPage] = useState(15);
  const [selectedMagTypes, setSelectedMagTypes] = useState([]);

  const fetchData = useCallback((page, perPage) => {
    getSeismicData(selectedMagTypes, page, perPage).then(response => {
      setSeismicData(response.data);
      setPagination(response.pagination);
      // setPerPage(response.pagination.per_page);
    });
  }, [selectedMagTypes]);
  
  useEffect(() => {
    fetchData(currentPage, perPage);
  }, [fetchData, currentPage, perPage]);

  return (
    <Router>
      <div className="App">
        <Navbar className="bg-body-tertiary justify-content-center">
          <Navbar.Brand as={Link} to="/">USGS Ruby React</Navbar.Brand>
        </Navbar>
        <Routes>
          <Route path="/" element={<SeismicDataView data={seismicData} pagination={pagination} setCurrentPage={setCurrentPage} setPerPage={setPerPage} perPage={perPage} setSelectedMagTypes={setSelectedMagTypes} fetchData={fetchData} />} />
          <Route path="/details/:id" element={<SeismicDetailView data={seismicData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
