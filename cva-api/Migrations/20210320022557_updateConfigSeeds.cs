using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateConfigSeeds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "4e3cfa64-5189-4a56-adc5-e328b627f012");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "0e6ef874-406f-4c97-baed-e6b18548e1e0");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "09953c0a-68cc-43df-9f97-eab6903a0bf4", new DateTime(2021, 3, 20, 13, 25, 57, 199, DateTimeKind.Local).AddTicks(3380), "AQAAAAEAACcQAAAAEFZUqu9e2gnw1xR7s4sQp0dHZX598YgNQ0//QHEt4jVgjONFu0p4KoJIebPgM/vLBg==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "BONUS_LOGIC",
                column: "Description",
                value: "衡量点产生逻辑");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "c28c5733-fa8f-40a3-83d1-542c37713d48");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "1de58f44-c089-4c09-9316-4017e4244810");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "cd4de9ed-392c-4f36-aed9-c120c8e06f74", new DateTime(2021, 3, 18, 16, 9, 15, 20, DateTimeKind.Local).AddTicks(7810), "AQAAAAEAACcQAAAAEOUkwW7zOpCfR38DixhRuKO4RExuAu1qrVzlWhSRIhAbUoBBtixh9oiUmxeTjbkYTA==" });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "BONUS_LOGIC",
                column: "Description",
                value: "重生所需灯数");
        }
    }
}
