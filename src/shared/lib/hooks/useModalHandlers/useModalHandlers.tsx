import { useCallback, useState } from 'react';

const useModalHandlers = (initialOpen?: boolean) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(initialOpen);

  const onToggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  return {
    onToggleModal,
    isOpenModal,
    onOpenModal,
    onCloseModal,
  };
};

export default useModalHandlers;
