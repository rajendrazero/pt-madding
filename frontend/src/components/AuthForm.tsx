import React, { useState } from 'react';

interface AuthFormProps {
  onSubmit: (data: any) => void;
  submitButtonText: string;
  fields: { label: string; name: string; type: string }[];
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, submitButtonText, fields }) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
        {submitButtonText}
      </button>
    </form>
  );
};

export default AuthForm;