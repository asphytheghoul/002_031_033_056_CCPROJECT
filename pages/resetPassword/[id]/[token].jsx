import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Layout from '../../../components/Layout';
import { toast } from 'react-toastify';
import { getError } from '../../../utils/error';

import axios from 'axios';

function ResetPassword() {
  const router = useRouter();
  const token = router.query.token;
  const id = router.query.id;

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ password }) => {
    try {
      const result = await axios.put('/api/password/reset', {
        id,
        token,
        password,
      });
      toast.success('Password updated successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <>
      <Layout title="Reset Password">
        <form
          className="flex flex-col justify-center  mx-[10vw] md:mx-[30vw] h-[70vh]"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex justify-center items-center">
            <h1 className="mb-4 text-3xl font-bold text-primary">
              Reset Password
            </h1>
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="w-full"
              type="password"
              id="password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'password is more than 5 chars',
                },
              })}
            />
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                validate: (value) => value === getValues('password'),
                minLength: {
                  value: 6,
                  message: 'confirm password is more than 5 chars',
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === 'validate' && (
                <div className="text-red-500 ">Password do not match</div>
              )}
          </div>
          <div className="mb-4">
            <button className="primary-button">Reset Password</button>
          </div>
        </form>
      </Layout>
    </>
  );
}

export default ResetPassword;
