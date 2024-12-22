using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.BrandDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    //[Authorize]
    public class BrandController : Controller
    {
        private readonly IBrandRepository _brandRepository;

        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpGet]
        //[Authorize(Roles = "admin")]

        public async Task<ActionResult<IEnumerable<Brand>>> GetAllBrand()
        {
            var Brands = await _brandRepository.GetAllBrandsAsync();
            var BrandsDTO = Brands.Select(c => new BrandGetAll
            {
                Brand_Id = c.Brand_Id,
                Brand_Images = c.Brand_Images,
                Brand_Name = c.Brand_Name,
                Brand_Description = c.Brand_Description,
                Perfumes = c.Perfumes.Select(p => p.Perfume_Name).ToList()
            });
            return Ok(BrandsDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BrandGetAll>> GetBrandById(int id)
        {
            var selectedBrand = await _brandRepository.GetBrandWithPerfumeByIdAsync(id);
            if (selectedBrand == null)
            {
                return NotFound($"Cannot find Brand with ID:{id}");
            }
            var selectedBrandDTO = new BrandGetAll
            {
                Brand_Id = selectedBrand.Brand_Id,
                Brand_Images = selectedBrand.Brand_Images,
                Brand_Name = selectedBrand.Brand_Name,
                Brand_Description = selectedBrand.Brand_Description,
                Perfumes = selectedBrand.Perfumes.Select(p => p.Perfume_Name).ToList()
            };
            return Ok(selectedBrandDTO);
        }

        [HttpPost]
        public async Task<ActionResult<Brand>> AddBrand([FromBody] BrandPost brandPost)
        {
            if (brandPost == null)
            {
                return BadRequest("Brand's Data is required");
            }

            var addBrand = new Brand
            {

                Brand_Name = brandPost.Brand_Name,
                Brand_Images = brandPost.Brand_Images,
                Brand_Description = brandPost.Brand_Description,
            };

            var addedBrand = await _brandRepository.AddBrandAsync(addBrand);
            System.Diagnostics.Debug.WriteLine($"{addedBrand.Brand_Id}");
            return CreatedAtAction(nameof(GetBrandById), new { id = addedBrand.Brand_Id }, addedBrand);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Brand>> UpdateBrand(int id, [FromBody] BrandPost brandPost)
        {
            var ToUpdateBrand = await _brandRepository.GetBrandByIdAsync(id);
            if (ToUpdateBrand == null)
            {
                return NotFound($"Cannot find Brand with ID:{id}");
            }
            if (brandPost == null)
            {
                return BadRequest("Brand's Data is required");
            }

            ToUpdateBrand.Brand_Name = brandPost.Brand_Name;
            ToUpdateBrand.Brand_Images = brandPost.Brand_Images;
            ToUpdateBrand.Brand_Description = brandPost.Brand_Description;


            var UpdatedBrand = await _brandRepository.UpdateBrandAsync(ToUpdateBrand);
            return Ok(UpdatedBrand);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBrand(int id)
        {
            var deletedBrand = await _brandRepository.GetBrandByIdAsync(id);
            if (deletedBrand == null)
            {
                return NotFound($"Cannot find Brand with ID:{id}");
            }
            await _brandRepository.DeleteBrandAsync(id);
            return Ok("Delete Successfully");
        }
    }
}
