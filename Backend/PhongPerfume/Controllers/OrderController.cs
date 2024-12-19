using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.OrderDTO;
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
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrder()
        {
            var Orders = await _orderRepository.GetAllOrdersAsync();
            var OrdersDTO = Orders.Select(c => new OrderGetAll
            {
                Order_Id = c.Order_Id,
                Order_Address = c.Order_Address,
                Order_Status = c.Order_Status,
                Total_Price = c.Total_Price,
                User_Id = c.User_Id,
                User = c.User,
                Event_Id = c.Event_Id,
                Event = c.Event,
                Payment_Id = c.Payment_Id,
                Payment = c.Payment,
                Warranty_Id = c.Warranty_Id,
                Warranty = c.Warranty,
                OrderItems = c.OrderItems,


            });
            return Ok(OrdersDTO);
        }


        [HttpGet("OrderFromUser/{userID}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrderFromUser(int userID)
        {
            var Orders = await _orderRepository.GetAllOrdersFromUserAsync(userID);
            var OrdersDTO = Orders.Select(c => new OrderGetAll
            {
                Order_Id = c.Order_Id,
                Order_Address = c.Order_Address,
                Order_Status = c.Order_Status,
                Total_Price = c.Total_Price,
                User_Id = c.User_Id,
                User = c.User,
                Event_Id = c.Event_Id,
                Event = c.Event,
                Payment_Id = c.Payment_Id,
                Payment = c.Payment,
                Warranty_Id = c.Warranty_Id,
                Warranty = c.Warranty,
                OrderItems = c.OrderItems,


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
                Order_Address = selectedOrder.Order_Address,
                Order_Status = selectedOrder.Order_Status,
                Total_Price = selectedOrder.Total_Price,
                User_Id = selectedOrder.User_Id,
                User = selectedOrder.User,
                Event_Id = selectedOrder.Event_Id,
                Event = selectedOrder.Event,
                Payment_Id = selectedOrder.Payment_Id,
                Payment = selectedOrder.Payment,
                Warranty_Id = selectedOrder.Warranty_Id,
                Warranty = selectedOrder.Warranty,
                OrderItems = selectedOrder.OrderItems,
            };
            return Ok(selectedOrderDTO);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> AddOrder([FromBody] OrderPost orderPost)
        {
            if (orderPost == null)
            {
                return BadRequest("Order's Data is required");
            }

            var addOrder = new Order
            {

                Order_Address = orderPost.Order_Address,
                Order_Status = orderPost.Order_Status,
                Total_Price = orderPost.Total_Price,
                User_Id = orderPost.User_Id,
                Event_Id = orderPost.Event_Id,
                Payment_Id = orderPost.Payment_Id,
                Warranty_Id = orderPost.Warranty_Id,
            };

            var addedOrder = await _orderRepository.AddOrderAsync(addOrder);
            System.Diagnostics.Debug.WriteLine($"{addedOrder.Order_Id}");
            return CreatedAtAction(nameof(GetOrderById), new { id = addedOrder.Order_Id }, addedOrder);
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
    }
}
