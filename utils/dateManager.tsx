const formatter = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

export const formatDate = (date: string) => {
    return formatter.format(new Date(date))
}

export const calculateAge = (birthDate: string, deathDate?: string) => {
    const _birthDate = new Date(birthDate).getTime();
    const _actualDate = deathDate? new Date(deathDate).getTime() : new Date().getTime();
    var diff =(_actualDate - _birthDate) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
}

export const formatDateDDMMYYYY = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
};