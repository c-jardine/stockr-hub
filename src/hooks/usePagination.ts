import React from 'react';

export default function usePagination(totalResults: number, take: number) {
  const [page, setPage] = React.useState(1);

  const totalPages = totalResults / take;

  function nextPage() {
    if (page < totalResults / take) {
      setPage(page + 1);
    }
  }

  function prevPage() {
    if (page !== 1) {
      setPage(page - 1);
    }
  }

  return { page, totalPages, nextPage, prevPage };
}
