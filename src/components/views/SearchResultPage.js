import React, { Fragment } from "react";
import SearchItem from './SearchItem';
import PropTypes from "prop-types";

const searchGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1rem',
};

function SearchResultPage({ searchResults, repositories, onAddCardClick }) {
    return (
        <Fragment>
            <div style={searchGridStyle}>
                {searchResults.map(node => {
                    return <SearchItem node={node} key={node.nameWithOwner} OnAddCardClick={onAddCardClick} repositories={repositories} />
                })
                }
            </div>
        </Fragment>
    );
}

SearchResultPage.propTypes = {
    searchResults: PropTypes.array.isRequired,
    repositories: PropTypes.array.isRequired,
    onAddCardClick: PropTypes.func.isRequired
};

export default SearchResultPage;