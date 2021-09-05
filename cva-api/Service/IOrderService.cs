using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;
using cva_api.ViewModel;

namespace cva_api.Service
{
    public interface IOrderService
    {
        Task<List<OrderView>> GetOrders();
        Task<List<Order>> GetOrdersByUserId( string UserId);
        Task<Order> AddOrder( Order Order);
        Task<int?> DeleteOrderById(int ID);
    }
}
