using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex.Data
{
    public class wide_deep_recs
    {
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [Column("show_id")]
        public string ShowId { get; set; } = string.Empty;

        [Required]
        [Column("predicted_rating")]
        public double PredictedRating { get; set; }

        // ✅ Match the actual class name: movies_titles (not MoviesTitles)
        [ForeignKey("ShowId")]
        public movies_titles? Show { get; set; }
    }
}
