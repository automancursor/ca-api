using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cva_api.Migrations
{
    public partial class updateWalletHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WalletHistory_Wallet_WalletId",
                table: "WalletHistory");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WalletHistory",
                table: "WalletHistory");

            migrationBuilder.DropColumn(
                name: "CoinType",
                table: "WalletHistory");

            migrationBuilder.DropColumn(
                name: "FromValue",
                table: "WalletHistory");

            migrationBuilder.DropColumn(
                name: "Message",
                table: "WalletHistory");

            migrationBuilder.DropColumn(
                name: "ToValue",
                table: "WalletHistory");

            migrationBuilder.RenameTable(
                name: "WalletHistory",
                newName: "WalletHistories");

            migrationBuilder.RenameIndex(
                name: "IX_WalletHistory_WalletId",
                table: "WalletHistories",
                newName: "IX_WalletHistories_WalletId");

            migrationBuilder.AddColumn<float>(
                name: "AfterValue",
                table: "WalletHistories",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "BeforeValue",
                table: "WalletHistories",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "Msg",
                table: "WalletHistories",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UpdateType",
                table: "WalletHistories",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WalletHistories",
                table: "WalletHistories",
                column: "ID");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "cefaa53c-ac98-4feb-9bcc-eeba0a9279e1");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "59747504-d27d-498d-9689-daaa045f84ff");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "a2d086a1-91a2-4914-94ef-016fc3a1da86", new DateTime(2021, 3, 20, 16, 29, 56, 714, DateTimeKind.Local).AddTicks(9000), "AQAAAAEAACcQAAAAEEp2slYsuDO8oAppxOKN9iInog2bDUZ9uieVAmlu7xB0hRnYQfn4hpzZ7L7XfEcxFQ==" });

            migrationBuilder.AddForeignKey(
                name: "FK_WalletHistories_Wallet_WalletId",
                table: "WalletHistories",
                column: "WalletId",
                principalTable: "Wallet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WalletHistories_Wallet_WalletId",
                table: "WalletHistories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WalletHistories",
                table: "WalletHistories");

            migrationBuilder.DropColumn(
                name: "AfterValue",
                table: "WalletHistories");

            migrationBuilder.DropColumn(
                name: "BeforeValue",
                table: "WalletHistories");

            migrationBuilder.DropColumn(
                name: "Msg",
                table: "WalletHistories");

            migrationBuilder.DropColumn(
                name: "UpdateType",
                table: "WalletHistories");

            migrationBuilder.RenameTable(
                name: "WalletHistories",
                newName: "WalletHistory");

            migrationBuilder.RenameIndex(
                name: "IX_WalletHistories_WalletId",
                table: "WalletHistory",
                newName: "IX_WalletHistory_WalletId");

            migrationBuilder.AddColumn<string>(
                name: "CoinType",
                table: "WalletHistory",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "FromValue",
                table: "WalletHistory",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "Message",
                table: "WalletHistory",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "ToValue",
                table: "WalletHistory",
                type: "float",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WalletHistory",
                table: "WalletHistory",
                column: "ID");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2301D884-221A-4E7D-B509-0113DCC043E1",
                column: "ConcurrencyStamp",
                value: "32543896-c0af-4494-a309-4948455d905c");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                column: "ConcurrencyStamp",
                value: "8a872337-4c2c-4bf3-9ed9-a02514e08fd2");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                columns: new[] { "ConcurrencyStamp", "CreatedDate", "PasswordHash" },
                values: new object[] { "c6c278ff-e217-486c-a20d-1890da5b415a", new DateTime(2021, 3, 20, 15, 8, 47, 977, DateTimeKind.Local).AddTicks(6060), "AQAAAAEAACcQAAAAEFCFxBEyeecLRzQepRgoiKGxcwoRtLdKjQ6XOr3+O0W3BPxXV26DoGKKSwe9Wo2QWw==" });

            migrationBuilder.AddForeignKey(
                name: "FK_WalletHistory_Wallet_WalletId",
                table: "WalletHistory",
                column: "WalletId",
                principalTable: "Wallet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
