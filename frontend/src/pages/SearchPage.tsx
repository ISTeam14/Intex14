import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AuthorizeView from '../components/AuthorizeView';

function SearchPage() {
  return (
    <AuthorizeView>
      <>
        <Header />
        <div style={{ paddingTop: '80px' }}>
          <SearchBar />
        </div>
      </>
    </AuthorizeView>
  );
}

export default SearchPage;
