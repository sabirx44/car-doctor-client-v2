import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import BookingRow from "./BookingRow";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Booking = () => {
  // Get user from AuthContext
  const { user } = useContext(AuthContext);
  // State to store bookings
  const [bookings, setBookings] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Fetch bookings when component mounts or user email changes
  // const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const url = `/bookings?email=${user?.email}`;
  useEffect(() => {
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => setBookings(data))

    // axios.get(url, { withCredentials: true })
    //   .then(res => {
    //     setBookings(res.data);
    //   })

    axiosSecure.get(url)
      .then(res => setBookings(res.data))
  }, [axiosSecure, url]);

  // Handle booking deletion
  const handleDelete = async (id) => {
    if (window.confirm("Confirm Delete?")) {
      try {
        const response = await fetch(`https://car-doctor-server-v2-orcin.vercel.app/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();

        if (data.deletedCount > 0) {
          alert('Deleted successfully!');
          setBookings(bookings.filter(booking => booking._id !== id));
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  // Handle booking approval
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`https://car-doctor-server-v2-orcin.vercel.app/bookings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Approved' })
      });
      const data = await response.json();

      if (data.modifiedCount > 0) {
        const updatedBookings = bookings.map(booking =>
          booking._id === id ? { ...booking, status: 'Approved' } : booking
        );
        setBookings(updatedBookings);
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <BookingRow
              key={booking._id}
              booking={booking}
              handleDelete={handleDelete}
              handleApprove={handleApprove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;