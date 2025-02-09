import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { Search, Plus } from 'lucide-react';
import { api } from '../services/api';

interface Course {
  id: number;
  picture: string;
  name: string;
  TrainingFocu: any;
  numberOfPractices: number;
}

export default function Courses() {
  const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/courses/data-course').then(res => {
      setCourses(res)
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const filteredCourses = courses.filter((course) => {
    return course.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Course</h2>
        <Button variant="primary" className="d-flex align-items-center gap-2 rounded-pill px-3">
          Tambah Course
          <Plus size={20} />
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

      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Nama Course</th>
            <th>Fokus Pelatihan</th>
            <th>Jumlah Praktik</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={course.id}>
              <td>{index + 1}</td>
              <td>
                <img src={`${BASE_URL}/${course.picture}`} alt={course.name} width={50} height={50}/>
              </td>
              <td>{course.name}</td>
              <td>{course.TrainingFocu.name}</td>
              <td>{course.numberOfPractices}</td>
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