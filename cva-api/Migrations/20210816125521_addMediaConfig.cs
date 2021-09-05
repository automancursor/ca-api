using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addMediaConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MediaConfigs",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaConfigs", x => x.Name);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MediaConfigs");

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
    }
}
