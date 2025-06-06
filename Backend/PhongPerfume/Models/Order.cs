﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhongPerfume.Models
{
    public class Order
    {
        [Key]
        public int Order_Id { get; set; }
        public DateTime Order_Date { get; set; }
        public string Order_customerName { get; set; }
        public string Order_customerEmail { get; set; }
        public string Order_customerPhone { get; set; }
        public string Order_Address { get; set; }
        public string Order_Status { get; set; }
        public float Total_Price { get; set; }

        public int User_Id { get; set; }
        [ForeignKey("User_Id")]
        public User User { get; set; }

        public int Payment_Id { get; set; }
        [ForeignKey("Payment_Id")]
        public Payment Payment { get; set; }

        public int Warranty_Id { get; set; }
        [ForeignKey("Warranty_Id")]
        public Warranty Warranty { get; set; }

        public ICollection<OrderItems> OrderItems { get; set; }

    }
}
