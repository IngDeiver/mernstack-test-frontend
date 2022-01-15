import toast from 'react-hot-toast'

export const showSuccessToast = (message: string) => {
    toast.success(message)
}

export const showErrorToast = (message: string) => {
    toast.error(message)
}

export const showLoadingToast = (message: string = "Loading...") => {
    return toast.loading(message)
}

export const  dismissToast = (toastId: any) => {
    toast.dismiss(toastId)
}