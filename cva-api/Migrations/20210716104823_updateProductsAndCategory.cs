using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateProductsAndCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductCategory",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "Categories");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Products",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Categories",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Categories",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Categories");

            migrationBuilder.AddColumn<string>(
                name: "ProductCategory",
                table: "Products",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "Categories",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

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
        }
    }
}
