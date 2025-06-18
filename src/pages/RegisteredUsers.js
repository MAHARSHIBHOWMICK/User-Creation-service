import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Row, Col, Alert, Button, Modal, Form } from 'react-bootstrap';

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/users')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await axios.delete(`http://127.0.0.1:8000/users/${id}`);;
    setUsers(prev => prev.filter(user => user.id !== id));
  } catch (error) {
    console.error("Error deleting user", error);
  }
};

  const handleUpdateClick = (user) => {
    setCurrentUser({ ...user }); // clone to avoid direct mutation
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async () => {
  try {
    const { id, email, first_name, last_name, password } = currentUser;
const res = await axios.put(`http://127.0.0.1:8000/users/${id}`, {
  email,
  first_name,
  last_name,
  password,
});


    setUsers(prev =>
      prev.map(u => u.id === id ? res.data : u)
    );
    handleModalClose();
  } catch (error) {
    console.error("Error updating user", error);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3 text-center">Registered Users</Card.Title>

            <div className="text-center mb-3">
              <Button variant="secondary" onClick={fetchUsers}>
                Refresh Users
              </Button>
            </div>

            {loading ? (
              <div className="text-center">Loading...</div>
            ) : users.length === 0 ? (
              <Alert variant="info" className="text-center">
                No users registered yet.
              </Alert>
            ) : (
              <ListGroup>
                {users.map(user => (
                  <ListGroup.Item key={user.email} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{user.first_name} {user.last_name}</strong> — {user.email}
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleDelete(user.id)}>Delete</button>
                      <Button variant="outline-primary" size="sm" onClick={() => handleUpdateClick(user)}>Update</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={currentUser.email} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="first_name" value={currentUser.first_name} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="last_name" value={currentUser.last_name} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={currentUser.password} onChange={handleModalChange} disabled />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleModalSubmit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RegisteredUsers;
