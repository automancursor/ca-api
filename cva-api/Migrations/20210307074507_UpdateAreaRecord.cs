using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class UpdateAreaRecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AbgChange",
                table: "AreaHistories");

            migrationBuilder.DropColumn(
                name: "CvaChange",
                table: "AreaHistories");

            migrationBuilder.DropColumn(
                name: "CvtChange",
                table: "AreaHistories");

            migrationBuilder.AddColumn<string>(
                name: "HistoryBlockNum",
                table: "AreaRecords",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RoundNum",
                table: "AreaRecords",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<float>(
                name: "AfterValue",
                table: "AreaHistories",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "BeforeValue",
                table: "AreaHistories",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "ChangedValue",
                table: "AreaHistories",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HistoryBlockNum",
                table: "AreaRecords");

            migrationBuilder.DropColumn(
                name: "RoundNum",
                table: "AreaRecords");

            migrationBuilder.DropColumn(
                name: "AfterValue",
                table: "AreaHistories");

            migrationBuilder.DropColumn(
                name: "BeforeValue",
                table: "AreaHistories");

            migrationBuilder.DropColumn(
                name: "ChangedValue",
                table: "AreaHistories");

            migrationBuilder.AddColumn<float>(
                name: "AbgChange",
                table: "AreaHistories",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "CvaChange",
                table: "AreaHistories",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "CvtChange",
                table: "AreaHistories",
                type: "float",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
