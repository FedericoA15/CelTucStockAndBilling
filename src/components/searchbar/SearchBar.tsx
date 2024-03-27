import React, { FC, useState } from 'react';

export const SearchBar: FC<{ onSearch: (name: string) => void }> = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        name="name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};