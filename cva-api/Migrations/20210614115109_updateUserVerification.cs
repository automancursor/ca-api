using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateUserVerification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "UserVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "UserVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "UserVerifications",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3c7b751e-d4b9-47c4-b072-a73996794c08");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "67e33c7f-5154-4ba3-a139-df76eec08d79");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "9af15f75-10ab-4f0e-8371-db2c68cef1bb", new DateTime(2021, 6, 14, 21, 51, 8, 631, DateTimeKind.Local).AddTicks(4780), "AQAAAAEAACcQAAAAEGLnJACNOovdcY+NKD95sMGMx/IUY3MO/IWMc1XE0mrmziZkj9+KNFY7LlkxIP8YDw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "UserVerifications");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "UserVerifications");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "UserVerifications");

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
        }
    }
}
