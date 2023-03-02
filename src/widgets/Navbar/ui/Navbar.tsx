import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import useModalHandlers from 'shared/lib/hooks/useModalHandlers/useModalHandlers';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const { isOpenModal, onToggleModal } = useModalHandlers();
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t('Войти')}
      </Button>
      <Modal isOpen={isOpenModal} onClose={onToggleModal}>
        {/* eslint-disable-next-line max-len */}
        {t('БлаБлаБлаБла')}
      </Modal>
    </div>
  );
};
