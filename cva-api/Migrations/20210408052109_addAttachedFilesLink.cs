using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addAttachedFilesLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AttachedFilesLink",
                table: "Transactions",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "887b2740-080c-4ad9-a16f-12267a4da6f5");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "48476f2a-64e0-4bcf-b6d4-7b338bd91d7a");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "b709bc8e-4efa-4485-adcc-ec98807fe4bd", new DateTime(2021, 4, 8, 15, 21, 8, 966, DateTimeKind.Local).AddTicks(8880), "AQAAAAEAACcQAAAAEK6HNQ7AeZjg5EdkIFhcWhA4deoz1iOI/sDGfXVxoPzTXn3SnQtED6jcz/lG6Wy3qA==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachedFilesLink",
                table: "Transactions");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "ec6c65a4-e0b0-4f69-97bf-fa0f0ed2e907");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "068b68a9-6175-49cf-8cb9-45f9f51801ac");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "62006d6b-5364-4678-9ec1-8a054b7b21cf", new DateTime(2021, 3, 24, 22, 12, 35, 14, DateTimeKind.Local).AddTicks(7560), "AQAAAAEAACcQAAAAENZoEXZqR71pWcWO83jAUbvMKPMMjGti/w0ZMjBII1M6nhfju+B5Exa8fn97ZJetQg==" });
        }
    }
}
