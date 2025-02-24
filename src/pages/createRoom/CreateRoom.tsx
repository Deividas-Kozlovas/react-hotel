import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../../services/roomService";
import { useRoomContext } from "../../context/RoomContext";
import { ClipLoader } from "react-spinners"; // Import the loader

const CreateRoom = () => {
  const [roomData, setRoomData] = useState({
    number: "",
    capacity: 1,
    floor: 1,
    pricing: 0,
    wifi: false,
    parking: false,
    breakfast: false,
    imageFile: null as File | null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { handleCreateRoom } = useRoomContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file" && files) {
      setRoomData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setRoomData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await createRoom(roomData);

      if (response && response.data) {
        handleCreateRoom(response.data);
      }

      console.log("Room created successfully:", response);
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create a New Room</h2>

      {error && (
        <Alert variant="danger">
          <strong>Error: </strong> {error}
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
            required
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
            required
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
            required
          />
        </Form.Group>

        <Form.Group controlId="roomImage" className="mb-3">
          <Form.Label>Room Image</Form.Label>
          <Form.Control
            type="file"
            name="imageFile"
            onChange={handleChange}
            required
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
            required
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

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <ClipLoader size={20} color={"#fff"} loading={true} />
              {" Creating room..."}
            </>
          ) : (
            "Create Room"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRoom;
