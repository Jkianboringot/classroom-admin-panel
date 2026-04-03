import React, { use, useEffect, useRef, useState } from 'react'
import { UploadWidgetValue } from '@/types'
import { UploadCloud } from 'lucide-react'
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/constants'


function UploadWidget({ value = null, onChange, disabled = false }) {
    const widgetRef = useRef<CloudinaryWidget | null>(null)
    const onChangeRef = useRef(onChange)

    const [preview, setPreview] = useState<UploadWidgetValue | null>(value)
    // const [deleteToken, setDeleteToken] = useState<string | null>(null)
    // const [isRemoving, setIsRemoving] = useState(false);


    useEffect(() => {
        setPreview(value)
        // if (!value) setDeleteToken(null)
    }, [value])

    useEffect(() => {
        onChangeRef.current = onChange
    }, [onChange])


    useEffect(() => {
        if (typeof window === 'undefined') return

        const initializeWidget = () => {
            if (!window.cloudinary || widgetRef.current) return false

            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                multiple: false,
                folder: 'uploads',
                maxFileSize: 5000000,
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp']
            }, (error, result) => {
                if (!error && result.event === 'success') {
                    const payload: UploadWidgetValue = {
                        url: result.info.secure_url,
                        publicId: result.info.public_id ///no shit i ahve no cleu what any of this api shit is doing, 
                        // so yeah focus on learning this untill july, because everything will revolve around this api
                        //you need to be able to think in api, ok, state, value, communications between system, passing info between them
                        //i need learn how button, component talks, and the way they talk is objects, its pretty much like this
                        //click a button, it activates function that send an json, then end point recieve that json, and if the send json
                        //contains a certain value do this, or this, this is hard because you really have to think of each component not just 
                        //this button do this, no you have to think, ok this button send this 'message' which allow it to do this, think of it like this
                        //clicking button, make something true, then endpoint check if its true of so do this , just a general dont think to much about this example, too lzay
                    }
                    setPreview(payload)

                    // setDeleteToken(result.info.delete_token ?? null)
                    onChangeRef.current?.(payload)

                }

            })
            return true
        }
        if (initializeWidget()) return

        const intervalId = window.setInterval(() => {
            if (initializeWidget()) {
                window.clearInterval(intervalId)
            }
        }, 500)

        return ()=>window.clearInterval(intervalId)
    }, [])


    const openWidget = () => {
        if (!disabled) widgetRef.current?.open()
    }

    // const removeFromCloudinary = async () => { }

    return (
        <div className="space-y-2">
            {preview ? (
                <div className="upload-preview">
                    <img src={preview.url} alt="Upload file" />
                </div>
            ) :
                <div className="upload-dropzone" role='button' tabIndex={0} onClick={openWidget}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            openWidget()
                        }
                    }}>
                    <div className="upload-prompt">
                        <UploadCloud className='icon' />
                        <div>
                            <p>Click to upload photo</p>
                            <p>PNG, JPG up to 5mb</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}

export default UploadWidget