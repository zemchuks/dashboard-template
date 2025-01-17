import React, { useEffect, useState } from 'react'
import { Steps, Button, Typography } from 'antd';
// import { Box, } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DetailsTransaction from './DetailsTransaction';
import KeyParties from './KeyParties';
import DocumentFlow from './DocumentFlow';
import FundFlow from './FundFlow';
import Facility from './Facility';
import { getTransactionById } from '../../redux/actions/transactionDataAction';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle, FaUser, FaFileAlt, FaDollarSign, FaWarehouse } from 'react-icons/fa'; // Import Bootstrap icons


const stepsforexport = ['Transaction Details', 'Key Parties', 'Document Flow', 'Fund Flow', 'Facility'];
const stepsforimport = ['Key Parties', 'Document Flow', 'Fund Flow', 'Facility'];

const Edit_Transactions = () => {

  const location = useLocation();
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get("id")
  // const transactionType = location.state && location.state.length > 0 ? location?.state?.[0]?.type : null
  // const productNature = location.state && location.state.length > 0 ? location?.state?.[1]?.type : null
  // const isView = location.state && location.state.length > 0 ? location?.state?.[2]?.isView : null

  const transactionType = location.state?.[0]?.type ?? null;
  const productNature = location.state?.[1]?.type ?? null;
  // const isView = location.state?.[2]?.isView ?? null;

  const [getTrans, setGetTrans] = useState({})
  const [transId, setTransId] = useState("");
  const [getLender, setGetLender] = useState("")
  const [getBorrower, setGetBorrower] = useState("")
  const [getWarehouseCompany, setGetWarehouseCompany] = useState("")
  const [getCounterParty, setGetCounterParty] = useState("")
  const [getShippingCompany, setGetShippingCompany] = useState("")
  const [pricingHedgingStatus, setPricingHedgingStatus] = useState(false)
  const [warehouseStatus, setWarehouseStatus] = useState(false)

  const [activeStep, setActiveStep] = useState(0);
  let step = []
  const { Step } = Steps;
  const getTransactionId = useSelector(state => state.transactionData.getTransactionById)

  useEffect(() => {
    if (id) {
      dispatch(getTransactionById(id))
      let transdata = {
        "id": id,
        "currency": getTransactionId.data?.details?.contractDetails?.currency,
        "value": getTransactionId.data?.details?.contractDetails?.value
      }

      setTransId(id);
      localStorage.setItem('details', JSON.stringify(transdata))

    }
  }, [id, dispatch, getTransactionId.data?.details?.contractDetails?.currency, getTransactionId.data?.details?.contractDetails?.value])

  const signalContract = (values) => {
    setGetTrans(values)
  }
  const signalLender = (values) => {
    setGetLender(values)
  }
  const signalBorrower = (values) => {
    setGetBorrower(values)
  }

  const signalWarehouseCompany = (values) => {
    setGetWarehouseCompany(values)
  }
  const signalCounterParty = (values) => {
    return setGetCounterParty(values)
  }
  const signalShippingCompany = (values) => {
    console.log('val', values)
    return setGetShippingCompany(values)
  }
  const signalPricingHedgingStatus = (values) => {
    return setPricingHedgingStatus(values)
  }
  const signalWarehouseStatus = (values) => {
    return setWarehouseStatus(values)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (transactionType === "Export") {
    step = stepsforexport
  } else {
    step = stepsforimport
  }

  const getStepIcon = (label) => {
    switch (label) {
      case 'Transaction Details':
        return <FaCheckCircle />;
      case 'Key Parties':
        return <FaUser />;
      case 'Document Flow':
        return <FaFileAlt />;
      case 'Fund Flow':
        return <FaDollarSign />;
      case 'Facility':
        return <FaWarehouse />;
      default:
        return null;
    }
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <div className='add-edit-product'>
        {/* <Box sx={{ width: '100%' }}> */}
        {productNature === 'Physical' && (
          <Steps className='mx-auto mb-5' current={activeStep}>
            {step.length &&
              step.map((label, index) => (
                <Step key={label} title={label} icon={getStepIcon(label)} />
              ))}
          </Steps>
        )}
        {activeStep === step.length ? (
          <React.Fragment>
            <Typography style={{ marginTop: '2px', marginBottom: '6px' }}>
              All steps completed - you&apos;re finished
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '2px' }}>
              <div style={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </React.Fragment>
        ) : (
          <>
            {
              transactionType === "Export" ? <React.Fragment>
                {
                  productNature === 'Physical' ?
                    <>
                      {activeStep + 1 === 1 && <DetailsTransaction hendelNext={handleNext} signalShippingCompany={signalShippingCompany} signalCounterParty={signalCounterParty} signalPricingHedgingStatus={signalPricingHedgingStatus} signalContract={signalContract} signalWarehouseCompany={signalWarehouseCompany} signalWarehouseStatus={signalWarehouseStatus} signalLender={signalLender} signalBorrower={signalBorrower} transactionType={transactionType} transaction_id={transId} />}
                      {activeStep + 1 === 2 && <KeyParties hendelNext={handleNext} getShippingCompany={getShippingCompany} getCounterParty={getCounterParty} pricingHedgingStatus={pricingHedgingStatus} getLender={getLender} getBorrower={getBorrower} getWarehouseCompany={getWarehouseCompany} warehouseStatus={warehouseStatus} hendelCancel={handleBack} transactionType={transactionType} />}
                      {activeStep + 1 === 3 && <DocumentFlow hendelNext={handleNext} hendelCancel={handleBack} />}
                      {activeStep + 1 === 4 && <FundFlow hendelNext={handleNext} getTrans={getTrans} hendelCancel={handleBack} />}
                      {activeStep + 1 === 5 && <Facility hendelNext={handleNext} hendelCancel={handleBack} />}
                    </>
                    :
                    <>
                      <div style={{ height: "88vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <p style={{ fontSize: '48px', fontWeight: "bold" }}>Product not yet available.</p>
                      </div>
                    </>
                }
              </React.Fragment>
                :
                <>
                  {/* {!location.state && (
                                            <div style={{ height: "88vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <p style={{ fontSize: '48px', fontWeight: "bold" }}>Product not yet available. Coming soon</p>
                                            </div>
                                        )} */}
                  <div style={{ height: "88vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: '48px', fontWeight: "bold" }}>Product not yet available. Coming soon</p>
                  </div>

                </>
            }
          </>

        )}
        {/* </Box> */}
      </div>
    </>
  )
}

export default Edit_Transactions