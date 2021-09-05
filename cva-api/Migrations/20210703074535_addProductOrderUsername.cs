using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addProductOrderUsername : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "ProductOrders",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "e5008732-fa27-48c8-8562-9ffcd76704c1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "a7db95c9-702f-4456-9604-9b321306472f");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "6ec8ee67-7847-4728-b38f-9cd93e0f3d63", new DateTime(2021, 7, 3, 17, 45, 35, 389, DateTimeKind.Local).AddTicks(5540), "AQAAAAEAACcQAAAAEPIz0KyIRah8ubbwL35mCmxA9HJ/UVB1Q8aGbyIiw5EyA8zrCP4NK+AsfOh2qF/3hA==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "ProductOrders");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "0f179788-0adf-4312-bf2e-c29137502482");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "f3517680-0572-4e08-a2ad-5992bccdfac6");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "dcb6aab8-1834-440c-85fc-da853c545ec3", new DateTime(2021, 6, 30, 21, 8, 46, 65, DateTimeKind.Local).AddTicks(7470), "AQAAAAEAACcQAAAAELk8LWhzK6cj6JfyTCLSw+ZgEcF0ZDfnIHpH6mwNP8KU7iLnEj62HTmZiXCOckMY3Q==" });
        }
    }
}
