using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Intex.Data
{
    [PrimaryKey(nameof(user_id), nameof(show_id))]
    public class movies_ratings
    {
        [Required]
        public string user_id { get; set; }

        [Required]
        public string show_id { get; set; }

        public int? rating { get; set; }
    }
}
