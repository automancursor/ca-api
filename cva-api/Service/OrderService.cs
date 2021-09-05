using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cva_api.Data;
using cva_api.Model;
using cva_api.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace cva_api.Service
{
    public class OrderService: IOrderService
    {
        SqlContext db;
        public OrderService(SqlContext _db)
        {
            this.db = _db;
        }

        public async Task<Order> AddOrder( Order Order)
        {
            if (db != null)
            {
                await db.Orders.AddAsync(Order);
                await db.SaveChangesAsync();
                return Order;
            }

            return null;
        }

        public async Task<int?> DeleteOrderById(int ID)
        {
            if (db != null)
            {
                var orderToRemove = await db.Orders.FirstOrDefaultAsync(i => i.ID == ID);
                db.Orders.Remove(orderToRemove);
                return await db.SaveChangesAsync();
            }

            return null;
        }

        public async Task<List<OrderView>> GetOrders()
        {
            if (db != null)
            {
                var result = await db.Orders.Include(e => e.User).Include(e => e.AreaRecord).ToListAsync();
                if(result == null){
                    return null;
                }
                var orderViewList = new List<OrderView>();
                foreach (var order in result)
                {
                    orderViewList.Add(
                        new OrderView(){
                            ID = order.ID,
                            UserId = order.UserId,
                            Username = order.User.UserName,
                            UserIndex = order.User.UserIndex,
                            Abg = order.Abg,
                            Msg = order.Msg,
                            Cva = order.Cva,
                            Cvt = order.Cvt,
                            CvtCredit = order.CvtCredit,
                            CreatedDate = order.CreatedDate,
                            AreaRecord = order.AreaRecord
                        }
                    );
                }
                return orderViewList;
            }

            return null;
        }

        public async Task<List<Order>> GetOrdersByUserId(string UserId)
        {
            if (db != null)
            {
                return await db.Orders.Include(e => e.AreaRecord).Where(i => i.UserId == UserId).ToListAsync();
            }

            return null;
        }

        
    }
}
