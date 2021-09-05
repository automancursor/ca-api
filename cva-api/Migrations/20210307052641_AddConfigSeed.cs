using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class AddConfigSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Config",
                columns: new[] { "Name", "Description", "Value" },
                values: new object[,]
                {
                    { "REWARD_SURCHARGE", "奖励手续费", "0.01" },
                    { "TRANSACTION_SURCHARGE", "转账手续费", "0.01" },
                    { "WITHDRAW_SURCHARGE", "提现手续费", "0.01" },
                    { "RECHARGE_SURCHARGE", "充值手续费", "0.01" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "RECHARGE_SURCHARGE");

            migrationBuilder.DeleteData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "REWARD_SURCHARGE");

            migrationBuilder.DeleteData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "TRANSACTION_SURCHARGE");

            migrationBuilder.DeleteData(
                table: "Config",
                keyColumn: "Name",
                keyValue: "WITHDRAW_SURCHARGE");
        }
    }
}
