import Header from '../../shared/ui/Header';

export default function CheckoutPage() {
  return (
    <div
      css={{
        width: '430px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Header page="checkout" />
    </div>
  );
}
