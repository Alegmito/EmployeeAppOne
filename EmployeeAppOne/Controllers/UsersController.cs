#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeAppOne.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using EmployeeAppOne.Data;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeAppOne.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EmployeeAppContext _context;

        public UsersController(EmployeeAppContext context)
        {
            _context = context;
        }

        // GET: api/Users
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        //{
        //    return await _context.Users.ToListAsync();
        //}

        // GET: Users/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Login([FromBody] User credentials)
        {
            ActionResult response = Unauthorized();

            var user = await _context.Users.FindAsync(credentials.Login);

            if (user != null && credentials.Password == user.Password)
            {
                var tokenString = GenerateJWT(user);

                return Ok(new { token = tokenString, login = user.Login });

            }

            return response;
        }

        private string GenerateJWT(User user)
        {
            var _claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
            };

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: _claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(jwt);

        }

        //[HttpPost("/logout")]
        //[Authorize]
        //public async Task<IActionResult> LogOut(string CurrUser, string JWTToken, )
        //{

        //}

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutUser(string id, User user)
        {
            if (id != user.Login)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Register(User user)
        {
            _context.Users.Add(user);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Login))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUser", new { id = user.Login }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(string id)
        {
            return _context.Users.Any(e => e.Login == id);
        }
    }
}
