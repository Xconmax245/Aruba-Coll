import React from 'react';
import { Order } from '@/lib/types';

interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left font-sans text-xs">
        <thead className="bg-ocean text-sand uppercase tracking-wider">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-ocean/5">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.customer_name}</td>
              <td className="p-3">{order.total_amount}</td>
              <td className="p-3 uppercase">{order.order_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
