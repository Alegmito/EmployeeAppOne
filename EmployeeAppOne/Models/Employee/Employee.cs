using System.ComponentModel.DataAnnotations;

namespace EmployeeAppOne.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Email { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Birth Date")]
        public DateTime BirthDate { get; set; }
        [Required]
        public int Salary { get; set; }
        [Display(Name = "Last Modified Date")]
        public DateTime ModifiedDate { get; set; }

        public IComparable this[string propName]
        {
            get
            {
                //using reflection
                //foreach (var prop in GetType().GetProperties())
                //    if (nameof(prop).ToLower().Equals(propName.ToLower()))
                //        return (IComparable)prop.GetValue(this);
                //return Id;
                return propName switch
                {
                    "name" => Name,
                    "email"=> Email,
                    "birthDate"=> BirthDate,
                    "salary"=> Salary,
                    "modidiedDate"=> ModifiedDate,
                    _ => Id,
                };
            }
        }

    }
}
