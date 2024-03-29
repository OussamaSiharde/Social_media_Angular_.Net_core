using System.Linq;
using AutoMapper;
using DatingApp.Dtos;
using DatingApp.models;

namespace DatingApp.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt =>
                    {
                        opt.MapFrom(src =>
                            src.Photos.FirstOrDefault(p => p.IsMain).Url);
                    })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt =>
                    {
                        opt.MapFrom(src =>
                            src.Photos.FirstOrDefault(p => p.IsMain).Url);
                    })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                    
                });

            CreateMap<Photo, PhotosrDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationsDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}