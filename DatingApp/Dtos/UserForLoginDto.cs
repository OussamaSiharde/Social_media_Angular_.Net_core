using System.ComponentModel.DataAnnotations;

namespace DatingApp.Dtos
{
    public class UserForLoginDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(30, MinimumLength = 6)]
        public string Password { get; set; }
    }
}