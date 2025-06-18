import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-light p-3" style={{ minHeight: '100vh', width: '200px' }}>
      <h5>Dashboard</h5>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/profile">User Profile</Nav.Link>
        <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
        <Nav.Link as={Link} to="/billing">Billing & Invoices</Nav.Link>
        <Nav.Link as={Link} to="/plans">Plans & Add-ons</Nav.Link>
        <Nav.Link as={Link} to="/registered-users">Registered Users</Nav.Link>

       
      </Nav>
    </div>
  );
};

export default Sidebar;
