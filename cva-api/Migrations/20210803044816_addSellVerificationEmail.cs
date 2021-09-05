using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addSellVerificationEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "SellerVerifications",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3368661c-f377-4569-b8ec-62605d5f0ed8");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "23c2379a-7ba0-41f9-9e3a-4b740e0de21c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "91420e6b-b274-4874-a519-4221e3333f8b", new DateTime(2021, 8, 3, 14, 48, 15, 334, DateTimeKind.Local).AddTicks(2200), "AQAAAAEAACcQAAAAEHgL0Ca6tqnnNW6pFZSOVDNVrcqcYdb/Yqq1iLZiYA2Z5VdEcy2oeZDnAcGZgEb9/g==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "SellerVerifications");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "06c565c5-2005-4c0b-be95-5c133281fea9");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "7e9e2bf5-6bf2-494a-8fa9-af07062e463d");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "5e0db512-2d0e-4a04-9174-51ddb63a40ff", new DateTime(2021, 7, 17, 18, 1, 37, 404, DateTimeKind.Local).AddTicks(1240), "AQAAAAEAACcQAAAAEIuxcq/R/lyj1gNWEdnd3Wuemx1pryu7Gmjuc76H+4yoQhfh1sZxfYuRmWLoX3frKQ==" });
        }
    }
}
