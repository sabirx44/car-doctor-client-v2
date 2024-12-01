import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const BookService = () => {
    const services = useLoaderData();
    const { service_id, title, img, price } = services;
    const { user } = useContext(AuthContext);
    const [phone, setPhone] = useState();

    const handleBookedService = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = user?.email;
        const date = form.date.value;
        const booking = {
            service_id,
            title,
            img,
            price,
            name,
            phone,
            email,
            date
        };
        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    alert("Service booked successfully!")
                }
            });
    };

    return (
        <div>
            <h2 className="text-5xl mb-6">Book Service: {title}</h2>
            <form className="card-body" onSubmit={handleBookedService}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={user?.displayName}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="US"
                        value={phone}
                        onChange={setPhone}
                        name="phone"
                        className="input input-bordered w-full"
                        placeholder="Enter phone number"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Date</span>
                    </label>
                    <input
                        type="date"
                        name="date"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        Order Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookService;