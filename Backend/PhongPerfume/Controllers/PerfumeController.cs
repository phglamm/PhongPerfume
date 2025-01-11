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
                Perfume_For = c.Perfume_For,
                Perfume_Type = c.Perfume_Type,
                Perfume_images = c.Perfume_images,
                Size = c.Size,
                Stocks = c.Stocks,
                Price = c.Price,
                Brand_Id = c.Brand_Id,
                Brand_Name = c.Brand.Brand_Name,
                Event_Id = c.Event_Id,
                Event_Name = c.Event_Id > 0 ? c.Event.Event_Name : null,
                Event_Poster = c.Event_Id > 0 ? c.Event.Event_Poster : null,
                Event_Discount = c.Event_Id > 0 ? c.Event.Event_Discount : (int?)null,
                Event_Start = c.Event_Id > 0 ? c.Event.Event_Start : (DateTime?)null,
                Event_End = c.Event_Id > 0 ? c.Event.Event_End : (DateTime?)null,
                Event_Voucher = c.Event_Id > 0 ? c.Event.Event_Voucher : null
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
                Perfume_For = selectedPerfume.Perfume_For,
                Perfume_Type = selectedPerfume.Perfume_Type,
                Perfume_images = selectedPerfume.Perfume_images,
                Size = selectedPerfume.Size,
                Stocks = selectedPerfume.Stocks,
                Price = selectedPerfume.Price,
                Brand_Id = selectedPerfume.Brand_Id,
                Brand_Name = selectedPerfume.Brand.Brand_Name,
                Event_Id = selectedPerfume.Event != null ? selectedPerfume.Event.Event_Id : (int?)null, // Check if Event is null
                Event_Name = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Name : null,
                Event_Poster = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Poster : null,
                Event_Discount = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Discount : (int?)null,
                Event_Start = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Start : (DateTime?)null,
                Event_End = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_End : (DateTime?)null,
                Event_Voucher = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Voucher : null

            };
            return Ok(selectedPerfumeDTO);
        }

        [HttpGet("PerfumeWithBrandName/{id}")]
        public async Task<ActionResult<PerfumeGetAll>> GetPerfumeWithBrandNameById(int id)
        {
            var selectedPerfume = await _perfumeRepository.GetPerfumeWithBrandNameEventByIdAsync(id);
            if (selectedPerfume == null)
            {
                return NotFound($"Cannot find User with ID:{id}");
            }
            var selectedPerfumeDTO = new PerfumeGetAll
            {
                Perfume_Id = selectedPerfume.Perfume_Id,
                Perfume_Name = selectedPerfume.Perfume_Name,
                Perfume_Description = selectedPerfume.Perfume_Description,
                Perfume_For = selectedPerfume.Perfume_For,
                Perfume_Type = selectedPerfume.Perfume_Type,
                Perfume_images = selectedPerfume.Perfume_images,
                Size = selectedPerfume.Size,
                Stocks = selectedPerfume.Stocks,
                Price = selectedPerfume.Price,
                Brand_Id = selectedPerfume.Brand_Id,
                Brand_Name = selectedPerfume.Brand.Brand_Name,
                Event_Id = selectedPerfume.Event != null ? selectedPerfume.Event.Event_Id : (int?)null, // Check if Event is null
                Event_Name = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Name : null,
                Event_Poster = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Poster : null,
                Event_Discount = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Discount : (int?)null,
                Event_Start = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Start : (DateTime?)null,
                Event_End = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_End : (DateTime?)null,
                Event_Voucher = selectedPerfume.Event_Id > 0 ? selectedPerfume.Event.Event_Voucher : null

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
                Perfume_For = perfumePost.Perfume_For,
                Perfume_Type = perfumePost.Perfume_Type,
                Perfume_images = perfumePost.Perfume_images,
                Size = perfumePost.Size,
                Stocks = perfumePost.Stocks,
                Price = perfumePost.Price,
                Brand_Id = perfumePost.Brand_Id,
                Event_Id = perfumePost.Event_Id,
            };

            var addedPerfume = await _perfumeRepository.AddPerfumeAsync(addPerfume);
            System.Diagnostics.Debug.WriteLine($"{addedPerfume.Perfume_Id}");
            return CreatedAtAction(nameof(GetPerfumeById), new { id = addedPerfume.Perfume_Id }, addedPerfume);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Perfume>> UpdatePerfume(int id, [FromBody] PerfumePost perfumePost)
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
            ToUpdatePerfume.Perfume_For = perfumePost.Perfume_For;
            ToUpdatePerfume.Perfume_Type = perfumePost.Perfume_Type;
            ToUpdatePerfume.Perfume_images = perfumePost.Perfume_images;
            ToUpdatePerfume.Size = perfumePost.Size;
            ToUpdatePerfume.Stocks = perfumePost.Stocks;
            ToUpdatePerfume.Price = perfumePost.Price;
            ToUpdatePerfume.Brand_Id = perfumePost.Brand_Id;
            ToUpdatePerfume.Event_Id = perfumePost.Event_Id;

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

        [HttpGet("search")]
        public async Task<ActionResult<PerfumeGetAll>> SearchPerfumes([FromQuery] string? search)
        {
            //if (string.IsNullOrEmpty(search))
            //{
            //    return BadRequest(new { message = "Search query cannot be empty." });
            //}

            try
            {
                search = string.IsNullOrWhiteSpace(search) ? null : search;

                var results = await _perfumeRepository.FindPerfumeBySearch(search);

                if (results == null || results.Count == 0)
                {
                    return NotFound(new { message = "No perfumes found for the search query." });
                }

                var PerfumesDTO = results.Select(c => new PerfumeGetAll
                {
                    Perfume_Id = c.Perfume_Id,
                    Perfume_Name = c.Perfume_Name,
                    Perfume_Description = c.Perfume_Description,
                    Perfume_For = c.Perfume_For,
                    Perfume_Type = c.Perfume_Type,
                    Perfume_images = c.Perfume_images,
                    Size = c.Size,
                    Stocks = c.Stocks,
                    Price = c.Price,
                    Brand_Id = c.Brand_Id,
                    Brand_Name = c.Brand.Brand_Name,
                    Event_Id = c.Event.Event_Id,
                    Event_Name = c.Event.Event_Name,
                    Event_Poster = c.Event.Event_Poster,
                    Event_Discount = c.Event.Event_Discount,
                    Event_Start = c.Event.Event_Start,
                    Event_End = c.Event.Event_End,
                    Event_Voucher = c.Event.Event_Voucher,
                });
                return Ok(PerfumesDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred.", error = ex.Message });
            }
        }
    }
}
