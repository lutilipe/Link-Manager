import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { linkGet, linkUpdate } from '../../../../actions/LinkActions'
import Layout from '../../../Layouts/Manager'
import FormGroup from '../../../../components/FormGroup'
import FormCheck from '../../../../components/FormCheck'
import { getFormData } from '../../../../helpers/form'

const Edit = ({ link, linkGet, linkUpdate }) => {
  const { id } = useParams()

  const history = useHistory()

  useEffect(() => {
    linkGet(id)
  }, [id, linkGet])

  const submitHandler = e => {
    const data = getFormData(e)
    linkUpdate(id, data)
    history.push('/manager/link')
  }

  return (
    <>
      <Layout>
        <h1>Edit Link</h1>
        <div>
          <form onSubmit={submitHandler}>
            <FormGroup label="Label" name="label" data={link} type="text" />
            <FormGroup label="Url" name="url" data={link} type="text" />
            <FormCheck label="Is Social" name="isSocial" data={link} />
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
  return { link: state.link.link }
}

export default connect(mapStateToProps, { linkGet, linkUpdate })(Edit)
