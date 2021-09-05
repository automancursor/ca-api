using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addUserIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserIndex",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0);

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
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash", "UserIndex" },
                values: new object[] { "1777b81a-54a1-4ccd-8d38-70fe66179180", new DateTime(2021, 3, 15, 22, 42, 13, 595, DateTimeKind.Local).AddTicks(3670), "AQAAAAEAACcQAAAAEEVIfytgAQR4CUon9ASvk2xSlcnqdCkEUsN2Tnf2DeESrsZAfO0ptDAS0Y3EnmZuFg==", 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserIndex",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "8087daa4-5c82-463e-8553-632a3e9ac548");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "8e202119-8fca-462b-8939-fff9f3657f87");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "bea6c3d5-1bc7-454d-be83-d4438002bbd0", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "AQAAAAEAACcQAAAAEPmX+pLNfD0xIar+A8OhcgU4yhO877SWl1kbXitafVnuCGLLW5l4OqrpXEVgraSfng==" });
        }
    }
}
