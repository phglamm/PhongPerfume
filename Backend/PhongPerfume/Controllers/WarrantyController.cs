using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.WarrantyDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class WarrantyController : Controller
    {
        private readonly IWarrantyRepository _warrantyRepository;

        public WarrantyController(IWarrantyRepository warrantyRepository)
        {
            _warrantyRepository = warrantyRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Warranty>>> GetAllwarranty()
        {
            var Warrantys = await _warrantyRepository.GetAllWarrantysAsync();
            var WarrantysDTO = Warrantys.Select(c => new WarrantyGetAll
            {
                Warranty_Id = c.Warranty_Id,
                Warranty_Name = c.Warranty_Name,
                Warranty_Description = c.Warranty_Description,
                Orders = c.Orders

            });
            return Ok(WarrantysDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WarrantyGetAll>> GetWarrantyById(int id)
        {
            var selectedWarranty = await _warrantyRepository.GetWarrantyByIdAsync(id);
            if (selectedWarranty == null)
            {
                return NotFound($"Cannot find Warranty with ID:{id}");
            }
            var selectedWarrantyDTO = new WarrantyGetAll
            {
                Warranty_Id = selectedWarranty.Warranty_Id,
                Warranty_Name = selectedWarranty.Warranty_Name,
                Warranty_Description = selectedWarranty.Warranty_Description,
                Orders = selectedWarranty.Orders
            };
            return Ok(selectedWarrantyDTO);
        }

        [HttpPost]
        public async Task<ActionResult<Warranty>> AddWarranty([FromBody] WarrantyPost warrantyPost)
        {
            if (warrantyPost == null)
            {
                return BadRequest("Event's Data is required");
            }

            var addwarranty = new Warranty
            {

                Warranty_Name = warrantyPost.Warranty_Name,
                Warranty_Description = warrantyPost.Warranty_Description,
            };

            var addedWarranty = await _warrantyRepository.AddWarrantyAsync(addwarranty);
            System.Diagnostics.Debug.WriteLine($"{addedWarranty.Warranty_Id}");
            return CreatedAtAction(nameof(GetWarrantyById), new { id = addedWarranty.Warranty_Id }, addedWarranty);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Warranty>> UpdateWarranty(int id, [FromBody] WarrantyPost warrantyPost)
        {
            var ToUpdateWarranty = await _warrantyRepository.GetWarrantyByIdAsync(id);
            if (ToUpdateWarranty == null)
            {
                return NotFound($"Cannot find Warranty  with ID:{id}");
            }
            if (warrantyPost == null)
            {
                return BadRequest("Warranty's Data is required");
            }
            ToUpdateWarranty.Warranty_Name = warrantyPost.Warranty_Name;
            ToUpdateWarranty.Warranty_Description = warrantyPost.Warranty_Description;


            var UpdatedWarranty = await _warrantyRepository.UpdateWarrantyAsync(ToUpdateWarranty);
            return Ok(UpdatedWarranty);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteWarranty(int id)
        {
            var deletedwarranty = await _warrantyRepository.GetWarrantyByIdAsync(id);
            if (deletedwarranty == null)
            {
                return NotFound($"Cannot find warranty with ID:{id}");
            }
            await _warrantyRepository.DeleteWarrantyAsync(id);
            return Ok("Delete Successfully");
        }
    }
}
