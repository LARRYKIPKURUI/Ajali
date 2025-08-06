import Swal from 'sweetalert2';

export const showSuccess = (title, text) => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#10f51bff'
  });
};

export const showError = (title, text) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#eeff03ff'
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