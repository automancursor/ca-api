using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateRptProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Rpt",
                table: "Wallet",
                type: "decimal(10, 3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "CompanyLink",
                table: "SellerVerifications",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RptRate",
                table: "SellerVerifications",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyLink",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "RptRate",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "RptProducts",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    CategoryId = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    ProductDescription = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ProductImages = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true),
                    ProductStatus = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RptProducts", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RptProducts_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RptProducts_AspNetUsers_UserId",
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

            migrationBuilder.CreateIndex(
                name: "IX_RptProducts_CategoryId",
                table: "RptProducts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_RptProducts_UserId",
                table: "RptProducts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RptProducts");

            migrationBuilder.DropColumn(
                name: "Rpt",
                table: "Wallet");

            migrationBuilder.DropColumn(
                name: "CompanyLink",
                table: "SellerVerifications");

            migrationBuilder.DropColumn(
                name: "RptRate",
                table: "SellerVerifications");

            migrationBuilder.DropColumn(
                name: "CompanyLink",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RptRate",
                table: "AspNetUsers");

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
    }
}
