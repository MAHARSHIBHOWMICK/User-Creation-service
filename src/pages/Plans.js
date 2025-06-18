import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Plans = () => {
  const plans = [
    { name: 'Free', price: '$0/month', features: ['Basic support', 'Limited access'] },
    { name: 'Pro', price: '$9.99/month', features: ['Priority support', 'All features'] },
    { name: 'Enterprise', price: '$29.99/month', features: ['24/7 support', 'Custom integrations'] },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelect = (planName) => {
    setSelectedPlan(planName);
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Choose a Plan</h3>
      <Row className="justify-content-center">
        {plans.map((plan) => (
          <Col md={4} key={plan.name}>
            <Card
              className={`mb-4 shadow-sm ${selectedPlan === plan.name ? 'border-primary' : ''}`}
              onClick={() => handleSelect(plan.name)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Title className="text-center">{plan.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">{plan.price}</Card.Subtitle>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div className="text-center mt-3">
                  {selectedPlan === plan.name ? (
                    <Button variant="primary" disabled>
                      Selected
                    </Button>
                  ) : (
                    <Button variant="outline-primary">Select</Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedPlan && (
        <div className="text-center mt-4">
          <h5>You have selected: <strong>{selectedPlan}</strong> plan.</h5>
          <Button variant="success">Confirm Plan</Button>
        </div>
      )}
    </Container>
  );
};

export default Plans;
