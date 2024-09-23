'use client';

import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'; // Importar SweetAlert
import { addHabit } from '../../helpers/habitsHelpers';
import { AuthContext } from '../Context/AuthContext';

// Validación con Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre del hábito es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  startDate: Yup.date()
    .required('La fecha de inicio es requerida')
    .nullable(),
  endDate: Yup.date()
    .nullable()
    .min(Yup.ref('startDate'), 'La fecha de finalización no puede ser antes de la fecha de inicio'),
  frequency: Yup.string()
    .required('La frecuencia es requerida'),
  reminderTime: Yup.string()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'El formato de hora debe ser HH:MM')
    .nullable(),
});

const CreateHabits = () => {
  const authContext = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: '',
      endDate: '',
      frequency: 'daily',
      reminderTime: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (authContext?.user) {
        const habit = {
          name: values.name,
          startDate: values.startDate,
          endDate: values.endDate || null,
          frequency: values.frequency,
          reminderTime: values.reminderTime || null,
          userId: authContext.user.uid,
        };
        await addHabit(habit);
        formik.resetForm();

        // SweetAlert para confirmar creación exitosa
        Swal.fire({
          icon: 'success',
          title: '¡Hábito creado exitosamente!',
          text: 'Tu nuevo hábito ha sido añadido.',
        });
      }
    },
  });

  if (!authContext || !authContext.user) {
    return <div>Error: No estás autenticado.</div>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Hábito</h2>
      
      {/* Campo Nombre */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">Nombre del hábito</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border border-gray-300 rounded-md p-2 w-full ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

      {/* Campo Fecha de Inicio */}
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700 mb-2">Fecha de inicio</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border border-gray-300 rounded-md p-2 w-full ${formik.touched.startDate && formik.errors.startDate ? 'border-red-500' : ''}`}
        />
        {formik.touched.startDate && formik.errors.startDate ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
        ) : null}
      </div>

      {/* Campo Fecha de Finalización */}
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700 mb-2">Fecha de finalización</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formik.values.endDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border border-gray-300 rounded-md p-2 w-full ${formik.touched.endDate && formik.errors.endDate ? 'border-red-500' : ''}`}
        />
        {formik.touched.endDate && formik.errors.endDate ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.endDate}</div>
        ) : null}
      </div>

      {/* Campo Frecuencia */}
      <div className="mb-4">
        <label htmlFor="frequency" className="block text-gray-700 mb-2">Frecuencia</label>
        <select
          id="frequency"
          name="frequency"
          value={formik.values.frequency}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border border-gray-300 rounded-md p-2 w-full ${formik.touched.frequency && formik.errors.frequency ? 'border-red-500' : ''}`}
        >
          <option value="daily">Diario</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
         
        </select>
        {formik.touched.frequency && formik.errors.frequency ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.frequency}</div>
        ) : null}
      </div>

      {/* Campo Hora de Recordatorio */}
      <div className="mb-4">
        <label htmlFor="reminderTime" className="block text-gray-700 mb-2">Hora de recordatorio</label>
        <input
          type="time"
          id="reminderTime"
          name="reminderTime"
          value={formik.values.reminderTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`border border-gray-300 rounded-md p-2 w-full ${formik.touched.reminderTime && formik.errors.reminderTime ? 'border-red-500' : ''}`}
        />
        {formik.touched.reminderTime && formik.errors.reminderTime ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.reminderTime}</div>
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

