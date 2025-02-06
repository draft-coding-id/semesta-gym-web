import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Search, Plus } from 'lucide-react';

// Dummy data
const initialCourses = [
  {
    id: 1,
    name: 'Yoga Basic',
    trainer: 'Sarah Johnson',
    schedule: 'Senin & Rabu, 08:00',
    capacity: '15',
    enrolled: '12',
    price: 'Rp 300.000'
  },
  {
    id: 2,
    name: 'HIIT Training',
    trainer: 'Mike Wilson',
    schedule: 'Selasa & Kamis, 17:00',
    capacity: '20',
    enrolled: '18',
    price: 'Rp 400.000'
  }
];

export default function Courses() {
  const [courses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Course</h2>
        <Button variant="primary" className="d-flex align-items-center gap-2">
          <Plus size={20} />
          Tambah Course
        </Button>
      </div>

      <div className="mb-4">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <Search size={20} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Course</th>
            <th>Trainer</th>
            <th>Jadwal</th>
            <th>Kapasitas</th>
            <th>Terdaftar</th>
            <th>Harga</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.trainer}</td>
              <td>{course.schedule}</td>
              <td>{course.capacity}</td>
              <td>{course.enrolled}</td>
              <td>{course.price}</td>
              <td>
                <Button variant="link" className="p-0">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}