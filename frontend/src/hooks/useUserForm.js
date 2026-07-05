import { useState } from 'react';

export default function useUserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [website, setWebsite] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    else if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!email) newErrors.email = 'Email is required';
    else if (!email.includes('@') || !email.includes('.')) newErrors.email = 'Valid email is required';
    
    if (age) {
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) newErrors.age = 'Invalid age';
    }
    
    if (phone && phone.trim()) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,9}$/;
      if (!phoneRegex.test(phone)) newErrors.phone = 'Invalid phone format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setName(''); setEmail(''); setPhone(''); setAge('');
    setCity(''); setCountry(''); setGender(''); setWebsite('');
    setEditUser(null); setErrors({});
  };

  const populateForm = (user) => {
    setEditUser(user);
    setName(user.name); setEmail(user.email); setPhone(user.phone || '');
    setAge(user.age); setCity(user.city || ''); setCountry(user.country);
    setGender(user.gender); setWebsite(user.website || '');
  };

  return {
    formData: { name, email, phone, age, city, country, gender, website, editUser, errors },
    setFunctions: { setName, setEmail, setPhone, setAge, setCity, setCountry, setGender, setWebsite, setEditUser },
    validate,
    clearForm,
    populateForm
  };
}