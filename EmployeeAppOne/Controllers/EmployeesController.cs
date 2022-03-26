﻿#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeAppOne.Models;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeAppOne.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeAppContext _context;
        public EmployeesController(EmployeeAppContext context)
        {
            _context = context;
        }

        // GET: Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        // GET: Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound(new {message = "user with this id doesn't exist!"});
                }
                else
                {
                    throw;
                }
            }
            catch (DbUpdateException)
            {
                if (EmailExists(employee.Email))
                {
                    return BadRequest();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employees.Add(employee);

            try
            {
                await _context.SaveChangesAsync();
                
            }
            catch (DbUpdateException ex)
            {
                if (EmailExists(employee.Email))
                {
                    return BadRequest(new {message = "User withh This Email already exists, try another!"});
                }
                else
                {
                    return BadRequest(new { message = "Something went wrong, please, try again!" });
                }
            }

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);

        }

        [HttpGet("pages")]
        public async Task<ActionResult<PageViewResult<Employee>>> GetPage(int page = 1, SortState sortState = SortState.None, bool ascending = true)
        {
            int pageSize = 10;

            var employees = QueryExtenstions.GetSortedEmployees(_context.Employees, sortState, ascending);

            return await QueryExtenstions.GetPageViewResultAsync(employees, page, pageSize);
        }

        // DELETE: Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id== id);
        }

        private bool EmailExists(string email)
        {
            return _context.Employees.Any(e => e.Email == email);
        }

        private BadRequestObjectResult dbUpdateExceprtionHandle(Employee employee)
        {
            if (EmailExists(employee.Email))
            {
                return BadRequest(new { message = "User withh This Email already exists, try another!" });
            }
            else
            {
                return BadRequest(new { message = "Something went wrong, please, try again!" });
            }
        }
    }
}
