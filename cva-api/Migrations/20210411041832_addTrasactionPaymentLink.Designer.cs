﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using cva_api.Data;

namespace cva_api.Migrations
{
    [DbContext(typeof(SqlContext))]
    [Migration("20210411041832_addTrasactionPaymentLink")]
    partial class addTrasactionPaymentLink
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");

                    b.HasData(
                        new
                        {
                            Id = "2301D884-221A-4E7D-B509-0113DCC043E1",
                            ConcurrencyStamp = "7d9987f4-6168-4526-8587-9ee69e348062",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "78A7570F-3CE5-48BA-9461-80283ED1D94D",
                            ConcurrencyStamp = "796e0643-6943-41df-9d36-eac4524b8523",
                            Name = "User",
                            NormalizedName = "USER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");

                    b.HasData(
                        new
                        {
                            UserId = "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                            RoleId = "2301D884-221A-4E7D-B509-0113DCC043E1"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("Value")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("cva_api.Model.AreaClaim", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<float>("Abg")
                        .HasColumnType("float");

                    b.Property<float>("AccumulatedBonus")
                        .HasColumnType("float");

                    b.Property<float>("AccumulatedBonusCredit")
                        .HasColumnType("float");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("AreaType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<float>("Cva")
                        .HasColumnType("float");

                    b.Property<float>("Cvt")
                        .HasColumnType("float");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("LastRewardedBlockNum")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Round")
                        .HasColumnType("int");

                    b.Property<float>("TargetBonus")
                        .HasColumnType("float");

                    b.HasKey("ID");

                    b.ToTable("AreaClaims");

                    b.HasData(
                        new
                        {
                            ID = 1,
                            Abg = 5f,
                            AccumulatedBonus = 0f,
                            AccumulatedBonusCredit = 0f,
                            Active = true,
                            AreaType = "A",
                            Cva = 500f,
                            Cvt = 50000f,
                            LastRewardedBlockNum = 0,
                            Name = "A区",
                            Round = 5,
                            TargetBonus = 500f
                        },
                        new
                        {
                            ID = 2,
                            Abg = 10f,
                            AccumulatedBonus = 0f,
                            AccumulatedBonusCredit = 0f,
                            Active = true,
                            AreaType = "B",
                            Cva = 1000f,
                            Cvt = 100000f,
                            LastRewardedBlockNum = 0,
                            Name = "B区",
                            Round = 5,
                            TargetBonus = 1000f
                        },
                        new
                        {
                            ID = 3,
                            Abg = 20f,
                            AccumulatedBonus = 0f,
                            AccumulatedBonusCredit = 0f,
                            Active = true,
                            AreaType = "C",
                            Cva = 2000f,
                            Cvt = 200000f,
                            LastRewardedBlockNum = 0,
                            Name = "C区",
                            Round = 5,
                            TargetBonus = 2000f
                        },
                        new
                        {
                            ID = 4,
                            Abg = 40f,
                            AccumulatedBonus = 0f,
                            AccumulatedBonusCredit = 0f,
                            Active = true,
                            AreaType = "D",
                            Cva = 4000f,
                            Cvt = 400000f,
                            LastRewardedBlockNum = 0,
                            Name = "D区",
                            Round = 5,
                            TargetBonus = 4000f
                        },
                        new
                        {
                            ID = 5,
                            Abg = 80f,
                            AccumulatedBonus = 0f,
                            AccumulatedBonusCredit = 0f,
                            Active = true,
                            AreaType = "E",
                            Cva = 8000f,
                            Cvt = 800000f,
                            LastRewardedBlockNum = 0,
                            Name = "E区",
                            Round = 5,
                            TargetBonus = 8000f
                        },
                        new
                        {
                            ID = 6,
                            Abg = 1f,
                            AccumulatedBonus = 0f,
                            AccumulatedBonusCredit = 0f,
                            Active = true,
                            AreaType = "1",
                            Cva = 100f,
                            Cvt = 10000f,
                            LastRewardedBlockNum = 0,
                            Name = "1区",
                            Round = 5,
                            TargetBonus = 100f
                        },
                        new
                        {
                            ID = 7,
                            Abg = 2f,
                            AccumulatedBonus = 0f,
                            AccumulatedBonusCredit = 0f,
                            Active = true,
                            AreaType = "2",
                            Cva = 200f,
                            Cvt = 20000f,
                            LastRewardedBlockNum = 0,
                            Name = "2区",
                            Round = 5,
                            TargetBonus = 200f
                        });
                });

            modelBuilder.Entity("cva_api.Model.AreaHistory", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<float>("AfterValue")
                        .HasColumnType("float");

                    b.Property<float>("BeforeValue")
                        .HasColumnType("float");

                    b.Property<float>("ChangedValue")
                        .HasColumnType("float");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Msg")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("SourceAreaRecordId")
                        .HasColumnType("int");

                    b.Property<int>("ToAreaRecordId")
                        .HasColumnType("int");

                    b.Property<string>("UpdateType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("ID");

                    b.ToTable("AreaHistories");
                });

            modelBuilder.Entity("cva_api.Model.AreaRecord", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AreaClaimId")
                        .HasColumnType("int");

                    b.Property<int>("BlockNum")
                        .HasColumnType("int");

                    b.Property<string>("HistoryRecords")
                        .HasColumnType("text");

                    b.Property<string>("Lights")
                        .HasColumnType("longtext");

                    b.Property<int>("Live")
                        .HasColumnType("int");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("RecordIndex")
                        .HasColumnType("int");

                    b.Property<int>("RoundNum")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("ID");

                    b.HasIndex("AreaClaimId");

                    b.HasIndex("OrderId")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("AreaRecords");
                });

            modelBuilder.Entity("cva_api.Model.Config", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Value")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Name");

                    b.ToTable("Configs");

                    b.HasData(
                        new
                        {
                            Name = "RED_REWARD",
                            Description = "红灯奖励",
                            Value = "0.06"
                        },
                        new
                        {
                            Name = "GREEN_REWARD",
                            Description = "绿灯奖励",
                            Value = "0.09"
                        },
                        new
                        {
                            Name = "BASE_REWARD",
                            Description = "基础奖励",
                            Value = "0.03"
                        },
                        new
                        {
                            Name = "REWARD_SURCHARGE",
                            Description = "奖励手续费",
                            Value = "0.1"
                        },
                        new
                        {
                            Name = "TRANSACTION_SURCHARGE",
                            Description = "转账手续费",
                            Value = "0.1"
                        },
                        new
                        {
                            Name = "WITHDRAW_SURCHARGE",
                            Description = "提现手续费",
                            Value = "0.05"
                        },
                        new
                        {
                            Name = "RECHARGE_SURCHARGE",
                            Description = "充值手续费",
                            Value = "0.1"
                        },
                        new
                        {
                            Name = "CLAIM_SURCHARGE",
                            Description = "报销手续费",
                            Value = "0.1"
                        },
                        new
                        {
                            Name = "REBORN_LIGHTS",
                            Description = "重生所需灯数",
                            Value = "12"
                        },
                        new
                        {
                            Name = "BONUS_LOGIC",
                            Description = "衡量点产生逻辑",
                            Value = "{\"1\":{\"1\":0.125,\"2\":0.03166,\"6\":0.04,\"7\":0.05},\"2\":{\"1\":0.0417,\"2\":0.125,\"3\":0.03216,\"6\":0.0143,\"7\":0.0335},\"3\":{\"1\":0.0278,\"2\":0.0417,\"3\":0.125,\"4\":0.02786,\"6\":0.01,\"7\":0.0143},\"4\":{\"1\":0.0179,\"2\":0.025,\"3\":0.0358,\"4\":0.125,\"5\":0.03156,\"6\":0.042,\"7\":0.072},\"5\":{\"1\":0.01066,\"2\":0.018,\"3\":0.0359,\"4\":0.05,\"5\":0.125,\"6\":0.021,\"7\":0.05},\"6\":{\"6\":0.125,\"7\":0.121666},\"7\":{\"1\":0.0383,\"6\":0.125,\"7\":0.08336}}"
                        });
                });

            modelBuilder.Entity("cva_api.Model.Order", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<float>("Abg")
                        .HasColumnType("float");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<float>("Cva")
                        .HasColumnType("float");

                    b.Property<float>("Cvt")
                        .HasColumnType("float");

                    b.Property<float>("CvtCredit")
                        .HasColumnType("float");

                    b.Property<string>("Msg")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("ID");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("cva_api.Model.Transaction", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<float?>("Amount")
                        .HasColumnType("float");

                    b.Property<string>("AttachedFilesLink")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PaymentLink")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ToId")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("TransactionCoinType")
                        .HasColumnType("int");

                    b.Property<int>("TransactionStatus")
                        .HasColumnType("int");

                    b.Property<int>("TransactionType")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("ID");

                    b.HasIndex("UserId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("cva_api.Model.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsNewMember")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PayPasswordHash")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("ReferCode")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("ReferrerId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("UserIndex")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .HasColumnType("varchar(256) CHARACTER SET utf8mb4")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.HasIndex("ReferrerId");

                    b.ToTable("AspNetUsers");

                    b.HasData(
                        new
                        {
                            Id = "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "4ab708f2-8e34-4983-a43d-b1686afba743",
                            CreatedDate = new DateTime(2021, 4, 11, 14, 18, 32, 7, DateTimeKind.Local).AddTicks(7450),
                            EmailConfirmed = false,
                            IsNewMember = true,
                            LockoutEnabled = false,
                            NormalizedUserName = "BBW",
                            PasswordHash = "AQAAAAEAACcQAAAAEKD3LwteXBEgp7w4uO02xh+QKmihEyNu0ycI6jcd2/60+s76MR5GMxolwfG3zPg+8w==",
                            PayPasswordHash = "123123",
                            PhoneNumberConfirmed = false,
                            ReferCode = "00000000",
                            SecurityStamp = "00000000-0000-0000-0000-000000000000",
                            TwoFactorEnabled = false,
                            UserIndex = 1,
                            UserName = "BBW"
                        });
                });

            modelBuilder.Entity("cva_api.Model.Wallet", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.Property<float>("Abg")
                        .HasColumnType("float");

                    b.Property<float>("Cva")
                        .HasColumnType("float");

                    b.Property<float>("Cvt")
                        .HasColumnType("float");

                    b.Property<float>("CvtCredit")
                        .HasColumnType("float");

                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Wallet");

                    b.HasData(
                        new
                        {
                            Id = "7D9B7113-A8F8-4035-99A7-A20DD400F6A3",
                            Abg = 0f,
                            Cva = 15800f,
                            Cvt = 0f,
                            CvtCredit = 0f,
                            UserId = "B22698B8-42A2-4115-9631-1C2D1E2AC5F7"
                        });
                });

            modelBuilder.Entity("cva_api.Model.WalletHistory", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<float>("AfterValue")
                        .HasColumnType("float");

                    b.Property<float>("BeforeValue")
                        .HasColumnType("float");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Msg")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("UpdateType")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("WalletId")
                        .HasColumnType("varchar(255) CHARACTER SET utf8mb4");

                    b.HasKey("ID");

                    b.HasIndex("WalletId");

                    b.ToTable("WalletHistories");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("cva_api.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("cva_api.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("cva_api.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("cva_api.Model.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("cva_api.Model.AreaRecord", b =>
                {
                    b.HasOne("cva_api.Model.AreaClaim", "AreaClaim")
                        .WithMany("AreaRecords")
                        .HasForeignKey("AreaClaimId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("cva_api.Model.Order", "Order")
                        .WithOne("AreaRecord")
                        .HasForeignKey("cva_api.Model.AreaRecord", "OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("cva_api.Model.User", "User")
                        .WithMany("AreaRecords")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("cva_api.Model.Order", b =>
                {
                    b.HasOne("cva_api.Model.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("cva_api.Model.Transaction", b =>
                {
                    b.HasOne("cva_api.Model.User", "User")
                        .WithMany("Transactions")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("cva_api.Model.User", b =>
                {
                    b.HasOne("cva_api.Model.User", "Referrer")
                        .WithMany("Referees")
                        .HasForeignKey("ReferrerId");
                });

            modelBuilder.Entity("cva_api.Model.Wallet", b =>
                {
                    b.HasOne("cva_api.Model.User", "User")
                        .WithOne("Wallet")
                        .HasForeignKey("cva_api.Model.Wallet", "UserId");
                });

            modelBuilder.Entity("cva_api.Model.WalletHistory", b =>
                {
                    b.HasOne("cva_api.Model.Wallet", "Wallet")
                        .WithMany("WalletHistories")
                        .HasForeignKey("WalletId");
                });
#pragma warning restore 612, 618
        }
    }
}
