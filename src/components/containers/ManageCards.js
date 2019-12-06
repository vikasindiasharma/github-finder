import React, {  useState, Fragment } from "react";
import Spinner from '../views/Spinner';
import {  removeCard } from "../../redux/actions/repositoryActions";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import CardList from '../views/CardList';
import PropTypes from "prop-types";
    
function ManageCards({ repositories, removeCard, ...props }) {

    const [errors, setErrors] = useState({});

    function clearError() {
        setErrors({});
    }

    function handleRemoveCard(repoNameWithOwner) {     
        clearError();   
        removeCard(repoNameWithOwner)
            .then((response) => {                                
                toast.success(" Card removed.");
            })
            .catch(error => {                
                setErrors({ errorMessage: error.message });
            });
    }

    return (
        <Fragment>
            {errors.errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errors.errorMessage}
                </div>
            )}
            {props.loading ? <Spinner /> : ''}
            {repositories && <CardList repositories={repositories} onRemoveCard={handleRemoveCard}></CardList>}
        </Fragment>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        repositories: state.repositories,
        loading: state.apiCallsInProgress > 0
    };
}

const mapDispatchToProps = {    
    removeCard    
};

ManageCards.propTypes = {    
    repositories: PropTypes.array.isRequired,
    removeCard: PropTypes.func.isRequired
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCards);