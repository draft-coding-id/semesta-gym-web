import { Search } from "lucide-react";
import { useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";

interface AnggotaProps {
  members: any[];
}

export default function Anggota({ members }: AnggotaProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter((member) => {
    return member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.phone.includes(searchTerm);
  });
  return (
    <>
      <div className="mb-4 d-flex justify-content-between">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari anggota..."
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.phone}</td>
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
  )
}