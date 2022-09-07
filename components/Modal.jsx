/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { db, storage } from '../firebase'

import { Transition, Dialog } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'

const Modal = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)

  const uploadPost = async () => {
    if (loading) return
    setLoading(true)

    // - Create a post and add to Firestore 'posts' collection
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })

    // - Get the post ID for the newly created post
    console.log('New doc added with ID', docRef.id)

    // - Upload the image to firebase storage with the post ID
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    // - get a download URL from db storage and update to original post with image
    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const donwloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: donwloadURL,
        })
      }
    )

    setOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-28 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()} // O clique vai para filePickerRef no input do tipo file
                    className="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] rounded-full cursor-pointer"
                  >
                    <CameraIcon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Carregar uma foto
                    </Dialog.Title>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={filePickerRef}
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      className="w-full text-center border-none outline-none focus:ring-0"
                      type="text"
                      ref={captionRef}
                      placeholder="Insira uma descrição..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-5 sm:mt-6">
                <button onClick={uploadPost} disabled={!selectedFile} className="disabled:cursor-not-allowed disabled:opacity-80 group">
                  <a className="relative group-disabled:cursor-not-allowed cursor-pointer p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
                    <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute" />
                    <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                      <span className="relative text-white">
                        {loading ? 'Enviando...' : 'Enviar post'}
                      </span>
                    </span>
                  </a>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
