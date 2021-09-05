using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class changeDecimalPrecision : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "BeforeValue",
                table: "WalletHistories",
                type: "decimal(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<decimal>(
                name: "AfterValue",
                table: "WalletHistories",
                type: "decimal(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Cva",
                table: "Wallet",
                type: "decimal(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Abg",
                table: "Wallet",
                type: "decimal(10, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(10, 3)");

            migrationBuilder.AlterColumn<decimal>(
                name: "ChangedValue",
                table: "AreaHistories",
                type: "decimal(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<decimal>(
                name: "BeforeValue",
                table: "AreaHistories",
                type: "decimal(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<decimal>(
                name: "AfterValue",
                table: "AreaHistories",
                type: "decimal(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "198b0990-99b6-4199-9c5f-bdb364b20a90");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ee77ea87-4f98-4f4a-afa7-008f92c07971");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "63ce92b5-92d9-462e-a122-c18d25963a40", new DateTime(2021, 4, 22, 21, 36, 10, 53, DateTimeKind.Local).AddTicks(6260), "AQAAAAEAACcQAAAAEHfgw0quLmQB4p7NJcjG3pEqfWoEgSnqBd28WkbMhzqvWq6Mh4i5wOLkm+QNJz70ow==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Abg", "Cva" },
                values: new object[] { 0m, 15800m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "BeforeValue",
                table: "WalletHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "AfterValue",
                table: "WalletHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "Cva",
                table: "Wallet",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "Abg",
                table: "Wallet",
                type: "float(10, 3)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(10, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "ChangedValue",
                table: "AreaHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "BeforeValue",
                table: "AreaHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "AfterValue",
                table: "AreaHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(20, 3)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "433a5e74-1137-4110-a896-ac284b00244e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "46bb59ba-c678-4dcc-a2a9-4f566714dacb");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "4cf911ce-f042-485f-a3d4-cb7e2f580d48", new DateTime(2021, 4, 22, 21, 21, 28, 478, DateTimeKind.Local).AddTicks(3370), "AQAAAAEAACcQAAAAEKLIMvA2+BEtxFQc1Dj3dNWMf6Zp2pean2oswoWU97OEmEX/AMcNfeUBMRdu4+orOg==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                columns: new[] { "Abg", "Cva" },
                values: new object[] { 0f, 15800f });
        }
    }
}
