"use client";
import React, { useState, Fragment } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format. Must be a Gmail address';
      isValid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number. Must be 10 digits';
      isValid = false;
    }

    // Validate Message (if required)
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If validation is successful, you can submit the form data
      console.log('Form data submitted:', formData);

      // Add your logic to send the data to the server or Google Sheets
      // Example: Use fetch or axios to send the data to your server
      try {
        const response = await fetch('/api/submitForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form data sent successfully.');
        } else {
          console.error('Error sending form data.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Form validation failed. Please check the errors.');
    }
  };

  return (
    <Fragment>
      <div className='h-full flex justify-center items-center'>
        <form className='w-96 p-6 rounded-2xl bg-gray-900' onSubmit={handleSubmit}>
          <div className='grid-cols-2 grid-rows-1 gap-6'>
            <div className='text-white'>Full Name</div>
            <div>
              <input
                size="lg"
                name="fullName"
                placeholder='Enter Your Full Name'
                className={`h-10 px-2 text-black w-full ${errors.fullName ? 'border-red-500' : ''}`}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
            </div>
          </div>
          <div className='grid-cols-2 grid-rows-1 gap-6 mt-4'>
            <div className='text-white'>Email</div>
            <div>
              <input
                size="lg"
                name="email"
                placeholder='yourname@gmail.com'
                className={`h-10 px-2 text-black w-full ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
          </div>
          <div className='grid-cols-2 grid-rows-1 gap-6 mt-4'>
            <div className='text-white'>Phone</div>
            <div>
              <input
                size="lg"
                name="phone"
                placeholder='Enter Your Phone No. (10 digits)'
                className={`h-10 px-2 text-black w-full ${errors.phone ? 'border-red-500' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="text-red-500">{errors.phone}</span>}
            </div>
          </div>
          <div className='grid-cols-2 grid-rows-1 gap-6 mt-4'>
            <div className='text-white'>Message</div>
            <div className='flex items-start'>
              <textarea
                name="message"
                className={`w-full px-2 py-1 text-black border ${errors.message ? 'border-red-500' : ''}`}
                placeholder='Write your message...'
                rows='4'
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <span className="text-red-500">{errors.message}</span>}
            </div>
          </div>

          <div className='grid-cols-2 grid-rows-1 gap-6 mt-4'>
            <div></div>
            <div className="flex items-center justify-center mt-5">
              <button type="submit" className="bg-lime-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Form;
