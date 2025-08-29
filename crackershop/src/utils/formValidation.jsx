export const validateForm = (formData) => {
  const newErrors = {};

  // Required fields validation
  if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
  if (!formData.email.trim()) newErrors.email = 'Email is required';
  if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
  if (!formData.address.trim()) newErrors.address = 'Address is required';
  if (!formData.city.trim()) newErrors.city = 'City is required';
  if (!formData.state.trim()) newErrors.state = 'State is required';
  if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';

  // Format validation
  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
    newErrors.phone = 'Please enter a valid 10-digit phone number';
  }

  if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
    newErrors.pincode = 'Please enter a valid 6-digit pincode';
  }

  return {
    errors: newErrors,
    isValid: Object.keys(newErrors).length === 0
  };
};