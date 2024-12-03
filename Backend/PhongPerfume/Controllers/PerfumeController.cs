using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.PerfumeDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    //[Authorize]
    public class PerfumeController : Controller
    {
        private readonly IPerfumeRepository _perfumeRepository;

        public PerfumeController(IPerfumeRepository perfumeRepository)
        {
            _perfumeRepository = perfumeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Perfume>>> GetAllPerfume()
        {
            var Perfumes = await _perfumeRepository.GetAllPerfumesAsync();
            var PerfumesDTO = Perfumes.Select(c => new PerfumeGetAll
            {
                Perfume_Id = c.Perfume_Id,
                Perfume_Name = c.Perfume_Name,
                Perfume_Description = c.Perfume_Description,
                Perfume_Type = c.Perfume_Type,
                Perfume_images = c.Perfume_images,
                Stocks = c.Stocks,
                Price = c.Price,
                Brand_Id = c.Brand_Id,
                Brand_Name = c.Brand.Brand_Name
            });
            return Ok(PerfumesDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PerfumeGetAll>> GetPerfumeById(int id)
        {
            var selectedPerfume = await _perfumeRepository.GetPerfumeByIdAsync(id);
            if (selectedPerfume == null)
            {
                return NotFound($"Cannot find User with ID:{id}");
            }
            var selectedPerfumeDTO = new PerfumeGetAll
            {
                Perfume_Id = selectedPerfume.Perfume_Id,
                Perfume_Name = selectedPerfume.Perfume_Name,
                Perfume_Description = selectedPerfume.Perfume_Description,
                Perfume_Type = selectedPerfume.Perfume_Type,
                Perfume_images = selectedPerfume.Perfume_images,
                Stocks = selectedPerfume.Stocks,
                Price = selectedPerfume.Price,
                Brand_Id = selectedPerfume.Brand_Id,
                Brand_Name = selectedPerfume.Brand.Brand_Name

            };
            return Ok(selectedPerfumeDTO);
        }

        [HttpPost]
        public async Task<ActionResult<Perfume>> AddPerfume([FromBody] PerfumePost perfumePost)
        {
            if (perfumePost == null)
            {
                return BadRequest("User's Data is required");
            }

            var addPerfume = new Perfume
            {
                Perfume_Name = perfumePost.Perfume_Name,
                Perfume_Description = perfumePost.Perfume_Description,
                Perfume_Type = perfumePost.Perfume_Type,
                Perfume_images = perfumePost.Perfume_images,
                Stocks = perfumePost.Stocks,
                Price = perfumePost.Price,
                Brand_Id = perfumePost.Brand_Id,
            };

            var addedPerfume = await _perfumeRepository.AddPerfumeAsync(addPerfume);
            System.Diagnostics.Debug.WriteLine($"{addedPerfume.Perfume_Id}");
            return CreatedAtAction(nameof(GetPerfumeById), new { id = addedPerfume.Perfume_Id }, addedPerfume);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PerfumePost>> UpdatePerfume(int id, [FromBody] PerfumePost perfumePost)
        {
            var ToUpdatePerfume = await _perfumeRepository.GetPerfumeByIdAsync(id);
            if (ToUpdatePerfume == null)
            {
                return NotFound($"Cannot find Perfume with ID:{id}");
            }
            if (perfumePost == null)
            {
                return BadRequest("Perfume's Data is required");
            }

            ToUpdatePerfume.Perfume_Name = perfumePost.Perfume_Name;
            ToUpdatePerfume.Perfume_Description = perfumePost.Perfume_Description;
            ToUpdatePerfume.Perfume_Type = perfumePost.Perfume_Type;
            ToUpdatePerfume.Perfume_images = perfumePost.Perfume_images;
            ToUpdatePerfume.Stocks = perfumePost.Stocks;
            ToUpdatePerfume.Price = perfumePost.Price;
            ToUpdatePerfume.Brand_Id = perfumePost.Brand_Id;

            var UpdatedPerfume = await _perfumeRepository.UpdatePerfumeAsync(ToUpdatePerfume);
            return Ok(UpdatedPerfume);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePerfume(int id)
        {
            var deletedPerfume = await _perfumeRepository.GetPerfumeByIdAsync(id);
            if (deletedPerfume == null)
            {
                return NotFound($"Cannot find Perfume with ID:{id}");
            }
            await _perfumeRepository.DeletePerfumeAsync(id);
            return Ok("Delete Successfully");
        }
    }
}
