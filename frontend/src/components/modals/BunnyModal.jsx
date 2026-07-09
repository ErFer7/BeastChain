import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDisclosure } from '@nextui-org/react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { getDiseases } from '../../service/storageContract'

BunnyModal.propTypes = {
  bunny: PropTypes.object,
}

export default function BunnyModal(props) {
  const { bunny } = props
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [diseases, setDiseases] = useState([])

  useEffect(() => {
    getDiseases(bunny.id)
      .then((result) => {
        console.log(result)
        setDiseases(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [bunny.id, isOpen])

  return (
    <>
      <Button size="small" variant="ghost" className="w-full" onPress={onOpen}>
        {bunny.name}
      </Button>
      <Modal
        size={'5xl'}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="backdrop-blur-xl bg-zinc-900/75 text-zinc-50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl">{bunny.name}</ModalHeader>
              <ModalBody className="grid grid-cols-4 gap-4">
                <p className="col-span-1">
                  <span className="font-bold">ID:</span> {bunny.id.toString()}
                </p>
                <p className="col-span-1">
                  <span className="font-bold">Birthday:</span>{' '}
                  {new Date(Number(bunny.birthday)).toLocaleDateString('en-GB')}
                </p>
                <p className="col-span-1">
                  <span className="font-bold">Has lop ears:</span> {bunny.hasLopEars === 'true' ? 'Yes' : 'No'}
                </p>
                <p className="col-span-1">
                  <span className="font-bold">Color:</span> {bunny.color}
                </p>
                <p className="col-span-1">
                  <span className="font-bold">Father ID:</span> {bunny.fatherId.toString()}
                </p>
                <p className="col-span-1">
                  <span className="font-bold">Mother ID:</span> {bunny.motherId.toString()}
                </p>
                <p className="col-span-2">
                  <span className="font-bold">Owner ID:</span> {bunny.ownerId.toString()}
                </p>
                <p className="col-span-4">
                  <span className="font-bold">Diseases: </span>{' '}
                  {diseases.length !== 0 ? diseases.map((disease) => disease.name.toString()).join(', ') : 'None'}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-zinc-950" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
