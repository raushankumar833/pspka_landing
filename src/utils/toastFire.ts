import Swal, { SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export interface ToastResponse {
  message?: string;
  data?: any;
}
export const Toast = Swal.mixin({
  showConfirmButton: true,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  width: 'max-content',
  background: '#fefefe',
  color: '#169816',
  iconColor: '#2fa92f',
  showCloseButton: true,
});

export const Toast1 = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  width: 'max-content',
  background: '#fefefe',
  color: '#169816',
  iconColor: '#2fa92f',
  showCloseButton: true,
});

export const ErrorToast = Swal.mixin({
  showConfirmButton: true,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
  width: 'max-content',
  background: '#ffffff',
  color: '#000000',
  iconColor: '#000000',
  showCloseButton: true,
});

export const NormalToast = Swal.mixin({
  confirmButtonColor: '#3578EA',
});

export const MySwal = withReactContent(Toast);
export const ErrorSwal = withReactContent(ErrorToast);

// type = 'success' | 'error' | 'warning' | 'info' | 'question'
export const okToast = (title: string, msg: string, type: SweetAlertOptions['icon']) => {
  MySwal.fire(title, msg, type);
};

export const okErrorToast = (title: string, msg: string) => {
  ErrorToast.fire(title, msg, 'error');
};

export const apiErrorToast = (error: any, history?: any) => {
  let msg = '';
  let status: number | undefined =
    error && error.response && error.response.status && error.response.status;
  if (error) {
    if (error.data) {
      error.response = error;
    }
    if (error.response) {
      status = error.response.status;
      if (error.response.data) {
        if (error.response.data.message) {
          if (typeof error.response.data.message === 'string') {
            msg = error.response.data.message;
          } else {
            const msgObj = error.response.data.message;
            msg = '';
            for (const i in msgObj) {
              msg += msgObj[i] + '\n';
            }
          }
        } else if (error.response.data.detail) {
          if (typeof error.response.data.detail === 'string') {
            msg = error.response.data.detail;
          } else {
            const msgObj = error.response.data.detail;
            msg = '';
            for (const i in msgObj) {
              msg += msgObj[i] + '\n';
            }
          }
        } else if (typeof error.response.data === 'object') {
          msg = JSON.stringify(error.response.data);
        } else {
          msg = error.response.data;
        }
      } else {
        msg = JSON.stringify(error.response);
      }
    } else {
      if (error.message) {
        msg = error.message;
      } else {
        msg = error;
      }
    }
  }
  if (status === 401) {
    ErrorSwal.fire({
      title: history ? 'Login Required!!' : 'Error!',
      text: msg,
      icon: 'error',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Login',
      showConfirmButton: history,
      showLoaderOnConfirm: history,
      preConfirm: () => {},
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      localStorage.clear();
      const location = window.location;
      const baseUrl = location.protocol + '//' + location.host;
      window.open(baseUrl, '_self');
    });
  }
  if (status === 500) {
    ErrorSwal.fire('', 'Something Went wrong', 'error');
  }
  if (status === 404 || status === 406) {
    ErrorSwal.fire('', msg ? msg : 'Something Went wrong', 'error');
  } else {
    ErrorSwal.fire('', msg ? msg : "Error can't be identified", 'error');
  }
  return msg;
};

export const okSuccessToast = (title: string, msg: string) => {
  Toast.fire(title, msg, 'success');
};

export const alertToast = (title: string, msg: string) => {
  Toast1.fire(title, msg, 'success');
};

export const showCopyDialog = (title: string, data: string) => {
  MySwal.fire({
    title: title,
    text: data,
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Copy',
    showLoaderOnConfirm: true,
    preConfirm: () => {},
    allowOutsideClick: () => !Swal.isLoading(),
    backdrop: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${title} copied successfully`,
      });
    }
  });
};

export const toastWithTimer = (
  msg: string,
  timer: number,
  title = 'Details Updated Successfully.'
) => {
  let timerInterval: NodeJS.Timeout;
  Swal.fire({
    title: `<div class="success-color">${title}</div>`,
    html: msg,
    timer: timer,
    timerProgressBar: true,
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      const htmlContainer = Swal.getHtmlContainer();
      const b = htmlContainer?.querySelector('strong');
      timerInterval = setInterval(() => {
        const t = Swal.getTimerLeft();
        if (b && timer && t) {
          b.textContent = (t / 1000).toFixed(0);
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      // Handle the case when the toast is closed due to the timer
    }
  });
};

export const toastInvoicePopup = (msg: string, timer: number) => {
  let timerInterval: NodeJS.Timeout;
  Swal.fire({
    title: '<div class="green-color">Please LogIn/SignUp to view Invoice</div>',
    html: msg,
    timer: timer,
    timerProgressBar: true,
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer()?.querySelector('strong');
      timerInterval = setInterval(() => {
        const t = Swal.getTimerLeft();
        if (b && timer && t) {
          b.textContent = (t / 1000).toFixed(0);
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
};
