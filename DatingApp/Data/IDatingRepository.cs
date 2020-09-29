using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Helpers;
using DatingApp.models;

namespace DatingApp.Data
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

        Task<PageList<User>> GetUsers(UserParams userParams);

        Task<User> GetUser(int id);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForuser(int userId);
    }
}