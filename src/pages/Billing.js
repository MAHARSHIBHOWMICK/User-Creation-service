import { Container, Card, Table, Row, Col, Form, Button } from 'react-bootstrap';

const Billing = () => {
  // Sample static invoice data
  const invoices = [
    { date: '2025-06-01', amount: '$49.99', status: 'Paid' },
    { date: '2025-05-01', amount: '$49.99', status: 'Paid' },
    { date: '2025-04-01', amount: '$49.99', status: 'Unpaid' },
  ];

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm mb-4">
            <h3 className="text-center mb-3">Billing & Invoices</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{invoice.date}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <span style={{color: invoice.status === 'Paid' ? 'green' : 'red',fontWeight: 'bold',}}>
                        {invoice.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          <Card className="p-4 shadow-sm">
            <h5 className="mb-3">Payment Method</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="XXXX XXXX XXXX XXXX" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="password" placeholder="•••" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Save Payment Method
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Billing;
