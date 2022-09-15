import React, { useEffect } from 'react'
import { Formik, Field } from 'formik';
import Modal from 'react-modal';

import * as yup from 'yup';
import { useChatRoomStore, useRoomStore, useUiStore, useUserStore } from '../../hooks';

const schema = yup.object().shape({
    name: yup.string()
            .required('Ingrese el nombre de la historia de usuario')
            .min(2, 'Ingrese al menos 2 caracteres')
  });

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        innerHeight: "5 rem !important",
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

  Modal.setAppElement('#root');

export const NewUserHistoryModal = ({userHistories}) => {

    const { isModalOpen, closeModal } = useUiStore();
    const { createUserHistory, addUserHistory } = useRoomStore();
    const { messages } = useChatRoomStore();
    const { user } = useUserStore();

    useEffect(() => {
        if (!messages.length) return;
        const createMessages = messages.find(m=> m.messageType === "createUserHistory" && user.userId !== m.user );
        
        if (createMessages){
            addUserHistory(JSON.parse(createMessages.message));
        }

    }, [messages])

    const onCloseModal = () => {
        closeModal()
    }

    const validateName = (name) => {
        let error;
        if (userHistories.some(us=> us.title === name))
            error = 'Historia de usuario existente';
        return error;
    }

    const saveAndReset = (values, resetForm)  => {
        createUserHistory(values.name);
        resetForm();
    }

    const saveAndClose = (values)  => {
        createUserHistory(values.name);
        closeModal();
    }

    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 300 }
        >
            <div className="modal-header">
                <h5 className="modal-title text-center">Nueva Historia de Usuario</h5>
                <button type="button" className="btn-close" onClick={onCloseModal}>
                </button>
            </div>

            <div className="modal-body">
            <Formik
                initialValues={{ name: '' }}
                validationSchema={ schema }
                >
                {({
                values,
                isValid,
                dirty,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm
                }) => (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Ingresa el nombre la User History</label>
                        <Field name="name" validate={ validateName } className="form-control mb-2" />
                        <span className="text-danger">
                            { errors.name && touched.name && <div>{errors.name}</div> }
                        </span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button 
                            className="btn btn-primary"
                            disabled={!(isValid && dirty)}
                            onClick={()=> saveAndReset(values, resetForm)}
                        >Guardar & Continuar</button>
                        <button 
                            className="btn btn-primary"
                            disabled={!(isValid && dirty)}
                            onClick={()=> saveAndClose(values)}
                        >Guardar & Cerrar</button>
                    </div>

                </form>
                )}
            </Formik>
            </div>
        </Modal>
    )
}
