using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;
using cva_api.ViewModel;

namespace cva_api.Service
{
    public interface IProductOrderService
    {
        Task<List<ProductOrder>> GetProductOrders();
        Task<ProductOrder> GetProductOrder(int id);
        Task<List<RptProductOrder>> GetRptProductOrders();
        Task<RptProductOrder> GetRptProductOrder(int id);
        Task<List<Product>> GetProducts();
        Task<List<RptProduct>> GetRptProducts();
        Task<Product> GetProduct(int ID);
        Task<RptProduct> GetRptProduct(int ID);
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(int ID);
        Task<List<ProductOrder>> GetProductOrdersByUserId( string UserId);
        Task<List<ProductOrder>> GetProductOrdersBySellerId( string SellerId);
        Task<ProductOrder> GetProductOrdersById( int id);

        Task<List<RptProductOrder>> GetRptProductOrdersByUserId( string UserId);
        Task<List<RptProductOrder>> GetRptProductOrdersBySellerId( string SellerId);
        Task<RptProductOrder> GetRptProductOrdersById( int id);

        Task<List<Product>> GetProductsByUserId( string UserId);
        Task<List<RptProduct>> GetRptProductsByUserId( string UserId);

        Task<List<Product>> GetProductsByCategoryId(int CategoryId);
        Task<List<RptProduct>> GetRptProductsByCategoryId(int CategoryId);
        Task<string> AddProductOrder( ProductOrder ProductOrder);

        Task<string> AddRptProductOrder( RptProductOrder RptProductOrder);
        Task<string> AddProduct( Product Product);
        Task<string> AddRptProduct( RptProduct rptProduct);

        Task<string> AddCategory( Category Category);        
        Task<int> UpdateProductOrder( ProductOrder ProductOrder);
        Task<int> UpdateRptProductOrder( RptProductOrder RptProductOrder);
        Task<int> RewardRptProductOrder( RptProductOrder RptProductOrder);
        Task<int> UpdateProducts( Product Product);
        Task<int> DeleteProduct(Product Product);
        Task<int> UpdateRptProducts( RptProduct rptProduct);
        Task<int> DeleteRptProduct(RptProduct rptProduct);
        Task<int> UpdateCategory( Category Category);
       
    }
}
