using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class UpdateAreaCliam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LastRewardedBlockNum",
                table: "AreaClaims",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastRewardedBlockNum",
                table: "AreaClaims");
        }
    }
}
