using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateTransactionType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "06bea9bd-df9e-49b2-8540-3202ca74b99d");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "4ed8003d-bcaf-4701-a93d-7f0f644cede7");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "95c6e4bb-02d6-4301-a4d6-ec5b741d4ffd", new DateTime(2021, 8, 6, 21, 40, 27, 252, DateTimeKind.Local).AddTicks(8970), "AQAAAAEAACcQAAAAEGnxVMF1s9LWS4LHhu6rIY5CKQwttEppNEntOZchD0i58w/Zm8xkp/0vJXfzivNunQ==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
