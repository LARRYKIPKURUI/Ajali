import Swal from 'sweetalert2';

export const showSuccess = (title, text) => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#d32f2f'
  });
};

export const showError = (title, text) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#d32f2f'
  });
};

export const showWarning = (title, text) => {
  Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#d32f2f'
  });
};