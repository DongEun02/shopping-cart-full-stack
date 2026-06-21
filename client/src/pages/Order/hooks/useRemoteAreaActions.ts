import type { Order } from '../../../entities/order/types';
import { setQueryData } from '../../../shared/hooks/useQuery';
import { useOrderContext } from '../contexts/OrderContext';

export function useRemoteAreaActions() {
  const {
    order,
    orderId,
    isMutationLoading,
    mutate,
    fetchOrder,
    updateRemoteArea,
    dispatchOrderAction,
  } = useOrderContext();

  const changeRemoteArea = async (isRemoteArea: boolean) => {
    if (isMutationLoading || !order) return;

    const previousOrder = order;
    dispatchOrderAction({ type: 'CHANGE_REMOTE_AREA', isRemoteArea });

    try {
      await mutate(async () => {
        await updateRemoteArea(orderId, isRemoteArea);
        const order = await fetchOrder(orderId);

        dispatchOrderAction({ type: 'SET_ORDER', order });
        setQueryData<Order>(`order:${orderId}`, () => order);
      });
    } catch {
      dispatchOrderAction({ type: 'SET_ORDER', order: previousOrder });
      return;
    }
  };

  return {
    changeRemoteArea,
  };
}
