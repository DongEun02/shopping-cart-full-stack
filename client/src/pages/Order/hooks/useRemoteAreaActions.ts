import type { Order } from '../../../entities/order/types';
import { setQueryData } from '../../../shared/hooks/useQuery';
import { useOrderContext } from '../contexts/OrderContext';

export function useRemoteAreaActions() {
  const {
    orderId,
    isMutationLoading,
    mutate,
    fetchOrder,
    updateRemoteArea,
    dispatchOrderAction,
  } = useOrderContext();

  const changeRemoteArea = async (isRemoteArea: boolean) => {
    if (isMutationLoading) return;

    try {
      await mutate(async () => {
        await updateRemoteArea(orderId, isRemoteArea);
        const order = await fetchOrder(orderId);

        dispatchOrderAction({ type: 'SET_ORDER', order });
        setQueryData<Order>(`order:${orderId}`, () => order);
      });
    } catch {
      return;
    }
  };

  return {
    changeRemoteArea,
  };
}
