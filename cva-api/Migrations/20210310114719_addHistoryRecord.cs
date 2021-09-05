using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class addHistoryRecord : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HistoryBlockNum",
                table: "AreaRecords");

            migrationBuilder.AddColumn<string>(
                name: "HistoryRecords",
                table: "AreaRecords",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "c2a0c36d-746b-4095-8fdc-9fe353056a42");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "48c377fc-dc1d-4894-a931-3ea63ba44041");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "9f5cdcf0-4155-4a70-875e-9960b7d06458", "AQAAAAEAACcQAAAAEPwbzYH2qE04glDCb3Au1uE44HfNUrbxqvoPAZqjh570izOia7plJ5sJe13eqetklw==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HistoryRecords",
                table: "AreaRecords");

            migrationBuilder.AddColumn<string>(
                name: "HistoryBlockNum",
                table: "AreaRecords",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "df1fe128-3d39-42b3-a9b7-9edb7fa5753c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "d5ebff28-8b88-4666-9cb2-c9075a245daf");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a5cac7c4-102e-4949-81fe-e63705e611a1", "AQAAAAEAACcQAAAAEBH7bODVPC+XjdbwqPiNpblpwy0bc3DQdp1wiZLrr9d1wc4OfTahhFp6nUpfkOScLw==" });
        }
    }
}
