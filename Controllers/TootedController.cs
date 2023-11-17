using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using System.Xml.Linq;
using BackendValkrusman.Data;
using BackendValkrusman.Models;

namespace veebipoe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TootedController : ControllerBase
    {
         
        private readonly ApplicationDbContext _context;

        public TootedController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var tooted = _context.Tooted.ToList();
            return Ok(tooted);
        }

        [HttpDelete("kustuta/{id}")]
        public IActionResult Delete(int id)
        {
            var tooted = _context.Tooted.Find(id);
            if (tooted == null)
            {
                return NotFound();
            }

            _context.Tooted.Remove(tooted);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("lisa")]
        public IActionResult PostProduct([FromBody] Toode tooted)
        {
            if (tooted == null)
            {
                return BadRequest("Invalid product data.");
            }

            _context.Tooted.Add(tooted);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPatch("hind-dollaritesse/{kurss}")]
        public IActionResult Dollaritesse(double kurss)
        {
            var tooted = _context.Tooted.ToList();
            foreach (var toode in tooted)
            {
                toode.Price *= kurss;
            }
            _context.SaveChanges();
            return Ok(tooted);
        }

        [HttpPatch("hind-eurosse/{kurss}")]
        public IActionResult Eurosse(double kurss)
        {
            var tooted = _context.Tooted.ToList();
            foreach (var toode in tooted)
            {
                toode.Price /= kurss;
            }
            _context.SaveChanges();
            return Ok(tooted);
        }
       
    }

}

