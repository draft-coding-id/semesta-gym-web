import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Dropdown } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { api } from '../services/api';
import Anggota from '../components/members/Anggota';
import ListMembers from '../components/members/Members';
import Course from '../components/members/Course';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('anggota');

  useEffect(() => {
    api.get('/user').then(res => {
      const member = res.filter((user: any) => {
        return user.role === 'member';
      });
      setMembers(member)
    }).catch(error => {
      console.error(error);
    });
  }, []);
  console.log(members)

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Anggota</h2>
        <div className='d-flex gap-4'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className='d-flex align-items-center gap-2 rounded-pill'>
            <Plus size={20} /> Tambah
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Anggota</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Members</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Course</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className='px-4 rounded-pill '>
              {filter === 'anggota' ? 'Anggota' : filter === 'members' ? 'Members' : 'Course'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setFilter('anggota')}>
                Anggota
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('members')}>
                Members
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('course')}>
                Course
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {filter === 'anggota' ? (
        <Anggota members={members} />
      ) : filter === 'members' ? (
        <ListMembers members={members} />
      ) : (
        <Course members={members}/>
      )}
    </Layout>
  );
}