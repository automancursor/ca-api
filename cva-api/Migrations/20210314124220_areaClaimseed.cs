using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class areaClaimseed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 1,
                column: "Name",
                value: "A区");

            migrationBuilder.InsertData(
                table: "AreaClaims",
                columns: new[] { "ID", "Abg", "AccumulatedBonus", "Active", "AreaType", "Cva", "Cvt", "Description", "LastRewardedBlockNum", "Name", "Round", "TargetBonus" },
                values: new object[,]
                {
                    { 2, 5f, 0f, true, "B", 1000f, 100000f, null, 0, "B区", 5, 1000f },
                    { 3, 5f, 0f, true, "C", 2000f, 200000f, null, 0, "C区", 5, 2000f },
                    { 4, 5f, 0f, true, "D", 4000f, 400000f, null, 0, "D区", 5, 4000f },
                    { 5, 5f, 0f, true, "E", 8000f, 800000f, null, 0, "E区", 5, 8000f },
                    { 6, 5f, 0f, true, "1", 100f, 10000f, null, 0, "1区", 5, 100f },
                    { 7, 5f, 0f, true, "2", 200f, 20000f, null, 0, "2区", 5, 200f }
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "8087daa4-5c82-463e-8553-632a3e9ac548");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "8e202119-8fca-462b-8939-fff9f3657f87");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "bea6c3d5-1bc7-454d-be83-d4438002bbd0", "AQAAAAEAACcQAAAAEPmX+pLNfD0xIar+A8OhcgU4yhO877SWl1kbXitafVnuCGLLW5l4OqrpXEVgraSfng==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 7);

            migrationBuilder.UpdateData(
                table: "AreaClaims",
                keyColumn: "ID",
                keyValue: 1,
                column: "Name",
                value: "A");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "98ffac1c-8488-4e77-9731-ab465b776130");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "96fe749a-b252-4005-9d35-ab2b4342f0ed");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7bc76530-69e1-4ed4-83d1-613a18f0bc76", "AQAAAAEAACcQAAAAEEVTcUFwJjrAd795S7Rzt7hx2n1R5oFdnklOEKlW9rzVF27syzqAltkwUooiwcGqCg==" });
        }
    }
}
