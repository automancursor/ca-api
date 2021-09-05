using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class changeDecimalPrecision3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "CvtCredit",
                table: "Wallet",
                type: "decimal(30, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<decimal>(
                name: "Cvt",
                table: "Wallet",
                type: "decimal(20, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "b03ea1b5-bc3e-4b95-8b59-e9222c9e5cc6");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ef41355e-14be-401b-84bb-ac9af2429e45");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "8c07089a-ff80-40ed-b45e-0c8053d0135a", new DateTime(2021, 4, 22, 22, 6, 38, 500, DateTimeKind.Local).AddTicks(7460), "AQAAAAEAACcQAAAAEHZCN+EJL+2yZkmoeyI+cWgSewFa7pbwzH8WT6Ye+T4D5UVE4ed8Jowcn0s5VUYdOg==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Cvt", "CvtCredit" },
                values: new object[] { 0m, 0m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "CvtCredit",
                table: "Wallet",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(30, 3)");

            migrationBuilder.AlterColumn<double>(
                name: "Cvt",
                table: "Wallet",
                type: "double",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "276563b5-1cf7-423d-84a2-a952112dec84");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "85c06d5e-4182-4aef-b42c-5280ae5eadf2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "b448186d-a201-4afd-8172-9bcf1f949929", new DateTime(2021, 4, 22, 21, 41, 27, 869, DateTimeKind.Local).AddTicks(4170), "AQAAAAEAACcQAAAAELzelH0KKVHkknR16F8JdOKSkhMxxis2ZVUpdjo3uuUsvCeXOgI5tQfEvqr45ANHeQ==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Cvt", "CvtCredit" },
                values: new object[] { 0.0, 0.0 });
        }
    }
}
