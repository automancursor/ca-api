using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateTransactionToId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FromId",
                table: "Transactions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<float>(
                name: "Amount",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "ToId",
                table: "Transactions",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "98ffac1c-8488-4e77-9731-ab465b776130");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "96fe749a-b252-4005-9d35-ab2b4342f0ed");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7bc76530-69e1-4ed4-83d1-613a18f0bc76", "AQAAAAEAACcQAAAAEEVTcUFwJjrAd795S7Rzt7hx2n1R5oFdnklOEKlW9rzVF27syzqAltkwUooiwcGqCg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToId",
                table: "Transactions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Transactions",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Amount",
                table: "Transactions",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FromId",
                table: "Transactions",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3da8a1df-a735-47d5-bab1-e0b8d43a0b09");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "8be435b3-b34c-4dee-8a00-162e2bc0c497");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "54546e3f-3b23-47ef-842e-6a644a4b81f2", "AQAAAAEAACcQAAAAEPzEkYWtlSvXfOYnAC3FRqWJWMspusyrgG09M60iV39v8mtnm0GL+NlBF72xiYCpzQ==" });
        }
    }
}
