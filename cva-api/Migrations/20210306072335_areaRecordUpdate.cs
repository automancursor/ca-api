using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class areaRecordUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "AreaRecords",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "AreaRecords");
        }
    }
}
