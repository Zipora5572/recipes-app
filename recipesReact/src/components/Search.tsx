import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Search = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    return (
        <>
            <TextField
                variant="outlined"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}

            />
        </>
    );
};

export default Search;
