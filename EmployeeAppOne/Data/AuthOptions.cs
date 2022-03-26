using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EmployeeAppOne.Data
{
    public class AuthOptions
    {
        public const string ISSUER = "EmployeeAppAuthServer";
        public const string AUDIENCE = "EmployeeAppClient";
        const string KEY = "empl_app_direct-258";
        public const int LIFETIME = 15;
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
    }
}
