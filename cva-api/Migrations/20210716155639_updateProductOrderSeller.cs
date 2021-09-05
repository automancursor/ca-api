using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateProductOrderSeller : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductIds",
                table: "ProductOrders");

            migrationBuilder.AddColumn<string>(
                name: "OrderProducts",
                table: "ProductOrders",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SellerId",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SellerName",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3be9246b-f957-4c85-ba85-8a32521537de");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ac1fa01f-6d91-4625-a17a-79330e8df612");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "0fa6a0d1-b2a3-4e9a-bb63-9d6a409bf567", new DateTime(2021, 7, 17, 1, 56, 38, 650, DateTimeKind.Local).AddTicks(7180), "AQAAAAEAACcQAAAAELgvrJmaKSf5Z9EHj3SIxtKJiJIjH8pKaze8IPMzRB8VDktKzJdsI4onetkS3vsuwg==" });

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrders_SellerId",
                table: "ProductOrders",
                column: "SellerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductOrders_AspNetUsers_SellerId",
                table: "ProductOrders",
                column: "SellerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductOrders_AspNetUsers_SellerId",
                table: "ProductOrders");

            migrationBuilder.DropIndex(
                name: "IX_ProductOrders_SellerId",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "OrderProducts",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "SellerId",
                table: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "SellerName",
                table: "ProductOrders");

            migrationBuilder.AddColumn<string>(
                name: "ProductIds",
                table: "ProductOrders",
                type: "text",
                nullable: true);

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
    }
}
