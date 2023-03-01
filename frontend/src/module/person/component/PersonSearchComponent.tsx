interface PropTypes {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

const PersonSearchComponent = ({search, setSearch}: PropTypes) => {
    const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }

    return (
        <label>
            <div>
                <p>Filter:</p>
            </div>
            <div>
                <input type="text" value={search} onChange={handleSearchOnChange} />
            </div>
        </label>
    )
}

export default PersonSearchComponent