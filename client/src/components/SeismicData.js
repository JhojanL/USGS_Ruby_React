import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, ListGroup, Pagination, Row, Col } from 'react-bootstrap';

export default function SeismicDataView(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(Number(localStorage.getItem('perPage')) || 15);
  const totalPages = props.pagination ? Math.ceil(props.pagination.total / props.pagination.per_page) : 0;
  const { fetchData, setSelectedMagTypes } = props;
  
  function handleMagTypeChange(event) {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedMagTypes(prevMagTypes => {
        const newMagTypes = [...prevMagTypes, value];
        localStorage.setItem('selectedMagTypes', JSON.stringify(newMagTypes));
        fetchData(currentPage, perPage, newMagTypes);
        return newMagTypes;
      });
    } else {
      setSelectedMagTypes(prevMagTypes => {
        const newMagTypes = prevMagTypes.filter(magType => magType !== value);
        localStorage.setItem('selectedMagTypes', JSON.stringify(newMagTypes));
        fetchData(currentPage, perPage, newMagTypes);
        return newMagTypes;
      });
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
    fetchData(pageNumber, perPage);
  }
  
  function handlePerPageChange(event) {
    const newPerPage = Number(event.target.value);
    setPerPage(newPerPage);
    localStorage.setItem('perPage', newPerPage);
    fetchData(currentPage, newPerPage);
  }

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    const storedPerPage = localStorage.getItem('perPage');
    const pageToFetch = storedPage ? Number(storedPage) : 1;
    const perPageToFetch = storedPerPage ? Number(storedPerPage) : perPage;
    setCurrentPage(pageToFetch);
    fetchData(pageToFetch, perPageToFetch);
  }, [fetchData, perPage]);

  return (
    <Container>
      <h2 className="my-3">Seismic Data</h2>
      {/* mag_type filter */}
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form.Group onChange={handleMagTypeChange}>
            {['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg'].map(magType => (
              <Form.Check
                inline 
                type="checkbox"
                id={magType}
                label={magType}
                value={magType}
                checked={JSON.parse(localStorage.getItem('selectedMagTypes') || '[]').includes(magType)}
                key={magType}
              />
            ))}
          </Form.Group>
        </Col>
      </Row>
      {/* page selector */}
      <Row className="justify-content-center mt-2">
        <Col xs="auto">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />

            {currentPage > 3 && <Pagination.Item onClick={() => handlePageChange(1)}>1</Pagination.Item>}
            {currentPage > 4 && <Pagination.Ellipsis />}

            {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i).map(pageNumber => (
              pageNumber > 0 && pageNumber <= totalPages && (
                <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)}>
                  {pageNumber}
                </Pagination.Item>
              )
            ))}

            {currentPage < totalPages - 3 && <Pagination.Ellipsis />}
            {currentPage < totalPages - 2 && <Pagination.Item onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>}

            <Pagination.Next onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </Col>
      </Row>
      {/* per_page selector */}
      <Row className="justify-content-center mb-3">
        <Col xs={12} sm={8} md={6} lg={4}>
        <Form.Group className="perPageSelector">
          <Form.Control as="select" value={perPage} onChange={handlePerPageChange}>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
            <option value="25">25 per page</option>
            <option value="30">30 per page</option>
          </Form.Control>
        </Form.Group>
        </Col>
      </Row>
      {/* registers */}
      <ListGroup>
        {props.data && props.data.map((feature, index) => (
          <ListGroup.Item action variant="light" key={index}>
          <Link to={`/details/${feature.id}`} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
            {feature.feature_attributes.title}
          </Link>
        </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}
