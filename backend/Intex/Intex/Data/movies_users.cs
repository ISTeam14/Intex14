using System.ComponentModel.DataAnnotations;

namespace Intex.Data
{
    public class movies_users
    {
        [Key]
        public int user_id { get; set; }

        public string? name { get; set; }

        public string? phone { get; set; }

        public string? email { get; set; }

        public int? age { get; set; }

        public string? gender { get; set; }

        public int? netflix { get; set; }

        public int? amazon_prime { get; set; }

        public int? disney_plus { get; set; }

        public int? paramount_plus { get; set; }

        public int? max { get; set; }

        public int? hulu { get; set; }

        public int? apple_tv_plus { get; set; }

        public int? peacock { get; set; }

        public string? city { get; set; }

        public string? state { get; set; }
            
        public int? zip { get; set; }
    }
}
