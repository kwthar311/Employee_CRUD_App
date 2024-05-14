using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class EmployeeController : Controller
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var employees = await _context.Employees.ToListAsync();
                if (!employees.Any())
                {
                    return NotFound("There are no employees yet.");
                }
                return Ok(employees);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

       
        }


        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee is null)
                {
                    return NotFound();
                }
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody]Input obj)
        {
            try
            {
                
                Employee employee = new Employee();
                employee.Name = obj.Name;
                employee.Email = obj.Email;
                employee.Phone = obj.Phone;
                employee.Salary = obj.Salary;
                employee.Title = obj.Title;
                await _context.AddAsync(employee);
                await _context.SaveChangesAsync();
                return Ok(employee);
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id , Employee InputObject)
        {
            try
            {
                if (id != InputObject.Id)
                {
                    return BadRequest("Invalid Id");
                }
                var employee = await _context.Employees.FindAsync(id);
                if (employee is null)
                {
                    return NotFound();
                }

                employee.Name = InputObject.Name;
                employee.Email = InputObject.Email;
                employee.Phone = InputObject.Phone;
                employee.Salary = InputObject.Salary;
                employee.Title = InputObject.Title;

                await _context.SaveChangesAsync();
                return Ok(employee);
            }
            catch (Exception ex)
            {
               return BadRequest(ex.Message);
            }
           
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee is null)
                {
                    return NotFound();
                }
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
