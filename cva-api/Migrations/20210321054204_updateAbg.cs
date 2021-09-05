using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateAbg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 5,
                column: "Abg",
                value: 80f);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "18e67d64-6917-4529-a417-b72ed0dca604");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "dbe035ab-9aa6-4820-b553-f4633bbd14f4");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "7741a0f3-359e-4093-8a29-3cba4dc1c6d6", new DateTime(2021, 3, 21, 16, 42, 4, 12, DateTimeKind.Local).AddTicks(9610), "AQAAAAEAACcQAAAAEGg1H1QFaUXFPOL0mSoSWcUKDzvb4rDS6UgOwGMuDWX5GLukXz0i3TeV2xs8I4ormQ==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 5,
                column: "Abg",
                value: 50f);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "d503f5f2-a61d-4721-9116-7f3e528442da");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "83e61f33-ef16-4ac7-89e6-c5748a65a6e1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "5d02b714-71b1-4d42-97cd-852c67d3a50a", new DateTime(2021, 3, 21, 16, 35, 18, 440, DateTimeKind.Local).AddTicks(230), "AQAAAAEAACcQAAAAEE43GFDsgTsuNoPTBhvECFF2fXUT6MhAiId98Y9g/XDfo8VyZgqUxluJ6UIepedleQ==" });
        }
    }
}
