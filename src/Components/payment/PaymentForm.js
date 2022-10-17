import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Divider,
  Slide,
  LinearProgress,
  Box,
  Typography
} from "@mui/material";

import useForm from "./useForm";
import "../../App.css";
import {
  callPaymentAPI,
} from "../../services/PaymentAPI";
import {
  DialogTitle,
  DialogContent,
  Dialog,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import _ from "lodash";
import "../login/Login.css";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 5 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function PaymentForm({ onClose, setSnackBarOpen, setIsLoading }) {
  const initState = {
    senderAccountId: "",
    senderAccountTpe: "",
    recepientPhoneNumber: "",
    recepientMailId: "",
    transferAmount: "",
    description: ""
  };
  const [reportType, setReportType] = useState([]);
  const [uuid, setUuid] = useState("");
  const [fileUploadMessage, setFileUploadMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const cancelFileUpload = useRef(null);
  const [isReset, setIsReset] = useState(false);
  const mounted = useRef(true);
  const [accType, setAccType] = React.useState('');

  const submit = (data) => {
    setIsLoading(true);
   
    const payload = {
      sender_account_id: state.senderAccountId,
      sender_account_type: state.senderAccountTpe && state.senderAccountTpe,
      recipient_phone_number: state.recepientPhoneNumber,
      recipient_email_id: state.recepientMailId,
      transfer_amount: state.transferAmount,
      description: state.description
      
    };

    callPaymentAPI(payload).then((data) => {
      if(data) {
        setIsLoading(false);
        setSnackBarOpen(true);
      }
    });
    onClose();
  };

  const {
    handleChange,
    handleSubmit,
    state,
    errors,
    inputRef,
  } = useForm({
    initState,
    callback: submit,
  });

  let isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;

  const handleReset = () => {
    setIsReset(true);
  };

  const handleResetClose = () => {
    setIsReset(false);
  };

  const handleResetYes = () => {
    //handleResetCallBack();
    setIsReset(false);
  };

  const isResetDisabled = () => {
    return _.isEqual(state, initState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* sender accountId */}
        <TextField
          required
          sx={{ width: 280 }}
          label="Sender Account ID"
          name="senderAccountId"
          defaultValue={state.senderAccountId}
          onChange={handleChange}
          error={errors.reportType ? true : false}
          helperText={errors.senderAccountId}
          
          value={state.senderAccountId}
        />
        <br />

        {/* sender accountType */}
        <TextField
          required
          sx={{ width: 280 }}
          label="Sender Account Type"
          name="senderAccountTpe"
          defaultValue={state.senderAccountTpe}
          onChange={handleChange}
          error={errors.senderAccountTpe ? true : false}
          helperText={errors.senderAccountTpe}
          className="input-field-margin"
          value={state.senderAccountTpe}
        />
        <br />

        {/* recepient phoneNumber */}
        <TextField
          required
          sx={{ width: 280 }}
          label="Recepient Phone Number"
          name="recepientPhoneNumber"
          defaultValue={state.recepientPhoneNumber}
          onChange={handleChange}
          error={errors.recepientPhoneNumber ? true : false}
          helperText={errors.recepientPhoneNumber}
          className="input-field-margin"
          value={state.recepientPhoneNumber}
        />
        <br />

        {/* recepient email Id */}
        <TextField
          required
          sx={{ width: 280 }}
          label="Recepient Email Id"
          name="recepientMailId"
          defaultValue={state.recepientMailId}
          onChange={handleChange}
          error={errors.recepientMailId ? true : false}
          helperText={errors.recepientMailId}
          className="input-field-margin"
          value={state.recepientMailId}
        />
        <br />

        {/* Transfer Amount */}
        <TextField
          required
          sx={{ width: 280 }}
          label="Transfer Amount"
          name="transferAmount"
          defaultValue={state.transferAmount}
          onChange={handleChange}
          error={errors.transferAmount ? true : false}
          helperText={errors.transferAmount}
          className="input-field-margin"
          value={state.transferAmount}
        />
        <br />

        {/* Description */}
        <TextField
          required
          sx={{ width: 280 }}
          label="Description"
          name="description"
          defaultValue={state.description}
          onChange={handleChange}
          error={errors.description ? true : false}
          helperText={errors.description}
          className="input-field-margin"
          value={state.description}
        />
        <br />
        
      </div>

      <Divider className="divider-margin" />

      <Dialog
        open={isReset}
        onClose={handleResetClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Confirmation Dailog
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, want to reset all the fields ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleResetClose}>
            No
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleResetYes}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <div class="btns">
        <Button
          variant="outlined"
          disabled={isResetDisabled()}
          color="secondary"
          onClick={handleReset}
          className="close-button"
        >
          Reset
        </Button>
        <Button
          disabled={!isValidForm}
          type="submit"
          variant="contained"
          color="primary"
          className="upload-button"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
