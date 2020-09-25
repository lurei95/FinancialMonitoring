﻿// <auto-generated />
using System;
using FinancialMonitoring.API;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FinancialMonitoring.Migrations
{
    [DbContext(typeof(FinancialMonitoringDBContext))]
    [Migration("20200925160126_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FinancialMonitoring.Entities.AttachmentItem", b =>
                {
                    b.Property<long>("AttachmentItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("AddedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Attachement")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("FinancialCategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("FinancialItemId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("AttachmentItemId");

                    b.HasIndex("FinancialCategoryId");

                    b.HasIndex("FinancialItemId");

                    b.HasIndex("UserId");

                    b.ToTable("AttachmentItems","Finance");
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.Finance.FinancialCategory", b =>
                {
                    b.Property<Guid>("FinancialCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ParentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("FinancialCategoryId");

                    b.HasIndex("ParentId");

                    b.HasIndex("UserId");

                    b.ToTable("Categories","Finance");
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.Finance.FinancialItem", b =>
                {
                    b.Property<Guid>("FinancialItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("Value")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("FinancialItemId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("FinancialItems","Finance");
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.Security.RefreshToken", b =>
                {
                    b.Property<long>("TokenId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("varchar(200)")
                        .HasMaxLength(200)
                        .IsUnicode(false);

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("TokenId");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshTokens","Security");
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.Security.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("UserId");

                    b.ToTable("Users","Security");
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.AttachmentItem", b =>
                {
                    b.HasOne("FinancialMonitoring.Entities.Finance.FinancialCategory", null)
                        .WithMany("Attachments")
                        .HasForeignKey("FinancialCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("FinancialMonitoring.Entities.Finance.FinancialItem", null)
                        .WithMany("Attachments")
                        .HasForeignKey("FinancialItemId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("FinancialMonitoring.Entities.Security.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.Finance.FinancialCategory", b =>
                {
                    b.HasOne("FinancialMonitoring.Entities.Finance.FinancialCategory", "Parent")
                        .WithMany("ChildCategories")
                        .HasForeignKey("ParentId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("FinancialMonitoring.Entities.Security.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.Finance.FinancialItem", b =>
                {
                    b.HasOne("FinancialMonitoring.Entities.Finance.FinancialCategory", "Category")
                        .WithMany("Items")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FinancialMonitoring.Entities.Security.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("FinancialMonitoring.Entities.Security.RefreshToken", b =>
                {
                    b.HasOne("FinancialMonitoring.Entities.Security.User", "User")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
