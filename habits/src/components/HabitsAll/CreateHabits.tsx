// components/CreateHabits.tsx

'use client';

import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addHabit } from '../../helpers/habitsHelpers'; 
import { AuthContext } from '../Context/AuthContext'; 

// Validación con Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre del hábito es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
});

const CreateHabits = () => {
  const authContext = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (authContext?.user) {
        await addHabit({ name: values.name, userId: authContext.user.uid });
        formik.resetForm();
      }
    }
  });

  if (!authContext || !authContext.user) {
    return <div>Error: No estás autenticado.</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Hábito</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Nombre del hábito"
          className={`border border-gray-300 rounded-md p-2 w-full ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        ) : null}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Crear
      </button>
    </form>
  );
};

export default CreateHabits;
