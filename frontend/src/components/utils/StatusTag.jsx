import PropTypes from 'prop-types'
import { Divider } from '@nextui-org/react'
import { Chip } from '@nextui-org/react'

StatusTag.propTypes = {
  successMessage: PropTypes.string,
  failureMessage: PropTypes.string,
  status: PropTypes.string,
}

export default function StatusTag(props) {
  const { successMessage, failureMessage, status } = props

  let message = null

  switch (status) {
    case 'success':
      message = (
        <Chip color="success" className="bg-gradient-to-r from-blue-500 to-cyan-500">
          {successMessage}
        </Chip>
      )
      break
    case 'failure':
      message = <Chip color="danger">{failureMessage}</Chip>
      break
  }

  const result = status ? (
    <div className="col-span-4">
      <Divider className="my-4" />
      {message}
    </div>
  ) : (
    <div className="col-span-4">{message}</div>
  )

  return result
}
