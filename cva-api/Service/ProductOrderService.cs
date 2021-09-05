using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using cva_api.Data;
using cva_api.Model;
using cva_api.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace cva_api.Service
{
    public class ProductOrderService : IProductOrderService
    {
        SqlContext db;
        public ProductOrderService(SqlContext _db)
        {
            this.db = _db;
        }
        public async Task<string> AddRptProductOrder(RptProductOrder RptProductOrder)
        {
            if (this.db != null)
            {
                var user = await db.Users
                   .Include(e => e.Wallet)
                   .Include(e => e.Wallet.WalletHistories)
                   .FirstOrDefaultAsync(x => x.Id == RptProductOrder.UserId);
                var bbw = await db.Users
                    .Include(x => x.Wallet)
                    .Include(x => x.Wallet.WalletHistories)
                    .FirstOrDefaultAsync(x => x.Id == UserConsts.AdminUserId);
                if (user == null || bbw == null)
                {
                    return "invalid user";
                }
                if (RptProductOrder.Currency == "Cva" && user.Wallet.Cvt < RptProductOrder.Price)
                {
                    return "insufficient Cva Balance";
                }

                await db.RptProductOrders.AddAsync(RptProductOrder);
                var result = await db.SaveChangesAsync();
                if (RptProductOrder.Currency == "Cva")
                {
                    user.Wallet.WalletHistories.Add(
                        new WalletHistory
                        {
                            Wallet = user.Wallet,
                            BeforeValue = user.Wallet.Cva,
                            AfterValue = user.Wallet.Cva - RptProductOrder.Price,
                            UpdateType = "Cva",
                            Msg = $"用户{user.Id}购买积分商品订单:{RptProductOrder.ID},",
                            CreatedDate = DateTime.Now,
                            WalletHistoryType = WalletHistoryType.USER_TRANSEFER,
                        }
                    );
                    bbw.Wallet.WalletHistories.Add(
                        new WalletHistory
                        {
                            Wallet = bbw.Wallet,
                            BeforeValue = bbw.Wallet.Cva,
                            AfterValue = bbw.Wallet.Cva + RptProductOrder.Price,
                            UpdateType = "Cva",
                            Msg = $"用户{user.Id}购买积分商品订单:{RptProductOrder.ID},",
                            CreatedDate = DateTime.Now,
                            WalletHistoryType = WalletHistoryType.USER_TRANSEFER,
                        }
                    );
                }

                user.Wallet.Cva -= RptProductOrder.Price;
                bbw.Wallet.Cva += RptProductOrder.Price;
                this.db.Users.Update(user);
                this.db.Users.Update(bbw);
                await db.SaveChangesAsync();
                return "SUCCESS";
            }
            return null;
        }
        public async Task<string> AddProductOrder(ProductOrder ProductOrder)
        {
            if (this.db != null)
            {
                var user = await db.Users
                   .Include(e => e.Wallet)
                   .Include(e => e.Wallet.WalletHistories)
                   .FirstOrDefaultAsync(x => x.Id == ProductOrder.UserId);
                var bbw = await this.db.Users
                    .Include(x => x.Wallet)
                    .Include(x => x.Wallet.WalletHistories)
                    .FirstOrDefaultAsync(x => x.Id == UserConsts.AdminUserId);
                if (user == null || bbw == null)
                {
                    return "invalid user";
                }

                if (user.Wallet.Cvt < ProductOrder.Cvt)
                {
                    return "insufficient Cvt Balance";
                }
                await this.db.ProductOrders.AddAsync(ProductOrder);
                var result = await this.db.SaveChangesAsync();

                user.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = user.Wallet,
                        BeforeValue = user.Wallet.Cva,
                        AfterValue = user.Wallet.Cvt - ProductOrder.Cvt,
                        UpdateType = "Cvt",
                        Msg = $"用户{user.Id}购买商品订单:{ProductOrder.ID},",
                        CreatedDate = DateTime.Now,
                        WalletHistoryType = WalletHistoryType.USER_TRANSEFER,
                    }
                );
                bbw.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = bbw.Wallet,
                        BeforeValue = bbw.Wallet.Cva,
                        AfterValue = bbw.Wallet.Cvt + ProductOrder.Cvt,
                        UpdateType = "Cvt",
                        Msg = $"用户{user.Id}购买商品订单:{ProductOrder.ID},",
                        CreatedDate = DateTime.Now,
                        WalletHistoryType = WalletHistoryType.USER_TRANSEFER,
                    }
                );
                user.Wallet.Cvt -= ProductOrder.Cvt;
                bbw.Wallet.Cvt += ProductOrder.Cvt;
                this.db.Users.Update(user);
                this.db.Users.Update(bbw);
                await this.db.SaveChangesAsync();
                return "SUCCESS";
            }
            return null;
        }

        public async Task<List<ProductOrder>> GetProductOrdersByUserId(string UserId)
        {
            if (db != null)
            {
                var result = await db.ProductOrders.Where(x => x.UserId == UserId).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }

        public async Task<List<RptProductOrder>> GetRptProductOrdersByUserId(string UserId)
        {
            if (db != null)
            {
                var result = await db.RptProductOrders.Where(x => x.UserId == UserId).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }

        public async Task<List<ProductOrder>> GetProductOrders()
        {
            if (db != null)
            {
                var result = await db.ProductOrders.ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }
        public async Task<List<RptProductOrder>> GetRptProductOrders()
        {
            if (db != null)
            {
                var result = await db.RptProductOrders.ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }
        public async Task<int> UpdateProductOrder(ProductOrder ProductOrder)
        {
            if (db != null)
            {
                var result = await db.ProductOrders.AsNoTracking().FirstOrDefaultAsync(x => x.ID == ProductOrder.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.ProductOrders.Update(ProductOrder);
                Type type = typeof(ProductOrder);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(ProductOrder, null) == null)
                    {
                        if (property.Name != "User" && property.Name != "Seller")
                        {
                            entry.Property(property.Name).IsModified = false;
                        }
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }
        public async Task<int> RewardRptProductOrder(RptProductOrder RptProductOrder)
        {
            if (db != null)
            {
                var seller = await this.db.Users.FirstOrDefaultAsync(x => x.Id == RptProductOrder.SellerId);
                var user = await this.db.Users.Include(x => x.Wallet).FirstOrDefaultAsync(x => x.Id == RptProductOrder.UserId);
                var referrer = await this.db.Users.Include(x => x.Wallet).FirstOrDefaultAsync(x => x.Id == user.ReferrerId);
                var grand = await this.db.Users.Include(x => x.Wallet).FirstOrDefaultAsync(x => x.Id == referrer.ReferrerId);
                if (user == null || referrer == null || grand == null)
                {
                    return 0;
                }
                var a = await db.Configs.FirstOrDefaultAsync(x => x.Name == "RPT_REWARD");
                var b = await db.Configs.FirstOrDefaultAsync(x => x.Name == "RPT_1_REWARD");
                var c = await db.Configs.FirstOrDefaultAsync(x => x.Name == "RPT_2_REWARD");
                if (a == null || b == null || c == null)
                {
                    return 0;
                }
                var resulta = (string)a.Value;
                var resultb = (string)b.Value;
                var resultc = (string)c.Value;
                var RPT_REWARD = double.Parse(resulta);
                var RPT_1_REWARD = double.Parse(resultb);
                var RPT_2_REWARD = double.Parse(resultc);
                var rpt = RptProductOrder.Price * seller.RptRate;
                user.Wallet.Rpt += rpt * RPT_REWARD;
                referrer.Wallet.Rpt += rpt * RPT_1_REWARD;
                grand.Wallet.Rpt += rpt * RPT_2_REWARD;
                return await db.SaveChangesAsync();
            }
            return 0;
        }
        public async Task<int> UpdateRptProductOrder(RptProductOrder RptProductOrder)
        {
            if (db != null)
            {
                var result = await db.RptProductOrders.AsNoTracking().FirstOrDefaultAsync(x => x.ID == RptProductOrder.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.RptProductOrders.Update(RptProductOrder);
                Type type = typeof(RptProductOrder);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(RptProductOrder, null) == null)
                    {
                        if (property.Name != "User" && property.Name != "Seller")
                        {
                            entry.Property(property.Name).IsModified = false;
                        }
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }
        public User ConvertToUserProfile(User user)
        {
            var result = new User()
            {
                Id = user.Id,
                Wallet = user.Wallet,
                UserName = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                ReferCode = user.ReferCode,
                CreatedDate = user.CreatedDate,
                UserIndex = user.UserIndex,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                EmailConfirmed = user.EmailConfirmed,
                Passport = user.Passport,
                IdCard = user.IdCard,
                CountryCode = user.CountryCode,
                BankDetailCN = user.BankDetailCN,
                OverSeaBankDetail = user.OverSeaBankDetail,
                BlockChainWalletAddress = user.BlockChainWalletAddress,
                AliPay = user.AliPay,
                Wechat = user.Wechat,
                Address = user.Address,
                CompanyName = user.CompanyName,
                Abn = user.Abn,
                RptRate = user.RptRate,
                SellerVerified = user.SellerVerified
            };

            return result;
        }

        public async Task<List<Product>> GetProducts()
        {
            if (db != null)
            {
                var result = await db.Products.Include(x => x.Category).Include(x => x.User).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result.Select(x =>
                {
                    x.User = this.ConvertToUserProfile(x.User);
                    return x;
                }).ToList();
            }
            return null;
        }
        public async Task<List<RptProduct>> GetRptProducts()
        {
            if (db != null)
            {
                var result = await db.RptProducts.Include(x => x.Category).Include(x => x.User).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result.Select(x =>
                {
                    x.User = this.ConvertToUserProfile(x.User);
                    return x;
                }).ToList();
            }
            return null;
        }

        public async Task<List<Category>> GetCategories()
        {
            if (db != null)
            {
                var result = await db.Categories.ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }

        public async Task<List<Product>> GetProductsByUserId(string UserId)
        {
            if (db != null)
            {
                var result = await db.Products.Include(x => x.Category).Include(x => x.User).Where(x => x.UserId == UserId).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result.Select(x =>
                {
                    x.User = this.ConvertToUserProfile(x.User);
                    return x;
                }).ToList();
            }
            return null;
        }
        public async Task<List<RptProduct>> GetRptProductsByUserId(string UserId)
        {
            if (db != null)
            {
                var result = await db.RptProducts.Include(x => x.Category).Include(x => x.User).Where(x => x.UserId == UserId).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result.Select(x =>
                {
                    x.User = this.ConvertToUserProfile(x.User);
                    return x;
                }).ToList();
            }
            return null;
        }

        public async Task<string> AddProduct(Product Product)
        {
            if (db != null)
            {
                await this.db.Products.AddAsync(Product);
                var result = await this.db.SaveChangesAsync();
                if (result > 0)
                {
                    return "SUCCESS";
                }
            }
            return null;
        }
        public async Task<string> AddRptProduct(RptProduct RptProduct)
        {
            if (db != null)
            {
                await this.db.RptProducts.AddAsync(RptProduct);
                var result = await this.db.SaveChangesAsync();
                if (result > 0)
                {
                    return "SUCCESS";
                }
            }
            return null;
        }

        public async Task<string> AddCategory(Category Category)
        {
            if (db != null)
            {
                await this.db.Categories.AddAsync(Category);
                var result = await this.db.SaveChangesAsync();
                if (result > 0)
                {
                    return "SUCCESS";
                }
            }
            return null;
        }

        public async Task<int> UpdateProducts(Product Product)
        {
            if (db != null)
            {
                var result = await db.Products.AsNoTracking().FirstOrDefaultAsync(x => x.ID == Product.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.Products.Update(Product);
                Type type = typeof(Product);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(Product, null) == null)
                    {
                        if (property.Name != "User" && property.Name != "Category")
                        {
                            entry.Property(property.Name).IsModified = false;
                        }
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> UpdateRptProducts(RptProduct rptProduct)
        {
            if (db != null)
            {
                var result = await db.RptProducts.AsNoTracking().FirstOrDefaultAsync(x => x.ID == rptProduct.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.RptProducts.Update(rptProduct);
                Type type = typeof(RptProduct);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(rptProduct, null) == null)
                    {
                        if (property.Name != "User" && property.Name != "Category")
                        {
                            entry.Property(property.Name).IsModified = false;
                        }
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }



        public async Task<int> DeleteProduct(Product Product)
        {
            if (db != null)
            {
                db.Products.Remove(Product);
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> DeleteRptProduct(RptProduct rptProduct)
        {
            if (db != null)
            {
                db.RptProducts.Remove(rptProduct);
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> UpdateCategory(Category Category)
        {
            if (db != null)
            {
                var result = await db.Categories.AsNoTracking().FirstOrDefaultAsync(x => x.ID == Category.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.Categories.Update(Category);
                Type type = typeof(Category);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(Category, null) == null)
                    {
                        if (property.Name != "User")
                        {
                            entry.Property(property.Name).IsModified = false;
                        }
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<Product> GetProduct(int ID)
        {
            if (db != null)
            {
                return await db.Products.Include(x => x.Category).Include(x => x.User).FirstOrDefaultAsync(x => x.ID == ID);
            }
            return null;
        }

        public async Task<RptProduct> GetRptProduct(int ID)
        {
            if (db != null)
            {
                return await db.RptProducts.Include(x => x.Category).Include(x => x.User).FirstOrDefaultAsync(x => x.ID == ID);
            }
            return null;
        }

        public async Task<Category> GetCategory(int ID)
        {
            if (db != null)
            {
                return await db.Categories.FirstOrDefaultAsync(x => x.ID == ID);
            }
            return null;
        }

        public async Task<List<Product>> GetProductsByCategoryId(int CategoryId)
        {
            if (db != null)
            {
                var result = await db.Products.Include(x => x.Category).Include(x => x.User).Where(x => x.CategoryId == CategoryId).ToListAsync();
                return result.Select(x =>
                {
                    x.User = this.ConvertToUserProfile(x.User);
                    return x;
                }).ToList();
            }
            return null;
        }

        public async Task<List<RptProduct>> GetRptProductsByCategoryId(int CategoryId)
        {
            if (db != null)
            {
                var result = await db.RptProducts.Include(x => x.Category).Include(x => x.User).Where(x => x.CategoryId == CategoryId).ToListAsync();
                return result.Select(x =>
                {
                    x.User = this.ConvertToUserProfile(x.User);
                    return x;
                }).ToList();
            }
            return null;
        }

        public async Task<ProductOrder> GetProductOrder(int id)
        {
            if (db != null)
            {
                return await db.ProductOrders.FirstOrDefaultAsync(x => x.ID == id);
            }
            return null;
        }
        public async Task<RptProductOrder> GetRptProductOrder(int id)
        {
            if (db != null)
            {
                return await db.RptProductOrders.FirstOrDefaultAsync(x => x.ID == id);
            }
            return null;
        }

        public async Task<RptProductOrder> GetRptProductOrdersById(int id)
        {
            if (db != null)
            {
                var result = await db.RptProductOrders.FirstOrDefaultAsync(x => x.ID == id);
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }

        public async Task<ProductOrder> GetProductOrdersById(int id)
        {
            if (db != null)
            {
                var result = await db.ProductOrders.FirstOrDefaultAsync(x => x.ID == id);
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }

        public async Task<List<ProductOrder>> GetProductOrdersBySellerId(string SellerId)
        {
            if (db != null)
            {
                var result = await db.ProductOrders.Where(x => x.SellerId == SellerId).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }
        public async Task<List<RptProductOrder>> GetRptProductOrdersBySellerId(string SellerId)
        {
            if (db != null)
            {
                var result = await db.RptProductOrders.Where(x => x.SellerId == SellerId).ToListAsync();
                if (result == null)
                {
                    return null;
                }
                return result;
            }
            return null;
        }
    }

}