import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Layout from '../../../Layouts/Manager'
import { getFormData } from '../../../../helpers/form'
import { linkCreate } from '../../../../actions/LinkActions'

const CreateLink = ({ link, linkCreate }) => {
  const submitHandler = e => {
    const data = getFormData(e)
    linkCreate(data)
  }

  if (link) {
    return <Redirect to="/manager/link" />
  }

  return (
    <>
      <Layout>
        <h1>Create Link</h1>
        <div>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="label">Label</label>
              <input type="text" className="form-control" name="label"/>
            </div>
            <div className="form-group">
              <label htmlFor="url">Url</label>
              <input type="text" className="form-control" name="url"/>
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input type="checkbox" name="isSocial"/>
                <span className="form-check-sign"></span>
                      Is Social
              </label>
            </div>
            <div>
              <button className="btn btn-primary btn-round">Submit</button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  )
}

const mapStateToProps = state => {
  return {
    link: state.link.link
  }
}

export default connect(mapStateToProps, { linkCreate })(CreateLink)
