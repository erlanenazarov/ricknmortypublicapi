import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal';
import Alert from 'antd/lib/alert';

import { Form } from 'components/Form';

import { makeSelectFormValues } from 'store/forms/selectors';
import { initForm, removeForm, setFormInitials } from 'store/forms/actions';
import { updateCharacterDetail } from 'store/characters/actions';

import { IEditModalProps } from './types';
import { config, FORM_NAME } from './config';
import { normalize } from './normalize';
import { submit } from './submit';
import styles from './EditModal.module.css';

export const EditModal = (props: IEditModalProps): JSX.Element => {
  const { isOpen, onClose, character } = props;

  const dispatch = useDispatch();

  const formValues = useSelector(makeSelectFormValues(FORM_NAME));

  const handleSubmit = () => {
    dispatch(updateCharacterDetail(submit(formValues)));
    handleClose();
  };

  const handleClose = () => {
    if (!onClose) return;
    onClose();
    dispatch(
      setFormInitials({ name: FORM_NAME, values: normalize(character) }),
    );
  };

  useEffect(
    () => {
      dispatch(
        initForm({
          name: FORM_NAME,
          config,
          initialValues: normalize(character),
        }),
      );

      return () => {
        dispatch(removeForm({ name: FORM_NAME }));
      };
    },
    // Need to call this effect only once at render
    // eslint-disable-next-line
    [],
  );

  return (
    <Modal
      title="Change character"
      open={isOpen}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText="Save"
      destroyOnClose
    >
      <Alert
        message="Attention!"
        description="In the public GraphQL API from Rick & Morty there is no mutation for changing data on the server, so the changes from this form will only affect the redux store"
        type="warning"
        showIcon
        className={styles.alert}
      />

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name={FORM_NAME}
        config={config}
        includeSubmitButton={false}
        initialValues={normalize(character)}
      />
    </Modal>
  );
};
