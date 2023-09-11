using Microsoft.AspNetCore.Mvc;
using System.Data;
using WebApplication1.Models;
using userExample.Common;
using Microsoft.Data.SqlClient;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet("search")]
        public JsonResult Search(string searchTerm)
        {
            string query = $"SELECT id, name, email FROM users WHERE LOWER(name) LIKE '%' + LOWER('{searchTerm}') + '%' OR LOWER(email) LIKE '%' + LOWER('{searchTerm}') + '%'";

            DataTable table = QuerryExtension.ExecuteQuery(query);

            return new JsonResult(table);
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = "SELECT id, name, email FROM users";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            return new JsonResult(table);
        }
        [HttpPost]
        public void Post(Users users)
        {
            Guid id = Guid.NewGuid();
            string query = $@"INSERT INTO [dbo].[users]([id],[name],[email]) VALUES('{id}','{users.name}','{users.email}')";

            QuerryExtension.ExecuteNonQuery(query);
        }
        [HttpPut]
        public JsonResult Put(Users users)
        {
            string query = $@"UPDATE users
                SET name = '{users.name}', email = '{users.email}'
                WHERE Id = '{users.id}'
            ";

            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Cập nhập Thành Công!");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(Guid id)
        {
            string query = $@"DELETE FROM [dbo].[users] WHERE [id] = '{id}'";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công!");
        }
        [HttpDelete]
        public JsonResult DeleteAll()
        {
            string query = $@"DELETE FROM [dbo].[users]  ";
            QuerryExtension.ExecuteNonQuery(query);
            return new JsonResult("Xoá Thành Công Tất Cả!");
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            string query = $@"Select id, name, email from users WHERE id = '{id}'";
            DataTable table = QuerryExtension.ExecuteQuery(query);
            if (table.Rows.Count < 0) return NotFound();

            Users tutorial = new Users()
            {
                id = Guid.Parse(table.Rows[0]["id"].ToString()),
                name = table.Rows[0]["name"].ToString(),
                email = table.Rows[0]["email"].ToString(),
            };
            return Ok(tutorial); // trả về đối tượng Tutorial thay vì đối tượng JsonResult

        }
      
    }
}
