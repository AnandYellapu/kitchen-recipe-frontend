import React from 'react';
import { Pagination as MuiPagination, Stack, CircularProgress ,Typography } from '@mui/material';

const Pagination = ({ totalPages, currentPage, onPageChange, isLoading }) => {
    return (
        <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
            {isLoading ? (
                <CircularProgress color="primary" />
            ) : (
                <>
                    <MuiPagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => onPageChange(value)}
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                        size="large" // Adjust size as needed
                        siblingCount={1} // Number of pagination items to display before and after the current page
                        boundaryCount={1} // Number of first and last pagination items to always display
                        showFirstButton // Show "First Page" button
                        showLastButton // Show "Last Page" button
                        disabled={totalPages <= 1} // Disable pagination if there's only one page
                    />
                    <Typography variant="body2" color="textSecondary">
                        Page {currentPage} of {totalPages}
                    </Typography>
                </>
            )}
        </Stack>
    );
};

export default Pagination;

