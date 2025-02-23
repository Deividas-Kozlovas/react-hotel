import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap"; // Added Alert for error messages
import { useRoomContext } from "../../context/RoomContext";
import { useNavigate } from "react-router-dom";
import { SET_ERROR } from "../../actions/roomActions";

interface FormData {
  id: string;
  number: string;
  capacity: number;
  floor: number;
  room_image: string;
  pricing: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
}

const CreateRoom = () => {
  const { dispatch, state, handleCreateRoom } = useRoomContext();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState<FormData>({
    id: "",
    number: "",
    capacity: 1,
    floor: 1,
    room_image: "",
    pricing: 0,
    wifi: false,
    parking: false,
    breakfast: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRoomData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    dispatch({ type: SET_ERROR, payload: "" });

    if (
      !roomData.number ||
      !roomData.room_image ||
      !roomData.pricing ||
      !roomData.capacity
    ) {
      dispatch({
        type: SET_ERROR,
        payload: "Required fields are missing",
      });
      return;
    }

    if (roomData.capacity < 1 || roomData.capacity > 10) {
      dispatch({
        type: SET_ERROR,
        payload: "Capacity must be between 1 and 10",
      });
      return;
    }

    if (roomData.floor < 1 || roomData.floor > 4) {
      dispatch({
        type: SET_ERROR,
        payload: "Floor must be between 1 and 4",
      });
      return;
    }

    try {
      await handleCreateRoom(roomData);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({
          type: SET_ERROR,
          payload:
            error.message || "Error creating room. Please try again later.",
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: "An unexpected error occurred.",
        });
      }
    }
  };
  return (
    <Container className="mt-4">
      <h2>Create a New Room</h2>

      {state.error && (
        <Alert variant="danger">
          <strong>Error: </strong> {state.error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="roomNumber" className="mb-3">
          <Form.Label>Room Number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={roomData.number}
            onChange={handleChange}
            placeholder="Enter room number"
          />
        </Form.Group>

        <Form.Group controlId="capacity" className="mb-3">
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="number"
            name="capacity"
            value={roomData.capacity}
            onChange={handleChange}
            placeholder="Enter room capacity"
          />
        </Form.Group>

        <Form.Group controlId="floor" className="mb-3">
          <Form.Label>Floor</Form.Label>
          <Form.Control
            type="number"
            name="floor"
            value={roomData.floor}
            onChange={handleChange}
            placeholder="Enter room floor number"
          />
        </Form.Group>

        <Form.Group controlId="roomImage" className="mb-3">
          <Form.Label>Room Image</Form.Label>
          <Form.Control
            type="text"
            name="room_image"
            value={roomData.room_image}
            onChange={handleChange}
            placeholder="Enter image filename (e.g., room10.jpg)"
          />
        </Form.Group>

        <Form.Group controlId="pricing" className="mb-3">
          <Form.Label>Pricing</Form.Label>
          <Form.Control
            type="number"
            name="pricing"
            value={roomData.pricing}
            onChange={handleChange}
            placeholder="Enter room price"
          />
        </Form.Group>

        <Form.Group controlId="wifi" className="mb-3">
          <Form.Check
            type="checkbox"
            name="wifi"
            label="WiFi"
            checked={roomData.wifi}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="parking" className="mb-3">
          <Form.Check
            type="checkbox"
            name="parking"
            label="Parking"
            checked={roomData.parking}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="breakfast" className="mb-3">
          <Form.Check
            type="checkbox"
            name="breakfast"
            label="Breakfast"
            checked={roomData.breakfast}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          {state.loading ? "Creating room ..." : "Create Room"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRoom;
