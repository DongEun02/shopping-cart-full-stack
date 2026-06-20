import Flex from '../../../shared/layout/Flex';
import List from '../../../shared/layout/List';
import OrderItem from '../../../entities/order/ui/OrderItem';

export default function OrderList() {
  return (
    <Flex as="section" direction="column" gap={20}>
      <List>
        <OrderItem />
      </List>
    </Flex>
  );
}
