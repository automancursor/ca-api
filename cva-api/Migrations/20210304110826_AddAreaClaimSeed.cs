using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class AddAreaClaimSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AreaType",
                table: "AreaClaims",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AreaClaims",
                columns: new[] { "ID", "Abg", "AccumulatedBonus", "Active", "AreaType", "Cva", "Cvt", "Description", "Name", "Round", "TargetBonus" },
                values: new object[] { 1, 5f, 0f, true, "A", 500f, 50000f, null, "A", 5, 500f });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "AreaType",
                table: "AreaClaims");
        }
    }
}
