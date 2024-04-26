import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const SendMoney = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    // Check if token exists in local storage
    if (!userToken) {
      navigate("/signin"); // Redirect to sign-in page if token doesn't exist
    }
  }, []);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 lg:space-y-8 xs:space-y-3 lg:w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col lg:p-6 xs:p-1">
            <h2 className="lg:text-3xl xs:text-base font-bold text-center">Send Money</h2>
          </div>
          <div className="lg:p-6 xs:p-2">
            <div className="flex items-center space-x-4">
              <div className="lg:w-12 lg:h-12 xs:w-5 xs:h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="lg:text-2xl text-white">
                  {name && name.length > 0 && name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="lg:text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Amount (in Rs)
                </label>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                onClick={async () => {
                  const res = await axios.post(
                    "https://paytm-like-app-6cs3.onrender.com" +
                      "/api/v1/account/transfer",
                    {
                      to: id,
                      amount,
                    },
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  // console.log(res.data.message);
                  navigate("/paymentstatus?message=" + res?.data.message);
                }}
                className="justify-center rounded-md lg:text-sm xs:text-xs xs:p-2 font-medium ring-offset-background transition-colors lg:h-10 lg:px-4 lg:py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
              <button
                onClick={() => navigate("/home")}
                className="justify-center rounded-md lg:text-sm xs:text-xs xs:p-2 font-medium ring-offset-background transition-colors lg:h-10 lg:px-4 lg:py-2 w-full bg-red-500 text-white"
              >
                Cancel & Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
