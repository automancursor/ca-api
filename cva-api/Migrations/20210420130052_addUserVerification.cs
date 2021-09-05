using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addUserVerification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TransactionMethod",
                table: "Transactions",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AliPay",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BankDetailCN",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BlockChainWalletAddress",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CountryCode",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdCard",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OverSeaBankDetail",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Passport",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wechat",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserVerifications",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<string>(nullable: true),
                    Passport = table.Column<string>(type: "text", nullable: true),
                    IdCard = table.Column<string>(type: "text", nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserVerifications", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserVerifications_AspNetUsers_UserId",
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
                value: "846a7d47-880e-4574-b793-9e68aa865215");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "928325d9-e9e2-4d4f-a595-2353994de4a7");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "31161668-1e96-405a-a57a-4f0a4bee9234", new DateTime(2021, 4, 20, 23, 0, 51, 645, DateTimeKind.Local).AddTicks(8200), "AQAAAAEAACcQAAAAEPcGNf2phUMXCLLSi4LGMgXa+AAqkSdV8dtbtImrX+iW8/2J2/YOX0GsOCJgjmxDKg==" });

            migrationBuilder.CreateIndex(
                name: "IX_UserVerifications_UserId",
                table: "UserVerifications",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserVerifications");

            migrationBuilder.DropColumn(
                name: "TransactionMethod",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "AliPay",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BankDetailCN",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "BlockChainWalletAddress",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CountryCode",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IdCard",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "OverSeaBankDetail",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Passport",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Wechat",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "f30496ab-bbd4-4298-985e-97492c1149f0");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "45719a43-e0e1-474a-b5c4-a79dfb35401c");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "02cbe43d-6fb5-4e1b-9718-6ccd3bd38c22", new DateTime(2021, 4, 17, 12, 45, 12, 668, DateTimeKind.Local).AddTicks(2360), "AQAAAAEAACcQAAAAECIiBqU2wOmqkRRqQee7VibewYmHL7nvOi/bND/WwD4tf1apZG3GLnIiq/PJIik6pw==" });
        }
    }
}
