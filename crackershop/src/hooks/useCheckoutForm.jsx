import { useState } from 'react';
import { validateForm } from '../utils/formValidation';

export function useCheckoutForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    specialInstructions: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const validation = validateForm(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  return {
    formData,
    errors,
    handleInputChange,
    validate
  };
}
