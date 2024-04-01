import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';

export default function EmailVerification({ addChoreLog }) {
  const [email, setEmail] = React.useState();
  const [verify, setVerify] = React.useState(false);
  const [otp, setOtp] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState();
  const [backEndOtp, setBackEndOtp] = React.useState();
  const [inputMessage, setInputMessage] = React.useState(
    'Send Verification Code'
  );

  const router = useRouter();

  // const [date, setDate] = React.useState();
  const handleSubmit = async (e) => {
    if (otpValue === undefined) {
      setInputMessage('Sending...');
      addChoreLog([email, verify]);
      e.preventDefault();
      console.log(email);
      console.log(otpValue);
      console.log(verify);
      try {
        const response = await axios.post('/api/password/verification', {
          email,
        });
        console.log(response);
        toast.success('Verification email sent');
        if (response.status === 200 && response.data.otp) {
          setOtp(true);
          // console.log('otp', response.data.otp);
          setBackEndOtp(response.data.otp);
          setInputMessage('Verify Email');
        }
      } catch (err) {
        toast.error(getError(err));
        if (err.response.status === 401) {
          router.push('/Login');
        }
      }
    } else {
      e.preventDefault();
      if (otpValue === backEndOtp) {
        setVerify(true);
        if (verify === true) {
          // toast.success('Email verified');
          // console.log('verification state jsut before call', verify);
          addChoreLog([email, verify]);
        } else {
          toast.success('Email verified');
          // handleSubmit(e);
          addChoreLog([email, true]);
        }
      } else {
        toast.error('Incorrect verification code');
      }
    }
  };

  return (
    <>
      <h3 className="text-center">
        You will have to verify your email before registering
      </h3>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="confirmPassword">Registration Email</label>
        <br />
        <input
          className="w-full my-2"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {otp ? (
          <>
            <label htmlFor="confirmPassword">Verification Code</label>
            <br />
            <input
              className="w-full my-2"
              name="otp"
              type="text"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
            />
          </>
        ) : (
          <></>
        )}

        <div className="flex mb-4 justify-center items-center my-2">
          <input
            type="submit"
            value={inputMessage}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-2 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2"
          />
        </div>
      </form>
    </>
  );
}
