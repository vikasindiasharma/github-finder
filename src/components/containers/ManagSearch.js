import React, { useEffect, useState, Fragment } from "react";
import Spinner from '../views/Spinner';
import { searchRepositories } from "../../redux/actions/searchActions";
import { getRepositoryDetail,loadCards } from "../../redux/actions/repositoryActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import SearchForm from '../views/SaerchForm';
import { connect } from "react-redux";
import SearchResultPage from '../views/SearchResultPage';



function ManageSaerch({ searchResults, repositories, searchRepositories,loadCards,getRepositoryDetail,removeCard, ...props }) {

    const [errors, setErrors] = useState({});
    const [coursesLoaded, setcoursesLoaded] = useState(false);
    const client = props.client;

    function  clearError() {
        setErrors({});
    }
    function handleAddCard(repoNameWithOwner) {     
        clearError();                          
        getRepositoryDetail(client, repoNameWithOwner)
            .then((response) => {                                
                toast.success(" New Card Added.");                
            })
            .catch(error => {                
                setErrors({ errorMessage: error.message });
            });
    }

    useEffect(() => {        
        if (!coursesLoaded && repositories.length ===0) {
            setcoursesLoaded(true);
            loadCards().catch(error => {
                setErrors({ errorMessage: 'Failed to load data from api ' + error.message });
            });            
          }

      }, []);
    function handleSearch(searchText) {            
        clearError();
        if (!searchText)
        {
            setErrors({ errorMessage: 'Please enter a text to search' });
            return;
        }
        searchRepositories(client, searchText)
            .then((response) => {
                toast.success("Search Sucess." );                
            })
            .catch(error => {                
                setErrors({ errorMessage: error.message });
            });
    }  

    return (
        <Fragment>            
            <div className="col-lg-4 col-md-4 col-sm-4 container justify-content-center">
                <SearchForm onSearch={handleSearch} />
              </div>
        {errors.errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errors.errorMessage}
        </div>
      )}
              {props.loading ?  <Spinner /> : ''}

                {searchResults &&                
                <SearchResultPage searchResults={searchResults} repositories={repositories} onAddCardClick={handleAddCard} />
                }
        </Fragment>
    );
}

export function findRepoByName(courses, slug) {
    return courses.find(course => course.slug === slug) || null;
  }
function mapStateToProps(state, ownProps) {  
  
    return {
        searchResults: state.searchResults,
        repositories: state.repositories,
        loading: state.apiCallsInProgress > 0
    };
}

const mapDispatchToProps = {
    searchRepositories,        
    getRepositoryDetail,
    loadCards   
};

ManageSaerch.propTypes = {    
    searchResults: PropTypes.array.isRequired,
    repositories: PropTypes.array.isRequired,
    searchRepositories: PropTypes.func.isRequired,
    loadCards: PropTypes.func.isRequired,
    getRepositoryDetail: PropTypes.func.isRequired,    
    client: PropTypes.object.isRequired
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageSaerch);