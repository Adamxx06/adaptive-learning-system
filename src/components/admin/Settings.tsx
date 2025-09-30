import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const AdminSettings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.setAttribute("data-bs-theme", darkMode ? "light" : "dark");
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Admin Settings</h2>

      <Row>
        {/* General Settings */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">General Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter site name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Support Email</Form.Label>
                  <Form.Control type="email" placeholder="admin@codeadapt.com" />
                </Form.Group>
                <Button variant="primary">Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Admin Account */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Admin Account</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Admin username" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="••••••••" />
                </Form.Group>
                <Button variant="warning">Update Account</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Preferences */}
        <Col md={6}>
          <Card className="shadow-sm mb-4">
            <Card.Header as="h5">Preferences</Card.Header>
            <Card.Body>
              <Form>
                <Form.Check
                  type="switch"
                  id="darkModeSwitch"
                  label="Enable Dark Mode"
                  checked={darkMode}
                  onChange={handleToggleTheme}
                />
                <Button variant="success" className="mt-3">
                  Save Preferences
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Live Preview */}
        <Col md={6}>
          <Card
            className={`shadow-sm mb-4 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
          >
            <Card.Header as="h5">Live Preview</Card.Header>
            <Card.Body>
              <p>This is a preview of how your dashboard looks in</p>
              <strong>{darkMode ? "Dark Mode" : "Light Mode"}</strong>
              <div className="mt-3">
                <Button variant={darkMode ? "light" : "dark"} className="me-2">
                  Sample Button
                </Button>
                <Button variant={darkMode ? "secondary" : "primary"}>
                  Action Button
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminSettings;
