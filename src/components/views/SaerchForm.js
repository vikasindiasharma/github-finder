import React, { useState, Fragment } from 'react';
import PropTypes from "prop-types";
const SearchForm = (props) => {
    const [searchText, setsearchText] = useState('');
    const onChange = e => setsearchText(e.target.value);   
    return (
        <Fragment>
            <div className="container">
                <form onSubmit={(event) => {event.preventDefault(); props.onSearch(searchText)  }}>                    
                        <div className="input-group">
                            <div>
                                <input type="text" className="form-control" id="searchText"
                                    aria-describedby="searchHelp"
                                    value={searchText}
                                    onChange={onChange}
                                    placeholder="Search Git Repositories..." />
                            </div>

                            <button type="Search" className="btn btn-primary"> Search </button>
                        </div>                    
                </form>
            </div>
        </Fragment>
    );

}

SearchForm.propTypes = {    
    onSearch: PropTypes.func.isRequired  
  };

export default SearchForm;