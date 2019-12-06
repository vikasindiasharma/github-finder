import React , {Fragment} from 'react';
import PropTypes from "prop-types";

function CardItem({ node,onRemoveCard }) {

  return (
    <Fragment>
      <div className='card card-body mb-3'>
        <div  className="row">
        <div className='all-center col-md-9'>
          <img
            src={node.owner.avatarUrl}
            className='round-img'
            alt=''
            style={{ width: '70px' }}
          />
          <h1>{node.owner.login}</h1>
          <p>Repository Name : {node.name}</p>
        </div>              
      <div className='col-md-3'>
      <button onClick={(event) => {onRemoveCard(node.nameWithOwner) }} className="btn btn-primary"> Remove Card</button>
      </div>
      </div>
      <div className='row'>
        <div className='badge badge-primary col-md-3'>Frok Count : {node.forkCount}</div>
        <div className='badge badge-success col-md-3'>Watchers: {node.watchers.totalCount}</div>
        <div className='badge badge-light col-md-3'>Stargazers: {node.stargazers.totalCount}</div>        
      </div>
      </div>      
    </Fragment>
  );
}

CardItem.propTypes = {
  node: PropTypes.object.isRequired,
  onRemoveCard: PropTypes.func.isRequired  
};


export default CardItem;