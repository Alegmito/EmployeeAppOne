using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeAppOne.Models
{
    public class User
    {
        [Key]
        public string Login { get; set; }
        public string Password { get; set; }

        public string? TokenJWT { get; set; } = null;

        public List<Role> Roles { get; set; } = new List<Role>();
    }
}
