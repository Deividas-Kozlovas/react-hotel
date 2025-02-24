import { useState } from "react";
import { Form, Button, Row, Col, Alert, Modal } from "react-bootstrap";
import { useReservationContext } from "../../../context/ReservationContext";
import { SET_ERROR, SET_LOADING } from "../../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { createReservation } from "../../../services/reservationServices";
import { Reservation } from "../../../actions/reservationActions";
import { ClipLoader } from "react-spinners";

const ReservationFormComponent = ({ room_id }: { room_id: string }) => {
  const { state, dispatch } = useReservationContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    checkin: "",
    checkout: "",
    room: room_id || "",
    user: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: SET_LOADING, payload: true });

    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser || !parsedUser.id) {
      dispatch({ type: SET_ERROR, payload: "User not found. Please log in." });
      return;
    }

    const updatedFormData: Reservation = {
      name: formData.name,
      address: formData.address,
      city: formData.city,
      zip: formData.zip,
      country: formData.country,
      checkin: formData.checkin,
      checkout: formData.checkout,
      room: room_id,
      user: parsedUser.id,
      is: "",
    };

    try {
      const response = await createReservation(updatedFormData);
      setReservationCode(response.data.code);
      setShowModal(true);
      dispatch({ type: SET_ERROR, payload: "" });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="reservation-form">
      <h2>Reservation Form</h2>
      <Form onSubmit={handleSubmit}>
        {state.error && <Alert variant="danger">{state.error}</Alert>}

        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="zip">
            <Form.Label>Zip Code:</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Enter zip code"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="checkin">
            <Form.Label>Check-in Date:</Form.Label>
            <Form.Control
              type="datetime-local"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="checkout">
            <Form.Label>Check-out Date:</Form.Label>
            <Form.Control
              type="datetime-local"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="country">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3 pb-5">
          <Button variant="primary" type="submit">
            {state.loading ? (
              <>
                <ClipLoader size={20} color={"#fff"} loading={true} />
                {" Making reservation..."}
              </>
            ) : (
              "Submit Reservation"
            )}
          </Button>
        </Row>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This is your reservation code: <strong>{reservationCode}</strong>
            <br />
            Write it down to track your booking.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReservationFormComponent;
