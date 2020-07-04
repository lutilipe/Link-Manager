import { connect } from 'react-redux'
import { useEffect } from 'react'
import { getToken } from '../../helpers/account'
import { getTokenExpire } from '../../helpers/jwt'
import { refreshToken } from '../../actions/AccountActions'

const TokenRefresh = ({ refreshToken }) => {
    const TRESHOLD = 30 
    const calculate = () => {
      const token = getToken()
      const expires = getTokenExpire(token)
      const secondsToExpire = expires - (Date.now() / 1000)

      return secondsToExpire
    }
    
    useEffect(() => {
      const secondsToExpire = calculate() - TRESHOLD
      const id = setTimeout(refreshToken, secondsToExpire * 1000)
      return () => clearTimeout(id)
    }, [refreshToken])
    
  setInterval(calculate, 1000)

  return null
}

const mapStateToProps = state => {
    return {}
  }

export default connect(mapStateToProps, { refreshToken })(TokenRefresh)
