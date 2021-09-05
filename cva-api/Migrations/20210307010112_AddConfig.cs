using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class AddConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Config",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Config", x => x.Name);
                });

            migrationBuilder.InsertData(
                table: "Config",
                columns: new[] { "Name", "Description", "Value" },
                values: new object[,]
                {
                    { "RED_REWARD", "红灯奖励", "0.06" },
                    { "GREEN_REWARD", "绿灯奖励", "0.09" },
                    { "BASE_REWARD", "基础奖励", "0.03" },
                    { "REBORN_LIGHTS", "重生所需灯数", "12" },
                    { "BONUS_LOGIC", "重生所需灯数", "{\"1\":{\"1\":0.125,\"2\":0.11164},\"2\":{\"1\":0.5556,\"2\":0.125,\"3\":0.05608},\"3\":{\"1\":0.03125,\"2\":0.05556,\"3\":0.125,\"4\":0.02483},\"4\":{\"1\":0.0283,\"2\":0.02778,\"3\":0.05556,\"4\":0.125},\"5\":{\"1\":0.01563,\"2\":0.01267,\"3\":0.02778,\"4\":0.05556,\"5\":0.125}}" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Config");
        }
    }
}
