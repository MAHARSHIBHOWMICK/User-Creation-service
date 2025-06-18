import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

const Notifications = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    inApp: true,
  });

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Notification Preferences:', preferences);
    // You can later send this to backend in Phase 4
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h3 className="text-center mb-4">Notification Preferences</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Check type="switch" id="email-switch" label="Email Notifications" name="email" checked={preferences.email} onChange={handleToggle} className="mb-3"/>
              <Form.Check type="switch" id="sms-switch" label="SMS Alerts" name="sms" checked={preferences.sms} onChange={handleToggle} className="mb-3"/>
              <Form.Check type="switch" id="inApp-switch" label="In-App Notifications" name="inApp" checked={preferences.inApp} onChange={handleToggle} className="mb-4"/>
              <Button type="submit" variant="primary" className="w-100">
                Save Preferences
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Notifications;
