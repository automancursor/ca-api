using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addCompanyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "SellerVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "RptProducts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Products",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "905af5b2-11c1-4e88-93ca-aa77f5c45dea");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ef819a6b-7b19-439d-8c2f-71d95876aee6");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "e154667f-373b-4740-a227-f4a19b7642ab", new DateTime(2021, 8, 5, 18, 9, 40, 819, DateTimeKind.Local).AddTicks(4060), "AQAAAAEAACcQAAAAEFqq/Y1sHan66QI5n5ZSl684t4zvbPRdVzY+j+5C3cKZzWwCeosYRVdpXyC/YIP0RA==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "SellerVerifications");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "RptProducts");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Products");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "23a0f834-d654-49af-b757-b3f146487247");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "e2626ae4-df16-48bd-a41a-d5899e3e0a13");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "173d1fc4-4441-4284-bcb9-3ffb2f14e1b9", new DateTime(2021, 8, 4, 22, 38, 35, 886, DateTimeKind.Local).AddTicks(9390), "AQAAAAEAACcQAAAAEGVg3QuMeOmR+MfNqWA+BIPD43Gv5M0UCoxnVWEPFQyJC51+/RQIqg22W3N8emrvUA==" });
        }
    }
}
