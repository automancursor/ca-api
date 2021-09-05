using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addsellerAvator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarImage",
                table: "SellerVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShopName",
                table: "SellerVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShopName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "shopAvatarImage",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "6f491748-e4b2-4155-a870-ede8f215a3b8");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "54c58d01-6b64-460b-852c-7a73cbafd50b");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "003041ba-7254-4a65-8ba1-eb478a2468b5", new DateTime(2021, 8, 11, 14, 31, 54, 549, DateTimeKind.Local).AddTicks(5170), "AQAAAAEAACcQAAAAEGKBqGQEBOcnYhYxx+46zHC7oswmwXP7rBL6QhwG30dT97ZG5CV5OoFuQMFuB2rqAg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarImage",
                table: "SellerVerifications");

            migrationBuilder.DropColumn(
                name: "ShopName",
                table: "SellerVerifications");

            migrationBuilder.DropColumn(
                name: "ShopName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "shopAvatarImage",
                table: "AspNetUsers");

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
    }
}
