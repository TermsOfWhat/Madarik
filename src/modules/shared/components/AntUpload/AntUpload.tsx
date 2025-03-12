import { Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import AlertMessageAntd from '../AlertMessageAntd/AlertMessageAntd'
import { FormikProps } from 'formik'
import camera from '../../../shared/assets/icons/upload/cameraAdd.svg'
import { useEffect, useState } from 'react'

function AntUpload({
  formik,
  listType = 'picture-card',
}: {
  formik: FormikProps<any>
  listType?: 'picture-card' | 'picture-circle'
}) {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    setFileList([])

    if (formik.values.imageUri) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: formik.values.imageUri,
        },
      ])
    }
  }, [formik.values.imageUri])

  const handleChange: UploadProps['onChange'] = (info) => {
    const { status } = info.file

    if (status === 'done') {
      AlertMessageAntd.success(`${info.file.name} file uploaded successfully.`, 3)
      formik.setFieldValue('imageUri', info.file.response)

      setFileList([info.file])
    } else if (status === 'error') {
      AlertMessageAntd.error(`${info.file.name} file upload failed.`, 3)
    }

    setFileList(info.fileList)
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <img src={camera} alt="camera" />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Upload
      name="logo"
      maxCount={1}
      listType={listType}
      className="avatar-uploader"
      showUploadList
      action={'/api/tenants/logo'}
      withCredentials
      onChange={handleChange}
      fileList={fileList}
      accept="image/*"
      headers={{
        'X-CSRF': '1',
      }}
    >
      {uploadButton}
    </Upload>
  )
}

export default AntUpload
