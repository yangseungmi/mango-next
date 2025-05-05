export enum OrderStatus {
    RECEIVED = 'received',
    CANCELLED = 'cancelled',
    SCHEDULED_CALL = 'scheduled_call',
    VISIT_CONFIRMED = 'visit_confirmed',
    COMPLETED = 'completed',
}

export const OrderStatusLabels: Record<OrderStatus, string> = {
    [OrderStatus.RECEIVED]: '접수 완료',
    [OrderStatus.CANCELLED]: '접수 취소',
    [OrderStatus.SCHEDULED_CALL]: '전화 예정',
    [OrderStatus.VISIT_CONFIRMED]: '방문 확정',
    [OrderStatus.COMPLETED]: '수리 완료',
};
