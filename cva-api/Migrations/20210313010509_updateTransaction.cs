using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "TransactionType",
                table: "Transactions",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TransactionCoinType",
                table: "Transactions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TransactionStatus",
                table: "Transactions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "3da8a1df-a735-47d5-bab1-e0b8d43a0b09");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "8be435b3-b34c-4dee-8a00-162e2bc0c497");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "54546e3f-3b23-47ef-842e-6a644a4b81f2", "AQAAAAEAACcQAAAAEPzEkYWtlSvXfOYnAC3FRqWJWMspusyrgG09M60iV39v8mtnm0GL+NlBF72xiYCpzQ==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionCoinType",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TransactionStatus",
                table: "Transactions");

            migrationBuilder.AlterColumn<string>(
                name: "TransactionType",
                table: "Transactions",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "f3f83d39-e8ad-491b-bb0e-7a653a9fb743");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "333ee4c0-47e0-4b30-9144-f0844afa780f");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "3ab9679b-cf70-4495-aab3-291c2d7ac27b", "AQAAAAEAACcQAAAAEIV/3rcTb6ji1VYtpmadUxgmOPmP9aqnDGCGoXDtPOwCdJaRrCcda24ZZ525Y0fDvw==" });
        }
    }
}
