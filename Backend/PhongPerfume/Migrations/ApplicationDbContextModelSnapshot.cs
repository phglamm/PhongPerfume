﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using PhongPerfume.Data;

#nullable disable

namespace PhongPerfume.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PhongPerfume.Models.Brand", b =>
                {
                    b.Property<int>("Brand_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Brand_Id"));

                    b.Property<string>("Brand_Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Brand_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Brand_Id");

                    b.ToTable("Brands");
                });

            modelBuilder.Entity("PhongPerfume.Models.Event", b =>
                {
                    b.Property<int>("Event_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Event_Id"));

                    b.Property<int>("Event_Discount")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Event_End")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Event_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Event_Start")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Event_Voucher")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Event_Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("PhongPerfume.Models.Order", b =>
                {
                    b.Property<int>("Order_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Order_Id"));

                    b.Property<int>("Event_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Order_Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Order_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Order_Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Order_customerName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Payment_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Payment_Id1")
                        .HasColumnType("integer");

                    b.Property<int>("Total_Price")
                        .HasColumnType("integer");

                    b.Property<int>("User_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Warranty_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Warranty_Id1")
                        .HasColumnType("integer");

                    b.HasKey("Order_Id");

                    b.HasIndex("Event_Id");

                    b.HasIndex("Payment_Id1");

                    b.HasIndex("User_Id");

                    b.HasIndex("Warranty_Id1");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("PhongPerfume.Models.OrderItems", b =>
                {
                    b.Property<int>("Order_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Perfume_Id")
                        .HasColumnType("integer");

                    b.Property<int>("OrderDetail_Quantity")
                        .HasColumnType("integer");

                    b.HasKey("Order_Id", "Perfume_Id");

                    b.HasIndex("Perfume_Id");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("PhongPerfume.Models.Payment", b =>
                {
                    b.Property<int>("Payment_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Payment_Id"));

                    b.Property<string>("Payment_Method")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Payment_Id");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("PhongPerfume.Models.Perfume", b =>
                {
                    b.Property<int>("Perfume_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Perfume_Id"));

                    b.Property<int>("Brand_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Perfume_Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Perfume_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Perfume_Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.PrimitiveCollection<List<string>>("Perfume_images")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<int>("Size")
                        .HasColumnType("integer");

                    b.Property<int>("Stocks")
                        .HasColumnType("integer");

                    b.HasKey("Perfume_Id");

                    b.HasIndex("Brand_Id");

                    b.ToTable("Perfumes");
                });

            modelBuilder.Entity("PhongPerfume.Models.User", b =>
                {
                    b.Property<int>("User_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("User_Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Full_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("Gender")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Reward_point")
                        .HasColumnType("integer");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("User_Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PhongPerfume.Models.Warranty", b =>
                {
                    b.Property<int>("Warranty_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Warranty_Id"));

                    b.Property<string>("Warranty_Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Warranty_Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Warranty_Id");

                    b.ToTable("Warrantys");
                });

            modelBuilder.Entity("PhongPerfume.Models.Order", b =>
                {
                    b.HasOne("PhongPerfume.Models.Event", "Event")
                        .WithMany("Orders")
                        .HasForeignKey("Event_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhongPerfume.Models.Payment", "Payment")
                        .WithMany("Orders")
                        .HasForeignKey("Payment_Id1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhongPerfume.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("User_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhongPerfume.Models.Warranty", "Warranty")
                        .WithMany("Orders")
                        .HasForeignKey("Warranty_Id1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Payment");

                    b.Navigation("User");

                    b.Navigation("Warranty");
                });

            modelBuilder.Entity("PhongPerfume.Models.OrderItems", b =>
                {
                    b.HasOne("PhongPerfume.Models.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("Order_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PhongPerfume.Models.Perfume", "Perfume")
                        .WithMany("OrderItems")
                        .HasForeignKey("Perfume_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("Perfume");
                });

            modelBuilder.Entity("PhongPerfume.Models.Perfume", b =>
                {
                    b.HasOne("PhongPerfume.Models.Brand", "Brand")
                        .WithMany("Perfumes")
                        .HasForeignKey("Brand_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Brand");
                });

            modelBuilder.Entity("PhongPerfume.Models.Brand", b =>
                {
                    b.Navigation("Perfumes");
                });

            modelBuilder.Entity("PhongPerfume.Models.Event", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("PhongPerfume.Models.Order", b =>
                {
                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("PhongPerfume.Models.Payment", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("PhongPerfume.Models.Perfume", b =>
                {
                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("PhongPerfume.Models.User", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("PhongPerfume.Models.Warranty", b =>
                {
                    b.Navigation("Orders");
                });
#pragma warning restore 612, 618
        }
    }
}
