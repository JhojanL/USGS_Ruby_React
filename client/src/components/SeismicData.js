import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, ListGroup, Button, Pagination, Row, Col } from 'react-bootstrap';

export default function SeismicDataView(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = props.pagination ? Math.ceil(props.pagination.total / props.pagination.per_page) : 0;
  
  function handleMagTypeChange(event) {
    const value = event.target.value;
    if (event.target.checked) {
      props.setSelectedMagTypes(prevMagTypes => {
        const newMagTypes = [...prevMagTypes, value];
        localStorage.setItem('selectedMagTypes', JSON.stringify(newMagTypes));
        return newMagTypes;
      });
    } else {
      props.setSelectedMagTypes(prevMagTypes => {
        const newMagTypes = prevMagTypes.filter(magType => magType !== value);
        localStorage.setItem('selectedMagTypes', JSON.stringify(newMagTypes));
        return newMagTypes;
      });
    }
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    props.fetchData(pageNumber);
  }

  useEffect(() => {
    props.fetchData(currentPage);
  }, [currentPage]);

  return (
    <Container>
      <h2 className="my-3">Seismic Data</h2>
      {/* mag_type filter */}
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
      {/* page selector */}
      <Row className="justify-content-center">
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
      <ListGroup>
        {props.data && props.data.map((feature, index) => (
          <ListGroup.Item key={index}>
          <Link to={`/details/${feature.id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
            {feature.feature_attributes.title}
          </Link>
        </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}
