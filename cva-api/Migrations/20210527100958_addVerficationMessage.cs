using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addVerficationMessage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminMessage",
                table: "UserVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserMessage",
                table: "UserVerifications",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminMessage",
                table: "UserVerifications");

            migrationBuilder.DropColumn(
                name: "UserMessage",
                table: "UserVerifications");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "199b96f0-d019-4d5d-8812-bd66a3e5fa80");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "c2b761ca-77e4-4937-979b-1832857c098e");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "c27bd1c0-ec45-4381-abee-1e99e8c74b0d", new DateTime(2021, 4, 26, 19, 41, 3, 978, DateTimeKind.Local).AddTicks(5900), "AQAAAAEAACcQAAAAEEfZXAoIfK6W9jHz/Ye7XJ4bSzfcYiYTIeKRMeP0HMVhhW3xF81/D2MOOc/UhYRC0g==" });
        }
    }
}
