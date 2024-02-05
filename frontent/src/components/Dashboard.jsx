import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
 const { register, handleSubmit } = useForm();

 const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('patientName', data.patientName);
    formData.append('pdfFile', data.pdfFile[0]);

    try {
      await axios.post('http://localhost:4000/upload', formData);
      console.log(formData)
      alert('File uploaded successfully!');
      window.location.reload(false);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
 };

 return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Form onSubmit={handleSubmit(onSubmit)} className="centre" style={{ padding: '380px', maxWidth: '10000px' }}>
        <Form.Group controlId="patientName" className="center-input">
          <Form.Label className="center-label">Patient Name</Form.Label>
          <Form.Control type="text" {...register('patientName')} required />
        </Form.Group>
        <Form.Group controlId="pdfFile" className="center-input">
          <Form.Label className="center-label">PDF File</Form.Label>
          <Form.Control type="file" {...register('pdfFile')} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </Container>
 );
};

export default Dashboard;
