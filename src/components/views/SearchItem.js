import React from 'react';
import PropTypes from "prop-types";
function SearchItem({ node: { nameWithOwner, name }, repositories, OnAddCardClick }) {

    function onAddButtonClick() {
        OnAddCardClick(nameWithOwner);
    }
    let cardAdded = false;
    if (repositories) {
        cardAdded = repositories.find(repo => repo.nameWithOwner === nameWithOwner) || false;
    }
    return (
        <div className="card card-body mb-3" >
            <div className="row" >
                <div className="col-md-6">
                    <h4> {name} </h4>
                </div>
                <div className="col-md-6">
                    {cardAdded ? <div className='badge badge-success'> Already added in cards </div> :

                        <button onClick={onAddButtonClick} className="btn btn-primary"> Add as Card</button>
                    }
                </div>

            </div>
        </div>
    );
}

SearchItem.propTypes = {
    node: PropTypes.object.isRequired,
    repositories: PropTypes.array.isRequired,
    OnAddCardClick: PropTypes.func.isRequired
};


export default SearchItem;