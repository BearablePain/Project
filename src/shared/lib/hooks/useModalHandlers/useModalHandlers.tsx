import { useCallback, useState } from 'react';

const useModalHandlers = (initialOpen?: boolean) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(initialOpen);

  const onToggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  return {
    onToggleModal,
    isOpenModal,
  };
};

export default useModalHandlers;
