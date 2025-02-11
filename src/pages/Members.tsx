import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Dropdown } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { api } from '../services/api';
import Anggota from '../components/members/Anggota';
import ListMembers from '../components/members/Members';
import Course from '../components/members/Course';
import ModalCreateAnggota from '../components/members/ModalCreateAnggota';
import ModalCreateMember from '../components/members/ModalCreateMember';
import ModalCreateCourse from '../components/members/ModalCreateCourse';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState('anggota');
  const [createAnggotaModalShow, setCreateAnggotaModalShow] = useState(false);
  const [createMemberModalShow, setCreateMemberModalShow] = useState(false);
  const [createCourseModalShow, setCreateCourseModalShow] = useState(false);

  useEffect(() => {
    api.get('/user').then(res => {
      const member = res.filter((user: any) => {
        return user.role === 'member';
      });
      setMembers(member)
    }).catch(error => {
      console.error(error);
    });
  }, [
    createAnggotaModalShow, 
    createMemberModalShow,
    createCourseModalShow
  ]);

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
              <Dropdown.Item onClick={() => setCreateAnggotaModalShow(true)}>Anggota</Dropdown.Item>
              <Dropdown.Item onClick={() => setCreateMemberModalShow(true)}>Members</Dropdown.Item>
              <Dropdown.Item onClick={() => setCreateCourseModalShow(true)}>Course</Dropdown.Item>
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

      <ModalCreateAnggota
        show={createAnggotaModalShow}
        onHide={() => setCreateAnggotaModalShow(false)}
      />

      <ModalCreateMember
        show={createMemberModalShow}
        onHide={() => setCreateMemberModalShow(false)}
      />

      <ModalCreateCourse
        show={createCourseModalShow}
        onHide={() => setCreateCourseModalShow(false)}  
      />
    </Layout>
  );
}