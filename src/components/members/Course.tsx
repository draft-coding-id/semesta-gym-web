import { Search } from "lucide-react";
import { useState } from "react";
import { Badge, Button, Form, InputGroup, Table } from "react-bootstrap";

interface CourseProps {
  members: any[];
}

export default function Course({ members }: CourseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const listMembers = members.filter((user: any) => {
    return user.Courses.length !== 0;
  }).filter((user: any) => {
    return user.Courses.some((course: any) => new Date(course.endDate) > new Date());
  });

  const filteredMembers = listMembers.filter((member) => {
    const data = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                member.phone.includes(searchTerm);
    return data;
  });
  return (
    <>
      <div className="mb-4 d-flex justify-content-between">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari members..."
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
            <th>Nama</th>
            <th>No.Hp</th>
            <th>Pembayaran</th>
            <th>Expired</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.phone}</td>
              <td>{new Date(member.UserMemberships[member.UserMemberships.length - 1].createdAt).toLocaleDateString()}</td>
              <td>{new Date(member.UserMemberships[member.UserMemberships.length - 1].endDate).toLocaleDateString()}</td>
              <td>
                <Badge bg="primary" pill>Course</Badge>
              </td>
              <td>
                <Button variant="link" className="p-0">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}