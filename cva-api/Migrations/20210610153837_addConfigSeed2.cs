using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addConfigSeed2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "419a5e41-9291-4e29-843e-af26878125ff");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "1ad41f74-10ef-4e47-9e67-bb2fd18c23c1");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "17489900-d811-4d59-8d39-1459b59f0d13", new DateTime(2021, 6, 11, 1, 38, 36, 643, DateTimeKind.Local).AddTicks(4200), "AQAAAAEAACcQAAAAEJrxcKVbN3vU9uagt6gttGB8iSPc3FRMAWm+NK3lFUeQ1zeYG0DS36s/8NybhoLhnA==" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Name", "Description", "Value" },
                values: new object[] { "GRAND_REWARD", "上级奖励", "0.03" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "GRAND_REWARD");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "7b38eb71-1166-4f1c-805a-804106a9f3b4");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "4ed002f3-3fd0-4a54-bdae-c0fcdea10aac");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "6c05af2a-fbea-4815-ba25-585e6ce57acb", new DateTime(2021, 5, 27, 20, 9, 57, 963, DateTimeKind.Local).AddTicks(6870), "AQAAAAEAACcQAAAAEAEcehMPJuaLN2m0CLAdMYVvDOgiXYX4pCdjSjt207BnOmXYkwW9vFjcioX9snqg5Q==" });
        }
    }
}
