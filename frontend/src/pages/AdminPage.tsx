import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/Movie";
import { fetchPages, deleteMovie } from "../api/MovieAPI"; 
import Pagination from "../components/Pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";

const AdminPage = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchPages(pageSize, pageNum);
                setMovies(data.movies);
                setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [pageSize, pageNum]);

    useEffect(() => {
        document.title = "Admin Movie Page";
    }, []);

    const handleDelete = async (show_id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmDelete) return;

        try {
            await deleteMovie(show_id);
            setMovies(movies.filter((s) => s.show_id !== show_id));
        } catch (error) {
            alert("Failed to delete movie. Please try again.");
        }
    };

    const detectGenre = (movie: Movie): string => {
        const genreMap: { [key: string]: string } = {
            action: "Action",
            comedies: "Comedy",
            dramas: "Drama",
            adventure: "Adventure",
            horror_movies: "Horror",
            documentaries: "Documentary",
            thrillers: "Thriller",
            family_movies: "Family",
            kids_tv: "Kids",
            reality_tv: "Reality",
            fantasy: "Fantasy",
            musicals: "Musical",
            spirituality: "Spirituality",
            nature_tv: "Nature",
            talk_shows_tv_comedies: "Talk Show",
            crime_tv_shows_docuseries: "Crime",
        };

        for (const key in genreMap) {
            if ((movie as any)[key] === 1) {
                return genreMap[key];
            }
        }

        return "Unknown";
    };

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-6 text-white">
            <h1 className="text-3xl tracking-wide mb-6 text-center text-gray-200" style={{ fontFamily: 'Inter, sans-serif' }}
            >Movie Manager</h1>

            {!showForm && (
                <button
                    className="pill-button add"
                    onClick={() => setShowForm(true)}
                >
                    Add
                </button>
            )}

            <br/>

            {showForm && (
                <NewMovieForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchPages(pageSize, pageNum).then((data) => setMovies(data.movies));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingMovie && (
                <EditMovieForm
                    movie={editingMovie}
                    onSuccess={() => {
                        setEditingMovie(null);
                        fetchPages(pageSize, pageNum).then((data) => setMovies(data.movies));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}
            <br></br>

            <table className="custom-table">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        {["ID", "Type", "Title", "Genre", "Rating", "Director", "Cast", "Country", "Release Year", "Duration", "Description", "Actions"].map((header) => (
                            <th key={header} className="px-4 py-2 border border-gray-600 text-left font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {movies.map((s) => (
                        <tr key={s.show_id} className="border border-gray-600 align-top">
                            <td className="px-4 py-2 border border-gray-600 align-top">{s.show_id}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">{s.type}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">{s.title}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">{detectGenre(s)}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">{s.rating}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">{s.director}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">
                                <div
                                    style={{
                                    maxHeight: "4.5em",
                                    overflowY: "auto",
                                    whiteSpace: "normal",
                                    lineHeight: "1.5em"
                                    }}
                                >
                                    {s.cast}
                                </div>
                                </td>

                                <td className="px-4 py-2 border border-gray-600 align-top">
                                <div
                                    style={{
                                    maxHeight: "4.5em",
                                    overflowY: "auto",
                                    whiteSpace: "normal",
                                    lineHeight: "1.5em"
                                    }}
                                >
                                    {s.country}
                                </div>
                                </td>

                            <td className="px-4 py-2 border border-gray-600 align-top">{s.release_year}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">{s.duration}</td>
                            <td className="px-4 py-2 border border-gray-600 align-top">
                            <div
                                style={{
                                maxHeight: "4.5em",
                                overflowY: "auto",
                                whiteSpace: "normal",
                                lineHeight: "1.5em"
                                }}
                            >
                                {s.description}
                            </div>
                            </td>

                            <td className="px-4 py-2 border border-gray-600 align-top">
                                <div className="button-stack">
                                    <button
                                       className="pill-button mr-2" 
                                       onClick={() => setEditingMovie(s)}
                                    >
                                        Edit
                                    </button>
                                
                                    <button
                                        className="pill-button" style={{ borderColor: "#f87171", color: "#f87171" }}
                                        onClick={() => handleDelete(s.show_id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <br /> <br></br>


            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </div>
    );
};

export default AdminPage;
