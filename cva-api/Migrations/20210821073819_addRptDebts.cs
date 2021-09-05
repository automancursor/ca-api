using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addRptDebts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "RptDebts",
                table: "Wallet",
                type: "decimal(10, 3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3290e81f-8f88-4c39-b270-cfb6df781f2d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "baf14b15-66a5-40eb-8b5e-aa756c20d80c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "cef3245f-01af-4ea1-8b8e-0706f983c69e", new DateTime(2021, 8, 21, 17, 38, 18, 825, DateTimeKind.Local).AddTicks(5930), "AQAAAAEAACcQAAAAEEFRdbv9qqR1Ko9DPNeVasI3P1dsMfkq5OZ5K0FW8ZXcp74J68hTEDQ9Q8+EyBzsJg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RptDebts",
                table: "Wallet");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "6a85f3d6-cdce-4505-8a24-1ac008e835b9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "81c13f24-dd0b-4771-9e4d-0d6aee9d8ce3");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "5b3e35f3-2318-4ba8-8530-7843193f9a1f", new DateTime(2021, 8, 21, 17, 21, 52, 956, DateTimeKind.Local).AddTicks(1380), "AQAAAAEAACcQAAAAEP97+E/QuMvaEya96FJoCml/UF9EBdpQ+TYcLdikFrVH1tQFKJzd2qmK61Qc49bkLg==" });
        }
    }
}
