using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class changePrecision2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Cva",
                table: "Wallet",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(10, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "ChangedValue",
                table: "AreaHistories",
                type: "float(20, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(10, 3)");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Cva",
                table: "Wallet",
                type: "float(10, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

            migrationBuilder.AlterColumn<float>(
                name: "ChangedValue",
                table: "AreaHistories",
                type: "float(10, 3)",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "float(20, 3)");

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
        }
    }
}
