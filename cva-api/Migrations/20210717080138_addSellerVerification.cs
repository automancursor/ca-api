using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addSellerVerification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ProductOrderStatus",
                table: "ProductOrders",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Abn",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SellerVerified",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "SellerVerifications",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    CompanyAddress = table.Column<string>(nullable: true),
                    CompanyName = table.Column<string>(nullable: true),
                    ABN = table.Column<string>(nullable: true),
                    Mobile = table.Column<string>(nullable: true),
                    Registration = table.Column<string>(type: "text", nullable: true),
                    SellerVerificationStatus = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SellerVerifications", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SellerVerifications_AspNetUsers_UserId",
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

            migrationBuilder.CreateIndex(
                name: "IX_SellerVerifications_UserId",
                table: "SellerVerifications",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SellerVerifications");

            migrationBuilder.DropColumn(
                name: "Abn",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SellerVerified",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "ProductOrderStatus",
                table: "ProductOrders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3be9246b-f957-4c85-ba85-8a32521537de");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "ac1fa01f-6d91-4625-a17a-79330e8df612");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "0fa6a0d1-b2a3-4e9a-bb63-9d6a409bf567", new DateTime(2021, 7, 17, 1, 56, 38, 650, DateTimeKind.Local).AddTicks(7180), "AQAAAAEAACcQAAAAELgvrJmaKSf5Z9EHj3SIxtKJiJIjH8pKaze8IPMzRB8VDktKzJdsI4onetkS3vsuwg==" });
        }
    }
}
