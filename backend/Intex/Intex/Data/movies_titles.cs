using System.ComponentModel.DataAnnotations;

namespace Intex.Data
{
    public class movies_titles
    {
        [Key]
        public string show_id { get; set; }

        public string? type { get; set; }

        public string? title { get; set; }

        public string? director { get; set; }

        public string? cast { get; set; }

        public string? country { get; set; }

        public int? release_year { get; set; }

        public string? rating { get; set; }

        public string? duration { get; set; }

        public string? description { get; set; }

        public int? action { get; set; }

        public int? adventure { get; set; }

        public int? anime_series_international_tv_shows { get; set; }

        public int? british_tv_shows_docuseries_international_tv_shows { get; set; }

        public int? children { get; set; }

        public int? comedies { get; set; }

        public int? comedies_dramas_international_movies { get; set; }

        public int? comedies_international_movies { get; set; }

        public int? comedies_romantic_movies { get; set; }

        public int? crime_tv_shows_docuseries { get; set; }

        public int? documentaries { get; set; }

        public int? documentaries_international_movies { get; set; }

        public int? docuseries { get; set; }

        public int? dramas { get; set; }

        public int? dramas_international_movies { get; set; }

        public int? dramas_romantic_movies { get; set; }

        public int? family_movies { get; set; }

        public int? fantasy { get; set; }

        public int? horror_movies { get; set; }

        public int? international_movies_thrillers { get; set; }

        public int? international_tv_shows_romantic_tv_shows_tv_dramas { get; set; }

        public int? kids_tv { get; set; }

        public int? language_tv_shows { get; set; }

        public int? musicals { get; set; }

        public int? nature_tv { get; set; }

        public int? reality_tv { get; set; }

        public int? spirituality { get; set; }

        public int? tv_action { get; set; }

        public int? tv_comedies { get; set; }

        public int? talk_shows_tv_comedies { get; set; }

        public int? thrillers { get; set; }


    }
}
