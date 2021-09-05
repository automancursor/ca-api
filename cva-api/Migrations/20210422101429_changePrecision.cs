using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class changePrecision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "BeforeValue",
                table: "WalletHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<float>(
                name: "AfterValue",
                table: "WalletHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<float>(
                name: "Cva",
                table: "Wallet",
                type: "float(10, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<float>(
                name: "Abg",
                table: "Wallet",
                type: "float(10, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<float>(
                name: "ChangedValue",
                table: "AreaHistories",
                type: "float(10, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<float>(
                name: "BeforeValue",
                table: "AreaHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.AlterColumn<float>(
                name: "AfterValue",
                table: "AreaHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "0a5b1f25-7a98-4fcb-b1aa-9ecd452a4684");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "4d6b2188-1b50-410d-a8e2-0c1987ca3bd0");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "273cac4d-497b-4414-b5ce-95e8d3471247", new DateTime(2021, 4, 22, 20, 14, 29, 222, DateTimeKind.Local).AddTicks(7490), "AQAAAAEAACcQAAAAEKdFYusypGBHU4pipOzbBAJkDphiZjuSdArEdBqnI6e6oiDuS0ZaOO8CzSDXWQKRHg==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Abg", "Cva" },
                values: new object[] { 0f, 15800f });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "BeforeValue",
                table: "WalletHistories",
                type: "double",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<double>(
                name: "AfterValue",
                table: "WalletHistories",
                type: "double",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<double>(
                name: "Cva",
                table: "Wallet",
                type: "double",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(10, 3)");

            migrationBuilder.AlterColumn<double>(
                name: "Abg",
                table: "Wallet",
                type: "double",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(10, 3)");

            migrationBuilder.AlterColumn<double>(
                name: "ChangedValue",
                table: "AreaHistories",
                type: "double",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(10, 3)");

            migrationBuilder.AlterColumn<double>(
                name: "BeforeValue",
                table: "AreaHistories",
                type: "double",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<double>(
                name: "AfterValue",
                table: "AreaHistories",
                type: "double",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "d6ac83c0-6e27-42a1-a952-37239386c006");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "9b9e49bb-53e9-499c-89a2-3ca1fab206c1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "0913a199-299d-4c6f-82de-6c9ce561a537", new DateTime(2021, 4, 22, 19, 27, 19, 553, DateTimeKind.Local).AddTicks(3860), "AQAAAAEAACcQAAAAEAdTSKvE2rhL6eTqkY4wmCnZYayuSVOpyRyxfOKkH1dlemTr3FxIVjczjTIawYJ8Zg==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Abg", "Cva" },
                values: new object[] { 0.0, 15800.0 });
        }
    }
}
