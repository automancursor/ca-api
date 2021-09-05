using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateProductStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductOrderStatus",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductStatus",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "434782a5-a9f8-4388-9589-5a9934716cf1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "85bbe0ee-8c87-4ef6-a5da-bf7abab341be");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "0487053f-d736-486a-bca3-e6fc79fe292a", new DateTime(2021, 7, 17, 0, 48, 46, 504, DateTimeKind.Local).AddTicks(5170), "AQAAAAEAACcQAAAAEKnXpbDe3XZsaT4cqn5E56Xyb0kLVpKsnytgxGcYUO0uhlN3Icp8uF/4sr7yZ7LKsA==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductStatus",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductOrderStatus",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "a005f07d-736e-4ee1-99d2-a7509ae3b493");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "acefb56d-5757-4827-a2d5-fc2e33964628");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "4607ba01-da93-4b2c-a575-9483750d32f0", new DateTime(2021, 7, 16, 20, 48, 23, 295, DateTimeKind.Local).AddTicks(1760), "AQAAAAEAACcQAAAAEBgK/9mLJy80j6L9pXNVyA35Fi9HTlyKcuv50GVZWhM5OpefbEY7J8LvT6IoZNTYnA==" });
        }
    }
}
