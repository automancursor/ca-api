using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addUserNameInVerification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "UserVerifications",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "UserVerifications");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "b03ea1b5-bc3e-4b95-8b59-e9222c9e5cc6");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ef41355e-14be-401b-84bb-ac9af2429e45");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "8c07089a-ff80-40ed-b45e-0c8053d0135a", new DateTime(2021, 4, 22, 22, 6, 38, 500, DateTimeKind.Local).AddTicks(7460), "AQAAAAEAACcQAAAAEHZCN+EJL+2yZkmoeyI+cWgSewFa7pbwzH8WT6Ye+T4D5UVE4ed8Jowcn0s5VUYdOg==" });
        }
    }
}
