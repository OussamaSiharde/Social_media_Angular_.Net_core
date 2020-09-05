using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.Dtos
{
    public class PhotoForCreationsDto
    {
        public string Url { get; set; }

        public IFormFile File { get; set; }
        
        public string Description { get; set; }
        
        public DateTime DateAdded { get; set; }
        
        public string Publicid { get; set; }

        public PhotoForCreationsDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}