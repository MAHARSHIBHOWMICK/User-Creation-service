import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserProfile from './pages/UserProfile';
import Notifications from './pages/Notifications';
import Billing from './pages/Billing';
import Plans from './pages/Plans';
import RegisteredUsers from './pages/RegisteredUsers';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1 p-3">
            <Routes>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/" element={<UserProfile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/registered-users" element={<RegisteredUsers />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
