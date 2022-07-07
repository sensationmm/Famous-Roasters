import { CognitoUserSession } from 'amazon-cognito-identity-js'
import Amplify, { Auth } from 'aws-amplify'
import { useEffect, useState } from 'react'

export const awsconfig = {
  aws_project_region: process.env.REACT_APP_COGNITO_REGION,
  aws_cognito_region: process.env.REACT_APP_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
}
Amplify.configure(awsconfig)

export default function useAuth(): readonly [
  CognitoUserSession | undefined,
  (value: ((val?: CognitoUserSession) => CognitoUserSession) | CognitoUserSession) => void,
] {
  const [user, setUser] = useState<CognitoUserSession | undefined>()

  const handleErr = (err: string) => {
    if (err === 'No current user') {
      return null
    } else {
      return new Error(err)
    }
  }

  useEffect(() => {
    Auth.currentSession()
      .then(setUser)
      .catch((err) => handleErr(err))
  }, [])

  return [user, setUser]
}
