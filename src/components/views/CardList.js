import React, { Fragment } from 'react';
import CardItem from './CardItem';
import PropTypes from "prop-types";

const cardListGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '1rem',
};

function CardList({ repositories, onRemoveCard }) {
    return (
        <Fragment>
            <div style={cardListGridStyle}>
                {
                    repositories.map(node => {
                        return <CardItem node={node} onRemoveCard={onRemoveCard} key={node.nameWithOwner} />
                    })
                }
            </div>
        </Fragment>
    );
}

CardList.propTypes = {
    repositories: PropTypes.array.isRequired,
    onRemoveCard: PropTypes.func.isRequired  
  };


export default CardList;