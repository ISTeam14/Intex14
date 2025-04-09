import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function SearchPage() {
  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }}>
        <SearchBar />
      </div>
    </>
  );
}

export default SearchPage;
