import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useRoomContext } from "../../context/RoomContext";

const ReservationSearch = () => {
  const { checkAvailability } = useRoomContext();
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "checkin") {
      setCheckin(value);
    } else if (name === "checkout") {
      setCheckout(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!checkin || !checkout) {
      setError("Please provide both check-in and check-out dates.");
      setLoading(false);
      return;
    }

    try {
      await checkAvailability(checkin, checkout);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("An error occurred while checking room availability.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Check Room Availability</h2>

      {error && (
        <Alert variant="danger">
          <strong>Error: </strong> {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="checkin" className="mb-3">
          <Form.Label>Check-in Date</Form.Label>
          <Form.Control
            type="date"
            name="checkin"
            value={checkin}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="checkout" className="mb-3">
          <Form.Label>Check-out Date</Form.Label>
          <Form.Control
            type="date"
            name="checkout"
            value={checkout}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? "Checking Availability..." : "Check Availability"}
        </Button>
      </Form>
    </Container>
  );
};

export default ReservationSearch;
