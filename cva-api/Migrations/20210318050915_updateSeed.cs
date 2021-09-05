using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 2,
                column: "Abg",
                value: 10f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 3,
                column: "Abg",
                value: 20f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 4,
                column: "Abg",
                value: 40f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 5,
                column: "Abg",
                value: 50f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 6,
                column: "Abg",
                value: 1f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 7,
                column: "Abg",
                value: 2f);

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
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                column: "Cva",
                value: 15800f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 2,
                column: "Abg",
                value: 5f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 3,
                column: "Abg",
                value: 5f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 4,
                column: "Abg",
                value: 5f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 5,
                column: "Abg",
                value: 5f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 6,
                column: "Abg",
                value: 5f);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 7,
                column: "Abg",
                value: 5f);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "568e6bae-f23f-4aea-b6bd-f63f9abc519f");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "7e5386a2-b7b8-4ef8-9d50-9b2a971cd6a1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "1777b81a-54a1-4ccd-8d38-70fe66179180", new DateTime(2021, 3, 15, 22, 42, 13, 595, DateTimeKind.Local).AddTicks(3670), "AQAAAAEAACcQAAAAEEVIfytgAQR4CUon9ASvk2xSlcnqdCkEUsN2Tnf2DeESrsZAfO0ptDAS0Y3EnmZuFg==" });

            migrationBuilder.UpdateData(
                table: "Wallet",
                keyColumn: "Id",
                keyValue: "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                column: "Cva",
                value: 10000f);
        }
    }
}
