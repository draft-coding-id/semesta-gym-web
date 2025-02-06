import { useState } from 'react';
import Layout from '../components/Layout';
import { Table, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

// Dummy data
const initialTransactions = [
  {
    id: 1,
    date: '2024-02-20',
    member: 'John Doe',
    type: 'Membership Premium',
    amount: 'Rp 1.500.000',
    status: 'Success'
  },
  {
    id: 2,
    date: '2024-02-19',
    member: 'Jane Smith',
    type: 'Personal Trainer',
    amount: 'Rp 500.000',
    status: 'Success'
  }
];

export default function Transactions() {
  const [transactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Transaksi</h2>
      </div>

      <div className="mb-4">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari transaksi..."
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
            <th>Tanggal</th>
            <th>Member</th>
            <th>Jenis Transaksi</th>
            <th>Jumlah</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.date}</td>
              <td>{transaction.member}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}