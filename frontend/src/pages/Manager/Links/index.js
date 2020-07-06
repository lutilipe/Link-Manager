import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Layout from '../../Layouts/Manager'
import { linkList, setLinkToRemove, linkRemove } from '../../../actions/LinkActions'

const Links = ({ links, linkList, linkRemove, linkToRemove, setLinkToRemove }) => {
  useEffect(() => {
    linkList()
  }, [linkList])

  const cancelDelete = e => setLinkToRemove(null)

  const confirmDelete = e => linkToRemove ? linkRemove(linkToRemove) : null

  return (
    <>
      <Layout >
        <div className="row">
          <div className="col">
            <h1>Links</h1>
          </div>
          <div className="col text-right align-self-bottom pt-2">
            <Link to="/manager/link/create" className="btn btn-primary">
                  Add
            </Link>
          </div>
        </div>
        { links && links.length ? links.map(link => {
          const deleteClick = e => setLinkToRemove(link)

          const border = (linkToRemove && linkToRemove.id === link.id)
            ? 'border border-danger rounded'
            : 'border border-transparant'

          return (
            <div
              className={`pb-2 pt-2 pl-3 pr-3 d-flex flex-row justify-content-between ${border}`}
              key={link.id}>
              <div className="pr-3">
                <img src="https://via.placeholder.com/100" alt="Link icon"/>
              </div>
              <div className="align-self-center">
                <span className="text-primary clearfix">{link.label}</span>
                <span className="text-primary clearfix">{link.url}</span>
              </div>
              <div className="ml-auto p-2 clearfix">
                <Link to={`/manager/link/edit/${link.id}`} className="mr-2">Edit</Link>
                <button className="btn btn-clear" onClick={deleteClick}>Delete</button>
              </div>
            </div>
          )
        }) : null }

        { linkToRemove ? (
          <div className="alert alert-danger rounded float-center shadow">
            <h4 className="alert-heading">Delete Confirmation!</h4>
            <p>Are you sure you want to delete? This action can not be undone.</p>
            <hr/>
            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-light" onClick={cancelDelete}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        ) : null }
      </Layout>
    </>
  )
}

const mapStateToProps = state => {
  return {
    links: state.link.links,
    linkToRemove: state.link.linkToRemove
  }
}

export default connect(mapStateToProps, { linkList, setLinkToRemove, linkRemove })(Links)
