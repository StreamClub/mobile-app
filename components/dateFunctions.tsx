import React from 'react'

const formatter = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

export const formatDate = (date: string) => {
    return formatter.format(new Date(date))
}

export const calculateAge = (birthDate: string) => {
    const _birthDate = new Date(birthDate).getTime();
    const _actualDate = new Date().getTime();
    var diff =(_actualDate - _birthDate) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
}