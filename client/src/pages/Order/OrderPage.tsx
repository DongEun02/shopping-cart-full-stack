import { colors } from '../../shared/styles/theme';
import Flex from '../../shared/layout/Flex';
import Header from '../../shared/ui/Header';
import Image from '../../shared/ui/Image';
import back from '../../assets/back.svg';
import OrderSection from './ui/OrderSection';
import OrderList from './ui/OrderList';
import Modal from './ui/Modal';
import { BottomButton, CouponButton } from '../../shared/ui/Button';
import OrderSummary from './ui/OrderSummary';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OrderPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const submitCoupon = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex
      direction="column"
      gap={36}
      align="center"
      styles={{
        backgroundColor: colors.white,
        width: '430px',
        minHeight: '100vh',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <Header>
        <Image
          alt="뒤로가기"
          src={back}
          width={32}
          height={32}
          onClick={() => navigate('/')}
          styles={{ cursor: 'pointer' }}
        />
      </Header>
      <OrderSection>
        <OrderList />
        <CouponButton isInModal={false} onClick={handleModal}>
          쿠폰 적용
        </CouponButton>
        <OrderSummary />
      </OrderSection>

      <BottomButton onClick={() => navigate('/payment-checkout')}>
        결제하기
      </BottomButton>

      {/* 모달 */}
      {isModalOpen && (
        <>
          <div
            css={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#00000059',
              zIndex: 1,
            }}
          />
          <Modal onClick={handleModal} onSubmit={submitCoupon} />
        </>
      )}
    </Flex>
  );
}
