using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addCompanyDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CompanyDescription",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "6a85f3d6-cdce-4505-8a24-1ac008e835b9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "81c13f24-dd0b-4771-9e4d-0d6aee9d8ce3");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "5b3e35f3-2318-4ba8-8530-7843193f9a1f", new DateTime(2021, 8, 21, 17, 21, 52, 956, DateTimeKind.Local).AddTicks(1380), "AQAAAAEAACcQAAAAEP97+E/QuMvaEya96FJoCml/UF9EBdpQ+TYcLdikFrVH1tQFKJzd2qmK61Qc49bkLg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyDescription",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "ebb651c0-4a32-4e89-b01e-f0845902a5a0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "a6e55a5a-4ac1-415d-adf0-99556e9624b9");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "a1df56ac-aedd-4a18-8483-c90241efbfae", new DateTime(2021, 8, 16, 22, 55, 20, 556, DateTimeKind.Local).AddTicks(9680), "AQAAAAEAACcQAAAAEPkdtz1/A0mO9DGiDS52252x2qKGSPuFSbSzsQg8YfnoEwGztPyv3wVMxh+QjZ2XmQ==" });
        }
    }
}
