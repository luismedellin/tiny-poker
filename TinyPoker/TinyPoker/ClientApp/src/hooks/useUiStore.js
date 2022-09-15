import { useDispatch, useSelector } from 'react-redux';
import { onOpenModal, onCloseModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isModalOpen } = useSelector( state => state.ui );

    const openModal = () => {
        dispatch( onOpenModal() )
    }

    const closeModal = () => {
        dispatch( onCloseModal() )
    }

    const toggleDateModal = () => {
        (isModalOpen)
            ? openModal()
            : closeModal();
    }

    return {
        //* Propiedades
        isModalOpen,

        //* Métodos
        closeModal,
        openModal,
        toggleDateModal,
    }
}
