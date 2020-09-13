using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.models
{
    public class Photo
        {
            [Required]
            public int Id { get; set; }   
        
            [Required]
            public string Url { get; set; }
        
            public string Description { get; set; }
        
            public DateTime DateAdded { get; set; }
        
            [Required]
            public bool IsMain { get; set; }
            
            [Required]
            public string PublicId { get; set; }
            
            [Required]
            public User User {get;set;}
        
            [Required]
            public int UserId { get; set; }
        }
}