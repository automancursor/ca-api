using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addProductsAndCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProductIds",
                table: "ProductOrders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductOrderStatus",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CategoryName = table.Column<string>(nullable: true),
                    CategoryImage = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    CategoryId = table.Column<int>(nullable: false),
                    Cvt = table.Column<double>(nullable: false),
                    CvtPrice = table.Column<double>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    ProductDescription = table.Column<string>(nullable: true),
                    ProductCategory = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ProductImages = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    ProductOrderStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "fd514419-6bab-444a-b562-ca3836912563");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "5771bff9-665a-48b3-a71e-6eafa304fa6d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "d5bf1814-6bce-4474-9c04-6a3ca9b49129", new DateTime(2021, 7, 16, 20, 15, 54, 190, DateTimeKind.Local).AddTicks(4680), "AQAAAAEAACcQAAAAELHJ547g4pzCVdPGrgRpk89wq+a+ODmgcdBDPg0wDtdIi6g6Jqfc1ywMVzpyY3fCDA==" });

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_UserId",
                table: "Products",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropColumn(
                name: "ProductIds",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "ProductOrderStatus",
                table: "ProductOrders");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "54a24b91-239f-4294-8c04-07f496c86ac3");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "e1059c7a-9c8c-4f5b-98ab-f6d1dc5969eb");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "ec0ec0d9-0d0f-43dd-9e43-6853acebc29a", new DateTime(2021, 7, 9, 0, 46, 54, 465, DateTimeKind.Local).AddTicks(690), "AQAAAAEAACcQAAAAEDq0Jr05PXZgYoHoZpul6kdt2QJh0auDaQnxCvky2H4+3ZoGK6VXXUzulvw6J0tT/g==" });
        }
    }
}
