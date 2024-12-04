using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.PaymentDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentController(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayment()
        {
            var Payments = await _paymentRepository.GetAllPaymentsAsync();
            var PaymentsDTO = Payments.Select(c => new PaymentGetAll
            {
                Payment_Id = c.Payment_Id,
                Payment_Method = c.Payment_Method,
                Orders = c.Orders

            });
            return Ok(PaymentsDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentGetAll>> GetPaymentById(int id)
        {
            var selectedPayment = await _paymentRepository.GetPaymentByIdAsync(id);
            if (selectedPayment == null)
            {
                return NotFound($"Cannot find Brand with ID:{id}");
            }
            var selectedPaymentDTO = new PaymentGetAll
            {
                Payment_Id = selectedPayment.Payment_Id,
                Payment_Method = selectedPayment.Payment_Method,
                Orders = selectedPayment.Orders
            };
            return Ok(selectedPaymentDTO);
        }

        [HttpPost]
        public async Task<ActionResult<Payment>> AddPayment([FromBody] PaymentPost paymentPost)
        {
            if (paymentPost == null)
            {
                return BadRequest("Event's Data is required");
            }

            var addPayment = new Payment
            {

                Payment_Method = paymentPost.Payment_Method,
            };

            var addedPayment = await _paymentRepository.AddPaymentAsync(addPayment);
            System.Diagnostics.Debug.WriteLine($"{addedPayment.Payment_Id}");
            return CreatedAtAction(nameof(GetPaymentById), new { id = addedPayment.Payment_Id }, addedPayment);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Payment>> UpdatePayment(int id, [FromBody] PaymentPost paymentPost)
        {
            var ToUpdatePayment = await _paymentRepository.GetPaymentByIdAsync(id);
            if (ToUpdatePayment == null)
            {
                return NotFound($"Cannot find Payment Method with ID:{id}");
            }
            if (paymentPost == null)
            {
                return BadRequest("Payment's Data is required");
            }

            ToUpdatePayment.Payment_Method = paymentPost.Payment_Method;


            var UpdatedPayment = await _paymentRepository.UpdatePaymentAsync(ToUpdatePayment);
            return Ok(UpdatedPayment);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePayment(int id)
        {
            var deletedPayment = await _paymentRepository.GetPaymentByIdAsync(id);
            if (deletedPayment == null)
            {
                return NotFound($"Cannot find Payment with ID:{id}");
            }
            await _paymentRepository.DeletePaymentAsync(id);
            return Ok("Delete Successfully");
        }
    }
}
