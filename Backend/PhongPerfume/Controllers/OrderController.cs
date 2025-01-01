using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.OrderDTO;
using PhongPerfume.DTO.OrderItemsDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderGetAll>>> GetAllOrder()
        {
            var Orders = await _orderRepository.GetAllOrdersAsync();
            var OrdersDTO = Orders.Select(o => new OrderGetAll
            {
                Order_Id = o.Order_Id,
                Order_Date = o.Order_Date,
                Order_customerName = o.Order_customerName,
                Order_customerEmail = o.Order_customerEmail,
                Order_customerPhone = o.Order_customerPhone,
                Order_Address = o.Order_Address,
                Order_Status = o.Order_Status,
                Total_Price = o.Total_Price,
                User_Id = o.User_Id,
                User = new OrderUserReturnDTO
                {
                    User_Id = o.User.User_Id,
                    User_avatar = o.User.Full_Name,
                    Full_Name = o.User.Email,
                    Gender = o.User.Gender,
                    Phone = o.User.Phone,
                    Address = o.User.Address,
                    Username = o.User.Username,
                    Reward_point = o.User.Reward_point,
                    Role = o.User.Role,
                },
                Event_Id = o.Event_Id,
                Event_Name = o.Event.Event_Name,
                Payment_Id = o.Payment_Id,
                Payment_Method = o.Payment.Payment_Method,
                Warranty_Id = o.Warranty_Id,
                Warranty_Name = o.Warranty.Warranty_Name,
                OrderItems = o.OrderItems.Select(oi => new OrderItemsGetAll
                {
                    Order_Id = oi.Order_Id,
                    Perfume_Id = oi.Perfume_Id,
                    Perfume_Name = oi.Perfume.Perfume_Name,
                    Perfume_Description = oi.Perfume.Perfume_Description,
                    Perfume_For = oi.Perfume.Perfume_For,
                    Perfume_Type = oi.Perfume.Perfume_Type,
                    Perfume_images = oi.Perfume.Perfume_images,
                    Size = oi.Perfume.Size,
                    Stocks = oi.Perfume.Stocks,
                    Price = oi.Perfume.Price,
                    Brand_Id = oi.Perfume.Brand_Id,
                    Brand_Name = oi.Perfume.Brand.Brand_Name,
                    Quantity = oi.Quantity
                }).ToList(),
            });
            return Ok(OrdersDTO);
        }


        [HttpGet("OrderFromUser/{userID}")]
        public async Task<ActionResult<IEnumerable<OrderGetAll>>> GetAllOrderFromUser(int userID)
        {
            var Orders = await _orderRepository.GetAllOrdersFromUserAsync(userID);
            var OrdersDTO = Orders.Select(o => new OrderGetAll
            {
                Order_Id = o.Order_Id,
                Order_Date = o.Order_Date,
                Order_customerName = o.Order_customerName,
                Order_customerEmail = o.Order_customerEmail,
                Order_customerPhone = o.Order_customerPhone,
                Order_Address = o.Order_Address,
                Order_Status = o.Order_Status,
                Total_Price = o.Total_Price,
                User_Id = o.User_Id,
                User = new OrderUserReturnDTO
                {
                    User_Id = o.User.User_Id,
                    User_avatar = o.User.Full_Name,
                    Full_Name = o.User.Email,
                    Gender = o.User.Gender,
                    Phone = o.User.Phone,
                    Address = o.User.Address,
                    Username = o.User.Username,
                    Reward_point = o.User.Reward_point,
                    Role = o.User.Role,
                },
                Event_Id = o.Event_Id,
                Event_Name = o.Event.Event_Name,
                Payment_Id = o.Payment_Id,
                Payment_Method = o.Payment.Payment_Method,
                Warranty_Id = o.Warranty_Id,
                Warranty_Name = o.Warranty.Warranty_Name,
                OrderItems = o.OrderItems.Select(oi => new OrderItemsGetAll
                {
                    Order_Id = oi.Order_Id,
                    Perfume_Id = oi.Perfume_Id,
                    Perfume_Name = oi.Perfume.Perfume_Name,
                    Perfume_Description = oi.Perfume.Perfume_Description,
                    Perfume_For = oi.Perfume.Perfume_For,
                    Perfume_Type = oi.Perfume.Perfume_Type,
                    Perfume_images = oi.Perfume.Perfume_images,
                    Size = oi.Perfume.Size,
                    Stocks = oi.Perfume.Stocks,
                    Price = oi.Perfume.Price,
                    Brand_Id = oi.Perfume.Brand_Id,
                    Brand_Name = oi.Perfume.Brand.Brand_Name,
                    Quantity = oi.Quantity
                }).ToList(),
            });
            return Ok(OrdersDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderGetAll>> GetOrderById(int id)
        {
            var selectedOrder = await _orderRepository.GetOrderByIdAsync(id);
            if (selectedOrder == null)
            {
                return NotFound($"Cannot find Brand with ID:{id}");
            }

            var selectedOrderDTO = new OrderGetAll
            {
                Order_Id = selectedOrder.Order_Id,
                Order_Date = selectedOrder.Order_Date,
                Order_customerName = selectedOrder.Order_customerName,
                Order_customerEmail = selectedOrder.Order_customerEmail,
                Order_customerPhone = selectedOrder.Order_customerPhone,
                Order_Address = selectedOrder.Order_Address,
                Order_Status = selectedOrder.Order_Status,
                Total_Price = selectedOrder.Total_Price,
                User_Id = selectedOrder.User_Id,
                User = new OrderUserReturnDTO
                {
                    User_Id = selectedOrder.User.User_Id,
                    User_avatar = selectedOrder.User.Full_Name,
                    Email = selectedOrder.User.Email,
                    Full_Name = selectedOrder.User.Email,
                    Gender = selectedOrder.User.Gender,
                    Phone = selectedOrder.User.Phone,
                    Address = selectedOrder.User.Address,
                    Username = selectedOrder.User.Username,
                    Reward_point = selectedOrder.User.Reward_point,
                    Role = selectedOrder.User.Role,
                },
                Event_Id = selectedOrder.Event_Id,
                Event_Name = selectedOrder.Event.Event_Name,
                Payment_Id = selectedOrder.Payment_Id,
                Payment_Method = selectedOrder.Payment.Payment_Method,
                Warranty_Id = selectedOrder.Warranty_Id,
                Warranty_Name = selectedOrder.Warranty.Warranty_Name,
                OrderItems = selectedOrder.OrderItems.Select(oi => new OrderItemsGetAll
                {
                    Order_Id = oi.Order_Id,
                    Perfume_Id = oi.Perfume_Id,
                    Perfume_Name = oi.Perfume.Perfume_Name,
                    Perfume_Description = oi.Perfume.Perfume_Description,
                    Perfume_For = oi.Perfume.Perfume_For,
                    Perfume_Type = oi.Perfume.Perfume_Type,
                    Perfume_images = oi.Perfume.Perfume_images,
                    Size = oi.Perfume.Size,
                    Stocks = oi.Perfume.Stocks,
                    Price = oi.Perfume.Price,
                    Brand_Id = oi.Perfume.Brand_Id,
                    Brand_Name = oi.Perfume.Brand.Brand_Name,
                    Quantity = oi.Quantity
                }).ToList(),
            };
            return Ok(selectedOrderDTO);
        }

        [HttpPost]
        public async Task<ActionResult<OrderGetAll>> AddOrder([FromBody] OrderPost orderPost)
        {
            if (orderPost == null || orderPost.OrderItems == null || !orderPost.OrderItems.Any())
            {
                return BadRequest("Order data and cart items are required");
            }

            var addOrder = new Order
            {
                Order_Date = DateTime.UtcNow,
                Order_customerName = orderPost.Order_customerName,
                Order_customerEmail = orderPost.Order_customerEmail,
                Order_customerPhone = orderPost.Order_customerPhone,
                Order_Address = orderPost.Order_Address,
                Order_Status = orderPost.Order_Status,
                Total_Price = orderPost.Total_Price,
                User_Id = orderPost.User_Id,
                Event_Id = orderPost.Event_Id,
                Payment_Id = orderPost.Payment_Id,
                Warranty_Id = orderPost.Warranty_Id,
                OrderItems = orderPost.OrderItems.Select(oi => new OrderItems
                {
                    Perfume_Id = oi.Perfume_Id,
                    Quantity = oi.Quantity
                }).ToList(),
            };

            var addedOrder = await _orderRepository.AddOrderAsync(addOrder);
            if (addedOrder == null)
            {
                return BadRequest("Failed to add the order.");
            }

            var AfterAddOrder = new OrderGetAll
            {
                Order_Id = addedOrder.Order_Id,
                Order_Date = addedOrder.Order_Date,
                Order_customerName = addedOrder.Order_customerName,
                Order_customerEmail = addedOrder.Order_customerEmail,
                Order_customerPhone = addedOrder.Order_customerPhone,
                Order_Address = addedOrder.Order_Address,
                Order_Status = addedOrder.Order_Status,
                Total_Price = addedOrder.Total_Price,
                User_Id = addedOrder.User_Id,
                User = new OrderUserReturnDTO
                {
                    User_Id = addedOrder.User.User_Id,
                    User_avatar = addedOrder.User.Full_Name,
                    Email = addedOrder.User.Email,
                    Full_Name = addedOrder.User.Email,
                    Gender = addedOrder.User.Gender,
                    Phone = addedOrder.User.Phone,
                    Address = addedOrder.User.Address,
                    Username = addedOrder.User.Username,
                    Reward_point = addedOrder.User.Reward_point,
                    Role = addedOrder.User.Role,
                },
                Event_Id = addedOrder.Event_Id,
                Event_Name = addedOrder.Event.Event_Name,
                Payment_Id = addedOrder.Payment_Id,
                Payment_Method = addedOrder.Payment.Payment_Method,
                Warranty_Id = addedOrder.Warranty_Id,
                Warranty_Name = addedOrder.Warranty.Warranty_Name,
                OrderItems = addedOrder.OrderItems.Select(oi => new OrderItemsGetAll
                {
                    Order_Id = oi.Order_Id,
                    Perfume_Id = oi.Perfume_Id,
                    Perfume_Name = oi.Perfume.Perfume_Name,
                    Perfume_Description = oi.Perfume.Perfume_Description,
                    Perfume_For = oi.Perfume.Perfume_For,
                    Perfume_Type = oi.Perfume.Perfume_Type,
                    Perfume_images = oi.Perfume.Perfume_images,
                    Size = oi.Perfume.Size,
                    Stocks = oi.Perfume.Stocks,
                    Price = oi.Perfume.Price,
                    Brand_Id = oi.Perfume.Brand_Id,
                    Brand_Name = oi.Perfume.Brand.Brand_Name,
                    Quantity = oi.Quantity
                }).ToList(),
            };

            System.Diagnostics.Debug.WriteLine($"{AfterAddOrder.Order_Id}");
            return CreatedAtAction(nameof(GetOrderById), new { id = AfterAddOrder.Order_Id }, AfterAddOrder);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> UpdateOrder(int id, [FromBody] OrderPost orderPost)
        {
            var ToUpdateOrder = await _orderRepository.GetOrderByIdAsync(id);
            if (ToUpdateOrder == null)
            {
                return NotFound($"Cannot find Order with ID:{id}");
            }
            if (orderPost == null)
            {
                return BadRequest("Order's Data is required");
            }

            ToUpdateOrder.Order_Address = orderPost.Order_Address;
            ToUpdateOrder.Order_Status = orderPost.Order_Status;
            ToUpdateOrder.Total_Price = orderPost.Total_Price;
            ToUpdateOrder.User_Id = orderPost.User_Id;
            ToUpdateOrder.Event_Id = orderPost.Event_Id;
            ToUpdateOrder.Payment_Id = orderPost.Payment_Id;
            ToUpdateOrder.Warranty_Id = orderPost.Warranty_Id;


            var UpdatedOrder = await _orderRepository.UpdateOrderAsync(ToUpdateOrder);
            return Ok(UpdatedOrder);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrder(int id)
        {
            var deletedOrder = await _orderRepository.GetOrderByIdAsync(id);
            if (deletedOrder == null)
            {
                return NotFound($"Cannot find Order with ID:{id}");
            }
            await _orderRepository.DeleteOrderAsync(id);
            return Ok("Delete Successfully");
        }

        [HttpPut("UpdateOrderStatus/{id}")]
        public async Task<ActionResult<OrderGetAll>> UpdateOrderStatus(int id, [FromQuery] string updateorderstatus)
        {
            var ToUpdateOrder = await _orderRepository.GetOrderByIdAsync(id);
            if (ToUpdateOrder == null)
            {
                return NotFound($"Cannot find Order with ID:{id}");
            }
            if (updateorderstatus == null)
            {
                return BadRequest("Status's Data is required");
            }

            ToUpdateOrder.Order_Status = updateorderstatus;

            var UpdatedOrder = await _orderRepository.UpdateOrderAsync(ToUpdateOrder);

            var AfterUpdatedOrder = new OrderGetAll
            {
                Order_Id = UpdatedOrder.Order_Id,
                Order_Date = UpdatedOrder.Order_Date,
                Order_customerName = UpdatedOrder.Order_customerName,
                Order_customerEmail = UpdatedOrder.Order_customerEmail,
                Order_customerPhone = UpdatedOrder.Order_customerPhone,
                Order_Address = UpdatedOrder.Order_Address,
                Order_Status = UpdatedOrder.Order_Status,
                Total_Price = UpdatedOrder.Total_Price,
                User_Id = UpdatedOrder.User_Id,
                User = new OrderUserReturnDTO
                {
                    User_Id = UpdatedOrder.User.User_Id,
                    User_avatar = UpdatedOrder.User.Full_Name,
                    Email = UpdatedOrder.User.Email,
                    Full_Name = UpdatedOrder.User.Email,
                    Gender = UpdatedOrder.User.Gender,
                    Phone = UpdatedOrder.User.Phone,
                    Address = UpdatedOrder.User.Address,
                    Username = UpdatedOrder.User.Username,
                    Reward_point = UpdatedOrder.User.Reward_point,
                    Role = UpdatedOrder.User.Role,
                },
                Event_Id = UpdatedOrder.Event_Id,
                Event_Name = UpdatedOrder.Event.Event_Name,
                Payment_Id = UpdatedOrder.Payment_Id,
                Payment_Method = UpdatedOrder.Payment.Payment_Method,
                Warranty_Id = UpdatedOrder.Warranty_Id,
                Warranty_Name = UpdatedOrder.Warranty.Warranty_Name,
                OrderItems = UpdatedOrder.OrderItems.Select(oi => new OrderItemsGetAll
                {
                    Order_Id = oi.Order_Id,
                    Perfume_Id = oi.Perfume_Id,
                    Perfume_Name = oi.Perfume.Perfume_Name,
                    Perfume_Description = oi.Perfume.Perfume_Description,
                    Perfume_For = oi.Perfume.Perfume_For,
                    Perfume_Type = oi.Perfume.Perfume_Type,
                    Perfume_images = oi.Perfume.Perfume_images,
                    Size = oi.Perfume.Size,
                    Stocks = oi.Perfume.Stocks,
                    Price = oi.Perfume.Price,
                    Brand_Id = oi.Perfume.Brand_Id,
                    Brand_Name = oi.Perfume.Brand.Brand_Name,
                    Quantity = oi.Quantity
                }).ToList(),
            };
            return Ok(AfterUpdatedOrder);
        }
    }
}
