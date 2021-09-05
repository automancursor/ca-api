using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addProductOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductOrders",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    Cvt = table.Column<double>(nullable: false),
                    OrderDetail = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOrders", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ProductOrders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "0f179788-0adf-4312-bf2e-c29137502482");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "f3517680-0572-4e08-a2ad-5992bccdfac6");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "dcb6aab8-1834-440c-85fc-da853c545ec3", new DateTime(2021, 6, 30, 21, 8, 46, 65, DateTimeKind.Local).AddTicks(7470), "AQAAAAEAACcQAAAAELk8LWhzK6cj6JfyTCLSw+ZgEcF0ZDfnIHpH6mwNP8KU7iLnEj62HTmZiXCOckMY3Q==" });

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrders_UserId",
                table: "ProductOrders",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductOrders");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AspNetUsers");

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
    }
}
