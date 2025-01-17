import React, { useEffect, useState } from 'react'
// import { Backdrop, Fade, Modal, TextField } from '@mui/material'
// import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { termSheetAction } from '../../redux/actions/termSheetAction'
// import { termSheetAction } from '../../redux/actions/termSheetAction'
import { toast } from 'sonner'
import { TERM_SHEET } from '../../redux/types'
import { Modal, Button, Group, FileButton, Text } from '@mantine/core';
import { Spinner } from '../../helper/Spinner'


const ExcelModal = ({ isOpen, onClose, getId, refreshpage }) => {

    const [file, setFile] = useState()
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const getExcelDate = useSelector(state => state.termSheet.termSheet)

    useEffect(() => {

        if (getExcelDate && getExcelDate.status === 200) {
            dispatch({
                type: TERM_SHEET,
                payload: []
            })
            toast.success(getExcelDate.message)
            onClose()
        }
        console.log('getExcelDate', getExcelDate)
    }, [getExcelDate, dispatch, onClose])


    // const onChange = (e) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => setFile(reader.result?.split(",")[1]);
    //     reader.onerror = error => console.log(error);
    // }

    const [fileBase64, setFileBase64] = useState(""); // To store the base64 content

    const onChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the file object
        setFile(selectedFile); // Save the file object

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile); // Read file as base64
        reader.onload = () => {
            const base64Content = reader.result?.split(",")[1]; // Extract base64 content
            setFileBase64(base64Content);
        };
        reader.onerror = (error) => console.log("File reading error:", error);
    };
    const upLoadExcel = () => {
        let body = {
            _id: getId,
            termSheetUrl: fileBase64 // Send the base64 content here
        };
        console.log(body);
        setLoading(true);
        dispatch(termSheetAction(body));

        setTimeout(() => {
            refreshpage();
            setLoading(false);
        }, 3000);
    };



    return (
        <div>
            <Modal opened={isOpen} onClose={onClose} size="lg" title="Upload Termsheet" centered>

                <Group grow mb="md">

                </Group>

                <div className='modal-content'>

                    <div className='p-0 mt-3'>
                        <div>
                            <FileButton onChange={(e) => onChange(e)} accept=".pdf">
                                {(props) => (
                                    <Button color="yellow" variant="outline" {...props}>
                                        Click to upload document
                                    </Button>
                                )}
                            </FileButton>

                            {file && (
                                <Text size="sm" ta="center" mt="sm">
                                    {file.name}
                                </Text>
                            )}
                        </div>

                        {/* <Group grow mb="md" className='mt-5'>
                            <Button onClick={() => onClose()}  size='xs' color="red" type="submit">cancel</Button>

                            <Button onClick={() => upLoadExcel()} size='xs' color="red" type="submit">
                                {loading ? <Spinner /> : 'Save'}
                            </Button>
                        </Group> */}

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={() => onClose()}
                            >
                                Cancel
                            </button>
                            <button onClick={() => upLoadExcel()} type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {loading ? <Spinner /> : 'Save'}
                            </button>
                        </div>

                        {/* <div className='d-flex justify-content-between mt-4'>
                            <button onClick={() => onHide()} className="footer_cancel_btn">cancel</button>
                            <button onClick={() => upLoadExcel()} className='footer_next_btn'>{loading ? <div class="d-flex justify-content-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div> : 'Save'}</button>
                        </div> */}
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default ExcelModal