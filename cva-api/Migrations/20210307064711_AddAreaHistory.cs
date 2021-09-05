using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class AddAreaHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Config",
                table: "Config");

            migrationBuilder.RenameTable(
                name: "Config",
                newName: "Configs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Configs",
                table: "Configs",
                column: "Name");

            migrationBuilder.CreateTable(
                name: "AreaHistories",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Msg = table.Column<string>(nullable: true),
                    CvaChange = table.Column<float>(nullable: false),
                    CvtChange = table.Column<float>(nullable: false),
                    AbgChange = table.Column<float>(nullable: false),
                    UpdateType = table.Column<string>(nullable: true),
                    SourceAreaRecordId = table.Column<int>(nullable: false),
                    ToAreaRecordId = table.Column<int>(nullable: false),
                    OrderId = table.Column<int>(nullable: false),
                    CreatedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AreaHistories", x => x.ID);
                });

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "RECHARGE_SURCHARGE",
                column: "Value",
                value: "0.1");

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "REWARD_SURCHARGE",
                column: "Value",
                value: "0.1");

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "TRANSACTION_SURCHARGE",
                column: "Value",
                value: "0.1");

            migrationBuilder.UpdateData(
                table: "Configs",
                keyColumn: "Name",
                keyValue: "WITHDRAW_SURCHARGE",
                column: "Value",
                value: "0.05");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AreaHistories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Configs",
                table: "Configs");

            migrationBuilder.RenameTable(
                name: "Configs",
                newName: "Config");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Config",
                table: "Config",
                column: "Name");

            migrationBuilder.UpdateData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "RECHARGE_SURCHARGE",
                column: "Value",
                value: "0.01");

            migrationBuilder.UpdateData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "REWARD_SURCHARGE",
                column: "Value",
                value: "0.01");

            migrationBuilder.UpdateData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "TRANSACTION_SURCHARGE",
                column: "Value",
                value: "0.01");

            migrationBuilder.UpdateData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "WITHDRAW_SURCHARGE",
                column: "Value",
                value: "0.01");
        }
    }
}
